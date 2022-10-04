import React from "react";
import PropTypes from "prop-types";
import { HiOutlineMail } from "react-icons/hi";
import { FaFortAwesome, FaBath, FaBed } from "react-icons/fa";
import styles from "../styles/PropertyCard.module.css";

const PropertyCard = ({
  bathrooms,
  bedrooms,
  city,
  email,
  price,
  title,
  type,
}) => {
  return (
    <div className={styles["property-card"]}>
      <header className={styles["property-card__header"]}>
        <FaFortAwesome title="surreal estate logo" />
      </header>
      <main className={styles["property-card__main"]}>
        <h2 className={styles["property-card__title"]}>{title}</h2>
        <p>
          <span className={styles["property-card__type-location"]}>{type}</span>{" "}
          - <span>{city}</span>
        </p>
        <p className={styles["property-card__bathrooms"]}>
          <FaBath
            className={styles["property-card__bath-icon"]}
            title="bath icon"
          />{" "}
          <span>{bathrooms}</span>
        </p>
        <p className={styles["property-card__bedrooms"]}>
          <FaBed
            className={styles["property-card__bed-icon"]}
            title="bed icon"
          />{" "}
          <span>{bedrooms}</span>
        </p>
        <p>
          <span className={styles["property-card__currency"]}>£</span> {price}
        </p>
      </main>
      <a className={styles["property-card__mailto"]} href={`mailto:${email}`}>
        <HiOutlineMail className={styles["property-card__mail-icon"]} />
        <span>email</span>
      </a>
    </div>
  );
};

PropertyCard.propTypes = {
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default PropertyCard;
