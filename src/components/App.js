import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../styles/app.css";
import AddProperty from "./AddProperty";
import NavBar from "./NavBar";
import Properties from "./Properties";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <h2>Surreal Estate</h2>
      <Routes>
        <Route path="/properties" element={<Properties />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="*" element={<Navigate to="/properties" />} />
      </Routes>
    </div>
  );
};

export default App;
