import { Button } from "@mui/material";
import React, { ReactNode } from "react";

export default function FormationAction({
  onClick,
  title,
  children,
}: {
  onClick?: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center text-lg min-w-[70px]">
      {onClick ? (
        <Button
          onClick={onClick}
          variant="outlined"
          sx={{
            padding: "17px 25px",
            color: title.includes("Remove") ? "red" : undefined,
          }}
        >
          {children}
        </Button>
      ) : (
        children
      )}

      <p className="text-xs text-stone-400">{title}</p>
    </div>
  );
}
