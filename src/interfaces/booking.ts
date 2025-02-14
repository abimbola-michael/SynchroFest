import { Show } from "./show";

export interface Booking {
  bookingId: string;
  showId: string;
  hosterId: string;
  seatId: string;
  seatNumber: number;
  amount: number;
  userId: string;
  bookedDateTime: string;
  show?: Show;
}
