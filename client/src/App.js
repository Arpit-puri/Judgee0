import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register.js";
function App() {
  return (
  <>
  <Routes>
    <Route path="/" Component={MainPage}/>
    <Route path="/register" Component={Register}/>
    <Route path="/login" Component={Login}/>
  </Routes>   
  </>
  );
}

export default App;
