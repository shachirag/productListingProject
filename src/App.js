import React from "react";
import Signup from "./components/signup/Signup.js";
import Login from "./components/login/Login.js";
import Home from "./components/home/Home.js";
import LoginPopup from "./components/popups/LoginPopup.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/loginpopup" element={<LoginPopup />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
