import { SeatFormation } from "./seat_formation";

export interface Venue {
  venueName: string;
  venueAddress: string;
  venueThumbnails: Array<string>;
  venuePicturesOrVideos: Array<string>;
  seatsCapacity: number;
  seatFormations: Array<Array<SeatFormation>>;
}
