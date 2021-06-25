import React, {Component} from "react";
import {connect} from "react-redux";

import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from "../../store/actions/quizAction";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

import classes from "./Quiz.module.css";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>What result will be correct?</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              numberOfAnswer={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
