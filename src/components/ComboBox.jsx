import React from "react";
import PropTypes from "prop-types";

const Combobox = ({ value, label, name, onChange, values }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={name} {...{ name, value, onChange }}>
        {values.map((val) => {
          const id = `${val}-${name}-option`;
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
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Combobox;
