import { createSlice } from "@reduxjs/toolkit";
import { Booking } from "../interfaces/booking";

const initialState: { value: Booking[] } = { value: [] };

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearBookings: (state, action) => {
      state.value = [];
    },
    addBooking: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    updateBooking: (state, action) => {
      state.value.map((booking) =>
        booking.bookingId === action.payload.bookingId
          ? action.payload
          : booking
      );
    },
    removeBooking: (state, action) => {
      state.value.filter((booking) => booking.bookingId === action.payload);
    },
  },
});

export const { clearBookings, addBooking, updateBooking, removeBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
