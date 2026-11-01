import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "../../../api/bookingsApi";
import { bookingKeys } from "./bookingKeys";

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookingKeys.root }),
  });
}