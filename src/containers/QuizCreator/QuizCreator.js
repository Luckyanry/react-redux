import React, {Component} from "react";
import {connect} from "react-redux";

import {
  createQuizQuestion,
  finishCreateQuiz,
} from "../../store/actions/createAction";

import {
  createControl,
  validateControl,
  validateForm,
} from "../../form/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

import classes from "./QuizCreator.module.css";

function createOptionControl(number) {
  return createControl(
    {
      id: number,
      label: `Answer ${number}`,
      errorMessage: "This field cannot be empty",
    },
    {required: true}
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Enter your question",
        errorMessage: "This field cannot be empty",
      },
      {required: true}
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  addQuestionHandler = (e) => {
    e.preventDefault();

    const {question, option1, option2, option3, option4} =
      this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = (e) => {
    e.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });

    this.props.finishCreateQuiz();
  };

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + idx}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(e) => this.changeHandler(e.target.value, controlName)}
          />
          {idx === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  }

  selectChangeHandler = (e) => {
    this.setState({rightAnswerId: +e.target.value});
  };

  render() {
    const select = (
      <Select
        label="Choose the correct answer"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Test Creator</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Create test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
