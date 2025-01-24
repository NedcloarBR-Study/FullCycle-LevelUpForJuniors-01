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

TicketRoutes.get("/:eventId/tickets", async (req, res) => {
  const { eventId } = req.params;
  const ticketService = new TicketService();
  const data = await ticketService.findByEventId(+eventId);
  res.json(data);
});

TicketRoutes.get("/:eventId/tickets/:ticketId", async (req, res) => {
  const { eventId, ticketId } = req.params;
  const ticketService = new TicketService();
  const ticket = await ticketService.findById(+eventId, +ticketId);

  if (!ticket) {
    res.status(404).json({ message: "Ticket not found" });
    return;
  }

  res.json(ticket);
});
