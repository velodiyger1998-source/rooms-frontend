import { useState, type SyntheticEvent } from "react";
import { useCreateRoom } from "../hooks/useCreateRoom";
import { useUpdateRoom } from "../hooks/useUpdateRoom";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import type { Room } from "../../../types/room";
import styles from "./RoomForm.module.css";

interface RoomFormProps {
  room?: Room;
  onDone?: () => void;
}

export default function RoomForm({ room, onDone }: RoomFormProps) {
  const create = useCreateRoom();
  const update = useUpdateRoom();

  const [name, setName] = useState(room?.name ?? "");
  const [description, setDescription] = useState(room?.description ?? "");
  const [capacity, setCapacity] = useState(room ? String(room.capacity) : "");

  const isPending = create.isPending || update.isPending;
  const error = create.error ?? update.error;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      name,
      description: description || undefined,
      capacity: Number(capacity),
    };

    if (room) {
      update.mutate({ id: room.id, data }, { onSuccess: () => onDone?.() });
    } else {
      create.mutate(data, {
        onSuccess: () => {
          setName("");
          setDescription("");
          setCapacity("");
        },
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        minLength={2}
        required
      />
      <Input
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        label="Вместимость"
        type="number"
        min={1}
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />
      <Button type="submit" loading={isPending}>
        {room ? "Сохранить" : "Создать"}
      </Button>
      {room && (
        <Button type="button" variant="secondary" onClick={onDone}>
          Отмена
        </Button>
      )}
      {error && <p className={styles.error}>{getErrorMessage(error)}</p>}
    </form>
  );
}