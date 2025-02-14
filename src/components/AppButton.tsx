import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../selectors/useAppSelector";
import { syncroColors, syncroTextColors } from "../slices/sycroColorSlice";
import { motion } from "framer-motion";

export default function AppButton({
  title,
  loading,
  disabled,
  onClick,
  className,
  outlined,
}: {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  outlined?: boolean;
}) {
  const colorIndex = useAppSelector((state) => state.syncroColor.value);
  return (
    <motion.button
      className={`flex gap-2 items-center justify-center rounded-full py-2 px-4 text-white ${className} ${
        disabled && "opacity-20"
      }`}
      onClick={onClick}
      type="submit"
      animate={{
        backgroundColor: outlined ? "transparent" : syncroColors[colorIndex],
        color: outlined
          ? syncroColors[colorIndex]
          : syncroTextColors[colorIndex],
        borderColor: outlined ? syncroColors[colorIndex] : undefined,
        borderWidth: outlined ? 2 : undefined,
      }}
      transition={{ duration: 0.5 }}
    >
      {title}
      {loading && <CircularProgress size={20} thickness={2} />}
    </motion.button>
  );
}
