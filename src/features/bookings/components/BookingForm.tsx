import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBooking } from "../hooks/useCreateBooking";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  roomId: number;
  onCancel: () => void;
}

export default function BookingForm({ roomId, onCancel }: BookingFormProps) {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateBooking();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLocalError("");

    if (new Date(end) <= new Date(start)) {
      setLocalError("Конец брони должен быть позже начала");
      return;
    }

    mutate(
      {
        roomId,
        startAt: new Date(start).toISOString(),
        endAt: new Date(end).toISOString(),
      },
      { onSuccess: () => navigate("/my-bookings") }
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Начало"
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />
      <Input
        label="Конец"
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />
      {(localError || error) && (
        <p className={styles.error}>{localError || getErrorMessage(error)}</p>
      )}
      <div className={styles.actions}>
        <Button type="submit" loading={isPending}>
          Отправить заявку
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
}