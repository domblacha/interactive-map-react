import React, { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { useUserStore } from "../store/hooks";

const LoginForm = ({ registerToggle }) => {
  const { userIsLoged } = useUserStore();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleOnChangeLogin = (e) => setLogin(e.target.value);
  const handleOnChangePassword = (e) => setPassword(e.target.value);
  const onSubmitLoginUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/login", {
        login,
        password,
      })
      .then(function (res) {
        if (res.statusText === "OK") {
          userIsLoged(res.data);
        }
      })
      .catch(function (err) {
        if (err.response.status === 404) {
          alert("Podane dane logowania są niepoprawne");
        }
      });
    setLogin("");
    setPassword("");
  };

  return (
    <form className="form" onSubmit={onSubmitLoginUser}>
      <input
        className="form__input"
        placeholder="Login"
        type="text"
        value={login}
        onChange={handleOnChangeLogin}
        required
      />
      <input
        className="form__input"
        placeholder="Hasło"
        type="password"
        value={password}
        onChange={handleOnChangePassword}
        required
      />
      <div className="form__buttons">
        <button className="form__button" type="submit">
          Zaloguj się!
        </button>
        <button className="form__button" onClick={registerToggle}>
          Zarejestruj się!
        </button>
      </div>
    </form>
  );
};

export default observer(LoginForm);
