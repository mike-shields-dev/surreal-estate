import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/SpinButton.module.css";

const SpinButton = ({ field, min, value, step, onChange, units }) => {
  return (
    <>
      <label htmlFor={field} className={styles.spinbutton__label}>
        {field} {units}
      </label>
      <input
        id={field}
        min={min}
        name={field}
        onChange={onChange}
        step={step}
        type="number"
        value={value}
      />
    </>
  );
};

SpinButton.defaultProps = {
  min: null,
  units: null,
};

SpinButton.propTypes = {
  field: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  units: PropTypes.string,
};

export default SpinButton;
