import { UserModel } from "../models";

export class UserService {
  public async findById(user_id: number) {
    return await UserModel.findById(user_id);
  }

  public async findByEmail(email: string) {
    return await UserModel.findByEmail(email);
  }
}
