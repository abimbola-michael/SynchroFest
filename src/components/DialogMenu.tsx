import React, { ReactElement, ReactNode, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

export default function DialogMenu({
  child,
  rightHeaderChild,
  children,
  className,
  title,
  cancelText,
  onCancel,
  options,
  onSelectOption,
  fullScreen,
  fullWidth,
}: {
  rightHeaderChild?: ReactNode;
  child?: ReactNode;
  children?: ReactNode | ((onClose: () => void) => ReactNode);
  className?: string;
  title?: string;
  cancelText?: string;
  onCancel?: () => void;
  options?: string[];
  onSelectOption?: (option?: string) => void;
  fullScreen?: boolean;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={`cursor-pointer ${className}`} onClick={handleOpen}>
        {child}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        sx={{ backgroundColor: "black" }}
      >
        {/* <DialogTitle>{title}</DialogTitle> */}
        <div className="w-full flex items-center justify-between py-3 px-4 bg-black">
          <div className="w-[80px]">
            <IoMdArrowBack className="text-2xl" onClick={handleClose} />
          </div>
          <h3 className="text-lg text-center">{title}</h3>

          <div className="w-[80px]">{rightHeaderChild}</div>
        </div>
        <DialogContent sx={{ backgroundColor: "black" }}>
          {children &&
            (typeof children === "function" ? children(handleClose) : children)}
        </DialogContent>
        {/* <DialogActions>
          {cancelText && (
            <Button
              onClick={() => {
                handleClose();
                onCancel?.();
              }}
            >
              {cancelText}
            </Button>
          )}
          {options?.map((option, index) => {
            return (
              <Button
                key={index}
                color="primary"
                onClick={() => {
                  onSelectOption?.(option);
                  handleClose();
                }}
              >
                {option}
              </Button>
            );
          })}
        </DialogActions> */}
      </Dialog>
    </>
  );
}
