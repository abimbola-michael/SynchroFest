import { Show } from "../interfaces/show";
import { convertDateToString } from "../utils/date_utils";

export const mockShows: Show[] = [
  {
    showId: "0",
    userId: "0",
    artistName: "Wizkid",
    artistGenre: "Afrobeat",
    showTitle: "Made in Lagos",
    showBanner: "",
    startDateTime: `${convertDateToString(new Date())}`,
    estEndDateTime: `${convertDateToString(new Date())}`,
    bookingAmount: 5000,
    currency: "NGN",
    bookedSeats: [],
    venue: {
      venueName: "O2 Arena",
      venueAddress: "Block 20, USA",
      venueThumbnails: [],
      venuePicturesOrVideos: [],
      seatsCapacity: 1000,
      seatFormations: [
        [{ seats: 0, rows: 10 }],
        [
          { seats: 50, rows: 10 },
          { seats: 20, rows: 5 },
        ],
        [
          { seats: 40, rows: 10 },
          { seats: 200, rows: 50 },
        ],
      ],
    },
    user: {
      userId: "0",
      email: "abimbolamichael100@gmail.com",
      phone: "07038916545",
      username: "o2arena",
      name: "02 Arena",
      profilePhoto: "",
    },
  },
];
