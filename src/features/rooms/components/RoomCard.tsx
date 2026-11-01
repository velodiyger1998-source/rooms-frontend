import { useState } from "react";
import type { Room } from "../../../types/room";
import Button from "../../../components/Button";
import BookingForm from "../../bookings/components/BookingForm";
import styles from "./RoomCard.module.css";

export default function RoomCard({ room }: { room: Room }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{room.name}</h3>
      <p className={styles.meta}>Вместимость: {room.capacity}</p>
      {room.description && <p>{room.description}</p>}

      {open ? (
        <BookingForm roomId={room.id} onCancel={() => setOpen(false)} />
      ) : (
        <Button onClick={() => setOpen(true)}>Забронировать</Button>
      )}
    </div>
  );
}