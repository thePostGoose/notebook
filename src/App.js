import React, { Component } from "react";
import "./App.module.scss";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./containers/Home/Home";
import ContactPage from "./containers/ContactPage/ContactPage";

export default class App extends Component {
  state = {
    uid: null,
  };
  getUID = (uid) =>  {
    this.setState({
      uid,
    });
  }

  render() {
    return (
      <Layout>
        <Home getUID={this.getUID} isAuth={!!this.state.uid}/>
        {/* <ContactPage /> */}
      </Layout>
    );
  }
}
