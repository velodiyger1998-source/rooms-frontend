import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../../api/bookingsApi";
import { bookingKeys } from "./bookingKeys";

export function useAllBookings() {
  return useQuery({
    queryKey: bookingKeys.admin,
    queryFn: getAllBookings,
    refetchInterval: 15000,
  });
}