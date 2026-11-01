export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  startAt: string;
  endAt: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  user?: { id: number; email: string };
  room?: { id: number; name: string };
}

export interface BookingPayload {
  roomId: number;
  startAt: string;
  endAt: string;
}