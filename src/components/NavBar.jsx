import React from "react";
import { NavLink } from "react-router-dom";
import { FaFortAwesome } from "react-icons/fa";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar} data-testid="navbar">
      <div className={styles.navbar__brand}>
        <FaFortAwesome
          className={styles["navbar__brand-logo"]}
          title="surreal estate logo"
        />
        <h1 className={styles["navbar__brand-name"]}>Surreal Estate</h1>
      </div>
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
