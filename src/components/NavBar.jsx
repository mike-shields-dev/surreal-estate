import React from "react";
import { NavLink } from "react-router-dom";
import { FaFortAwesome } from "react-icons/fa";
import css from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <nav>
      <div className={css.navbar__brand}>
        <FaFortAwesome
          className={css["navbar__brand-logo"]}
          title="brand logo"
        />
        <h1 className={css["navbar__brand-name"]} title="brand name">
          Surreal Estate
        </h1>
      </div>
      <ul className={css["navbar__links-list"]}>
        <li>
          <NavLink to="/properties" draggable="false">
            View Properties
          </NavLink>
        </li>
        <li>
          <NavLink to="add-property" draggable="false">
            Add Property
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
