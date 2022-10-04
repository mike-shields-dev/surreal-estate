import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/TextBox.module.css";

const TextBox = ({ field, onChange, value, type }) => {
  return (
    <>
      <label htmlFor={field} className={styles.textbox__label}>
        {field}
      </label>
      <input
        id={field}
        name={field}
        onChange={onChange}
        type={type}
        value={value}
      />
    </>
  );
};

TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextBox;
