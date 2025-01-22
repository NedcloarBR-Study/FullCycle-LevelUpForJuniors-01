import { Router } from "express";
import { AuthService, InvalidCredentialsError } from "../services";

export const AuthRoutes = Router();

AuthRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const authService = new AuthService();
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
