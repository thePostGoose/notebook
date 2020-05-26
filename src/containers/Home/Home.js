import React, { Component } from "react";
import Container from "../Container/Container";
import Auth from "../../components/Auth/Auth";
import Contacts from "../../components/Contacts/Contacts";
import firebase from "firebase";
import classes from "./Home.module.scss";

export const hendlerContext = React.createContext();

export default class Home extends Component {
  state = {
    loading: false,
    auth: null,
  };

  registerHandler = async (event, email, password) => {
    event.preventDefault();
    this.setState({
      loading: true,
      auth: null,
    });
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const uid = user.user.uid;
      this.props.getUID(uid);
      this.setState({
        loading: false,
        auth: "success register",
      });
    } catch (e) {
      this.setState({
        loading: false,
        auth: e.message,
      });
    }
  };

  loginHandler = async (event, email, password) => {
    event.preventDefault();
    this.setState({
      loading: true,
      auth: null,
    });
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const uid = user.user.uid;
      this.props.getUID(uid);
      this.setState({
        loading: false,
        auth: "success login",
      });
    } catch (e) {
      this.setState({
        loading: false,
        auth: e.message,
      });
    }
  };

  render() {
    let message;
    let disabled = true;
    if (this.state.auth === "success register") {
      message = (
        <p className={classes.message}>Вы успешно зарегистрировались!</p>
      );
    } else if (this.state.auth === "success login") {
      message = <p className={classes.message}>Добро пожаловать!</p>;
    } else {
      disabled = false;
    }
    return (
      <Container title={"Личный кабинет"}>
        <hendlerContext.Provider
          value={{
            registerHandler: this.registerHandler,
            loginHandler: this.loginHandler,
            loading: this.state.loading,
            auth: this.state.auth,
          }}
        >
          <Auth auth={this.state.auth} disabled={disabled} />
        </hendlerContext.Provider>
        {disabled ? message : null}
        <Contacts isAuth={this.props.isAuth} />
      </Container>
    );
  }
}
