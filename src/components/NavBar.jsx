import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar} data-testid="navbar">
      <img
        className={styles.navbar__logo}
        data-testid="company-logo"
        src="/surreal-logo.png"
        alt="surreal estate logo"
      />
      <ul className={styles["navbar__links-list"]}>
        <li className={styles["navbar__links-list-item"]}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles["navbar__link--active"] : styles.navbar__link
            }
            to="/properties"
          >
            View Properties
          </NavLink>
        </li>
        <li className={styles["navbar__links-list-item"]}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles["navbar__link--active"] : styles.navbar__link
            }
            to="add-property"
          >
            Add Property
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
