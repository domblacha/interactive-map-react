import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ registerToggle }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleOnChangeName = (e) => setName(e.target.value);
  const handleOnChangeSurname = (e) => setSurname(e.target.value);
  const handleOnChangeLogin = (e) => setLogin(e.target.value);
  const handleOnChangePassword = (e) => setPassword(e.target.value);
  const handleOnChangeCheckPassword = (e) => setCheckPassword(e.target.value);

  const onSubmitRegisterUser = (e) => {
    e.preventDefault();
    if (password === checkPassword) {
      axios
        .post("http://localhost:3001/users/register", {
          name,
          surname,
          login,
          password,
        })
        .then(function (res) {
          if (res.statusText === "OK") {
            alert("Rejestracja zakończona pomyślnie, zaloguj się!");
            registerToggle();
          }
        })
        .catch(function (err) {
          if (err.response.status === 409) {
            alert("Użytkownik o podanym loginie już istnieje!");
          }
        });
    } else {
      alert("Hasła sie nie zgadzają wprowadz ponownie!");
    }
  };

  return (
    <form className="form" onSubmit={onSubmitRegisterUser}>
      <input
        className="form__input"
        placeholder="Imie"
        type="text"
        value={name}
        onChange={handleOnChangeName}
        required
      />
      <input
        className="form__input"
        placeholder="Nazwisko"
        type="text"
        value={surname}
        onChange={handleOnChangeSurname}
        required
      />
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
      <input
        className="form__input"
        placeholder="Powtórz hasło"
        type="password"
        value={checkPassword}
        onChange={handleOnChangeCheckPassword}
        required
      />
      <div className="form__buttons">
        <button className="form__button" type="submit">
          Zarejestruj się!
        </button>
        <button className="form__button" type="submit" onClick={registerToggle}>
          Zaloguj się!
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
