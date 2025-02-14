import { useRef, useState } from "react";
import ReactSwipe from "react-swipe";
// import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ShowPicturesOrVideosView({
  venuePicturesOrVideos,
}: {
  venuePicturesOrVideos: string[];
}) {
  const reactSwipeEl = useRef<ReactSwipe | null>(null);
  const [index, setIndex] = useState(0);
  return (
    <div className="w-full h-full flex flex-col items-stretch">
      <ReactSwipe
        ref={reactSwipeEl}
        swipeOptions={{
          continuous: true,
          callback: (pos) => setIndex(pos),
        }}
      >
        {venuePicturesOrVideos.map((picturesOrVideo, idx) =>
          picturesOrVideo.endsWith("mp4") ? (
            <video src={picturesOrVideo} />
          ) : (
            <img
              key={idx}
              className="w-full h-[300px]"
              src={picturesOrVideo}
              alt={`Slide ${idx}`}
            />
          )
        )}
      </ReactSwipe>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          onClick={() => reactSwipeEl.current?.prev()}
          disabled={index === 0}
        >
          {/* <KeyboardArrowLeft /> Back */}
          <FaArrowRight />
        </Button>
        <Button
          onClick={() => reactSwipeEl.current?.next()}
          disabled={index === venuePicturesOrVideos.length - 1}
        >
          {/* Next <KeyboardArrowRight /> */}
          <FaArrowLeft />
        </Button>
      </Box>
    </div>
  );
}
