import React from "react";
import PropTypes from "prop-types";

const Combobox = ({ field, onChange, options, value }) => {
  return (
    <label htmlFor={field}>
      {field}
      <select
        required
        id={field}
        name={field}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled>
          {" "}
        </option>
        {options.map((option) => {
          const id = `${option}-${field}-option`;
          return (
            <option key={id} value={option}>
              {option}
            </option>
          );
        })}
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
