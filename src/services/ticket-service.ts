import { EventModel, TicketModel, TicketStatus } from "../models";

export class TicketService {
  public async createMany(data: {
    eventId: number;
    numTickets: number;
    price: number;
  }) {
    const event = await EventModel.findById(data.eventId);

    if (!event) {
      throw new Error("Event not Found");
    }

    const ticketsData = Array(data.numTickets)
      .fill({})
      .map((_, index) => ({
        location: `Location ${index}`,
        event_id: event.id,
        price: data.price,
        status: TicketStatus.available,
      }));

    await TicketModel.createMany(ticketsData);
  }

  public async findByEventId(eventId: number) {
    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new Error("Event not Found");
    }

    return TicketModel.findAll({ where: { event_id: eventId } });
  }

  public async findById(eventId: number, ticketId: number) {
    const ticket = await TicketModel.findById(ticketId);
    return ticket && ticket.event_id === eventId ? ticket : null;
  }
}
