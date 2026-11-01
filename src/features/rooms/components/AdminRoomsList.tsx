import { useRooms } from "../hooks/useRooms";
import { useDeactivateRoom } from "../hooks/useDeactivateRoom";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import Button from "../../../components/Button";
import styles from "./AdminRoomsList.module.css";

export default function AdminRoomsList() {
  const { data: rooms, isPending, error } = useRooms();
  const deactivate = useDeactivateRoom();

  if (isPending) return <p>Загружаем комнаты...</p>;
  if (error) return <p className={styles.error}>{getErrorMessage(error)}</p>;
  if (!rooms || rooms.length === 0) return <p>Комнат пока нет.</p>;

  return (
    <div className={styles.list}>
      {deactivate.error && (
        <p className={styles.error}>{getErrorMessage(deactivate.error)}</p>
      )}
      {rooms.map((room) => (
        <div key={room.id} className={styles.row}>
          <div>
            <b>{room.name}</b>
            <div className={styles.meta}>
              Вместимость: {room.capacity}
              {room.description && ` · ${room.description}`}
            </div>
          </div>
          <Button
            variant="danger"
            loading={deactivate.isPending && deactivate.variables === room.id}
            onClick={() => {
              if (window.confirm(`Скрыть комнату «${room.name}»?`)) {
                deactivate.mutate(room.id);
              }
            }}
          >
            Скрыть
          </Button>
        </div>
      ))}
    </div>
  );
}
