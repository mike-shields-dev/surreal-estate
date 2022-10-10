import React from "react";
import PropTypes from "prop-types";
import css from "../styles/Alert.module.css";

const Alert = ({ message, isSuccess }) => {
  if (!message) return null;
  return (
    <div
      className={`
      ${css.Alert} 
      ${css[`${isSuccess ? "success" : "error"}`]}
      `}
      title="alert"
    >
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};

export default Alert;
