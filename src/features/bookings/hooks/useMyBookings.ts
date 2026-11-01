import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../../api/bookingsApi";
import { bookingKeys } from "./bookingKeys";

export function useMyBookings() {
  return useQuery({ queryKey: bookingKeys.mine, queryFn: getMyBookings });
}