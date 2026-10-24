import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../api/roomsApi";

export const roomKeys = {
  all: ["rooms"] as const,
};

export function useRooms() {
  return useQuery({
    queryKey: roomKeys.all,
    queryFn: getRooms,
  });
}