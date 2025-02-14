import { getImgPath } from "../utils/img_util";

export default function ProfilePhoto({
  size = 30,
}: {
  url: string;
  size?: number;
}) {
  return (
    <img
      className={`rounded-full bg-cover`}
      style={{
        width: size,
        height: size,
      }}
      src={getImgPath("car.jpg")}
    />
  );
}
