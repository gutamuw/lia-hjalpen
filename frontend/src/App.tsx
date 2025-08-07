import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterUser from "./pages/RegisterUser";
import AboutPage from "./pages/AboutPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<div>404 - Sidan kunde inte hittas</div>} />
        <Route path="/userprofile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
