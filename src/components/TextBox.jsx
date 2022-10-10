import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/TextBox.module.css";

const TextBox = ({ field, maxLength, onChange, required, type, value }) => {
  return (
    <div className={styles.textbox}>
      <label htmlFor={field} className={styles.textbox__label}>
        {field}
      </label>
      <input
        required={required}
        id={field}
        name={field}
        onChange={onChange}
        type={type}
        value={value}
        maxLength={maxLength}
      />
    </div>
  );
};

TextBox.defaultProps = {
  maxLength: null,
  required: false,
};

TextBox.propTypes = {
  field: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextBox;
