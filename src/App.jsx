import { Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import JournalPage from "./pages/JournalPage.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/journal" element={<JournalPage />} />
      </Routes>
    </>
  );
}
