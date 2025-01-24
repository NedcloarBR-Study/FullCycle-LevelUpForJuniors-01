export class PaymentService {
  public async processPayment(
    customer: {
      name: string;
      email: string;
      address: string;
      phone: string;
    },
    amount: number,
    cardToken: string
  ): Promise<number> {
    return Math.random();
  }
}
