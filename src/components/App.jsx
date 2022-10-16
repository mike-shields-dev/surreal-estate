import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProperty from "./AddProperty";
import NavBar from "./NavBar";
import Properties from "./Properties";
import GoogleSingleSignOn from "./GoogleSingleSignOn";

const App = () => {
  const [userProfile, setUserProfile] = useState({});
  const userId = userProfile?.googleId || "";
  const username = userProfile?.profileObj?.givenName || "";

  return (
    <div className="app">
      <NavBar>
        <GoogleSingleSignOn
          username={username}
          setUserProfile={setUserProfile}
        />
      </NavBar>
      <main>
        <Routes>
          <Route path="/properties" element={<Properties userId={userId} />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="*" element={<Navigate to="/properties" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
