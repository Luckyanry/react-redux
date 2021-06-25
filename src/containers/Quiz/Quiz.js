import React, {Component} from "react";

import axios from "../../server/axios-quiz";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

import classes from "./Quiz.module.css";

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' 'error'}
    isFinished: false,
    results: {}, // {[id]: success error}
    quiz: [],
    loading: true,
  };

  handlerClickOnAnswer = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      this.setState({
        answerState: {[answerId]: "success"},
        results,
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";

      this.setState({
        answerState: {[answerId]: "error"},
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/quizes/${this.props.match.params.id}.json`
      );

      const quiz = response.data;

      this.setState({
        quiz,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>What result will be correct?</h1>

          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.handlerClickOnAnswer}
              quizLength={this.state.quiz.length}
              numberOfAnswer={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
// {/* this.state.quiz.map((question) => ( */}
// {/* )) */}

// {
//   question: "const result = '10' + 20 + 30;",
//   rightAnswerId: 4,
//   id: 1,
//   answers: [
//     {text: "60", id: 1},
//     {text: "NaN", id: 2},
//     {text: "1050", id: 3},
//     {text: "102030", id: 4},
//   ],
// },
// {
//   question: "const result = typeof NaN;",
//   rightAnswerId: 3,
//   id: 2,
//   answers: [
//     {text: "NaN", id: 1},
//     {text: "object", id: 2},
//     {text: "number", id: 3},
//     {text: "undefined", id: 4},
//   ],
// },
