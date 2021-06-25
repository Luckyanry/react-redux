import React from "react";
import classes from "./Input.module.css";

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const inputType = props.type || "text";
  const clsArr = [classes.Input];
  const htmlFor = `${inputType}-${Math.random().toFixed(3) * 1000}`;

  if (isInvalid(props)) {
    clsArr.push(classes.invalid);
  }

  return (
    <div className={clsArr.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || "Enter the correct value"}</span>
      ) : null}
    </div>
  );
};

export default Input;
