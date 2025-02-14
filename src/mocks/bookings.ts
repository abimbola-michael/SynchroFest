import { Booking } from "../interfaces/booking";
import { convertDateToString } from "../utils/date_utils";
import { mockShows } from "./shows";

export const mockBookings: Booking[] = [
  {
    bookingId: "0",
    showId: "0",
    hosterId: "0",
    seatId: "0",
    seatNumber: 200,
    amount: 5000,
    userId: "myId",
    bookedDateTime: `${convertDateToString(new Date())}`,
    show: mockShows[0],
  },
];
