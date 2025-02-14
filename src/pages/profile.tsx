import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { useAppSelector } from "../selectors/useAppSelector";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { User } from "../interfaces/user";
import { updateUser } from "../slices/userSlice";
import { toast } from "react-toastify";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import FloatingActionButton from "../components/FloatingActionButton";
import AppButton from "../components/AppButton";
import { useNavigate } from "react-router-dom";
import { IoAdd, IoTrash } from "react-icons/io5";
import SeatsFormationView from "../views/SeatsFormationView";
import { getSeatNumbersFromIds } from "../utils/seatformation_utils";

export default function Profile() {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState<number>(0);

  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const venueFileInputRef = useRef<HTMLInputElement>(null);

  const profileValidationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
  });

  const venueValidationSchema = Yup.object({
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

  function saveDetails(user: User) {
    dispatch(updateUser(user));

    if (user.userId.length > 0) {
      toast(`${tab === 0 ? "Profile" : "Venue"} updated successfully`, {
        type: "success",
      });
    } else {
      toast(`${tab === 0 ? "Profile" : "Venue"} created successfully`, {
        type: "success",
      });
    }
    navigate("/");
  }

  const handleFilePickerClick = () => {
    setTimeout(() => {
      if (tab === 0) {
        profileFileInputRef.current?.click();
      } else {
        venueFileInputRef.current?.click();
      }
      // Trigger file input when button is clicked
    }, 500);
  };
  return (
    <div className="w-full h-screen flex flex-col gap-2 bg-black text-white px-[20px] overflow-hidden">
      <Header>
        <Tabs
          value={tab}
          onChange={updateTab}
          aria-label="Tabs"
          className="text-primary"
          centered
        >
          <Tab label="Profile" />
          <Tab label="Venue" />
        </Tabs>
      </Header>
      {tab === 1 ? (
        <Formik
          initialValues={{
            userId: user?.userId ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            username: user?.username ?? "",
            name: user?.name ?? "",
            profilePhoto: user?.profilePhoto ?? "",
            venue: {
              venueName: user?.venue?.venueName ?? "",
              venueAddress: user?.venue?.venueAddress ?? "",
              venueThumbnails: user?.venue?.venueThumbnails ?? [],
              venuePicturesOrVideos: user?.venue?.venuePicturesOrVideos ?? [],
              seatsCapacity: user?.venue?.seatsCapacity ?? 0,
              seatFormations: user?.venue?.seatFormations ?? [],
            },
          }}
          validationSchema={venueValidationSchema}
          onSubmit={saveDetails}
        >
          {({ values, setFieldValue }) => (
            <Form className="h-full flex flex-col md:flex-row gap-4 md:overflow-y-hidden overflow-y-auto">
              <div className="h-full md:pb-[100px] md:flex-1 flex flex-col justify-center gap-3 md:overflow-y-auto ">
                <input
                  className="hidden"
                  type="file"
                  accept={"image/*, video/*"} // Dynamically change allowed file types
                  ref={venueFileInputRef}
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (!file) return;
                    // const prevUrl =
                    //   tab == 0 ? show.showBanner : show.showVideoTeaser ?? "";
                    // if (prevUrl.length > 0) {
                    //   URL.revokeObjectURL(prevUrl);
                    // }
                    const url = URL.createObjectURL(file);
                    setFieldValue("venue.venuePicturesOrVideos", [
                      ...values.venue.venuePicturesOrVideos,
                      url,
                    ]);
                  }}
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
                  <AppButton title="Save Venue" />
                </FloatingActionButton>
              )}
            </Form>
          )}
        </Formik>
      ) : (
        <div className="flex-1 w-full h-full text-white pb-[100px] overflow-auto">
          <Formik
            initialValues={{
              userId: user?.userId ?? "",
              email: user?.email ?? "",
              phone: user?.phone ?? "",
              username: user?.username ?? "",
              name: user?.name ?? "",
              profilePhoto: user?.profilePhoto ?? "",
              venue: {
                venueName: user?.venue?.venueName ?? "",
                venueAddress: user?.venue?.venueAddress ?? "",
                venueThumbnails: user?.venue?.venueThumbnails ?? [],
                venuePicturesOrVideos: user?.venue?.venuePicturesOrVideos ?? [],
                seatsCapacity: user?.venue?.seatsCapacity ?? 0,
                seatFormations: user?.venue?.seatFormations ?? [],
              },
            }}
            profileValidationSchema={profileValidationSchema}
            onSubmit={saveDetails}
          >
            {({ values, setFieldValue }) => (
              <Form className="h-full flex flex-col md:flex-row gap-4 md:overflow-y-hidden">
                <div className="md:flex-1 flex flex-col items-center gap-3">
                  <div className="aspect-square w-[35vw] h-[35vw] bg-stone-900 rounded-full overflow-clip">
                    <img
                      src={values.profilePhoto}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full flex items-center justify-center gap-2">
                    {values.profilePhoto.length > 0 && (
                      <Button
                        color="error"
                        onClick={() => {
                          setFieldValue("profilePhoto", "");
                        }}
                      >
                        Remove Photo
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        handleFilePickerClick();
                      }}
                    >
                      {values.profilePhoto.length > 0 ? "Change" : "Add"} Photo
                    </Button>
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    accept={"image/*"} // Dynamically change allowed file types
                    ref={profileFileInputRef}
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (!file) return;
                      const prevUrl = user?.profilePhoto ?? "";
                      if (prevUrl.length > 0) {
                        URL.revokeObjectURL(prevUrl);
                      }
                      const url = URL.createObjectURL(file);
                      setFieldValue("profilePhoto", url);
                    }}
                  />
                </div>

                <div className="md:flex-1 flex flex-col items-stretch justify-center gap-2 md:overflow-y-auto">
                  <Field as={TextField} label="Email" name="email" />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="email"
                    component="Typography"
                  />

                  <Field as={TextField} label="Phone" name="phone" />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="phone"
                    component="Typography"
                  />

                  <Field as={TextField} label="Username" name="username" />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="username"
                    component="Typography"
                  />
                  <Field as={TextField} label="Name" name="name" />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="name"
                    component="Typography"
                  />
                </div>
                <FloatingActionButton>
                  <AppButton title="Save Profile" />
                </FloatingActionButton>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
