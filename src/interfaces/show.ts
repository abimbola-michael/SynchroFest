import { BookedSeat } from "./booked_seat";
import { User } from "./user";
import { Venue } from "./venue";

export interface Show {
  showId: string;
  userId: string;
  artistName: string;
  artistGenre: string;
  showTitle: string;
  showBanner: string;
  showVideoTeaser?: string;
  showBannerThumbnail?: string;
  showVideoTeaserThumbnail?: string;
  startDateTime: string;
  estEndDateTime?: string;
  endDateTime?: string;
  cancelDateTime?: string;
  bookingAmount: number;
  currency: string;
  bookedSeats: BookedSeat[];
  venue: Venue;
  user?: User;
}
