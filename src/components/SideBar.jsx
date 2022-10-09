import React from "react";
import PropTypes from "prop-types";
import qs from "qs";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/SideBar.module.css";

const SideBar = ({ cities, isSideBarOpen, setIsSideBarOpen }) => {
  const { search } = useLocation();
  const urlParams = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const { query, sort } = urlParams;

  const buildParamsString = (operation, valueObj) =>
    qs.stringify(
      {
        ...urlParams,
        [operation]: JSON.stringify(valueObj),
      },
      {
        addQueryPrefix: true,
        encode: false,
      }
    );

  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

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
                    !query || `${query}` === "{}" ? "--active" : ""
                  }`
                ]
              }
              onClick={() => setIsSideBarOpen(false)}
              to={buildParamsString("query", {})}
            >
              All
            </Link>
          </li>
          {cities.map((city) => {
            const queryString = buildParamsString("query", { city });
            return (
              <li key={`${city}-city-filter-link`}>
                <Link
                  className={
                    styles[
                      `sidebar__link${
                        query === `{"city":"${city}"}` ? "--active" : ""
                      }`
                    ]
                  }
                  onClick={() => setIsSideBarOpen(false)}
                  to={queryString}
                >
                  {city}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.sidebar__section}>
        <h3>Price</h3>
        <ul className={styles["sidebar__link-list"]}>
          <li>
            <Link
              className={
                styles[
                  `sidebar__link${sort === `{"price":-1}` ? "--active" : ""}`
                ]
              }
              onClick={() => setIsSideBarOpen(false)}
              to={buildParamsString("sort", { price: -1 })}
            >
              Ascending
            </Link>
          </li>
          <li>
            <Link
              className={
                styles[
                  `sidebar__link${sort === `{"price":1}` ? "--active" : ""}`
                ]
              }
              onClick={() => setIsSideBarOpen(false)}
              to={buildParamsString("sort", { price: 1 })}
            >
              Descending
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};

SideBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSideBarOpen: PropTypes.bool.isRequired,
  setIsSideBarOpen: PropTypes.func.isRequired,
};

export default SideBar;
