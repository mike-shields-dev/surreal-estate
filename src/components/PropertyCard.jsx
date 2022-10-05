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
        <FaFortAwesome title="brand logo" />
      </header>
      <main className={styles["property-card__main"]}>
        <h2 className={styles["property-card__title"]}>{title}</h2>
        <p className={styles["property-card__type-and-location"]}>
          <span>{type}</span> - <span>{city}</span>
        </p>
        <p className={styles["property-card__bathrooms"]}>
          <FaBath title="bath icon" /> {bathrooms}
        </p>
        <p className={styles["property-card__bedrooms"]}>
          <FaBed
            className={styles["property-card__bed-icon"]}
            title="bed icon"
          />{" "}
          {bedrooms}
        </p>
        <p>
          <span className={styles["property-card__currency"]}>£</span> {price}
        </p>
      </main>
      <a
        className={styles["property-card__mailto"]}
        href={`mailto:${email}`}
        rel="noreferrer"
        target="_blank"
      >
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
