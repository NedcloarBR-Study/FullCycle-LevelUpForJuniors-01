import { Database } from "../database";
import { CustomerModel, UserModel } from "../models";

export class CustomerService {
  public async register(data: {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
  }) {
    const { name, email, password, address, phone } = data;

    const connection = await Database.getInstance().getConnection();
    try {
      await connection.beginTransaction();
      const user = await UserModel.create(
        {
          name,
          email,
          password,
        },
        { connection }
      );
      const customer = await CustomerModel.create(
        {
          user_id: user.id,
          address,
          phone,
        },
        { connection }
      );
      await connection.commit();
      return {
        id: customer.id,
        name,
        user_id: user.id,
        address,
        phone,
        created_at: customer.created_at,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.release();
    }
  }

  public async findByUserId(userId: number): Promise<CustomerModel | null> {
    return CustomerModel.findByUserId(userId, { user: true });
  }
}
