import { Router } from "express";
import { EventService } from "../services";

export const EventRoutes = Router();

EventRoutes.get("/", async (req, res) => {
  const eventService = new EventService();
  const result = await eventService.findAll();
  res.json(result);
});

EventRoutes.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const eventService = new EventService();
  const result = await eventService.findById(+eventId);
  if (!result) {
    res.status(404).json({ message: "Event not found" });
  }

  res.json(result);
});
