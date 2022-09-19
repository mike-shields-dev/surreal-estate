import React from "react";
import { Link } from "react-router-dom";
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
      <ul className={styles.navbar__links}>
        <li className={styles["navbar__links-item"]}>
          <Link to="/">View Properties</Link>
        </li>
        <li className={styles["navbar__links-item"]}>
          <Link to="/add-property">Add Property</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
