import React, { Component } from "react";
import classes from "./LoginForm.module.scss";
import Registration from "./Registration/Registration";
import Login from "./LogIn/Login";

// ({
//   login,
//   onClick,
//   onCange,
//   value,
//   isClicked,
//   valid
// }) =>

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
    this.setState({
      willReg: !this.state.willReg,
      touched: false,
    });
  };
  onLoginTogleClick = () => {
    this.setState({
      willReg: !this.state.willReg,
      touched: false,
    });
  };

  valid(value, touched, type) {
    if (!touched) return true;
    if (type === "login") return validateEmail(value);
    if (type === "password") return value.length > 5;
    else return value !== "";
  }

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
            valid={this.valid}
          />
        ) : (
          <Login
            onRegisterTogleClick={this.onRegisterTogleClick}
            login={this.state.login}
            password={this.state.password}
            onChange={(e) => this.onChange(e)}
            touched={this.state.touched}
            valid={this.valid}
          />
        )}
      </form>
    );
  }
}
