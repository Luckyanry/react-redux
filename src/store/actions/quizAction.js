import axiosQuiz from "../../server/axios-quiz";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE,
} from "./actionTypes";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axiosQuiz.get("/quizes.json");

      const quizes = [];

      Object.keys(response.data).forEach((key, idx) => {
        quizes.push({id: key, name: `Test #${idx + 1}`});
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axiosQuiz.get(`/quizes/${quizId}.json`);

      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];

      if (state.answerState[key] === "success") {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      dispatch(quizSetState({[answerId]: "success"}, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNestQuestion(state.activeQuestion + 1));
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";

      dispatch(quizSetState({[answerId]: "error"}, results));
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNestQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber,
  };
}
