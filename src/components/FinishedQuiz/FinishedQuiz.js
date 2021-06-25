import React from "react";
import {Link} from "react-router-dom";

import Button from "../UI/Button/Button";

import classes from "./FinishedQuiz.module.css";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, idx) => {
          const classesArr = [
            "fa",
            props.results[quizItem.id] === "success" ? "fa-check" : "fa-times",
            classes[props.results[quizItem.id]],
          ];

          return (
            <li key={idx}>
              <strong>{idx + 1}</strong>. &nbsp;
              {quizItem.question}
              <i className={classesArr.join(" ")} />
            </li>
          );
        })}
      </ul>

      <p>
        Right answers {successCount} of {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type="primary">
          Repeat
        </Button>
        <Link to="/">
          <Button type="success">Go back to the list of tests</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
