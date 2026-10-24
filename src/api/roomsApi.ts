import client from "./axiosClient";
import type { Room, RoomPayload } from "../types/room";

export const getRooms = (): Promise<Room[]> =>
  client.get<Room[]>("/rooms").then((r) => r.data);

export const createRoom = (data: RoomPayload): Promise<Room> =>
  client.post<Room>("/rooms", data).then((r) => r.data);

export const updateRoom = (id: number, data: RoomPayload): Promise<Room> =>
  client.put<Room>(`/rooms/${id}`, data).then((r) => r.data);

export const deactivateRoom = (id: number): Promise<Room> =>
  client.patch<Room>(`/rooms/${id}/deactivate`).then((r) => r.data);