import { useState, type SyntheticEvent } from "react";
import { useCreateRoom } from "../hooks/useCreateRoom";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import styles from "./RoomForm.module.css";

export default function RoomForm() {
  const { mutate, isPending, error } = useCreateRoom();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate(
      {
        name,
        description: description || undefined,
        capacity: Number(capacity),
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setCapacity("");
        },
      }
    );
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
        Создать
      </Button>
      {error && <p className={styles.error}>{getErrorMessage(error)}</p>}
    </form>
  );
}