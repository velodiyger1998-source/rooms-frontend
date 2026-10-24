export interface Room {
  id: number;
  name: string;
  description: string | null;
  capacity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoomPayload {
  name: string;
  description?: string;
  capacity: number;
}