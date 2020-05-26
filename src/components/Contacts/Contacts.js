import React from "react";
import classes from "./Contacts.module.scss";
import Button from "../UI/Button/Button";
const Contacts = ({ onClick, isAuth }) => {
  const disabled = !isAuth;
  const cls = [classes.Contacts];
  if (disabled) cls.push(classes.disabled)
  return (
    <div className={cls.join(' ')}>
      <Button onClick={onClick} disabled={disabled}>
        Контакты
      </Button>
    </div>
  );
};

export default Contacts;
