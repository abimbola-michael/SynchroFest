import { createSlice } from "@reduxjs/toolkit";

export const syncroColors: string[] = [
  "#FF00FF",
  "#00FFFF",
  "#FF00FF",
  "#8A2BE2",
  "#39FF14",
  "#FF073A",
  "#FFBF00",
  "#00BFFF",
  "#9400D3",
  "#FFFF00",
  "#FFFFFF",
];
export const syncroTextColors: string[] = [
  "white",
  "black",
  "white",
  "white",
  "black",
  "white",
  "black",
  "black",
  "white",
  "black",
  "black",
];
const initialState: { value: number } = { value: 0 };

const syncroColorslice = createSlice({
  name: "syncroColor",
  initialState,
  reducers: {
    changeColor: (state, _) => {
      state.value =
        state.value == syncroColors.length - 1 ? 0 : state.value + 1;
    },
  },
});

export const { changeColor } = syncroColorslice.actions;
export default syncroColorslice.reducer;
