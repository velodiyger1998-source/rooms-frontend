import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "../../api/roomsApi";
import { roomKeys } from "./useRooms";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}