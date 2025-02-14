import { ShowStatus } from "../enums/show_status";
import { Show } from "../interfaces/show";
import { convertStringToDate } from "./date_utils";

export function getShowStatus(show: Show) {
  if (show.endDateTime) return ShowStatus.completed;
  const showStartDate = convertStringToDate(show.startDateTime)!;
  const nowDate = new Date();
  // const showEndDate = convertStringToDate(show.startDateTime);
  if (nowDate > showStartDate) {
    return ShowStatus.live;
  }

  return ShowStatus.upcoming;
}
