import React, { Component } from "react";
import classes from "./Contact.module.scss";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import NewContact from "../AddContact/NewContact/NewContact";

export default class Contact extends Component {
  state = {
    name: this.props.name,
    isNameValid: true,

    email: this.props.email,
    isEmailValid: true,

    tel: this.props.tel,
    isTelValid: true,

    hash: this.props.hash,

    isModifiing: false,
  };

  nameOnChangeHandler = (event) => {
    const name = event.target.value;
    const isNameValid = this.props.isValid(name, true, "name");
    this.setState({
      name,
      isNameValid,
    });
  };
  emailOnChangeHandler = (event) => {
    const email = event.target.value;
    const isEmailValid = this.props.isValid(email, true, "email");
    this.setState({
      email,
      isEmailValid,
    });
  };
  telOnChangeHandler = (event) => {
    const tel = event.target.value;
    const isTelValid = this.props.isValid(tel, true, "tel");
    this.setState({
      tel,
      isTelValid,
    });
  };
  toggleModifying = () => {
    this.setState({
      isModifiing: !this.state.isModifiing,
    });
  };
  saveChangedContact = () => {
    if (!(this.state.name && this.state.email && this.state.tel)) return;
    if (
      !(
        this.state.isNameValid &&
        this.state.isEmailValid &&
        this.state.isTelValid
      )
    )
      return;
    const updates = new NewContact(
      this.state.name,
      this.state.email,
      this.state.tel
    );
    if (updates.hash !== this.state.hash) {
      this.props.changeHandler(this.props.hash, updates);
      this.setState({
        hash: updates.hash,
        isModifiing: !this.state.isModifiing,
      });
    } else {
      this.setState({
        isModifiing: !this.state.isModifiing,
      });
    }
  };
  deleteHandler = () => {
    this.props.deleteHandler(this.state.hash);
  };
  render() {
    const cls = [classes.Contact];
    if (this.state.isModifiing) cls.push(classes.isModifiing);
    return (
      <div className={cls.join(" ")}>
        {!this.state.isModifiing ? (
          <div className={classes["info-container"]}>
            <h3 className={classes.str}>{this.state.name}</h3>
            <p className={classes.str}>{this.state.email}</p>
            <p className={classes.str}>{this.state.tel}</p>
          </div>
        ) : (
          <div className={classes["inputs-container"]}>
            <Input
              onChange={this.nameOnChangeHandler}
              value={this.state.name}
              label={"имя"}
              errorMessage={"Имя не может быть пустым"}
              valid={this.state.isNameValid}
            />
            <Input
              onChange={this.emailOnChangeHandler}
              value={this.state.email}
              label={"email"}
              errorMessage={"Введите корректный email"}
              valid={this.state.isEmailValid}
            />
            <Input
              onChange={this.telOnChangeHandler}
              value={this.state.tel}
              label={"номер телефона"}
              errorMessage={"Введите телефон в формате +71234567890"}
              valid={this.state.isTelValid}
            />
          </div>
        )}
        <div className={classes["btn-container"]}>
          <Button onClick={this.deleteHandler}>x</Button>
          {!this.state.isModifiing ? (
            <Button onClick={this.toggleModifying}>изменить</Button>
          ) : (
            <Button onClick={this.saveChangedContact} text={"true"}>
              применить
            </Button>
          )}
        </div>
      </div>
    );
  }
}
