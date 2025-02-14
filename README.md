# SynchroFest - Futuristic Music Festival App

Welcome to **SynchroFest!** 🎶 A futuristic music festival platform where fans can browse performances, select seats, and immerse themselves in a real-time interactive festival experience. This project showcases a dynamic interface with real-time updates, a vibrant design, and a fully functional ticket booking system.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Core Features](#core-features)
- [Setup & Installation](#setup--installation)
- [Running the App](#running-the-app)
- [Live Demo](#live-demo)
- [Challenges & Solutions](#challenges--solutions)
- [Design Inspirations](#design-inspirations)
- [Conclusion](#conclusion)
- [Submission](#submission)

## Technologies Used
- **Framework:** React + TypeScript + Vite
- **Styling:** TailwindCSS (utility-first styling) & CSS-in-JS with Styled Components
- **Seat Map Logic:** Rounded borders with seat numbers
- **Live Updates & Countdown:** `setInterval` for countdown timer
- **Data Handling:** Mock data for performances and seat availability
- **State Management:** React's `useState` and `useEffect` hooks
- **Development Tools:** VSCode, Git, npm

## Core Features
### 1. Performance Schedule & Lineup
- Displays a list or grid of upcoming performances, sorted by date and time.
- Includes a filter for searching performances by artist name, day, or genre.

### 2. Interactive Seat Selection
- A visualized venue layout allows users to view available seats and book them.
- Real-time updates on seat status, with available seats in green and booked seats in red.

### 3. Live Updates & Countdown
- Countdown timer displayed for the next scheduled performance.
- Live notifications or banners for schedule changes (e.g., performance delays or lineup changes).

### 4. Responsive & Aesthetic Design
- Fully responsive across desktops, tablets, and mobile devices.
- Vibrant, futuristic theme inspired by neon lights, cosmic colors, and holographic vibes.

## Setup & Installation
To run this app locally, follow these steps:

```bash
git clone https://github.com/abimbola-michael/SynchroFest
cd SynchroFest
npm install
npm run dev
```

This will start the app on your local server.

## Running the App
The app simulates a live experience with the following functionalities:
- View upcoming performances.
- Filter performances by artist name, genre, or date.
- Select and book seats with real-time seat availability updates.
- See live countdowns and notifications for schedule changes.

## Live Demo
Check out the live version of the app here: [SynchroFest Live](https://synchro-fest.vercel.app/)

## Challenges & Solutions
### 1. Dynamic Seat Map Rendering
- **Challenge:** Rendering a seating chart with real-time updates.
- **Solution:** Implemented a dynamic layout system where users input the number of seats, rows, and layout direction (top, right, bottom, left). Considered stage positioning to ensure correct seat arrangement.

### 2. Live Updates Simulation
- **Challenge:** No real-time backend for live updates.
- **Solution:** Simulated real-time updates using a countdown timer and state management. A real-time system can later be implemented using Node.js or Firebase Firestore.

### 3. Design Inspiration
- The app’s vibrant theme is inspired by futuristic music festivals, neon light aesthetics, and cosmic visuals. Colors like neon pink, electric blue, ultraviolet, and more enhance the immersive festival feel.

## Design Inspirations
- **Color Theme:** Neon lights, cosmic purples, and holographic effects inspired by futuristic, tech-themed festivals.
- **Typography:** Bold and modern fonts to represent the festival's energetic vibe.
- **UI Elements:** Smooth transitions and subtle animations for seat booking, countdown, and updates to reflect the excitement of live events.

## Conclusion
This project was an exciting challenge, focusing on real-time updates, immersive design, and a responsive UI. **SynchroFest** aims to bring fans closer to the action while ensuring smooth ticketing and seat selection.

## Submission
- **GitHub Repo:** [SynchroFest Repository](https://github.com/abimbola-michael/SynchroFest)
- **Live Demo:** [Watch Live Demo](https://drive.google.com/file/d/109p0kHZyvFMoG7xHX1iDU38RSPplrYxL/view?usp=drive_link)

