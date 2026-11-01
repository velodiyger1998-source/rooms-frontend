import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../../api/bookingsApi";
import { bookingKeys } from "./bookingKeys";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: bookingKeys.root }),
  });
}
