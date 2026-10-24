export type BookingStatus = 'pending' | 'approved';

export interface Booking {
  id: number;
  roomId: number;
  userId: number;
  date: string;
  timeFrom: string;
  timeTo: string;
  status: BookingStatus;
}

export type BookingPayload = Pick<Booking, 'roomId' | 'date' | 'timeFrom' | 'timeTo'>;