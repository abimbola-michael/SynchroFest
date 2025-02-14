import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";

import FormationAction from "../components/FormationAction";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosTrash,
} from "react-icons/io";
import { IoCheckmark, IoPencil } from "react-icons/io5";
import { SeatFormation } from "../interfaces/seat_formation";
import {
  getBookedSeatsMap,
  getSeatNumbersFromIds,
} from "../utils/seatformation_utils";
import { BookedSeat } from "../interfaces/booked_seat";
import { toast } from "react-toastify";

export default function SeatsFormationView({
  previousSeatFormations = [],
  bookedSeats,
  onChangeSeatFormation,
  onChangeSeat,
  onToggleEdit,
}: {
  previousSeatFormations?: Array<Array<SeatFormation>>;
  bookedSeats?: BookedSeat[];
  onChangeSeatFormation?: (seatFormations: Array<Array<SeatFormation>>) => void;
  onChangeSeat?: (
    selectedSeat: { seatId: string; seatNumber: number } | undefined
  ) => void;
  onToggleEdit?: (isEditMode: boolean) => void;
}) {
  const seatIdsNumbersRef = useRef<Map<string, number>>(new Map());
  const bookedSeatIdsRef = useRef<Map<string, BookedSeat>>(new Map());

  const listRef = useRef<HTMLDivElement>(null);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [seatFormations, setSeatFormations] = useState<
    Array<Array<SeatFormation>>
  >(previousSeatFormations);

  const [selectedSeatId, setSelectedSeatId] = useState<string | undefined>();
  const [selectedColRow, setSelectedColRow] = useState<
    | {
        col: number;
        row: number;
      }
    | undefined
  >({ col: 0, row: 0 });

  useEffect(() => {
    if (seatFormations.length == 0) {
      setSeatFormations([[{ seats: 0, rows: 10, stage: true }]]);
    }
  }, []);

  useEffect(() => {
    if (listRef.current) {
      const { scrollWidth, clientWidth } = listRef.current;
      listRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  function selectSeat(newSeatId: string) {
    if (bookedSeatIdsRef.current?.get(newSeatId) !== undefined) {
      toast(
        `Seat number ${
          seatIdsNumbersRef.current.get(newSeatId) ?? ""
        } is already booked`,
        { type: "error" }
      );
      return;
    }
    onChangeSeat?.(
      newSeatId === selectedSeatId
        ? undefined
        : {
            seatId: newSeatId,
            seatNumber: seatIdsNumbersRef.current.get(newSeatId)!,
          }
    );
    setSelectedSeatId((seatId) =>
      newSeatId === seatId ? undefined : newSeatId
    );
  }

  function toggleEditMode() {
    onToggleEdit?.(!isEditMode);
    setIsEditMode((isEditMode) => !isEditMode);
  }

  function getSelectedFormation() {
    if (
      selectedColRow === undefined ||
      seatFormations[selectedColRow.col] === undefined
    ) {
      return undefined;
    }

    return seatFormations[selectedColRow.col][selectedColRow.row];
  }

  function addFormation(direction: "top" | "bottom" | "left" | "right") {
    if (!selectedColRow) return;
    const colIndex = selectedColRow.col;
    const rowIndex = selectedColRow.row;
    const newSeatFormations =
      direction === "top" || direction === "bottom"
        ? [
            ...seatFormations.slice(
              0,
              colIndex + (direction === "bottom" ? 1 : 0)
            ),
            [{ seats: 0, rows: 0 }],
            ...seatFormations.slice(
              colIndex + (direction === "bottom" ? 1 : 0)
            ),
          ]
        : seatFormations.map((colFormations, prevcolIndex) =>
            colIndex == prevcolIndex
              ? [
                  ...colFormations.slice(
                    0,
                    rowIndex + (direction == "right" ? 1 : 0)
                  ),
                  { seats: 0, rows: 0 },
                  ...colFormations.slice(
                    rowIndex + (direction == "right" ? 1 : 0)
                  ),
                ]
              : colFormations
          );

    setSeatFormations(newSeatFormations);
    onChangeSeatFormation?.(newSeatFormations);

    if (direction == "top" || direction === "bottom") {
      setSelectedColRow({
        col: colIndex + (direction === "bottom" ? 1 : 0),
        row: rowIndex,
      });
    } else {
      setSelectedColRow({
        col: colIndex,
        row: rowIndex + (direction == "right" ? 1 : 0),
      });
    }
  }
  function removeFormation(direction?: "top" | "bottom" | "left" | "right") {
    if (!selectedColRow) return;

    const colIndex = selectedColRow.col;
    const rowIndex = selectedColRow.row;

    const newSeatFormations =
      direction === "top" || direction === "bottom"
        ? seatFormations.filter(
            (_, prevcolIndex) =>
              prevcolIndex !== colIndex + (direction === "bottom" ? 1 : 0)
          )
        : seatFormations.map((colFormations, prevcolIndex) =>
            colIndex === prevcolIndex
              ? colFormations.filter(
                  (_, prevRowIndex) =>
                    prevRowIndex != rowIndex + (direction === "right" ? 1 : 0)
                )
              : colFormations
          );

    setSeatFormations(newSeatFormations);
    onChangeSeatFormation?.(newSeatFormations);

    setSelectedColRow(undefined);
  }

  function updateFormation(
    seats?: number,
    rows?: number,
    dir?: "-" | "|" | "\\" | "/"
  ) {
    if (selectedColRow == undefined) return;

    const colIndex = selectedColRow.col;
    const rowIndex = selectedColRow.row;

    const newSeatFormations = seatFormations.map(
      (colFormations, prevcolIndex) =>
        colIndex === prevcolIndex
          ? colFormations.map((seatFormation, prevRowIndex) =>
              rowIndex === prevRowIndex
                ? seats !== undefined
                  ? { ...seatFormation, seats }
                  : rows !== undefined
                  ? { ...seatFormation, rows }
                  : dir !== undefined
                  ? { ...seatFormation, dir }
                  : seatFormation
                : seatFormation
            )
          : colFormations
    );

    setSeatFormations(newSeatFormations);
    onChangeSeatFormation?.(newSeatFormations);
  }

  return (
    <div className="h-full flex flex-col overflow-x-hidden">
      <div className="h-[50px] flex items-center">
        <h2 className="flex-1">Seat Formations</h2>

        {onToggleEdit && (
          <div className="" onClick={toggleEditMode}>
            {isEditMode ? (
              // <IoClose className="text-xl" />
              <IoCheckmark className="text-xl" />
            ) : (
              <IoPencil className="text-xl" />
            )}
          </div>
        )}
      </div>
      <div
        ref={listRef}
        className="w-full md:h-full min-h-max flex flex-col flex-1 p-3 overflow-x-auto"
      >
        <ul className="pb-[200px] md:min-h-max w-full min-w-max flex flex-col gap-2 items-center justify-center">
          {seatFormations.map((colFormations, colIndex) => {
            if (colIndex === 0) {
              seatIdsNumbersRef.current = getSeatNumbersFromIds(seatFormations);
              if (bookedSeats)
                bookedSeatIdsRef.current = getBookedSeatsMap(bookedSeats);
            }

            return (
              <ul key={colIndex} className="flex flex-row gap-2 items-start">
                {colFormations.map((formation, rowIndex) => {
                  return (
                    <div
                      key={rowIndex}
                      className={`relative rounded-md p-3 cursor-pointer bg-stone-700 border-2 ${
                        onToggleEdit &&
                        selectedColRow?.col == colIndex &&
                        selectedColRow?.row == rowIndex
                          ? "border-purple-700"
                          : "border-transparent"
                      }`}
                      onClick={
                        onToggleEdit
                          ? () =>
                              setSelectedColRow({
                                col: colIndex,
                                row: rowIndex,
                              })
                          : undefined
                      }
                    >
                      <ul
                        style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${formation.rows}, minmax(0, 1fr))`,
                        }}
                        className={`items-center gap-1`}
                      >
                        {Array(formation.seats)
                          .fill(null)
                          .map((_, seatIndex) => {
                            const seatId = `${colIndex}:${rowIndex}:${seatIndex}`;
                            return (
                              <li
                                key={seatIndex}
                                className={`text-center rounded-sm p-3 cursor-pointer border-2 ${
                                  selectedSeatId == seatId
                                    ? "border-purple-700"
                                    : bookedSeatIdsRef.current?.get(seatId) !==
                                      undefined
                                    ? "border-red-500"
                                    : "border-stone-500"
                                }`}
                                onClick={
                                  !onToggleEdit
                                    ? () => selectSeat(seatId)
                                    : undefined
                                }
                              >
                                {seatIdsNumbersRef.current.get(seatId)}
                              </li>
                            );
                          })}
                      </ul>

                      {formation.stage && (
                        <p className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center text-center">
                          {formation.stage ? "Stage" : ""}
                        </p>
                      )}
                    </div>
                  );
                })}
              </ul>
            );
          })}
        </ul>
      </div>
      {isEditMode && (
        <div className="absolute bottom-0 left-0 right-0 w-full bg-black py-2  flex flex-col items-center gap-2 overflow-x-auto">
          {/* <p className="text-xs text-stone-200">
            Input 0 for Space, Number for seats
          </p> */}
          <div className="w-full flex items-center gap-2 px-4">
            {!getSelectedFormation()?.stage && (
              <FormationAction title="Total Seats">
                <TextField
                  placeholder="50"
                  sx={{
                    "& input": {
                      textAlign: "center",
                      width: 50,
                    },
                  }}
                  type="number"
                  value={getSelectedFormation()?.seats ?? ""}
                  onChange={(e) => {
                    updateFormation(
                      parseInt(e.target.value) > 0
                        ? parseInt(e.target.value)
                        : 0
                    );
                  }}
                />
              </FormationAction>
            )}

            <FormationAction title="Rows">
              <TextField
                className="text-center"
                placeholder="20"
                sx={{
                  "& input": {
                    textAlign: "center",
                    width: 50,
                  },
                }}
                type="number"
                value={getSelectedFormation()?.rows ?? ""}
                onChange={(e) => {
                  updateFormation(
                    undefined,
                    parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0
                  );
                }}
              />
            </FormationAction>

            <FormationAction
              title="Add Left"
              onClick={() => {
                addFormation("left");
              }}
            >
              <IoIosArrowBack className="text-xl" />
            </FormationAction>
            <FormationAction
              title="Add Right"
              onClick={() => {
                addFormation("right");
              }}
            >
              <IoIosArrowForward className="text-xl" />
            </FormationAction>

            <FormationAction
              title="Add Top"
              onClick={() => {
                addFormation("top");
              }}
            >
              <IoIosArrowUp className="text-xl" />
            </FormationAction>
            <FormationAction
              title="Add Bottom"
              onClick={() => {
                addFormation("bottom");
              }}
            >
              <IoIosArrowDown className="text-xl" />
            </FormationAction>
            {/* 
            <FormationAction
              title="Tilt Vertical"
              onClick={() => {
                updateFormation(undefined, undefined, "|");
              }}
            >
              |
            </FormationAction>

            <FormationAction
              title="Tilt Horizontal"
              onClick={() => {
                updateFormation(undefined, undefined, "-");
              }}
            >
              --
            </FormationAction>

            <FormationAction
              title="Tilt Right"
              onClick={() => {
                updateFormation(undefined, undefined, "/");
              }}
            >
              /
            </FormationAction>
            <FormationAction
              title="Tilt Left"
              onClick={() => {
                updateFormation(undefined, undefined, "\\");
              }}
            >
              \
            </FormationAction> */}
            {!getSelectedFormation()?.stage && (
              <FormationAction
                title="Remove"
                onClick={() => {
                  removeFormation();
                }}
              >
                <IoIosTrash className="text-xl" />
              </FormationAction>
            )}
          </div>
        </div>
      )}

      {/* <div className="flex-1">
        <ul className="flex flex-col gap-2 items-center">
          {seatFormations.map((colFormations, colIndex) => {
            return (
              <ul key={colIndex} className="flex flex-row gap-2 items-center">
                {colFormations.map((formation, rowIndex) => {
                  return (
                    <li
                      key={rowIndex}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="flex flex-row justify-between items-center gap-2">
                        <FormationActionButtonDirectionChild
                          dir="-"
                          onClick={() =>
                            updateFormationDirection(colIndex, rowIndex, "-")
                          }
                        />
                        <FormationActionButton
                          isRemove={colIndex > 0}
                          isHorizontal={true}
                          onAdd={() => addFormation(rowIndex, colIndex, "top")}
                          onRemove={() =>
                            removeFormation(rowIndex, colIndex, "top")
                          }
                        />
                        <FormationActionButtonDirectionChild
                          dir="|"
                          onClick={() =>
                            updateFormationDirection(colIndex, rowIndex, "|")
                          }
                        />
                      </div>
                      <div className="flex flex-row justify-between items-center gap-2">
                        <FormationActionButton
                          isRemove={rowIndex > 0}
                          isHorizontal={false}
                          onAdd={() => addFormation(rowIndex, colIndex, "left")}
                          onRemove={() =>
                            removeFormation(rowIndex, colIndex, "left")
                          }
                        />
                        <TextField
                          value={formation.seats}
                          onChange={(e) =>
                            updateFormationValue(
                              colIndex,
                              rowIndex,
                              e.target.value
                            )
                          }
                        />

                        <FormationActionButton
                          isRemove={rowIndex < colFormations.length - 1}
                          isHorizontal={false}
                          onAdd={() =>
                            addFormation(rowIndex, colIndex, "right")
                          }
                          onRemove={() =>
                            removeFormation(rowIndex, colIndex, "right")
                          }
                        />
                      </div>
                      <div className="flex flex-row justify-between items-center gap-2">
                        <FormationActionButtonDirectionChild
                          dir="/"
                          onClick={() =>
                            updateFormationDirection(colIndex, rowIndex, "/")
                          }
                        />
                        <FormationActionButton
                          isRemove={colIndex < seatFormations.length - 1}
                          isHorizontal={true}
                          onAdd={() =>
                            addFormation(rowIndex, colIndex, "bottom")
                          }
                          onRemove={() =>
                            removeFormation(rowIndex, colIndex, "bottom")
                          }
                        />

                        <FormationActionButtonDirectionChild
                          dir="\"
                          onClick={() =>
                            updateFormationDirection(colIndex, rowIndex, "\\")
                          }
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </ul>
      </div>
      <div className="absolute bottom-2 flex flex-row gap-2 items-center">
        <Button color="error" onClick={onCancel}>
          Cancel
        </Button>

        <Button onClick={() => onSave(seatFormations)}>Save</Button>
      </div> */}
    </div>
  );
}
