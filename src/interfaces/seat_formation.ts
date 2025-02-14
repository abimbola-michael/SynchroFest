export interface SeatFormation {
  seats: number;
  rows: number;
  dir?: "-" | "|" | "\\" | "/";
  stage?: boolean;
}
