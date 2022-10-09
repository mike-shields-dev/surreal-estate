import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/TextBox.module.css";

const TextBox = ({ field, maxLength, onChange, value, type }) => {
  return (
    <div className={styles.textbox}>
      <label htmlFor={field} className={styles.textbox__label}>
        {field}
      </label>
      <input
        required
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
};

TextBox.propTypes = {
  field: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextBox;
