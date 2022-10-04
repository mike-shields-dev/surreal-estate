import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/ComboBox.module.css";

const Combobox = ({ field, onChange, value, values }) => {
  return (
    <>
      <label htmlFor={field} className={styles.combobox__label}>
        {field}
      </label>
      <select id={field} {...{ name: field, value, onChange }}>
        {values.map((val) => {
          const id = `${val}-${field}-option`;
          return (
            <option key={id} value={val}>
              {val}
            </option>
          );
        })}
      </select>
    </>
  );
};

Combobox.propTypes = {
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Combobox;
