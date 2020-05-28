import React, { Component } from "react";
import "./App.module.scss";
import { Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./containers/Home/Home";
import ContactPage from "./containers/ContactPage/ContactPage";
import firebase from "firebase/app";
import "firebase/auth";

export default class App extends Component {
  state = {
    uid: null,
    route: "home",
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          uid: user.uid,
        });
      } else {
        this.setState({
          uid: null,
        });
      }
    });
  }

  logOut = (history) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        history.push("/");
      });
  };

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValid = (value, touched, type) => {
    if (!touched) return true;
    if (type.includes("login") || type.includes("email"))
      return this.validateEmail(value);
    if (type.includes("password")) return value.length > 6;
    if (type.includes("name")) return value.length !== 0;
    if (type.includes("tel")) return /^\+7\d{10}/.test(String(value));
    else return value !== "";
  };

  render() {
    return (
      <Layout>
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              isAuth={!!this.state.uid}
              isValid={this.isValid}
              logOut={this.logOut}
              {...props}
            />
          )}
        />
        <Route
          path="/contacts"
          exact
          render={(props) => (
            <ContactPage
              isValid={this.isValid}
              uid={this.state.uid}
              logOut={this.logOut}
              {...props}
            />
          )}
        />
      </Layout>
    );
  }
}
