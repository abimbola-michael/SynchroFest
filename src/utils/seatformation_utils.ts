import { SeatFormation } from "../interfaces/seat_formation";

export function getSeatNumbersFromIds(
  seatFormations: Array<Array<SeatFormation>>
): Map<string, number> {
  const numberMap: Map<string, number> = new Map();
  let count = 0;
  for (let i = 0; i < seatFormations.length; i++) {
    const rowSeatFormations = seatFormations[i];
    for (let j = 0; j < rowSeatFormations.length; j++) {
      const formation = rowSeatFormations[j];
      if (
        formation.val == "0" ||
        formation.val === "#" ||
        formation.val.trim().length == 0
      )
        continue;
      const cols =
        parseInt(formation.val) > 0
          ? Math.ceil(
              parseInt(formation.val) /
                (formation.rows ??
                  Math.floor(Math.sqrt(parseInt(formation.val))))
            )
          : 1;
      for (let k = 0; k < cols; k++) {
        const rows =
          parseInt(formation.val) > 0
            ? parseInt(formation.val) %
                (formation.rows ??
                  Math.floor(Math.sqrt(parseInt(formation.val)))) >
                0 &&
              k ==
                Math.ceil(
                  parseInt(formation.val) /
                    (formation.rows ??
                      Math.floor(Math.sqrt(parseInt(formation.val))))
                ) -
                  1
              ? parseInt(formation.val) %
                (formation.rows ??
                  Math.floor(Math.sqrt(parseInt(formation.val))))
              : formation.rows ?? Math.floor(Math.sqrt(parseInt(formation.val)))
            : formation.rows ?? 1;
        for (let l = 0; l < rows; l++) {
          count++;
          numberMap.set(`${i}:${j}:${k}:${l}`, count);
        }
      }
    }
  }
  return numberMap;
}
