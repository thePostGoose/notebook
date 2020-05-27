import React from "react";
import classes from "./Login.module.scss";
import Imput from "../../UI/Imput/Imput";
import Button from "../../UI/Button/Button";
import { hendlerContext } from "../../../containers/Home/Home";
import Loader from "../../UI/Loader/Loader";

const Login = ({
  onRegisterTogleClick,
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
      <p className={classes.title}>вход</p>
      <Imput
        onChange={onChange}
        value={login}
        touched={false}
        label={"логин"}
        valid={validLogin}
        errorMessage={"Логином может быть только email"}
      />
      <Imput
        onChange={onChange}
        type={"password"}
        value={password}
        touched={false}
        label={"пароль"}
        valid={validPassword}
        errorMessage={"Пароль должен содержать минимум 6 символов"}
      />
      <hendlerContext.Consumer>
        {({ _, loginHandler, loading, authStatus }) => {
          return (
            <>
              <Button
                onClick={(e) => loginHandler(e, login, password)}
                disabled={disabled}
                text={true}
              >
                Войти
              </Button>
              {loading ? (
                <div className={classes["loader-container"]}>
                  <Loader />
                </div>
              ) : (
                false
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
      <Button onClick={onRegisterTogleClick} text={true}>
        Еще нет аккаунта?
      </Button>
    </div>
  );
};

export default Login;
