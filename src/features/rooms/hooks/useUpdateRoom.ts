import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "../../../api/roomsApi";
import { roomKeys } from "./useRooms";
import type { RoomPayload } from "../../../types/room";

export function useUpdateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: number; data: Partial<RoomPayload> }) =>
      updateRoom(params.id, params.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: roomKeys.all }),
  });
}