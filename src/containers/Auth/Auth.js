import React, {Component} from "react";
import {connect} from "react-redux";

import {auth} from "../../store/actions/authAction";
import {validateControl} from "../../form/formFramework";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import classes from "./Auth.module.css";

class Auth extends Component {
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

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registrationHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
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

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
