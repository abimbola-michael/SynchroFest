import React, { useEffect, useState } from "react";
import { Show } from "../interfaces/show";

import { Button, Tab, Tabs } from "@mui/material";
import SeatsFormationView from "./SeatsFormationView";
import PopupMenu from "../components/PopupMenu";
import FloatingActionButton from "../components/FloatingActionButton";
import AppButton from "../components/AppButton";
import ProfilePhoto from "../components/ProfilePhoto";
import { getShowStatus } from "../utils/show_utils";
import { ShowStatus } from "../enums/show_status";
import CountdownTimer from "../components/CountdownTimer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../slices/bookingsSlice";
import { Booking } from "../interfaces/booking";
import { toast } from "react-toastify";
import { convertDateToString } from "../utils/date_utils";
import { getRandomString } from "../utils/string_util";
import { addShow } from "../slices/savedShowsSlice";
import { BookedSeat } from "../interfaces/booked_seat";
import { useAppSelector } from "../selectors/useAppSelector";
import { updateShow as updateSceduledShow } from "../slices/sceduledShowsSlice";
import { updateShow as updateUpcomingShow } from "../slices/upcomingShows";
import { updateShow as updateLiveShow } from "../slices/liveShowsSlice";

export default function DisplayOrBookShowView({
  show,
  onClose,
}: {
  show: Show;
  onClose: () => void;
}) {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState<number>(0);
  const [selectedSeat, setSelectedSeat] = useState<
    { seatId: string; seatNumber: number } | undefined
  >();

  useEffect(() => {
    return () => {};
  }, []);

  const [showStatus, setShowStatus] = useState<ShowStatus>();
  useEffect(() => {
    const showStatus = getShowStatus(show);

    setShowStatus(showStatus);
  }, [show]);

  function updateTab(_: React.SyntheticEvent, tab: number) {
    setTab(tab);
  }

  function bookSeat() {
    if (!selectedSeat) {
      toast("You haven't selected a seat yet", { type: "error" });
      return;
    }
    const bookedSeat: BookedSeat = {
      seatId: selectedSeat.seatId,
      userId: user?.userId ?? "",
    };
    const newBookedSeats = [...show.bookedSeats, bookedSeat];
    const newShow = { ...show, bookedSeats: newBookedSeats };

    dispatch(updateSceduledShow(newShow));
    if (getShowStatus(show) === ShowStatus.upcoming) {
      dispatch(updateUpcomingShow(newShow));
    } else if (getShowStatus(show) === ShowStatus.live) {
      dispatch(updateLiveShow(newShow));
    }

    const booking: Booking = {
      bookingId: getRandomString(),
      showId: show.showId,
      hosterId: show.userId,
      seatId: selectedSeat.seatId,
      seatNumber: selectedSeat.seatNumber,
      amount: show.bookingAmount,
      userId: user?.userId ?? "",
      bookedDateTime: convertDateToString(new Date()),
      show: newShow,
    };
    dispatch(addBooking(booking));
    toast(
      `You have booked seat number ${selectedSeat.seatNumber} successfully`,
      { type: "success" }
    );
    onClose();
    navigate("/bookings");
  }

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
    <div className="h-full flex flex-col md:flex-row gap-4 md:overflow-y-hidden">
      <div className="md:h-full md:pb-[100px] md:flex-1 flex flex-col items-start md:overflow-y-auto ">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Tabs
              value={tab}
              onChange={updateTab}
              aria-label="Tabs"
              className="text-primary bg-primary"
            >
              <Tab label="Banner" />
              <Tab label="Teaser" />
            </Tabs>
          </div>
          {/* <IoAdd
            className="text-xl"
            onClick={() => {
              setFileInputType(tab == 0 ? "banner" : "teaser");
              handleFilePickerClick();
            }}
          /> */}
        </div>
        <div className="w-full relative min-h-[300px] bg-stone-900 rounded-lg overflow-clip">
          {tab === 0 && show.showBanner.length > 0 && (
            <img src={show.showBanner} className="w-full h-full object-cover" />
          )}
          {tab === 1 && (show.showVideoTeaser ?? "").length > 0 && (
            <video
              src={show.showVideoTeaser}
              className="w-full h-full"
              controls
              onLoadedData={(_) => {}}
            />
          )}
          {/* {((tab == 0 && show.showBanner.length > 0) ||
            (tab == 1 && (show.showVideoTeaser ?? "").length > 0)) && (
            <div
              className="absolute top-1 right-1 w-[30px] h-[30px] rounded-full bg-stone-800 flex items-center justify-center"
              onClick={() => {
                
              }}
            >
              <IoTrash className="text-xl text-white" />
            </div>
          )} */}
        </div>

        <div className="w-full flex gap-2 items-center py-2">
          <ProfilePhoto size={50} url={show.user?.profilePhoto ?? ""} />
          <h3 className="flex-1 text-md">{show.user?.name ?? ""}</h3>
          <PopupMenu options={menuOptions} onSelectOption={handleOption} />
        </div>

        <div className="text-md flex gap-1 items-center text-primary">
          <span className="font-bold">{show.artistName}</span>
          <span className="">{show.showTitle}</span>
        </div>
        <p className="text-md">{show.artistGenre}</p>

        <div className="text-lg font-bold flex gap-1 items-center text-primary">
          <span>{show.currency}</span>
          <span className="text-primary">{show.bookingAmount}</span>
        </div>
        <div className="flex gap-1 items-center text-sm text-stone-200">
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

        <div className="flex gap-2 items-center text-sm text-stone-400">
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
          className="flex gap-1 items-center rounded-md my-2 py-1 px-2 text-sm"
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

        <p className="text-sm">
          {show.venue.venueName} - {show.venue.venueAddress}
        </p>
        <div className="w-full flex items-center gap-2 py-2">
          <Button className="flex-1" variant="outlined">
            Call
          </Button>
          <Button
            href={`mailto:${show.user?.email}`}
            className="flex-1"
            variant="outlined"
          >
            Email
          </Button>
          <Button className="flex-1" variant="outlined">
            Locate
          </Button>
        </div>

        <div className="h-[50px] flex items-center  mt-4">
          <h2 className="flex-1">Venue Photos or Videos</h2>
          {/* <IoAdd
            className="text-xl"
            onClick={() => {
              setFileInputType("");
              handleFilePickerClick();
            }}
          /> */}
        </div>
        <ul className="flex items-center gap-2">
          {show.venue.venuePicturesOrVideos.map(
            (venuePictureOrVideo, index) => {
              return (
                <li
                  key={index}
                  className="relative h-[100px] w-[150px] rounded-lg overflow-clip"
                >
                  <img
                    src={venuePictureOrVideo}
                    className="w-full h-full object-cover"
                  />
                  {/* <div
                    className="absolute top-1 right-1 w-[30px] h-[30px] rounded-full bg-stone-800 flex items-center justify-center"
                    onClick={() => {
                      setFieldValue(
                        "venue.venuePicturesOrVideos",
                        show.venue.venuePicturesOrVideos.filter(
                          (_, i) => i !== index
                        )
                      );
                    }}
                  >
                    <IoTrash className="text-xl text-white" />
                  </div> */}
                </li>
              );
            }
          )}
        </ul>
      </div>

      <div className="relative md:flex-1 md:h-full flex flex-col gap-2 md:overflow-y-auto">
        <SeatsFormationView
          previousSeatFormations={show.venue.seatFormations}
          bookedSeats={show.bookedSeats}
          onChangeSeat={setSelectedSeat}
        />
      </div>
      {selectedSeat && (
        <FloatingActionButton>
          <AppButton title="Book" onClick={bookSeat} />
        </FloatingActionButton>
      )}
    </div>
  );
}
