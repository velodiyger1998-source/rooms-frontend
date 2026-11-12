import { useState } from "react";
import { useRooms } from "../hooks/useRooms";
import { useDeactivateRoom } from "../hooks/useDeactivateRoom";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import Button from "../../../components/Button";
import RoomForm from "./RoomForm";
import styles from "./AdminRoomsList.module.css";

export default function AdminRoomsList() {
  const { data: rooms, isPending, error } = useRooms();
  const deactivate = useDeactivateRoom();
  const [editingId, setEditingId] = useState<number | null>(null);

  if (isPending) return <p>Загружаем комнаты...</p>;
  if (error) return <p className={styles.error}>{getErrorMessage(error)}</p>;
  if (!rooms || rooms.length === 0) return <p>Комнат пока нет.</p>;

  return (
    <div className={styles.list}>
      {deactivate.error && (
        <p className={styles.error}>{getErrorMessage(deactivate.error)}</p>
      )}
      {rooms.map((room) =>
        editingId === room.id ? (
          <RoomForm
            key={room.id}
            room={room}
            onDone={() => setEditingId(null)}
          />
        ) : (
          <div key={room.id} className={styles.row}>
            <div>
              <b>{room.name}</b>
              <div className={styles.meta}>
                Вместимость: {room.capacity}
                {room.description && ` · ${room.description}`}
              </div>
            </div>
            <div className={styles.actions}>
              <Button variant="secondary" onClick={() => setEditingId(room.id)}>
                Изменить
              </Button>
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
          </div>
        )
      )}
    </div>
  );
}
