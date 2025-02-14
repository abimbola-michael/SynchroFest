import { ReactNode, useState } from "react";
import Logo from "./Logo";
import DrawerMenu from "./DrawerMenu";
import { TextField } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../selectors/useAppSelector";
import { useDispatch } from "react-redux";
import { updateSearch } from "../slices/searchSlice";
import AppButton from "./AppButton";

export default function Header({ children }: { children: ReactNode }) {
  const searchText = useAppSelector((state) => state.search.value);
  const user = useAppSelector((state) => state.user.value);

  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  const menuOptions = ["Profile", "Bookings", "Scheduled shows", "Saved shows"];

  function gotoProfile() {
    navigate("/profile");
  }
  function handleOption(option: string) {
    navigate(`/${option.replace(" ", "_").toLowerCase().trim()}`);
  }
  function updateSearchText(text: string) {
    dispatch(updateSearch(text));
  }
  function startSearch() {
    setShowSearch(true);
    updateSearchText("");
  }
  function stopSearch() {
    setShowSearch(false);
    updateSearchText("");
  }
  if (showSearch) {
    return (
      <div className="w-full h-[60px] flex items-center gap-2">
        <FaArrowLeft className="text-xl" onClick={stopSearch} />
        <div className="flex-1">
          <TextField
            variant="standard"
            placeholder="Search Artist, Genre, Title, Venue or Day"
            value={searchText}
            onChange={(e) => updateSearchText(e.target.value)}
            sx={{ border: "none", outline: "none" }}
            fullWidth
          />
        </div>
        <IoClose className="text-xl" onClick={() => updateSearchText("")} />
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center py-2">
      <div className="w-[60px]">
        <Logo />
      </div>
      <div className="flex-1 items-center justify-center text-center">
        {children}
      </div>
      <div className="w-[60px] flex items-center justify-end gap-3">
        <LuSearch className="text-lg" onClick={startSearch} />
        <DrawerMenu
          direction="right"
          options={menuOptions}
          onSelectOption={handleOption}
        >
          {user ? (
            <div
              className="flex flex-col gap-1 items-center px-2 py-4"
              onClick={gotoProfile}
            >
              <div className="w-[60px] h-[60px] rounded-full overflow-clip">
                <img
                  src={user.profilePhoto}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2>{user.name}</h2>
            </div>
          ) : (
            <div className="flex gap-2 items-center px-2 py-4">
              <AppButton
                className="w-[100px] text-center"
                title="Sign Up"
                onClick={gotoProfile}
                outlined
              />

              <AppButton
                onClick={gotoProfile}
                className="w-[100px] text-center"
                title="Login"
              />
            </div>
          )}
        </DrawerMenu>
      </div>
    </div>
  );
}
