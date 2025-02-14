import { BookedSeat } from "../interfaces/booked_seat";
import { SeatFormation } from "../interfaces/seat_formation";

export function getBookedSeatsMap(
  bookedSeats: Array<BookedSeat>
): Map<string, BookedSeat> {
  const result: Map<string, BookedSeat> = new Map();
  for (let i = 0; i < bookedSeats.length; i++) {
    const bookedSeat = bookedSeats[i];
    result.set(bookedSeat.seatId, bookedSeat);
  }
  return result;
}
export function getSeatNumbersFromIds(
  seatFormations: Array<Array<SeatFormation>>
): Map<string, number> {
  const numberMap: Map<string, number> = new Map();

  let count = 0;
  for (let i = 0; i < seatFormations.length; i++) {
    const rowSeatFormations = seatFormations[i];
    for (let j = 0; j < rowSeatFormations.length; j++) {
      const formation = rowSeatFormations[j];
      for (let k = 0; k < formation.seats; k++) {
        count++;
        numberMap.set(`${i}:${j}:${k}`, count);
      }
      // if (
      //   formation.seats == "0" ||
      //   formation.seats === "#" ||
      //   formation.seats.trim().length == 0
      // )
      //   continue;
      // const cols =
      //   parseInt(formation.seats) > 0
      //     ? Math.ceil(
      //         parseInt(formation.seats) /
      //           (formation.rows ??
      //             Math.floor(Math.sqrt(parseInt(formation.seats))))
      //       )
      //     : 1;
      // for (let k = 0; k < cols; k++) {
      //   const rows =
      //     parseInt(formation.seats) > 0
      //       ? parseInt(formation.seats) %
      //           (formation.rows ??
      //             Math.floor(Math.sqrt(parseInt(formation.seats)))) >
      //           0 &&
      //         k ==
      //           Math.ceil(
      //             parseInt(formation.seats) /
      //               (formation.rows ??
      //                 Math.floor(Math.sqrt(parseInt(formation.seats))))
      //           ) -
      //             1
      //         ? parseInt(formation.seats) %
      //           (formation.rows ??
      //             Math.floor(Math.sqrt(parseInt(formation.seats))))
      //         : formation.rows ??
      //           Math.floor(Math.sqrt(parseInt(formation.seats)))
      //       : formation.rows ?? 1;
      //   for (let l = 0; l < rows; l++) {
      //     count++;
      //     numberMap.set(`${i}:${j}:${k}:${l}`, count);
      //   }
      // }
    }
  }
  return numberMap;
}
