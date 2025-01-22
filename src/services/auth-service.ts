import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";

export class AuthService {
  public async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return jwt.sign({ id: user.id, email: user.email }, "123456", {
        expiresIn: "1h",
      });
    } else {
      throw new InvalidCredentialsError();
    }
  }
}

export class InvalidCredentialsError extends Error {}
