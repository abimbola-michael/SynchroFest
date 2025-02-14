import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: number } = { value: 0 };

const mainTabSlice = createSlice({
  name: "mainTab",
  initialState,
  reducers: {
    updateMainTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateMainTab } = mainTabSlice.actions;
export default mainTabSlice.reducer;
