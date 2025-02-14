import { useAppSelector } from "../selectors/useAppSelector";
import DialogMenu from "../components/DialogMenu";
import BookingItem from "../listitems/BookingItem";
import DisplayOrBookShowView from "./DisplayOrBookShowView";

export default function BookingsView() {
  const bookings = useAppSelector((state) => state.bookings.value);

  const searchText = useAppSelector((state) => state.search.value);

  function getSearchedShowBookings() {
    if (searchText) {
      return bookings.filter(
        (booking) =>
          booking.show &&
          (booking.show.showTitle
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
            booking.show.artistName
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            booking.show.artistGenre
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            booking.show.venue.venueName
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            booking.show.venue.venueAddress
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            booking.show.startDateTime
              .toLowerCase()
              .includes(searchText.toLowerCase()))
      );
    }
    return bookings;
  }
  if (bookings.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No bookings
      </div>
    );
  }
  return (
    <ul className={`flex flex-col items-center`}>
      {(searchText.length > 0 ? getSearchedShowBookings() : bookings).map(
        (booking, index) => (
          <DialogMenu
            key={index}
            className="w-full"
            title="Booked Show"
            fullScreen
            child={<BookingItem key={index} booking={booking} />}
          >
            {(onClose) =>
              booking.show ? (
                <DisplayOrBookShowView
                  key={index}
                  show={booking.show}
                  onClose={onClose}
                />
              ) : (
                <div>No show</div>
              )
            }
          </DialogMenu>
        )
      )}
    </ul>
  );
}
