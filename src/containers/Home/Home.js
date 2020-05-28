import React, { Component } from "react";
import Container from "../Container/Container";
import Auth from "../../components/Auth/Auth";
import Contacts from "../../components/Contacts/Contacts";
import firebase from "firebase/app";
import "firebase/auth";
import classes from "./Home.module.scss";
import Button from "../../components/UI/Button/Button";
export const hendlerContext = React.createContext();

export default class Home extends Component {
  state = {
    loading: false,
    authStatus: null,
  };
  logOut = (history) => {
    this.props.logOut(history);
    this.setState({
      authStatus: null,
    });
  };
  goToContacts = () => {
    this.props.history.push("/contacts");
  };
  clearErrorMessageAtForm = () => {
    this.setState({
      authStatus: null,
    });
  };
  registerHandler = async (event, email, password) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.setState({
        loading: false,
        authStatus: "success register",
      });
    } catch (e) {
      this.setState({
        loading: false,
        authStatus: e.message,
      });
    }
  };

  loginHandler = async (event, email, password) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({
        loading: false,
        authStatus: "success login",
      });
    } catch (e) {
      this.setState({
        loading: false,
        authStatus: e.message,
      });
    }
  };

  render() {
    let message;
    let disabled = true;
    if (this.state.authStatus === "success register") {
      message = (
        <p className={classes.message}>Вы успешно зарегистрировались!</p>
      );
    } else if (this.state.authStatus === "success login" || this.props.isAuth) {
      message = <p className={classes.message}>Вы успешно авторизовались</p>;
    } else {
      disabled = false;
    }
    const history = this.props.history;

    return (
      <Container title={"Личный кабинет"} home={true}>
        <hendlerContext.Provider
          value={{
            registerHandler: this.registerHandler,
            loginHandler: this.loginHandler,
            loading: this.state.loading,
            authStatus: this.state.authStatus,
          }}
        >
          <Auth
            disabled={disabled}
            isValid={this.props.isValid}
            clearErrorMessageAtForm={this.clearErrorMessageAtForm}
          />
        </hendlerContext.Provider>
        {disabled ? message : null}
        <Contacts isAuth={this.props.isAuth} onClick={this.goToContacts} />
        {this.props.isAuth ? (
          <Button text={true} onClick={() => this.logOut(history)}>
            Выйти
          </Button>
        ) : null}
      </Container>
    );
  }
}
