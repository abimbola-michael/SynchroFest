import { createSlice } from "@reduxjs/toolkit";
import { Venue } from "../interfaces/venue";

const initialState: { value: Venue | undefined } = { value: undefined };

const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    updateVenue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateVenue } = venueSlice.actions;
export default venueSlice.reducer;
