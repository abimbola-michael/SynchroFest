// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import SceduledShowsReducer from "./slices/sceduledShowsSlice";
import CompletedShowsReducer from "./slices/completedShows";
import LiveShowsReducer from "./slices/liveShowsSlice";
import UpcomingShowsReducer from "./slices/upcomingShows";
import SavedShowsReducer from "./slices/savedShowsSlice";
import BookingsReducer from "./slices/bookingsSlice";
import SyncroColorReducer from "./slices/sycroColorSlice";
import VenueReducer from "./slices/venueSlice";
import MainTabReducer from "./slices/mainTabSlice";
import SearchReducer from "./slices/searchSlice";
import UserReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    scheduledShows: SceduledShowsReducer,
    completedShows: CompletedShowsReducer,
    liveShows: LiveShowsReducer,
    upcomingShows: UpcomingShowsReducer,
    savedShows: SavedShowsReducer,
    bookings: BookingsReducer,
    syncroColor: SyncroColorReducer,
    venue: VenueReducer,
    mainTab: MainTabReducer,
    search: SearchReducer,
    user: UserReducer,
  },
});
// Export RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
