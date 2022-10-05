import React from "react";
import PropTypes from "prop-types";

const SpinButton = ({ field, min, onChange, step, units, value }) => {
  return (
    <label htmlFor={field}>
      {field} {units}
      <input
        required
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
};

SpinButton.propTypes = {
  field: PropTypes.string.isRequired,
  min: PropTypes.string,
  value: PropTypes.string.isRequired,
  step: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  units: PropTypes.string,
};

export default SpinButton;
