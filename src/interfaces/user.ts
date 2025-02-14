import { Venue } from "./venue";

export interface User {
  userId: string;
  email: string;
  phone: string;
  username: string;
  name: string;
  profilePhoto: string;
  venue?: Venue;
}
