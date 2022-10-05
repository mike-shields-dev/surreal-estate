import React from "react";
import PropTypes from "prop-types";

const Combobox = ({ field, onChange, value, values }) => {
  return (
    <label htmlFor={field}>
      {field}
      <select required id={field} {...{ name: field, value, onChange }}>
        <option value="" disabled>
          {" "}
        </option>
        {values.map((val) => {
          const id = `${val}-${field}-option`;
          return (
            <option key={id} value={val}>
              {val}
            </option>
          );
        })}
      </select>
    </label>
  );
};

Combobox.propTypes = {
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Combobox;
