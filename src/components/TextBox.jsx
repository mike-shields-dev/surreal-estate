import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/TextBox.module.css";

const TextBox = ({ field, onChange, value, type }) => {
  return (
    <label htmlFor={field} className={styles.textbox__label}>
      {field}
      <input
        required
        id={field}
        name={field}
        onChange={onChange}
        type={type}
        value={value}
      />
    </label>
  );
};

TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextBox;
