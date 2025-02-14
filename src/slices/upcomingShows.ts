import { createSlice } from "@reduxjs/toolkit";
import { Show } from "../interfaces/show";

const initialState: { value: Show[] } = { value: [] };

const upcomingShowsShowSlice = createSlice({
  name: "upcomingShowsShows",
  initialState,
  reducers: {
    clearShows: (state, _) => {
      state.value = [];
    },
    addShow: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    updateShow: (state, action) => {
      state.value = state.value.map((show) =>
        show.showId === action.payload.showId ? action.payload : show
      );
    },
    removeShow: (state, action) => {
      state.value = state.value.filter(
        (show) => show.showId === action.payload
      );
    },
  },
});

export const { clearShows, addShow, updateShow, removeShow } =
  upcomingShowsShowSlice.actions;
export default upcomingShowsShowSlice.reducer;
