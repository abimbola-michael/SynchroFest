/* eslint-disable @typescript-eslint/no-unused-vars */
import { Booking } from "../interfaces/booking";
import ShowReceiptItem from "../components/ShowReceiptItem";
import { Button } from "@mui/material";

export default function ReceiptView({
  booking,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  if (!booking.show) {
    return <></>;
  }
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center">
      <div className="flex-1 w-[320px] px-5 py-3 bg-stone-900 rounded-lg overflow-clip flex flex-col items-center">
        <h2 className="text-lg font-bold">Syncrofest</h2>
        <h2 className="text-md font-semibold mb-3">
          {booking.show.user?.name}
        </h2>
        <div className="w-full flex-1 flex flex-col gap-2 text-md">
          <ShowReceiptItem title="Artist" value={booking.show.artistName} />
          <ShowReceiptItem title="Show Title" value={booking.show.showTitle} />

          <ShowReceiptItem title="Genre" value={booking.show.artistGenre} />
          <ShowReceiptItem title="Venue" value={booking.show.venue.venueName} />

          <ShowReceiptItem
            title="Amount"
            value={`${booking.show.currency} ${booking.amount}`}
            bold
          />
          <ShowReceiptItem
            title="Booked Seat"
            value={`${booking.seatNumber}`}
          />
          <ShowReceiptItem title="Booked Time" value={booking.bookedDateTime} />

          {/* <ShowReceiptItem
          title="Venue Adress"
          value={booking.show.venue.venueAddress}
        /> */}
          <ShowReceiptItem
            title="Show time"
            value={booking.show.startDateTime}
          />
        </div>
        <p className="text-xs">Thanks for patronizing Syncrofest</p>
      </div>
      <div className="flex items-center gap-2">
        <Button className="flex-1" variant="outlined">
          Print
        </Button>
        <Button className="flex-1" variant="outlined">
          Download
        </Button>
        <Button className="flex-1" variant="outlined">
          Share
        </Button>
      </div>
    </div>
  );
}
