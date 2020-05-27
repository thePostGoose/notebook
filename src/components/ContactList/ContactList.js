import React from "react";
import classes from "./ContactList.module.scss";
import AddContact from "../AddContact/AddContact";
import Contact from "../Contact/Contact";

function searchContact(list, search) {
  if (search === "") return true;
  search = search.toLowerCase();
  for (let entry in list) {
    if (list[entry].toLowerCase().includes(search)) return true;
  }
}

const ContactList = ({ contacts, search, isValid, addNewContact }) => {
  const searchedContacts = contacts
    .filter((item) => searchContact(item, search))
    .map((item, index) => {
      return (
        <Contact
          name={item.name}
          tel={item.tel}
          email={item.email}
          key={index}
        />
      );
    });
  return (
    <section className={classes.ContactList}>
      <AddContact isValid={isValid} addNewContact={addNewContact} />
      <div className={classes.container}>
        {searchedContacts.length ? (
          searchedContacts
        ) : (
          <p className={classes["not-found"]}>ничего не нашлось!</p>
        )}
      </div>
    </section>
  );
};

export default ContactList;
