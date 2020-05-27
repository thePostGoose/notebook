import React, { Component } from "react";
import "./App.module.scss";
import { Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./containers/Home/Home";
import ContactPage from "./containers/ContactPage/ContactPage";
export default class App extends Component {
  state = {
    uid: null,
    route: "home",
  };
  componentDidMount() {
    this.setState({
      uid: JSON.parse(sessionStorage.getItem("uid")) || null,
    });
  }
  logOut = (history) => {
    sessionStorage.removeItem("uid");
    this.setState({
      uid: null,
    });
    history.push("/");
  };

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getUID = (uid) => {
    sessionStorage.setItem("uid", JSON.stringify(uid));
    this.setState({
      uid,
    });
  };

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
              getUID={this.getUID}
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
