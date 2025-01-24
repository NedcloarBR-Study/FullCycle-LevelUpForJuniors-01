import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Database } from "../database";

export enum ReservationStatus {
  reserved = "reserved",
  cancelled = "cancelled",
}

export class ReservationTicketModel {
  public id: number;
  public customer_id: number;
  public ticket_id: number;
  public reservation_date: Date;
  public status: ReservationStatus;

  public constructor(data: Partial<ReservationTicketModel> = {}) {
    this.fill(data);
  }

  public static async create(
    data: {
      customer_id: number;
      ticket_id: number;
      status: ReservationStatus;
    },
    options?: { connection?: PoolConnection }
  ): Promise<ReservationTicketModel> {
    const db = options?.connection ?? Database.getInstance();
    const reservation_date = new Date();
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO reservation_tickets (customer_id, ticket_id, status, reservation_date) VALUES (?, ?, ?, ?)",
      [data.customer_id, data.ticket_id, data.status, reservation_date]
    );
    const reservation = new ReservationTicketModel({
      ...data,
      reservation_date,
      id: result.insertId,
    });
    return reservation;
  }

  public static async findById(
    id: number
  ): Promise<ReservationTicketModel | null> {
    const db = Database.getInstance();
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM reservation_tickets WHERE id = ?",
      [id]
    );
    return rows.length
      ? new ReservationTicketModel(rows[0] as ReservationTicketModel)
      : null;
  }

  public static async findAll(): Promise<ReservationTicketModel[]> {
    const db = Database.getInstance();
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM reservation_tickets"
    );
    return rows.map(
      (row) => new ReservationTicketModel(row as ReservationTicketModel)
    );
  }

  public async update(options?: {
    connection?: PoolConnection;
  }): Promise<void> {
    const db = options?.connection ?? Database.getInstance();
    const [result] = await db.execute<ResultSetHeader>(
      "UPDATE reservation_tickets SET customer_id = ?, ticket_id = ?, status = ? WHERE id = ?",
      [this.customer_id, this.ticket_id, this.status, this.id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Reservation not found");
    }
  }

  public async delete(): Promise<void> {
    const db = Database.getInstance();
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM reservation_tickets WHERE id = ?",
      [this.id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Reservation not found");
    }
  }

  private fill(data: Partial<ReservationTicketModel>): void {
    if (data.id !== undefined) this.id = data.id;
    if (data.customer_id !== undefined) this.customer_id = data.customer_id;
    if (data.ticket_id !== undefined) this.ticket_id = data.ticket_id;
    if (data.reservation_date !== undefined)
      this.reservation_date = data.reservation_date;
    if (data.status !== undefined) this.status = data.status;
  }
}
