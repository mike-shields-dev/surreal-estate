import React from "react";
import PropTypes from "prop-types";

const Combobox = ({ field, onChange, options, value }) => {
  return (
    <label htmlFor={field}>
      {field}
      <select
        id={field}
        name={field}
        onChange={onChange}
        required
        value={value}
      >
        {options.map((option) => (
          <option key={`${option}-${field}-option`} value={option}>
            {option}
          </option>
        ))}
        <option disabled value="">
          {" "}
        </option>
      </select>
    </label>
  );
};

Combobox.defaultProps = {
  value: "",
};

Combobox.propTypes = {
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
};

export default Combobox;
