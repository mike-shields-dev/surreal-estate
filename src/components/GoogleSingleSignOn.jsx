import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import PropTypes from "prop-types";
import css from "../styles/GoogleSingleSignOn.module.css";
import credentials from "../config/googleCredentials.json";

const { clientId } = credentials;

const GoogleSingleSignOn = ({ username, setProfile }) => {
  const onLoginSuccess = (res) => {
    setProfile(res.profileObj);
  };

  const onLogoutSuccess = () => {
    setProfile(null);
  };

  const onLoginFailure = () => {
    setProfile(null);
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

GoogleSingleSignOn.defaultProps = {
  username: "",
};

GoogleSingleSignOn.propTypes = {
  username: PropTypes.string,
  setProfile: PropTypes.func.isRequired,
};

export default GoogleSingleSignOn;
