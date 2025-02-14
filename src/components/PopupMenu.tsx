import React, { ReactNode, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { IoMdMore } from "react-icons/io";

export default function PopupMenu({
  className,
  child,
  children,
  options,
  onSelectOption,
}: {
  className?: string;
  child?: ReactNode;
  children?: ReactNode;
  options?: string[];
  onSelectOption?: (option: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const handleClick = (event: React.MouseEvent<Element>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {child ? (
        <div className={`cursor-pointer ${className}`} onClick={handleClick}>
          {child}
        </div>
      ) : (
        <IoMdMore className={`text-2xl ${className}`} onClick={handleClick} />
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
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
      </Menu>
    </>
  );
}
