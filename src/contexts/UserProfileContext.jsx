import React, { useState, useMemo, createContext } from "react";
import PropTypes from "prop-types";

const UserProfileContext = createContext();

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const value = useMemo(
    () => ({
      userProfile,
      setUserProfile,
    }),
    [userProfile]
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

UserProfileProvider.defaultProps = {
  children: null,
};

UserProfileProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export { UserProfileContext, UserProfileProvider };
