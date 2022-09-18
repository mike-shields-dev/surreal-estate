import React from "react";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.navbar} data-testid="navbar">
      <img
        className={styles.navbar__logo}
        data-testid="company-logo"
        src="/surreal-logo.png"
        alt="surreal estate logo"
      />
      <ul className={styles.navbar__links}>
        <li className={styles["navbar__links-item"]}>
          <a href="index.html">View Properties</a>
        </li>
        <li className={styles["navbar__links-item"]}>
          <a href="index.html">Add Property</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
