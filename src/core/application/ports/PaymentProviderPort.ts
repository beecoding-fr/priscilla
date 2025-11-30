export interface CreateCustomerResult {
  customerId: string;
}

export interface CreateSubscriptionResult {
  subscriptionId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  clientSecret?: string; // For SCA
}

export interface CreateCheckoutSessionResult {
  sessionId: string;
  url: string;
}

export interface PaymentProviderPort {
  createCustomer(email: string, name?: string): Promise<CreateCustomerResult>;

  createSubscription(
    customerId: string,
    priceId: string
  ): Promise<CreateSubscriptionResult>;

  cancelSubscription(subscriptionId: string): Promise<void>;

  createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<CreateCheckoutSessionResult>;

  createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<{ url: string }>;
}
