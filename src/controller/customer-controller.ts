import { Router } from "express";
import { CustomerService } from "../services";

export const CustomerRoutes = Router();

CustomerRoutes.post("/register", async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  const customerService = new CustomerService();
  const result = await customerService.register({
    name,
    email,
    password,
    address,
    phone,
  });
  res.status(201).json(result);
});
