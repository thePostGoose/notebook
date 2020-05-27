import React, { Component } from "react";
import Button from "../UI/Button/Button";
import LoginForm from "../LoginForm/LoginForm";
import classes from "./Auth.module.scss";

export default class Auth extends Component {
  state = {
    isClicked: false,
  };

  onClickAuthHandler = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };
  render() {
    const cls = [classes.Auth];
    if (this.props.disabled) cls.push(classes.disabled);
    return (
      <div className={cls.join(" ")}>
        <Button
          onClick={this.onClickAuthHandler}
          disabled={this.props.disabled}
        >
          Авторизация
        </Button>
        {this.state.isClicked && !this.props.disabled && (
          <section>
            <LoginForm
              isClicked={this.state.isClicked}
              isValid={this.props.isValid}
              clearErrorMessageAtForm={this.props.clearErrorMessageAtForm}
            />
          </section>
        )}
      </div>
    );
  }
}
