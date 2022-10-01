import React from "react";
import PropTypes from "prop-types";

const SpinButton = ({ label, min, name, value, step, onChange }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        min={min}
        name={name}
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
};

SpinButton.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SpinButton;
