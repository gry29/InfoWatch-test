import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function  Checkbox({ children, checked, onChange, name }) {
  return (
    <label className="checkbox" style={{ userSelect: "none" }}>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox__lable">{children}</span>
    </label>
  );
}

Checkbox.propTypes = {};

export default Checkbox;
