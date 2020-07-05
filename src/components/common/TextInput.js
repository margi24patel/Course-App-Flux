import React from "react";
import PropTypes from "prop-types";

const TextInput = (props) => {
  let warpperClass = "form-group";
  if (props.error.length > 0) {
    warpperClass += "has-error";
  }
  return (
    <div className={warpperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.label}
          type="text"
          name={props.name}
          className="form-control"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error} </div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
};
export default TextInput;
