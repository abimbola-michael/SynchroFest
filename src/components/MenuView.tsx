import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const menuOptions = ["My Bookings", "My Shows"];
export default function MenuView({ showMenu = false }: { showMenu?: boolean }) {
  const [show, setShow] = useState<boolean>(showMenu);

  if (show) {
    return (
      <div className="relative bg-black">
        <div
          className="absolute top-0 left-0 flex flex-col gap-2 items-start rounded-sm px-4 py-2 bg-stone-950"
          //   style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <div className="flex gap-4 ">
            <IoMdClose
              className="text-lg font-bold text-white"
              onClick={() => setShow(false)}
            />
          </div>
          <ul className="flex flex-col gap-2 items-start">
            {menuOptions.map((option) => {
              return (
                <li key={option} className="text-md">
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return <IoMenu className="text-xl" onClick={() => setShow(true)} />;
}
