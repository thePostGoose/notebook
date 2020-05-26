import React from "react";
import classes from "./Registration.module.scss";
import Imput from "../../UI/Imput/Imput";
import Button from "../../UI/Button/Button";
import { hendlerContext } from "../../../containers/Home/Home";
import Loader from "../../UI/Loader/Loader";
const Registration = ({
  onLoginTogleClick,
  login,
  password,
  onChange,
  touched,
  valid,
}) => {
  const validLogin = valid(login, touched, "login");
  const validPassword = valid(password, touched, "password");
  const disabled = !validPassword || !validLogin;
  return (
    <div className={classes["inputs-container"]}>
      <p className={classes.title}>регистрация</p>
      <Imput
        onChange={onChange}
        value={login}
        touched={false}
        label={"придумайте логин"}
        valid={validLogin}
        errorMessage={"Логином может быть только email"}
      />
      <Imput
        onChange={onChange}
        type={"password"}
        value={password}
        touched={false}
        label={"придумайте пароль"}
        valid={validPassword}
        errorMessage={"Пароль должен содержать минимум 6 символов"}
      />
      <Button onClick={onLoginTogleClick}>Назад</Button>
      <hendlerContext.Consumer>
        {({ registerHandler, _, loading, auth }) => {
          return (
            <>
              <Button
                onClick={(e) => registerHandler(e, login, password)}
                disabled={disabled}
              >
                Зарегистрироваться
              </Button>
              {loading ? (
                <div className={classes["loader-container"]}>
                  <Loader />
                </div>
              ) : (
                null
              )}
              {auth ? (
                <p className={classes["error-message"]}>
                  Произошла ошиба! {auth}
                </p>
              ) : null}
            </>
          );
        }}
      </hendlerContext.Consumer>
    </div>
  );
};

export default Registration;