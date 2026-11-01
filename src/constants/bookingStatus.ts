import type { BookingStatus } from "../types/booking";

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Ожидает подтверждения",
  CONFIRMED: "Подтверждено",
  CANCELLED: "Отменено",
  COMPLETED: "Завершено",
};