import client from "./axiosClient";
import type { Booking, BookingPayload, BookingStatus } from "../types/booking";

export const createBooking = (data: BookingPayload): Promise<Booking> =>
  client.post<Booking>("/bookings", data).then((r) => r.data);

export const getMyBookings = (): Promise<Booking[]> =>
  client.get<Booking[]>("/bookings").then((r) => r.data);

export const getAllBookings = (): Promise<Booking[]> =>
  client.get<Booking[]>("/bookings/all").then((r) => r.data);

export const cancelBooking = (id: number): Promise<Booking> =>
  client.patch<Booking>(`/bookings/${id}/cancel`).then((r) => r.data);

export const updateBookingStatus = (params: {
  id: number;
  status: BookingStatus;
}): Promise<Booking> =>
  client
    .patch<Booking>(`/bookings/${params.id}/status`, { status: params.status })
    .then((r) => r.data);