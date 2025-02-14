import React, { ReactNode, useState } from "react";
import { Drawer, MenuItem } from "@mui/material";
import { IoMdMenu } from "react-icons/io";

export default function DrawerMenu({
  className,
  child,
  children,
  direction = "left",
  options,
  onSelectOption,
}: {
  className?: string;
  child?: ReactNode;
  children?: ReactNode;
  direction?: "bottom" | "left" | "top" | "right" | undefined;
  options?: string[];
  onSelectOption?: (option: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {child ? (
        <div className={`cursor-pointer ${className}`} onClick={handleOpen}>{child}</div>
      ) : (
        <IoMdMenu className={`text-2xl ${className}`} onClick={handleOpen} />
      )}
      <Drawer anchor={direction} open={open} onClose={handleClose}>
        {children}
        {options?.map((option, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                onSelectOption?.(option);
                handleClose();
              }}
            >
              {option}
            </MenuItem>
          );
        })}
      </Drawer>
    </>
  );
}
