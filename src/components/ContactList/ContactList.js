import React from "react";
import classes from "./ContactList.module.scss";
import AddContact from "../AddContact/AddContact";
import Contact from "../Contact/Contact";
import Loader from "../UI/Loader/Loader";
function searchContact(list, search) {
  if (search === "") return true;
  search = search.toLowerCase();
  for (let entry in list) {
    if (list[entry].toLowerCase().includes(search)) return true;
  }
}

const ContactList = ({
  contacts,
  search,
  isValid,
  addNewContact,
  deleteHandler,
  loading,
}) => {
  const searchedContacts = contacts
    .filter((item) => searchContact(item, search))
    .map((item, index) => {
      return (
        <Contact
          name={item.name}
          tel={item.tel}
          email={item.email}
          key={index}
          onClick={() => deleteHandler(item.hash)}
        />
      );
    });
  return (
    <section className={classes.ContactList}>
      <AddContact isValid={isValid} addNewContact={addNewContact} />
      {searchedContacts.length && loading ? <Loader /> : null}
      <div className={classes.container}>
        {(searchedContacts.length)? (
          searchedContacts
        ) : loading ? (
         <Loader />
        ) : (
          <p className={classes["not-found"]}>список контактов пуст!</p>
        )}
      </div>
    </section>
  );
};

export default ContactList;
