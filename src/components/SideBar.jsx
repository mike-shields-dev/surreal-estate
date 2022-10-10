import React, { useState } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import styles from "../styles/SideBar.module.css";
import TextBox from "./TextBox";

const SideBar = ({ cities, isSideBarOpen, setIsSideBarOpen }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [titleSearch, setTitleSearch] = useState("");
  const currentUrlParams = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const { query, sort } = currentUrlParams;
  console.log({ query, sort });

  const buildParamsString = (operation, valueObj) => {
    const newUrlParams = {
      ...currentUrlParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentUrlParams[operation] || "{}"),
        ...valueObj,
      }),
    };
    return qs.stringify(newUrlParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  const handleSearchChange = (event) => {
    setTitleSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    let newUrlParamsString;
    if (titleSearch) {
      newUrlParamsString = buildParamsString("query", {
        title: { $regex: titleSearch },
      });
    } else {
      newUrlParamsString = buildParamsString("query", {
        title: { $regex: ".*" },
      });
    }
    navigate(newUrlParamsString);
  };

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
        className={styles["sidebar__toggle-button"]}
      >
        <span className="visibly-hidden">Menu</span>
        <FaPlus
          aria-hidden="true"
          className={`
            ${styles.sidebar__icon}
            ${styles[`sidebar__icon${isSideBarOpen ? "--open" : "--closed"}`]}`}
          title={isSideBarOpen ? "close menu" : "open menu"}
        />
      </button>

      <section className={styles.sidebar__section}>
        <form className={styles.sidebar__form} onSubmit={handleSearchSubmit}>
          <TextBox
            field="title"
            onChange={handleSearchChange}
            value={titleSearch}
            type="search"
          />
          <button type="submit">
            <FaSearch />
            <span className={styles["sidebar__search-submit-button"]}>
              Search
            </span>
          </button>
        </form>
      </section>
      <section className={styles.sidebar__section}>
        <h3 className={styles.sidebar__heading}>City</h3>
        <ul className={styles["sidebar__link-list"]}>
          {cities.map((city) => {
            const queryString = buildParamsString("query", { city });
            return (
              <li key={`${city}-city-filter-link`}>
                <Link
                  className={
                    styles[
                      `sidebar__link${
                        query && query.includes(`"city":"${city}"`)
                          ? "--active"
                          : ""
                      }`
                    ]
                  }
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
        <h3 className={styles.sidebar__heading}>Price</h3>
        <ul className={styles["sidebar__link-list"]}>
          <li>
            <Link
              className={
                styles[
                  `sidebar__link${
                    sort && sort.includes(`"price":1`) ? "--active" : ""
                  }`
                ]
              }
              to={buildParamsString("sort", { price: 1 })}
            >
              Ascending
            </Link>
          </li>
          <li>
            <Link
              className={
                styles[
                  `sidebar__link${
                    sort && sort.includes(`"price":-1`) ? "--active" : ""
                  }`
                ]
              }
              to={buildParamsString("sort", { price: -1 })}
            >
              Descending
            </Link>
          </li>
        </ul>
      </section>
      <button
        className={styles["sidebar__reset-button"]}
        type="button"
        onClick={() => navigate("")}
      >
        reset
      </button>
    </aside>
  );
};

SideBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSideBarOpen: PropTypes.bool.isRequired,
  setIsSideBarOpen: PropTypes.func.isRequired,
};

export default SideBar;
