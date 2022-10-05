import React from "react";
import { NavLink } from "react-router-dom";
import { FaFortAwesome } from "react-icons/fa";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <nav>
      <div className={styles.navbar__brand}>
        <FaFortAwesome
          className={styles["navbar__brand-logo"]}
          title="brand logo"
        />
        <h1 className={styles["navbar__brand-name"]} title="brand name">
          Surreal Estate
        </h1>
      </div>
      <ul className={styles["navbar__links-list"]}>
        <li>
          <NavLink to="/properties">View Properties</NavLink>
        </li>
        <li>
          <NavLink to="add-property">Add Property</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
