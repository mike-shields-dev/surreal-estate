import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { gapi } from "gapi-script";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import css from "../styles/GoogleSingleSignOn.module.css";
import credentials from "../config/googleCredentials.json";

const { clientId } = credentials;

const GoogleSingleSignOn = ({ username, setUserProfile }) => {
  const onLoginSuccess = (res) => {
    setUserProfile(res);
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
      {username && <p>Welcome, {username}</p>}
      {username ? (
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={onLogoutSuccess}
          render={({ onClick }) => (
            <button className={css.button} type="button" onClick={onClick}>
              <FcGoogle />
              Logout
            </button>
          )}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          render={({ onClick }) => (
            <button className={css.button} type="button" onClick={onClick}>
              <FcGoogle />
              Login
            </button>
          )}
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy="single_host_origin"
        />
      )}
    </div>
  );
};

GoogleSingleSignOn.propTypes = {
  username: PropTypes.string.isRequired,
  setUserProfile: PropTypes.func.isRequired,
};

export default GoogleSingleSignOn;
