import React from "react";
import "./style/MenuBar.css";
import MenuItems from "./MenuItems";

const MenuBar = ({ items }) => {
  return (
    <header className="header">
      <div className="header__logo">Interaktywna Mapa Krakowa</div>
      <nav className="header__menu">
        <ul className="header__menu-list">
          <MenuItems items={items} />
        </ul>
      </nav>
    </header>
  );
};

export default MenuBar;
