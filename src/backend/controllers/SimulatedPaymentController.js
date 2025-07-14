import { Response } from 'miragejs';
/**
 * This handler handles send simulated payment.
 * send POST Request at /api/payment
 * body contains {email, password}
 * */

export const sendSimulatedPayment = function (schema, request) {
    const {
        paymentPayload: { from, to, amount, status }
    } = JSON.parse(request.requestBody);
    try {
        if (!from) {
            return new Response(
                400,
                {},
                {
                    errors: [
                        'Invalid from address',
                    ],
                }
            );
        }
        if (!to) {
            return new Response(
                400,
                {},
                {
                    errors: [
                        'Invalid to address',
                    ],
                }
            );
        }
        if (!amount) {
            return new Response(
                400,
                {},
                {
                    errors: [
                        'Invalid amount',
                    ],
                }
            );
        }
        if(status && status === 'success') {
            console.log("Payment received:", request.requestBody);
            return new Response(200, {}, { data: JSON.parse(request.requestBody) });
        }
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};
