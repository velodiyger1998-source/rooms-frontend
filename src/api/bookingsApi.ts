import client from "./axiosClient";
import type { Booking, BookingPayload } from "../types/booking";

export const getBookings = (): Promise<Booking[]> =>
  client.get<Booking[]>("/bookings").then((r) => r.data);

export const createBooking = (data: BookingPayload): Promise<Booking> =>
  client.post<Booking>("/bookings", data).then((r) => r.data);

export const approveBooking = (id: number): Promise<Booking> =>
  client.patch<Booking>(`/bookings/${id}/approve`).then((r) => r.data);

export const deleteBooking = (id: number): Promise<void> =>
  client.delete(`/bookings/${id}`).then(() => undefined);