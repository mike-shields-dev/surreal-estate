import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/SideBar.module.css";

const SideBar = ({
  pathname,
  search,
  cities,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const currentUrl = pathname + search;

  return (
    <aside
      className={`
        ${styles.sidebar} 
        ${styles[`sidebar${isSideBarOpen ? "--open" : "--closed"}`]}`}
    >
      <button
        onClick={toggleSideBar}
        type="button"
        className={styles.sidebar__button}
      >
        <span className="visibly-hidden">Menu</span>
        <FaPlus
          aria-hidden="true"
          className={`
            ${styles.sidebar__icon}
            ${styles[`sidebar__icon${isSideBarOpen ? "--open" : "--closed"}`]}`}
          focusable="false"
          title={isSideBarOpen ? "close menu" : "open menu"}
        />
      </button>
      <section className={styles.sidebar__section}>
        <h3>City</h3>
        <ul className={styles["sidebar__link-list"]}>
          <li>
            <Link
              className={
                styles[
                  `sidebar__link${
                    currentUrl === "/properties" ? "--active" : ""
                  }`
                ]
              }
              onClick={() => setIsSideBarOpen(false)}
              to="/properties"
            >
              All
            </Link>
          </li>
          {cities.map((city) => {
            const targetUrl = `/properties?query={"city":"${city}"}`;
            return (
              <li key={`${city}-city-filter-link`}>
                <Link
                  className={
                    styles[
                      `sidebar__link${
                        currentUrl === targetUrl ? "--active" : ""
                      }`
                    ]
                  }
                  onClick={() => setIsSideBarOpen(false)}
                  to={targetUrl}
                >
                  {city}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
};

SideBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSideBarOpen: PropTypes.bool.isRequired,
  setIsSideBarOpen: PropTypes.func.isRequired,
};

export default SideBar;
