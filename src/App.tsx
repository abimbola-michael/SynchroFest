import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Bookings from "./pages/bookings";
import SceduledShows from "./pages/scheduled_shows";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ShowPage from "./pages/show_display";
import SavedShows from "./pages/saved_shows";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "./slices/sycroColorSlice";
import Profile from "./pages/profile";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFFFFF" },
    secondary: { main: "#FFFFFF" },
    text: {
      primary: "#ffffff", // Set default text color to white
      secondary: "#cccccc", // Optional: Set secondary text color
    },
    background: {
      default: "#121212", // Optional: Set background to dark mode
      paper: "#1e1e1e",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    function startTimer() {
      return setInterval(() => {
        dispatch(changeColor(""));
      }, 3000);
    }
    const timer = startTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/scheduled_shows" element={<SceduledShows />} />
          <Route path="/saved_shows" element={<SavedShows />} />
          <Route path="/show:id" element={<ShowPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
