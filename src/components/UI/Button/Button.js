import React from "react";
import classes from "./Button.module.scss";
const Button = ({onClick, disabled, children, text}) => {
  const cls = [classes.Button]
  if(text) cls.push(classes.textBtn)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cls.join(' ')}
    >
      {children}
    </button>
  );  
};

export default Button;
