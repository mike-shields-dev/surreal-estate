import React from "react";
import PropTypes from "prop-types";
import css from "../styles/Alert.module.css";

const Alert = ({ message, isSuccess }) => {
  if (!message) return null;
  return (
    <div
      className={isSuccess ? css["alert--success"] : css["alert--error"]}
      data-testid="alert"
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
