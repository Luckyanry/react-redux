import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const clsArr = [classes.Button, classes[props.type]];

  return (
    <button
      className={clsArr.join(" ")}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
