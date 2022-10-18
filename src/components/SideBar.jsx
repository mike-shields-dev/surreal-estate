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
    if (!event.target.value) {
      navigate(
        buildParamsString("query", {
          title: { $regex: ".*" },
        })
      );
    }
    setTitleSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(
      buildParamsString("query", {
        title: { $regex: titleSearch || ".*" },
      })
    );
  };

  const handleReset = () => {
    navigate("");
    setTitleSearch("");
  };

  return (
    <aside
      className={`
        ${css.SideBar}
        ${isExpanded ? css["SideBar--open"] : css["SideBar--closed"]} 
      `}
    >
      <button
        onClick={toggleExpanded}
        type="button"
        className={css.SideBar__toggleButton}
      >
        <span className="visibly-hidden">Menu</span>
        <FaPlus
          aria-hidden="true"
          className={`
            ${css.SideBar__toggleIcon}
            ${
              isExpanded
                ? css["SideBar__toggleIcon--open"]
                : css["SideBar__toggleIcon--closed"]
            }`}
          title={isExpanded ? "close menu" : "open menu"}
        />
      </button>

      <section className={css.SideBar__section}>
        <form className={css.SideBar__search} onSubmit={handleSearchSubmit}>
          <TextBox
            field="title"
            onChange={handleSearchChange}
            value={titleSearch}
            type="search"
          />
          <button className={css.SideBar__searchButton} type="submit">
            <FaSearch />
            <span className="visibly-hidden">Search</span>
          </button>
        </form>
      </section>
      <section className={css.SideBar__section}>
        <h3 className={css.SideBar__heading}>City</h3>
        <ul className={css.SideBar__linkList}>
          {cities.map((city) => {
            const queryString = buildParamsString("query", { city });
            return (
              <li key={`${city}-city-filter-link`}>
                <Link
                  className={
                    query?.includes(`"city":"${city}"`)
                      ? css["SideBar__link--active"]
                      : ""
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
      <section className={css.SideBar__section}>
        <h3 className={css.SideBar__heading}>Price</h3>
        <ul className={css.SideBar__linkList}>
          <li>
            <Link
              className={
                sort?.includes(`"price":1`) ? css["SideBar__link--active"] : ""
              }
              to={buildParamsString("sort", { price: 1 })}
            >
              Ascending
            </Link>
          </li>
          <li>
            <Link
              className={
                sort?.includes(`"price":-1`) ? css["SideBar__link--active"] : ""
              }
              to={buildParamsString("sort", { price: -1 })}
            >
              Descending
            </Link>
          </li>
        </ul>
      </section>
      <button
        className={css.SideBar__resetButton}
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
