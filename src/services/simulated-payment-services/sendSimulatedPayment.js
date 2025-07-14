import axios from "axios";

export const sendSimulatedPayment = async (paymentPayload) => {
  return await axios.post("/api/payment", {
    paymentPayload,
  });
}
