import { useMyBookings } from "../hooks/useMyBookings";
import { useCancelBooking } from "../hooks/useCancelBooking";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { formatDateTime } from "../../../utils/formatDateTime";
import StatusBadge from "../../../components/StatusBadge";
import Button from "../../../components/Button";
import styles from "./MyBookingsList.module.css";

export default function MyBookingsList() {
  const { data: bookings, isPending, error } = useMyBookings();
  const cancel = useCancelBooking();

  if (isPending) return <p>Загружаем заявки...</p>;
  if (error) return <p className={styles.error}>{getErrorMessage(error)}</p>;
  if (!bookings || bookings.length === 0) return <p>У вас пока нет заявок.</p>;

  return (
    <div className={styles.list}>
      {cancel.error && (
        <p className={styles.error}>{getErrorMessage(cancel.error)}</p>
      )}
      {bookings.map((booking) => (
        <div key={booking.id} className={styles.row}>
          <div>
            <b>{booking.room?.name ?? `Комната №${booking.roomId}`}</b>
            <div className={styles.meta}>
              {formatDateTime(booking.startAt)} —{" "}
              {formatDateTime(booking.endAt)}
            </div>
          </div>
          <div className={styles.actions}>
            <StatusBadge status={booking.status} />
            {(booking.status === "PENDING" ||
              booking.status === "CONFIRMED") && (
              <Button
                variant="secondary"
                loading={cancel.isPending && cancel.variables === booking.id}
                onClick={() => {
                  if (window.confirm("Отменить бронь?"))
                    cancel.mutate(booking.id);
                }}
              >
                Отменить
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
