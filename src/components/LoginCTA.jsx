import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import css from "../styles/LoginCTA.module.css";

const LoginCTA = ({ userId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/properties");
  }, [userId]);

  return (
    <div className={css.LoginCTA}>
      <div className={css.LoginCTA__panel}>
        <p>Please login for full access</p>
        <button type="button" onClick={() => navigate("/properties")}>
          OK
        </button>
      </div>
    </div>
  );
};

LoginCTA.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default LoginCTA;
