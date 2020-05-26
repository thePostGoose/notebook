import React from "react";
import classes from './Container.module.scss'
const Container = ({ children, title }) => {
  return (
    <section className={classes.Container}>
      <h1>{title}</h1>
      <main>{children}</main>
    </section>
  );
};

export default Container;
