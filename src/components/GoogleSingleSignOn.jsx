import React, { useEffect, useContext } from "react";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { UserProfileContext } from "../contexts/UserProfileContext";
import css from "../styles/GoogleSingleSignOn.module.css";
import credentials from "../config/googleCredentials.json";

const { clientId } = credentials;

const GoogleSingleSignOn = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const username = userProfile?.givenName;

  const onLoginSuccess = (res) => {
    setUserProfile(res.profileObj);
  };

  const onLogoutSuccess = () => {
    setUserProfile(null);
  };

  const onLoginFailure = () => {
    setUserProfile(null);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <div className={css.GoogleSingleSignOn}>
      {username && <div>Welcome, {username}</div>}
      {username ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy="single_host_origin"
        />
      )}
    </div>
  );
};

export default GoogleSingleSignOn;
