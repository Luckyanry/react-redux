import React from "react";

import AnswersList from "../AnswersList/AnswersList";

import classes from "./ActiveQuiz.module.css";

const ActiveQuiz = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.numberOfAnswer}. </strong>
        {props.question}
      </span>

      <small>
        {props.numberOfAnswer} of {props.quizLength}
      </small>
    </p>

    <AnswersList
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);

export default ActiveQuiz;
