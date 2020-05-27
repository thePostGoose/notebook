import React, { Component } from "react";
import classes from "./AddContact.module.scss";
import Button from "../UI/Button/Button";
import Imput from "../UI/Imput/Imput";

export default class AddContact extends Component {
  state = {
    email: "",
    name: "",
    tel: "",
    triedToSubmit: false,
  };

  emailOnChangeHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  nameOnChangeHandler = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  telOnChangeHandler = (event) => {
    const tel = event.target.value.toString();
    this.setState({
      tel,
    });
  };
  onClickHandler = (event, isFormValid, email, name, tel) => {
    event.preventDefault();
    if (!this.state.triedToSubmit) {
      this.setState({
        triedToSubmit: true,
      });
    } else if (isFormValid) {
      this.props.addNewContact(email, name, tel);
      this.setState({
        email: "",
        name: "",
        tel: "",
        triedToSubmit: false,
      });
    }
  };

  render() {
    const email = this.state.email;
    const tel = this.state.tel;
    const name = this.state.name;
    const isValidEmail = this.props.isValid(
      email,
      this.state.triedToSubmit,
      "email"
    );
    const isValidTel = this.props.isValid(tel, this.state.triedToSubmit, "tel");
    const isValidName = this.props.isValid(
      name,
      this.state.triedToSubmit,
      "name"
    );
    const isFormValid = isValidEmail && isValidTel && isValidName;
    // const isFormValid = isValidEmail &&;
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
              valid={isValidName}
            />
            <Imput
              onChange={this.emailOnChangeHandler}
              value={email}
              label={"email"}
              errorMessage={"Введите корректный email"}
              valid={isValidEmail}
            />
            <Imput
              onChange={this.telOnChangeHandler}
              value={tel}
              label={"номер телефона"}
              errorMessage={"Введите телефон в формате +71234567890"}
              valid={isValidTel}
            />
          </div>
          <Button
            text={true}
            onClick={(event) => {
              this.onClickHandler(event, isFormValid, email, name, tel);
            }}
          >
            {" "}
            Добавить
          </Button>
        </form>
      </section>
    );
  }
}
