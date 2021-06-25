import React, {Component} from "react";
import axios from "axios";

import {validateControl} from "../../form/formFramework";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import classes from "./Auth.module.css";

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        label: "Email",
        type: "email",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "The email you entered is incorrect",
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        label: "Password",
        type: "password",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Password must be at least 6 characters long",
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN7Y-jxEy6raeWtBi6Doidz828YIYwq7Y",
        authData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  registrationHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN7Y-jxEy6raeWtBi6Doidz828YIYwq7Y",
        authData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(
      (name) => (isFormValid = formControls[name].valid && isFormValid)
    );

    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + idx}
          label={control.label}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(e) => this.onChangeHandler(e, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              LogIn
            </Button>

            <Button
              type="primary"
              onClick={this.registrationHandler}
              disabled={!this.state.isFormValid}
            >
              Registration
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
