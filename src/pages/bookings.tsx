import Header from "../components/Header";
import BookingsView from "../views/BookingsView";

export default function SavedShows() {
  return (
    <div className="w-full h-screen flex flex-col bg-black text-white px-[20px] relative overflow-hidden">
      <Header>Bookings</Header>
      <div className="flex-1 w-full text-white pb-[100px] overflow-auto">
        <BookingsView />
      </div>
    </div>
  );
}
