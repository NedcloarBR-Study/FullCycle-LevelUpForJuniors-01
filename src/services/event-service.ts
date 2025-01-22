import { EventModel } from "../models";

export class EventService {
  public async create(data: {
    name: string;
    description: string | null;
    date: Date;
    location: string;
    partner_id: number;
  }) {
    const { name, description, date, location, partner_id } = data;
    const event = await EventModel.create({
      name,
      description,
      date,
      location,
      partner_id,
    });
    return {
      id: event.id,
      name,
      description,
      date,
      location,
      created_at: event.created_at,
      partner_id,
    };
  }

  public async findAll(partner_id?: number) {
    return await EventModel.findAll({
      where: { partner_id },
    });
  }

  public async findById(event_id: number) {
    return await EventModel.findById(event_id);
  }
}
