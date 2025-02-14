import React, { useEffect, useRef, useState } from "react";
import { Show } from "../interfaces/show";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { convertDateToString, convertStringToDate } from "../utils/date_utils";
import SeatsFormationView from "./SeatsFormationView";
import PopupMenu from "../components/PopupMenu";
import FloatingActionButton from "../components/FloatingActionButton";
import AppButton from "../components/AppButton";
import { IoAdd, IoTrash } from "react-icons/io5";
import { useAppSelector } from "../selectors/useAppSelector";
import { useDispatch } from "react-redux";
import { updateVenue } from "../slices/venueSlice";
import {
  addShow as addSceduledShow,
  updateShow as updateSceduledShow,
} from "../slices/sceduledShowsSlice";
import {
  addShow as addUpcomingShow,
  updateShow as updateUpcomingShow,
} from "../slices/upcomingShows";
import { updateShow as updateLiveShow } from "../slices/liveShowsSlice";

import { toast } from "react-toastify";
import { updateMainTab } from "../slices/mainTabSlice";
import { getSeatNumbersFromIds } from "../utils/seatformation_utils";
import { getShowStatus } from "../utils/show_utils";
import { ShowStatus } from "../enums/show_status";
import { updateUser } from "../slices/userSlice";

export default function ScheduleOrUpdateShowView({
  show = {
    userId: "",
    showId: "",
    artistName: "",
    artistGenre: "",
    showBanner: "",
    startDateTime: "",
    bookingAmount: 0,
    currency: "NGN",
    showTitle: "",
    bookedSeats: [],
    venue: {
      venueName: "",
      venueAddress: "",
      venueThumbnails: [],
      venuePicturesOrVideos: [],
      seatsCapacity: 0,
      seatFormations: [],
    },
  },
  onClose,
}: {
  show?: Show;
  onClose: () => void;
}) {
  // const storedVenue = useAppSelector((state) => state.user.value?.venue);
  const user = useAppSelector((state) => state.user.value);

  const dispatch = useDispatch();
  const [tab, setTab] = useState<number>(0);
  const [fileInputType, setFileInputType] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   return () => {
  //     if (show.showBanner.length > 0) {
  //       URL.revokeObjectURL(show.showBanner);
  //     }
  //     if ((show.showVideoTeaser ?? "").length > 0) {
  //       URL.revokeObjectURL(show.showVideoTeaser!);
  //     }
  //     if (show.venue.venuePicturesOrVideos.length > 0) {
  //       for (const pictureOrVideo in show.venue.venuePicturesOrVideos) {
  //         URL.revokeObjectURL(pictureOrVideo);
  //       }
  //     }
  //   };
  // }, [show.showBanner, show.showVideoTeaser, show.venue.venuePicturesOrVideos]);

  const validationSchema = Yup.object({
    artistName: Yup.string().required("Artist name is required"),
    artistGenre: Yup.string().required("Artist genre is required"),
    showTitle: Yup.string().required("Show title is required"),
    showBanner: Yup.string().required("Show banner is required"),
    startDateTime: Yup.string().required("Start Date and Time is required"),
    bookingAmount: Yup.number().required("Booking price is required"),
    venue: Yup.object().shape({
      venueName: Yup.string().required("Venue name is required"),
      venueAddress: Yup.string().required("Venue address is required"),
      seatsCapacity: Yup.number().required("Seat capacity is required"),
      seatFormations: Yup.array().required("Seat arrangement is required"),
      venuePicturesOrVideos: Yup.array().required(
        "Pictures or Videos is required"
      ),
    }),
  });

  function updateTab(e: React.SyntheticEvent, tab: number) {
    setTab(tab);
  }

  function scheduleOrUpdateShow(show: Show) {
    show.user = user;
    dispatch(updateVenue(show.venue));
    dispatch(updateUser({ ...user, venue: show.venue }));
    if (show.showId.length > 0) {
      dispatch(updateSceduledShow(show));
      if (getShowStatus(show) === ShowStatus.upcoming) {
        dispatch(updateUpcomingShow(show));
      } else if (getShowStatus(show) === ShowStatus.live) {
        dispatch(updateLiveShow(show));
      }
      dispatch(updateMainTab(0));
      toast(`${show.artistName} ${show.showTitle} show updated Successfully`, {
        type: "success",
      });
    } else {
      dispatch(addSceduledShow(show));
      dispatch(addUpcomingShow(show));
      dispatch(updateMainTab(0));
      toast(`${show.artistName} ${show.showTitle} show created Successfully`, {
        type: "success",
      });
    }

    onClose();
  }

  const handleFilePickerClick = () => {
    setTimeout(() => {
      fileInputRef.current?.click(); // Trigger file input when button is clicked
    }, 500);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={
          show.venue.venueName.length === 0 && user?.venue
            ? { ...show, venue: user.venue }
            : show
        }
        validationSchema={validationSchema}
        onSubmit={scheduleOrUpdateShow}
      >
        {({ values, setFieldValue }) => (
          <Form className="h-full flex flex-col md:flex-row gap-4 md:overflow-y-hidden">
            <div className="md:h-full md:pb-[100px] md:flex-1 flex flex-col gap-3 md:overflow-y-auto ">
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
                <IoAdd
                  className="text-xl"
                  onClick={() => {
                    setFileInputType(tab == 0 ? "banner" : "teaser");
                    handleFilePickerClick();
                  }}
                />
              </div>
              <div className="w-full relative aspect-video min-h-[250px] bg-stone-900 rounded-lg overflow-clip">
                {tab === 0 && values.showBanner.length > 0 && (
                  <img
                    src={values.showBanner}
                    className="w-full h-full object-cover"
                  />
                )}
                {tab === 1 && (values.showVideoTeaser ?? "").length > 0 && (
                  <video
                    src={values.showVideoTeaser}
                    className="w-full h-full"
                    controls
                    onLoadedData={(e) => {}}
                  />
                )}
                {((tab == 0 && values.showBanner.length > 0) ||
                  (tab == 1 && (values.showVideoTeaser ?? "").length > 0)) && (
                  <div
                    className="absolute top-1 right-1 w-[30px] h-[30px] rounded-full bg-stone-800 flex items-center justify-center"
                    onClick={() => {
                      setFileInputType(tab == 0 ? "banner" : "teaser");
                      handleFilePickerClick();
                    }}
                  >
                    <IoTrash className="text-xl text-white" />
                  </div>
                )}
              </div>

              <input
                className="hidden"
                type="file"
                accept={
                  fileInputType === "banner"
                    ? "image/*"
                    : fileInputType === "teaser"
                    ? "video/*"
                    : "image/*, video/*"
                } // Dynamically change allowed file types
                ref={fileInputRef}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (!file) return;
                  const prevUrl =
                    tab == 0 ? show.showBanner : show.showVideoTeaser ?? "";
                  if (prevUrl.length > 0) {
                    URL.revokeObjectURL(prevUrl);
                  }
                  const url = URL.createObjectURL(file);
                  if (fileInputType == "banner") {
                    setFieldValue("showBanner", url);
                  } else if (fileInputType == "teaser") {
                    setFieldValue("showVideoTeaser", url);
                  } else {
                    setFieldValue("venue.venuePicturesOrVideos", [
                      ...values.venue.venuePicturesOrVideos,
                      url,
                    ]);
                  }
                }}
              />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="showBanner"
                component="Typography"
              />

              <Field as={TextField} label="Artist Name" name="artistName" />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="artistName"
                component="Typography"
              />

              <Field as={TextField} label="Artist Genre" name="artistGenre" />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="artistGenre"
                component="Typography"
              />

              <Field as={TextField} label="Show Title" name="showTitle" />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="showTitle"
                component="Typography"
              />

              <Field
                as={TextField}
                label="Booking amount"
                name="bookingAmount"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PopupMenu
                          child={
                            <p className="text-[16px] text-white">
                              {values.currency}
                            </p>
                          }
                          options={["NGN", "USD", "EUR"]}
                          onSelectOption={(option) => {
                            setFieldValue("currency", option);
                          }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="bookingAmount"
                component="Typography"
              />

              <DateTimePicker
                label="Start Date & Time"
                value={convertStringToDate(values.startDateTime)}
                onChange={(newValue) =>
                  setFieldValue("startDateTime", convertDateToString(newValue))
                }
              />
              <DateTimePicker
                label="Estimated End Date & Time"
                value={convertStringToDate(values.estEndDateTime)}
                onChange={(newValue) =>
                  setFieldValue("estEndDateTime", convertDateToString(newValue))
                }
              />

              <Field as={TextField} label="Venue" name="venue.venueName" />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="venue.venueName"
                component="Typography"
              />

              <Field
                as={TextField}
                label="Venue Address"
                name="venue.venueAddress"
              />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="venue.venueAddress"
                component="Typography"
              />

              <div className="h-[50px] flex items-center">
                <h2 className="flex-1">Venue Photos or Videos</h2>
                <IoAdd
                  className="text-xl"
                  onClick={() => {
                    setFileInputType("");
                    handleFilePickerClick();
                  }}
                />
              </div>
              <ul className="flex items-center gap-2">
                {values.venue.venuePicturesOrVideos.map(
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
                        <div
                          className="absolute top-1 right-1 w-[30px] h-[30px] rounded-full bg-stone-800 flex items-center justify-center"
                          onClick={() => {
                            setFieldValue(
                              "venue.venuePicturesOrVideos",
                              values.venue.venuePicturesOrVideos.filter(
                                (_, i) => i !== index
                              )
                            );
                          }}
                        >
                          <IoTrash className="text-xl text-white" />
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>

            <div className="relative md:flex-1 md:h-full flex flex-col gap-2 md:overflow-y-auto">
              <SeatsFormationView
                previousSeatFormations={values.venue.seatFormations}
                onChangeSeatFormation={(formations) => {
                  setFieldValue("venue.seatFormations", formations);
                  setFieldValue(
                    "venue.seatsCapacity",
                    getSeatNumbersFromIds(formations).size
                  );
                }}
                onToggleEdit={setIsEditMode}
              />
            </div>
            {!isEditMode && (
              <FloatingActionButton>
                <AppButton title="Schedule" />
              </FloatingActionButton>
            )}
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
}
