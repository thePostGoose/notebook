import React from "react";
import classes from "./Registration.module.scss";
import Input from "../../UI/Input/Input";
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
      <Input
        onChange={onChange}
        value={login}
        touched={false}
        label={"придумайте логин"}
        valid={validLogin}
        errorMessage={"Логином может быть только email"}
      />
      <Input
        onChange={onChange}
        type={"password"}
        value={password}
        touched={false}
        label={"придумайте пароль"}
        valid={validPassword}
        errorMessage={"Пароль должен содержать минимум 6 символов"}
      />
      <Button onClick={onLoginTogleClick} text={true}>Назад</Button>
      <hendlerContext.Consumer>
        {({ registerHandler, _, loading, authStatus }) => {
          return (
            <>
              <Button
                onClick={(e) => registerHandler(e, login, password)}
                disabled={disabled}
                text={true}
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
              {authStatus ? (
                <p className={classes["error-message"]}>
                  Произошла ошиба! {authStatus}
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
