import { useAllBookings } from "../hooks/useAllBookings";
import { useUpdateBookingStatus } from "../hooks/useUpdateBookingStatus";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { formatDateTime } from "../../../utils/formatDateTime";
import StatusBadge from "../../../components/StatusBadge";
import Button from "../../../components/Button";
import type { BookingStatus } from "../../../types/booking";
import styles from "./AdminBookingsList.module.css";

interface Action {
  label: string;
  status: BookingStatus;
  variant: "primary" | "secondary" | "danger";
}

const ACTIONS: Partial<Record<BookingStatus, Action[]>> = {
  PENDING: [
    { label: "Подтвердить", status: "CONFIRMED", variant: "primary" },
    { label: "Отклонить", status: "CANCELLED", variant: "danger" },
  ],
  CONFIRMED: [
    { label: "Завершить", status: "COMPLETED", variant: "secondary" },
    { label: "Отменить", status: "CANCELLED", variant: "danger" },
  ],
};

export default function AdminBookingsList() {
  const { data: bookings, isPending, error } = useAllBookings();
  const update = useUpdateBookingStatus();

  if (isPending) return <p>Загружаем заявки...</p>;
  if (error) return <p className={styles.error}>{getErrorMessage(error)}</p>;
  if (!bookings || bookings.length === 0) return <p>Заявок пока нет.</p>;

  return (
    <div className={styles.list}>
      {update.error && (
        <p className={styles.error}>{getErrorMessage(update.error)}</p>
      )}
      {bookings.map((booking) => (
        <div key={booking.id} className={styles.row}>
          <div>
            <b>{booking.room?.name ?? `Комната №${booking.roomId}`}</b>
            <div className={styles.meta}>
              {booking.user?.email ?? `Пользователь №${booking.userId}`}
            </div>
            <div className={styles.meta}>
              {formatDateTime(booking.startAt)} —{" "}
              {formatDateTime(booking.endAt)}
            </div>
          </div>
          <div className={styles.actions}>
            <StatusBadge status={booking.status} />
            {ACTIONS[booking.status]?.map((action) => (
              <Button
                key={action.status}
                variant={action.variant}
                loading={
                  update.isPending && update.variables?.id === booking.id
                }
                onClick={() =>
                  update.mutate({ id: booking.id, status: action.status })
                }
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
