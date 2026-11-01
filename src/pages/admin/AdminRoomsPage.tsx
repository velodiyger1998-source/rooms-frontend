import RoomForm from "../../features/rooms/components/RoomForm";
import AdminRoomsList from "../../features/rooms/components/AdminRoomsList";

export default function AdminRoomsPage() {
  return (
    <>
      <h1>Комнаты</h1>
      <RoomForm />
      <AdminRoomsList />
    </>
  );
}