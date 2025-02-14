import React, { useEffect, useState } from "react";
import { Show } from "../interfaces/show";
import ShowPicturesOrVideosView from "../components/ShowPicturesOrVideosView";
import ProfilePhoto from "../components/ProfilePhoto";
import { getShowStatus } from "../utils/show_utils";
import { ShowStatus } from "../enums/show_status";
import CountdownTimer from "../components/CountdownTimer";
import PopupMenu from "../components/PopupMenu";

export default function ShowItem({ show }: { show: Show }) {
  const [showStatus, setShowStatus] = useState<ShowStatus>();
  useEffect(() => {
    const showStatus = getShowStatus(show);

    setShowStatus(showStatus);
  }, [show]);
  const menuOptions = ["Save"];
  function handleOption(option: string) {}
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="w-full flex flex-row items-center px-3 py-2">
        <ProfilePhoto url={show.user?.profilePhoto ?? ""} />
        <h3 className="flex-1 text-md">{show.user?.artistName ?? ""}</h3>
        <PopupMenu options={menuOptions} onSelectOption={handleOption} />
      </div>
      <ShowPicturesOrVideosView
        venuePicturesOrVideos={show.venuePicturesOrVideos}
      />

      <div className="flex flex-col">
        <p className="text-lg font-bold">{show.venue}</p>
        <p className="text-lg">{show.venueAddress}</p>

        <div className="text-xl flex items-center">
          <span>{show.currency}</span>{" "}
          <span className="text-primary">{show.bookingAmount}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>{show.seatsCapacity} capacity</span>
          <span>100 left</span>
        </div>
        <div>
          <span>
            {showStatus == ShowStatus.upcoming ? "Starting" : "Started"}{" "}
            {show.startDateTime}
          </span>
          <span>
            {show.endDateTime
              ? `Ended ${show.startDateTime}`
              : show.estEndDateTime
              ? `Ending ${show.estEndDateTime}`
              : ""}
          </span>
        </div>
        <div
          className="flex items-center rounded-sm py-1 px-2"
          style={{
            color:
              showStatus == ShowStatus.live
                ? "red"
                : showStatus == ShowStatus.completed
                ? "green"
                : "#cacaca",
          }}
        >
          {showStatus == ShowStatus.live
            ? "Live"
            : showStatus == ShowStatus.completed
            ? "Ended"
            : "Starts in "}
          {showStatus == ShowStatus.upcoming && (
            <CountdownTimer
              dateTime={show.startDateTime}
              onCompletedCountdown={() => setShowStatus(ShowStatus.live)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
