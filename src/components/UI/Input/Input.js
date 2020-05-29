import React from "react";
import classes from "./input.module.scss";

const Input = ({ onChange, type, value, label, errorMessage, valid = true}) => {
  type = type || "text";
  const cls = [classes.Input];
  const id = `${type} - ${Math.random()}`;

  if (!valid) cls.push(classes.invalid);

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} onChange={onChange} value={value} />
      {!valid ? (
        <span className={classes["error-message"]}>
          {errorMessage || "Веденные данные не корректны"}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
