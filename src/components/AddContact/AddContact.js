import React, { Component } from "react";
import classes from "./AddContact.module.scss";
import Button from "../UI/Button/Button";
import Imput from "../UI/Imput/Imput";

export default class AddContact extends Component {
  state = {
    email: "",
    name: "",
    tel: "",
    isNameValid: true,
    isEmailValid: true,
    isTelValid: true,
    triedToSubmit: false,
    addedEarly: false,
  };

  emailOnChangeHandler = (event) => {
    const isEmailValid = this.props.isValid(event.target.value, true, "email");
    if (this.state.triedToSubmit) {
      this.setState({
        email: event.target.value,
        isEmailValid,
      });
    } else {
      this.setState({
        email: event.target.value,
      });
    }
  };
  nameOnChangeHandler = (event) => {
    const isNamelValid = this.props.isValid(event.target.value, true, "name");
    if (this.state.triedToSubmit) {
      this.setState({
        name: event.target.value,
        isNamelValid,
      });
    } else {
      this.setState({
        name: event.target.value,
      });
    }
  };
  telOnChangeHandler = (event) => {
    const isTelValid = this.props.isValid(event.target.value, true, "tel");
    if (isTelValid && this.state.triedToSubmit) {
      this.setState({
        tel: event.target.value,
        isTelValid,
      });
    } else {
      this.setState({
        tel: event.target.value,
      });
    }
  };
  onClickHandler = (event, email, name, tel) => {
    event.preventDefault();
    const isEmailValid = this.props.isValid(email, true, "email");
    const isNameValid = this.props.isValid(name, true, "name");
    const isTelValid = this.props.isValid(tel, true, "tel");
    const isFormValid = isEmailValid && isNameValid && isTelValid;

    if (isFormValid) {
      const status = this.props.addNewContact(email, name, tel);
      if (status) {
        this.setState({
          email: "",
          name: "",
          tel: "",
          triedToSubmit: false,
          addedEarly: false,
        });
      } else
        this.setState({
          triedToSubmit: true,
          addedEarly: true,
        });
    } else {
      this.setState({
        triedToSubmit: true,
        isEmailValid,
        isNameValid,
        isTelValid,
      });
    }
  };

  render() {
    const email = this.state.email;
    const tel = this.state.tel;
    const name = this.state.name;
    return (
      <section className={classes.AddContact}>
        <h3>Добавить контакт</h3>
        <form className={classes.wrapper}>
          <div className={classes["inputs-container"]}>
            <Imput
              onChange={this.nameOnChangeHandler}
              value={name}
              label={"имя"}
              errorMessage={"Имя не может быть пустым"}
              valid={this.state.isNameValid}
            />
            <Imput
              onChange={this.emailOnChangeHandler}
              value={email}
              label={"email"}
              errorMessage={"Введите корректный email"}
              valid={this.state.isEmailValid}
            />
            <Imput
              onChange={this.telOnChangeHandler}
              value={tel}
              label={"номер телефона"}
              errorMessage={"Введите телефон в формате +71234567890"}
              valid={this.state.isTelValid}
            />
          </div>
          <Button
            text={true}
            onClick={(event) => {
              this.onClickHandler(event, email, name, tel);
            }}
          >
            {" "}
            Добавить
          </Button>
        </form>
        {this.state.addedEarly ? (
          <p className={classes["error-message"]}>
            контакт уже был добавлен ранее
          </p>
        ) : null}
      </section>
    );
  }
}
