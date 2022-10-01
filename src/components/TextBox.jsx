import React from "react";
import PropTypes from "prop-types";

const TextBox = ({ label, name, onChange, value, type }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
    </>
  );
};

TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default TextBox;
