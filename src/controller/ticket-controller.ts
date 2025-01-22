import { Router } from "express";
import { PartnerService, TicketService } from "../services";

export const TicketRoutes = Router();

TicketRoutes.post("/:eventId/tickets", async (req, res) => {
  const userId = req.user!.id;
  const partnerService = new PartnerService();
  const partner = await partnerService.findByUserId(userId);

  if (!partner) {
    res.status(403).json({ message: "Not authorized" });
    return;
  }

  const { num_tickets, price } = req.body;
  const { eventId } = req.params;
  const ticketService = new TicketService();
  await ticketService.createMany({
    eventId: +eventId,
    numTickets: num_tickets,
    price,
  });
  res.status(204).send();
});

TicketRoutes.get("/:eventId/tickets", (req, res) => {});

TicketRoutes.get("/:eventId/tickets/:ticketId", (req, res) => {});
