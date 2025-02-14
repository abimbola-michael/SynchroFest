import React from "react";
import { Booking } from "../interfaces/booking";
import { getImgPath } from "../utils/img_util";
import ProfilePhoto from "../components/ProfilePhoto";
import PopupMenu from "../components/PopupMenu";
import { useDispatch } from "react-redux";
import { removeBooking } from "../slices/bookingsSlice";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import DialogMenu from "../components/DialogMenu";
import ReceiptView from "../views/ReceiptView";

export default function BookingItem({ booking }: { booking: Booking }) {
  const dispatch = useDispatch();
  const show = booking.show;

  const menuOptions = ["Book Another", "Delete"];
  function handleOption(option: string) {
    if (!show) return;
    if (option == "Delete") {
      dispatch(removeBooking(booking));
      toast(
        `${show.artistName} ${show.showTitle} show booking deleted Sucessfully`,
        {
          type: "success",
        }
      );
    }
  }
  if (!show) {
    return <></>;
  }
  return (
    <li className="w-full flex items-start gap-4 py-2">
      <div className="flex-3 h-[150px] md:h-[200px] relative rounded-lg overflow-clip">
        <img
          src={show.showBanner || getImgPath("car.jpg")}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-7 flex flex-col items-start">
        <div className="w-full flex gap-2 items-center pb-2">
          <ProfilePhoto url={show.user?.profilePhoto ?? ""} />
          <h3 className="flex-1 text-md">{show.user?.name ?? ""}</h3>
          <PopupMenu options={menuOptions} onSelectOption={handleOption} />
        </div>
        <div className="text-md flex gap-1 items-center text-primary">
          <span className="font-bold">{show.artistName}</span>
          <span className="">{show.showTitle}</span>
        </div>
        <div className="text-lg font-bold flex gap-1 items-center text-primary">
          <span>{show.currency}</span>
          <span className="text-primary">{booking.amount}</span>
        </div>
        <div className="text-xs flex gap-1 items-center text-primary">
          <span>Seat No {booking.seatNumber},</span>
          <span className="text-primary">Booked {booking.bookedDateTime}</span>
        </div>
        <div className="text-sm font-bold flex gap-2 items-center text-primary">
          <DialogMenu
            className="w-full"
            title="Booking Receipt"
            child={<Button>View Receipt</Button>}
            fullScreen
          >
            {(onClose) =>
              booking.show ? (
                <ReceiptView booking={booking} onClose={onClose} />
              ) : (
                <div>No show</div>
              )
            }
          </DialogMenu>
        </div>
      </div>
    </li>
  );
}
