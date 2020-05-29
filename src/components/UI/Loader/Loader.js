import React from "react";
import classes from "./Loader.module.scss";
const Loader = ({cls}) => {
  return <div className={classes["lds-hourglass"] + ` ${cls}`}></div>;
};

export default Loader;
