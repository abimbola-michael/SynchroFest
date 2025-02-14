import  { useEffect, useState } from "react";
import { Show } from "../interfaces/show";
import ProfilePhoto from "../components/ProfilePhoto";
import { getShowStatus } from "../utils/show_utils";
import { ShowStatus } from "../enums/show_status";
import CountdownTimer from "../components/CountdownTimer";
// import ShowPicturesOrVideosSlideShowView from "../components/ShowPicturesOrVideosSlideShowView";
import PopupMenu from "../components/PopupMenu";
import { getImgPath } from "../utils/img_util";
import { addShow } from "../slices/savedShowsSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function GridShowItem({ show }: { show: Show }) {
  const dispatch = useDispatch();
  const [showStatus, setShowStatus] = useState<ShowStatus>();
  useEffect(() => {
    const showStatus = getShowStatus(show);

    setShowStatus(showStatus);
  }, [show]);

  const menuOptions = ["Save"];
  function handleOption(option: string) {
    if (option == "Save") {
      dispatch(addShow(show));
      toast(`${show.artistName} ${show.showTitle} show saved Sucessfully`, {
        type: "success",
      });
    }
  }
  return (
    <div className="w-full p-1 flex flex-col gap-2 items-start">
      <div className="w-full flex gap-2 items-center py-2">
        <ProfilePhoto url={show.user?.profilePhoto ?? ""} />
        <h3 className="flex-1 text-md">{show.user?.name ?? ""}</h3>
        <PopupMenu options={menuOptions} onSelectOption={handleOption} />
      </div>
      <div className="relative w-full">
        <div className="relative aspect-video rounded-lg overflow-clip">
          <img
            src={show.showBanner || getImgPath("car.jpg")}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute left-1 bottom-1 flex gap-1 items-center rounded-md py-[1px] px-2 text-sm"
          style={{
            backgroundColor:
              showStatus == ShowStatus.live
                ? "red"
                : showStatus == ShowStatus.completed
                ? "green"
                : "purple",
          }}
        >
          {showStatus == ShowStatus.live
            ? "Live"
            : showStatus == ShowStatus.completed
            ? "Ended"
            : "Starts in"}
          {showStatus == ShowStatus.upcoming && (
            <CountdownTimer
              dateTime={show.startDateTime}
              onCompletedCountdown={() => setShowStatus(ShowStatus.live)}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <div className="text-md flex gap-1 items-center text-primary">
          <span className="font-bold">{show.artistName}</span>
          <span className="">{show.showTitle}</span>
        </div>

        <div className="text-lg font-bold flex gap-1 items-center text-primary">
          <span>{show.currency}</span>
          <span className="text-primary">{show.bookingAmount}</span>
        </div>
        <div className="flex gap-2 items-center text-xs text-stone-400">
          <span>{show.venue.seatsCapacity} capacity</span>
          <span
            className={`${
              show.venue.seatsCapacity - show.bookedSeats.length === 0
                ? "text-red-500"
                : ""
            }`}
          >
            {show.venue.seatsCapacity - show.bookedSeats.length === 0
              ? "Sold Out"
              : `${
                  show.venue.seatsCapacity - show.bookedSeats.length
                } left`}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
