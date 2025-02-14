// import React, { useEffect, useState } from "react";
// import { Show } from "../interfaces/show";
// import { mockShows } from "../mocks/shows";
import GridShowItem from "../listitems/GridShowItem";
import DialogMenu from "../components/DialogMenu";
import DisplayOrBookShowView from "./DisplayOrBookShowView";
import { useAppSelector } from "../selectors/useAppSelector";

export default function ShowsView({ type }: { type: string }) {
  // const [shows, setShows] = useState<Show[]>(mockShows);
  const shows = useAppSelector((state) =>
    type === "completed"
      ? state.completedShows.value
      : type === "live"
      ? state.liveShows.value
      : type === "upcoming"
      ? state.upcomingShows.value
      : type === "saved"
      ? state.savedShows.value
      : type === "scheduled"
      ? state.scheduledShows.value
      : []
  );

  const searchText = useAppSelector((state) => state.search.value);

  function getSearchedShows() {
    if (searchText) {
      return shows.filter(
        (show) =>
          show.showTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          show.artistName.toLowerCase().includes(searchText.toLowerCase()) ||
          show.artistGenre.toLowerCase().includes(searchText.toLowerCase()) ||
          show.venue.venueName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          show.venue.venueAddress
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          show.startDateTime.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return shows;
  }

  // useEffect(() => {
  //   function readShows() {}
  // }, [type]);

  if (shows.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No {type} shows
      </div>
    );
  }

  return (
    <ul className={`flex flex-row flex-wrap items-center`}>
      {(searchText.length > 0 ? getSearchedShows() : shows).map(
        (show, index) => (
          <DialogMenu
            key={index}
            className="w-1/2 sm:w-1/3 md:w-1/4"
            title="Book Show"
            fullScreen
            child={<GridShowItem key={index} show={show} />}
          >
            {(onClose) => (
              <DisplayOrBookShowView
                key={index}
                show={show}
                onClose={onClose}
              />
            )}
            {/* <ShowItem key={index} show={show} /> */}
          </DialogMenu>
        )
      )}
    </ul>
  );
}
