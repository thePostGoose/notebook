import React, { Component } from "react";
import Container from "../Container/Container";
import classes from "./ContactPage.module.scss";
import Search from "../../components/Search/Search";
import ContactList from "../../components/ContactList/ContactList";
import Button from "../../components/UI/Button/Button";

function filterAddedContacts(list, email, name, tel) {
  if (
    list.email.toLowerCase() === email.toLowerCase() &&
    list.name.toLowerCase() === name.toLowerCase() &&
    list.tel.toLowerCase() === tel.toLowerCase()
  ) {
    return true;
  }
  return false;
}

export default class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      contacts: [
        {
          name: "Jon Doe",
          email: "test@test.test",
          tel: "+79643212343",
        },
        {
          name: "Ivan Putin",
          email: "res@res.res",
          tel: "+71111111111",
        },
      ],
      search: "",
    };
  }
  componentDidMount() {
    const uid = JSON.parse(sessionStorage.getItem("uid")) || null;
    this.setState({
      uid,
    });
    if (!uid) this.props.history.push("/");
  }

  searchOnChangeHandler = (event) => {
    this.setState({
      search: event.target.value,
    });
  };
  addNewContact = (email, name, tel) => {
    console.log(this.state.contacts)
    if (
      this.state.contacts.filter((list) =>
        filterAddedContacts(list, email, name, tel)
      ).length === 0
    ) {
      this.setState({
        contacts: this.state.contacts.concat({
          email,
          name,
          tel,
        }),
      });
    }
  };
  render() {
    const history = this.props.history;
    return (
      <Container title={"Контакты"}>
        <div className={classes.wrapper}>
          <Search
            value={this.state.search}
            onChange={this.searchOnChangeHandler}
          />
          <ContactList
            contacts={this.state.contacts}
            search={this.state.search}
            isValid={this.props.isValid}
            addNewContact={this.addNewContact}
          />
        </div>
        <Button text={true} onClick={() => this.props.logOut(history)}>
          Выйти
        </Button>
      </Container>
    );
  }
}
