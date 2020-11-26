import React, { useState } from "react";
import "./style/RegisterLogic.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const RegisterLogic = () => {
  const [register, setRegister] = useState(false);
  const handleOnClickRegisterToggle = () => {
    setRegister((prevValue) => !prevValue);
  };

  return (
    <div className="singin">
      <p className="singin__title">
        Zaloguj się lub zarejestruj, aby móc dodawać ciekawe miejsca na mapie,
        oceniać i komentować już istniejące!
      </p>
      {register ? (
        <RegisterForm registerToggle={handleOnClickRegisterToggle} />
      ) : (
        <LoginForm registerToggle={handleOnClickRegisterToggle} />
      )}
    </div>
  );
};

export default RegisterLogic;
