import type { BookingStatus } from "../../types/booking";
import { BOOKING_STATUS_LABELS } from "../../constants/bookingStatus";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {BOOKING_STATUS_LABELS[status]}
    </span>
  );
}

