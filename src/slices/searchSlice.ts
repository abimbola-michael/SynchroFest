import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: string } = { value: "" };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;
