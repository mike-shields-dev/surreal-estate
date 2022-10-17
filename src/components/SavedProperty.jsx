import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "../styles/SavedProperty.module.css";
import { getProperty, getFavourites, deleteFavourite } from "../requests/API";

const SavedProperty = ({ userId, _id, propertyListing, setFavourites }) => {
  const [property, setProperty] = useState({});

  useEffect(() => {
    (async () => {
      setProperty(await getProperty(propertyListing));
    })();
  }, []);

  const removeFavourite = async () => {
    await deleteFavourite(_id);
    setFavourites(await getFavourites(userId));
  };

  return (
    <div className={css.SavedProperty}>
      <p>{property?.title}</p>
      <button type="button" onClick={removeFavourite}>
        Remove
      </button>
    </div>
  );
};

SavedProperty.propTypes = {
  userId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  propertyListing: PropTypes.string.isRequired,
  setFavourites: PropTypes.func.isRequired,
};

export default SavedProperty;
