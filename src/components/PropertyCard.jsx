import React, { useContext } from "react";
import PropTypes from "prop-types";
import { HiOutlineMail } from "react-icons/hi";
import { FaFortAwesome, FaBath, FaBed } from "react-icons/fa";
import { UserProfileContext } from "../contexts/UserProfileContext";
import css from "../styles/PropertyCard.module.css";

const PropertyCard = ({
  property: { _id, bathrooms, bedrooms, city, email, price, title, type },
  handleSaveProperty,
}) => {
  const { userProfile } = useContext(UserProfileContext);
  return (
    <div className={css["property-card"]}>
      <header className={css["property-card__header"]}>
        <FaFortAwesome title="brand logo" />
      </header>
      <main className={css["property-card__main"]}>
        <h2 className={css["property-card__title"]}>{title}</h2>
        <p className={css["property-card__type-and-location"]}>
          <span>{type}</span> - <span>{city}</span>
        </p>
        <p className={css["property-card__bathrooms"]}>
          <FaBath title="bath icon" /> {bathrooms}
        </p>
        <p className={css["property-card__bedrooms"]}>
          <FaBed className={css["property-card__bed-icon"]} title="bed icon" />{" "}
          {bedrooms}
        </p>
        <p>
          <span className={css["property-card__currency"]}>£</span> {price}
        </p>
      </main>
      {!!userProfile && (
        <button type="button" onClick={() => handleSaveProperty(_id)}>
          Save
        </button>
      )}
      <a
        className={css["property-card__mailto"]}
        href={`mailto:${email}`}
        rel="noreferrer"
        target="_blank"
      >
        <HiOutlineMail className={css["property-card__mail-icon"]} />
        <span>email</span>
      </a>
    </div>
  );
};

PropertyCard.defaultProps = {
  userProfile: null,
};

PropertyCard.propTypes = {
  handleSaveProperty: PropTypes.func.isRequired,
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
  userProfile: PropTypes.shape({}),
};

export default PropertyCard;
