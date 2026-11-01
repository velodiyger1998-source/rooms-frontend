import { useRooms } from "../hooks/useRooms";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import RoomCard from "./RoomCard";
import styles from "./RoomsList.module.css";

export default function RoomsList() {
  const { data: rooms, isPending, error } = useRooms();

  if (isPending) {
    return <p>Загружаем комнаты... Первый запрос может занять до минуты.</p>;
  }

  if (error) {
    return <p className={styles.error}>{getErrorMessage(error)}</p>;
  }

  if (!rooms || rooms.length === 0) {
    return <p>Комнат пока нет.</p>;
  }

  return (
    <div className={styles.grid}>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
