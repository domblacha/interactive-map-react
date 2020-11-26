import React from "react";
import "./style/UserDashboard.css";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { useUserStore } from "../store/hooks";
import UserMarkersList from "./UserMarkersList";

const UserDashboard = () => {
  const { user, userLogout } = useUserStore();
  const handleOnClickLogout = () => userLogout();

  return (
    <div className="user-panel">
      <button className="user-panel__logout" onClick={handleOnClickLogout}>
        Wyloguj się
      </button>
      <p className="user-panel__user-id">
        Zalogowany jako {user.name + " " + user.surname}
      </p>
      <h2 className="user-panel__title">Witamy w panelu użytkownika!</h2>
      <p className="user-panel__markers-info">
        <Link to="/">Przejdz do mapy, aby dodać znacznik</Link>
      </p>
      <div className="user-panel__user-markers">
        <UserMarkersList />
      </div>
    </div>
  );
};

export default observer(UserDashboard);
