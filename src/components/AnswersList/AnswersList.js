import React from "react";

import AnswerItem from "../AnswerItem/AnswerItem";

import classes from "./AnswersList.module.css";

const AnswersList = (props) => (
  <ul className={classes.AnswersList}>
    {props.answers.map((answer, idx) => (
      <AnswerItem
        key={idx}
        state={props.state ? props.state[answer.id] : null}
        answer={answer}
        onAnswerClick={props.onAnswerClick}
      />
    ))}
  </ul>
);

export default AnswersList;
