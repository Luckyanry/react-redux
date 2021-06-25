import React from "react";
import classes from "./AnswerItem.module.css";

const AnswerItem = (props) => {
  const clsArr = [classes.AnswerItem];

  if (props.state) {
    clsArr.push(classes[props.state]);
  }

  return (
    <li
      className={clsArr.join(" ")}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
