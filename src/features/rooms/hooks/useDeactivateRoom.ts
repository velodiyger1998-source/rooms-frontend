import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateRoom } from "../../../api/roomsApi";
import { roomKeys } from "./useRooms";

export function useDeactivateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}