import React from "react";
import classes from './Container.module.scss'
const Container = ({ children, title, home }) => {
  const cls = [classes.Container]
  if (home) cls.push(classes.home)
  return (
    <section className={cls.join(' ')}>
      <h1>{title}</h1>
      <main>{children}</main>
    </section>
  );
};

export default Container;
