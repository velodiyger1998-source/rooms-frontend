import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "../../../api/bookingsApi";
import { bookingKeys } from "./bookingKeys";

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookingKeys.root }),
  });
}