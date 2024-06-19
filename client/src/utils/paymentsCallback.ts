import { CANCELLED_PAYMENT_URL, COMPLETE_PAYMENT_URL, INCOMPLETE_PAYMENT_URL } from "../constants/url.constants";
import { fetchWithCredentials } from "../hooks/useApi";
import { PaymentDTO } from "../types/payment";

export const onIncompletePaymentFound = async (payment: PaymentDTO) => {
  console.log('onIncompletePaymentFound', payment);
  return await fetchWithCredentials(INCOMPLETE_PAYMENT_URL, {
    method: 'POST',
    data: { payment },
  });
};

export const onReadyForServerCompletion = async (paymentId: string, txid: string) => {
  console.log('onReadyForServerCompletion', paymentId, txid);
  return await fetchWithCredentials(COMPLETE_PAYMENT_URL, {
    method: 'POST',
    data: { paymentId, txid },
  });
};

export const onCancel = async (paymentId: string) => {
  console.log('onCancel', paymentId);
  return await fetchWithCredentials(CANCELLED_PAYMENT_URL, {
    method: 'POST',
    data: { paymentId },
  });
};

export const onError = (error: Error, payment?: PaymentDTO) => {
  console.log('onError', error.stack);
  console.log('onError', error.message);
  if (payment) {
    console.log(payment);
    // handle the error accordingly
  }
};
