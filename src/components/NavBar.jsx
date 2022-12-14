import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FaFortAwesome } from "react-icons/fa";
import css from "../styles/NavBar.module.css";

const NavBar = ({ children }) => {
  return (
    <nav>
      <div className={css.navbar__brand}>
        <FaFortAwesome className={css.NavBar__brandLogo} title="brand logo" />
        <h1 className={css.NavBar__brandName} title="brand name">
          Surreal Estate
        </h1>
      </div>
      <ul className={css.NavBar__LinksList}>
        <li>
          <NavLink to="/properties" draggable="false">
            View Properties
          </NavLink>
        </li>
        <li>
          <NavLink to="add-property" draggable="false">
            Add Property
          </NavLink>
        </li>
        <li>
          <NavLink to="saved-properties" draggable="false">
            Saved Properties
          </NavLink>
        </li>
      </ul>
      {children}
    </nav>
  );
};

NavBar.defaultProps = {
  children: null,
};

NavBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default NavBar;
