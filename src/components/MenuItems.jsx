import React from "react";
import "./style/MenuItems.css";
import { Link } from "react-router-dom";
const MenuItems = ({ items }) => {
  return items.map((item) => (
    <li className="header__menu-item" key={item.to}>
      <Link className="header__menu-link" to={item.to}>
        {item.content}
      </Link>
    </li>
  ));
};

export default MenuItems;
