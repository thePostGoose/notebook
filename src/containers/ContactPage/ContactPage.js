import React, { Component } from "react";
import Container from "../Container/Container";
import classes from "./ContactPage.module.scss";
import Search from "../../components/Search/Search";
export default class ContactPage extends Component {
  render() {
    return (
      <Container title={"Контакты"}>
        <Search />
        {/* <ContactsList /> */}
      </Container>
    );
  }
}
