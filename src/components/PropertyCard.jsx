import React from "react";
import PropTypes from "prop-types";
import { HiOutlineMail } from "react-icons/hi";
import { FaFortAwesome, FaBath, FaBed } from "react-icons/fa";
import css from "../styles/PropertyCard.module.css";
import PropertyCardSaveButton from "./PropertyCardSaveButton";

const PropertyCard = ({
  property: { _id, bathrooms, bedrooms, city, email, price, title, type },
  favourites,
  userId,
  setFavourites,
}) => {
  return (
    <div className={css.PropertyCard}>
      <header className={css.PropertyCard__header}>
        <FaFortAwesome title="brand logo" />
      </header>
      <main className={css.PropertyCard__main}>
        <h2 className={css.PropertyCard__title}>{title}</h2>
        <p className={css.PropertyCard__description}>
          <span>{type}</span> - <span>{city}</span>
        </p>
        <p className={css.PropertyCard__bathrooms}>
          <FaBath title="bath icon" /> {bathrooms}
        </p>
        <p className={css.PropertyCard__bedrooms}>
          <FaBed className={css["PropertyCard__bed-icon"]} title="bed icon" />{" "}
          {bedrooms}
        </p>
        <p>
          <span className={css.PropertyCard__currency}>£</span> {price}
        </p>
      </main>
      <a
        className={css["property-card__mailto"]}
        href={`mailto:${email}`}
        rel="noreferrer"
        target="_blank"
      >
        <HiOutlineMail className={css["property-card__mail-icon"]} />
        <span>email</span>
      </a>
      {userId && (
        <PropertyCardSaveButton
          {...{ _id, userId, favourites, setFavourites }}
        />
      )}
    </div>
  );
};

PropertyCard.propTypes = {
  favourites: PropTypes.arrayOf(
    PropTypes.shape({
      fbUserId: PropTypes.string,
      propertyListing: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string,
    })
  ).isRequired,
  property: PropTypes.shape({
    _id: PropTypes.string,
    bathrooms: PropTypes.string,
    bedrooms: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  setFavourites: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PropertyCard;
