import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import useAPI from "../hooks/useAPI";
import css from "../styles/SavePropertyButton.module.css";

const SavePropertyButton = ({ _id, userId, favourites, requestFavourites }) => {
  const { request, response, controller } = useAPI();
  const isSaved = favourites?.some(
    (favourite) => favourite.propertyListing === _id
  );

  console.log({ isSaved });

  const saveProperty = () => {
    request({
      method: "post",
      endpoint: "Favourite",
      query: "?populate=propertyListing",
      data: {
        propertyListing: _id,
        fbUserId: userId,
      },
    });
  };

  useEffect(() => requestFavourites(), [response]);
  useEffect(() => () => controller?.abort(), []);

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

SavePropertyButton.propTypes = {
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  requestFavourites: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(
    PropTypes.shape({
      fbUserId: PropTypes.string,
      propertyListing: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string,
    })
  ).isRequired,
};

export default SavePropertyButton;
