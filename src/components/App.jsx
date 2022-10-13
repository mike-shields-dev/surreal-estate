import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProperty from "./AddProperty";
import NavBar from "./NavBar";
import Properties from "./Properties";
import GoogleSingleSignOn from "./GoogleSingleSignOn";

const App = () => {
  const [profile, setProfile] = useState("");

  return (
    <div className="app">
      <NavBar>
        <GoogleSingleSignOn
          username={profile && profile.givenName}
          setProfile={setProfile}
        />
      </NavBar>
      <main>
        <Routes>
          <Route path="/properties" element={<Properties />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="*" element={<Navigate to="/properties" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
