import { Box } from "@mui/material";
import Slider from "react-slick";

export default function ShowPicturesOrVideosSlideShowView({
  venueThumbnails = [],
}: {
  venueThumbnails: string[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="w-full h-full rounded-md overflow-clip">
      <Slider {...settings}>
        {venueThumbnails.map((src, index) => (
          <Box
            key={index}
            component="img"
            sx={{ width: "100%", height: 150, backgroundRepeat: "no-repeat" }}
            src={src}
            alt={`Slide ${index}`}
          />
        ))}
      </Slider>
    </div>
  );
}
