import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user";

const initialState: { value: User | undefined } = { value: undefined };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
