import React from "react";
import PropTypes from "prop-types";

const SpinButton = ({ field, min, onChange, required, step, units, value }) => {
  return (
    <label htmlFor={field}>
      {field} {units}
      <input
        required={required}
        id={field}
        min={min}
        name={field}
        onChange={onChange}
        step={step}
        type="number"
        value={value}
      />
    </label>
  );
};

SpinButton.defaultProps = {
  min: null,
  units: null,
  step: null,
  required: false,
};

SpinButton.propTypes = {
  field: PropTypes.string.isRequired,
  min: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  step: PropTypes.string,
  units: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default SpinButton;
