import React, { Component } from "react";
import classes from "./LoginForm.module.scss";
import Registration from "./Registration/Registration";
import Login from "./LogIn/Login";

export default class LoginForm extends Component {
  state = {
    willReg: false,
    login: "",
    password: "",
    touched: false,
  };

  onChange = (event) => {
    const touched = true;
    if (event.target.type === "password") {
      this.setState({
        password: event.target.value,
        touched,
      });
    }
    if (event.target.type === "text") {
      this.setState({
        login: event.target.value,
        touched,
      });
    }
  };

  onRegisterTogleClick = () => {
    this.props.clearErrorMessageAtForm();
    this.setState({
      willReg: !this.state.willReg,
      touched: false,
    });
  };
  onLoginTogleClick = () => {
    this.props.clearErrorMessageAtForm();
    this.setState({
      willReg: !this.state.willReg,
      touched: false,
    });
  };

  render() {
    const cls = [classes.LoginForm];
    if (this.props.isClicked) cls.push(classes.fade);
    return (
      <form className={cls.join(" ")}>
        {this.state.willReg ? (
          <Registration
            onLoginTogleClick={this.onLoginTogleClick}
            login={this.state.login}
            password={this.state.password}
            onChange={(e) => this.onChange(e)}
            touched={this.state.touched}
            valid={this.props.isValid}
          />
        ) : (
          <Login
            onRegisterTogleClick={this.onRegisterTogleClick}
            login={this.state.login}
            password={this.state.password}
            onChange={(e) => this.onChange(e)}
            touched={this.state.touched}
            valid={this.props.isValid}
          />
        )}
      </form>
    );
  }
}
