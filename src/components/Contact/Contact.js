import React from "react";
import classes from "./Contact.module.scss";
import Button from "../UI/Button/Button";
const Contact = ({ name, email, tel, deleteHandler }) => {
  return (
    <div className={classes.Contact}>
      <div className={"info-container"}>
        <h3 className={classes.str}>{name}</h3>
        <p className={classes.str}>{email}</p>
        <p className={classes.str}>{tel}</p>
      </div>
      <Button>x</Button>
    </div>
  );
};

export default Contact;
