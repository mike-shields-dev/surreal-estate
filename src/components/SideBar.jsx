import React, { useState } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import css from "../styles/SideBar.module.css";
import TextBox from "./TextBox";
import useToggle from "../hooks/useToggle";

const SideBar = ({ cities }) => {
  const { status: isExpanded, toggleStatus: toggleExpanded } = useToggle(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [titleSearch, setTitleSearch] = useState("");
  const currentUrlParams = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const { query, sort } = currentUrlParams;

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

  const handleReset = () => {
    navigate("");
    setTitleSearch("");
  };

  return (
    <aside
      className={`
        ${css.sidebar} 
        ${css[`sidebar${isExpanded ? "--open" : "--closed"}`]}`}
    >
      <button
        onClick={toggleExpanded}
        type="button"
        className={css["sidebar__toggle-button"]}
      >
        <span className="visibly-hidden">Menu</span>
        <FaPlus
          aria-hidden="true"
          className={`
            ${css.sidebar__icon}
            ${css[`sidebar__icon${isExpanded ? "--open" : "--closed"}`]}`}
          title={isExpanded ? "close menu" : "open menu"}
        />
      </button>

      <section className={css.sidebar__section}>
        <form className={css.sidebar__form} onSubmit={handleSearchSubmit}>
          <TextBox
            field="title"
            onChange={handleSearchChange}
            value={titleSearch}
            type="search"
          />
          <button type="submit">
            <FaSearch />
            <span className={css["sidebar__search-submit-button"]}>Search</span>
          </button>
        </form>
      </section>
      <section className={css.sidebar__section}>
        <h3 className={css.sidebar__heading}>City</h3>
        <ul className={css["sidebar__link-list"]}>
          {cities.map((city) => {
            const queryString = buildParamsString("query", { city });
            return (
              <li key={`${city}-city-filter-link`}>
                <Link
                  className={
                    css[
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
      <section className={css.sidebar__section}>
        <h3 className={css.sidebar__heading}>Price</h3>
        <ul className={css["sidebar__link-list"]}>
          <li>
            <Link
              className={
                css[
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
                css[
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
        className={css["sidebar__reset-button"]}
        type="button"
        onClick={handleReset}
      >
        reset
      </button>
    </aside>
  );
};

SideBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideBar;
