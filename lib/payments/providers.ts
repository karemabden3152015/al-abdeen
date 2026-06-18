export type PaymentProviderKey = "cash_on_delivery" | "manual_confirmation" | "paymob" | "fawry" | "stripe" | "visa" | "mastercard";

export type PaymentIntentInput = {
  orderNumber: string;
  amountEGP: number;
  customerEmail?: string;
};

export type PaymentIntentResult = {
  provider: PaymentProviderKey;
  status: "PENDING" | "AUTHORIZED" | "PAID" | "FAILED";
  transactionId: string;
  redirectUrl?: string;
};

export interface PaymentProviderAdapter {
  key: PaymentProviderKey;
  enabled: boolean;
  createIntent(input: PaymentIntentInput): Promise<PaymentIntentResult>;
  refund(transactionId: string, amountEGP: number): Promise<{ status: "PENDING" | "REFUNDED"; refundId: string; amountEGP: number }>;
}

function disabledGateway(key: PaymentProviderKey): PaymentProviderAdapter {
  return {
    key,
    enabled: false,
    async createIntent(input) {
      return {
        provider: key,
        status: "PENDING",
        transactionId: `${key.toUpperCase()}-${input.orderNumber}`
      };
    },
    async refund(transactionId, amountEGP) {
      return {
        status: "PENDING",
        refundId: `REF-${transactionId}`,
        amountEGP
      };
    }
  };
}

export const paymentProviders: Record<PaymentProviderKey, PaymentProviderAdapter> = {
  cash_on_delivery: {
    ...disabledGateway("cash_on_delivery"),
    enabled: true
  },
  manual_confirmation: {
    ...disabledGateway("manual_confirmation"),
    enabled: true
  },
  paymob: disabledGateway("paymob"),
  fawry: disabledGateway("fawry"),
  stripe: disabledGateway("stripe"),
  visa: disabledGateway("visa"),
  mastercard: disabledGateway("mastercard")
};
