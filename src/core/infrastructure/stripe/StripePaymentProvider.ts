import Stripe from "stripe";
import {
  PaymentProviderPort,
  CreateCustomerResult,
  CreateSubscriptionResult,
  CreateCheckoutSessionResult,
} from "@/core/application/ports";

export class StripePaymentProvider implements PaymentProviderPort {
  private readonly stripe: Stripe;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    this.stripe = new Stripe(secretKey, {
      apiVersion: "2025-11-17.clover",
    });
  }

  async createCustomer(
    email: string,
    name?: string
  ): Promise<CreateCustomerResult> {
    const customer = await this.stripe.customers.create({
      email,
      name,
    });

    return {
      customerId: customer.id,
    };
  }

  async createSubscription(
    customerId: string,
    priceId: string
  ): Promise<CreateSubscriptionResult> {
    const response = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    // Access the subscription data
    const subscription = response as unknown as {
      id: string;
      status: string;
      current_period_start: number;
      current_period_end: number;
      latest_invoice?: {
        payment_intent?: {
          client_secret?: string;
        };
      };
    };

    return {
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.stripe.subscriptions.cancel(subscriptionId);
  }

  async createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<CreateCheckoutSessionResult> {
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return {
      sessionId: session.id,
      url: session.url!,
    };
  }

  async createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<{ url: string }> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return {
      url: session.url,
    };
  }
}

// Export a factory function for easier testing
export function createStripePaymentProvider(): PaymentProviderPort {
  return new StripePaymentProvider();
}
