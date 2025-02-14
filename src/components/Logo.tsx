import { useNavigate } from "react-router-dom";
import { TypeWriter } from "react-simple-typewriter-vb";
import { useAppSelector } from "../selectors/useAppSelector";
import { syncroColors } from "../slices/sycroColorSlice";
import { motion } from "framer-motion";

export default function Logo() {
  const navigate = useNavigate();
  const colorIndex = useAppSelector((state) => state.syncroColor.value);

  return (
    <motion.div
      className="w-[100px] text-md font-bold text-primary text-bold cursor-pointer"
      onClick={() => navigate("/")}
      animate={{
        color: syncroColors[colorIndex],
      }}
      transition={{ duration: 0.5 }}
      style={{ fontFamily: "Playwrite IN" }}
    >
      <TypeWriter
        options={{ strings: ["Synchro", "Fest"], speed: 100, pause: 2000 }}
      />
    </motion.div>
  );
}
