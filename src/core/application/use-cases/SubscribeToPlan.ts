import { SubscriptionPlanCode } from "@/core/domain";
import { NotFoundError, ValidationError } from "@/core/domain/errors";
import {
  UserRepositoryPort,
  SubscriptionPlanRepositoryPort,
  SubscriptionRepositoryPort,
  PaymentProviderPort,
} from "../ports";

export interface SubscribeToPlanInput {
  userId: string;
  planCode: SubscriptionPlanCode;
  successUrl: string;
  cancelUrl: string;
}

export interface SubscribeToPlanOutput {
  checkoutUrl: string;
  sessionId: string;
}

export class SubscribeToPlan {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly planRepository: SubscriptionPlanRepositoryPort,
    private readonly subscriptionRepository: SubscriptionRepositoryPort,
    private readonly paymentProvider: PaymentProviderPort
  ) {}

  async execute(input: SubscribeToPlanInput): Promise<SubscribeToPlanOutput> {
    // Get user
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new NotFoundError("User", input.userId);
    }

    // Only JEs can subscribe
    if (!user.isJE()) {
      throw new ValidationError(
        "Only Young Entrepreneurs can subscribe to plans"
      );
    }

    // Get plan
    const plan = await this.planRepository.findByCode(input.planCode);
    if (!plan) {
      throw new NotFoundError("SubscriptionPlan", input.planCode);
    }

    // Check for existing active subscription
    const existingSubscription = await this.subscriptionRepository.findByUserId(
      user.id
    );
    if (existingSubscription?.isActive()) {
      throw new ValidationError("User already has an active subscription");
    }

    // Create Stripe customer if needed
    let customerId: string;
    if (existingSubscription) {
      // We'd need to store customerId somewhere - for now, create new
      const { customerId: newCustomerId } =
        await this.paymentProvider.createCustomer(
          user.email.getValue(),
          user.name ?? undefined
        );
      customerId = newCustomerId;
    } else {
      const { customerId: newCustomerId } =
        await this.paymentProvider.createCustomer(
          user.email.getValue(),
          user.name ?? undefined
        );
      customerId = newCustomerId;
    }

    // Create checkout session
    // In a real implementation, you'd have stripePriceIdMonthly on the plan
    const priceId = `price_${plan.code.toLowerCase()}`; // Placeholder
    const session = await this.paymentProvider.createCheckoutSession(
      customerId,
      priceId,
      input.successUrl,
      input.cancelUrl
    );

    return {
      checkoutUrl: session.url,
      sessionId: session.sessionId,
    };
  }
}
