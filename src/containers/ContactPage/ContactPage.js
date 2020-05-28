import React, { Component } from "react";
import Container from "../Container/Container";
import classes from "./ContactPage.module.scss";
import Search from "../../components/Search/Search";
import ContactList from "../../components/ContactList/ContactList";
import Button from "../../components/UI/Button/Button";
import NewContact from "../../components/AddContact/NewContact/NewContact";
import firebase from "firebase/app";
import "firebase/database";

export default class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      contacts: [],
      search: "",
      newContact: {},
      loading: false,
    };
  }

  writeUserData = (newContact) => {
    firebase
      .database()
      .ref(`/${this.state.uid}/${newContact.hash}/`)
      .set(newContact);
  };

  componentDidMount() {
    this.setState({
      loading: true
    })
    if (!this.state.uid) this.props.history.push("/");
    let ref = firebase.database().ref(`/${this.state.uid}/`);
    ref.on("value", (snapshot) => {
      const contacts = [];
      const state = snapshot.val();
      for (let key in state) {
        contacts.push(
          new NewContact(state[key].name, state[key].email, state[key].tel)
        );
      }
      this.setState({ contacts, loading: false });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData(this.state.newContact);
    }
  }

  searchOnChangeHandler = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  addNewContact = (email, name, tel) => {
    const newContact = new NewContact(name, email, tel);

    if (!this.state.contacts.some((list) => list.hash === newContact.hash)) {
      this.setState({
        contacts: this.state.contacts.concat(newContact),
        newContact,
      });
      return true;
    }
    return false;
  };
  deleteHandler = (hash) => {
    firebase.database().ref(`/${this.state.uid}/${hash}/`).remove();
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
            deleteHandler={this.deleteHandler}
            loading={this.state.loading}
          />
        </div>
        <Button text={true} onClick={() => this.props.logOut(history)}>
          Выйти
        </Button>
      </Container>
    );
  }
}
