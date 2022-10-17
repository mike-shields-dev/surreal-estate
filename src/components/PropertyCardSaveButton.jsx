import React from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import css from "../styles/SavePropertyButton.module.css";
import { getFavourites, postFavourite } from "../requests/API";

const PropertyCardSaveButton = ({ _id, userId, favourites, setFavourites }) => {
  const isSaved = favourites?.some(
    (favourite) => favourite.propertyListing === _id
  );

  const saveProperty = async () => {
    await postFavourite({
      params: "?populate=propertyListing",
      data: {
        propertyListing: _id,
        fbUserId: userId,
      },
    });
    setFavourites(await getFavourites(userId));
  };

  return (
    <button
      className={`
        ${css.SavePropertyButton}
        ${css[`${isSaved ? "disabled" : "enabled"}`]}
      `}
      type="button"
      onClick={saveProperty}
      disabled={isSaved}
    >
      <FaStar />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
};

PropertyCardSaveButton.propTypes = {
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  setFavourites: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(
    PropTypes.shape({
      fbUserId: PropTypes.string,
      propertyListing: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string,
    })
  ).isRequired,
};

export default PropertyCardSaveButton;
