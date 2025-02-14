import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

export default function ViewsContainer({
  children,
  title,
  open,
  onClose,
  negativeAction = "Cancel",
  action = "Comfirm",
  onActionClick,
}: {
  children: ReactNode;
  title?: string;
  open: boolean;
  onClose: () => void;
  negativeAction?: string;
  action?: string;
  onActionClick?: () => void;
}) {
  return (
    // sx={{ backgroundColor: "black" }}
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{ backgroundColor: "black", width: "100%", height: "100%" }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{negativeAction}</Button>
        {onActionClick && (
          <Button
            onClick={() => {
              onActionClick();
              onClose();
            }}
            color="primary"
          >
            {action}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
