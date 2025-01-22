import { Database } from "../database";
import { PartnerModel, UserModel } from "../models";

export class PartnerService {
  public async register(data: {
    name: string;
    email: string;
    password: string;
    company_name: string;
  }) {
    const { name, email, password, company_name } = data;

    const connection = await Database.getInstance().getConnection();
    try {
      await connection.beginTransaction();
      const user = await UserModel.create(
        { name, email, password },
        { connection }
      );
      const partner = await PartnerModel.create(
        {
          company_name,
          user_id: user.id,
        },
        { connection }
      );
      await connection.commit();
      return {
        id: partner.id,
        name,
        user_id: user.id,
        company_name,
        created_at: partner.created_at,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }

  public async findByUserId(user_id: number) {
    return await PartnerModel.findByUserId(user_id);
  }
}
