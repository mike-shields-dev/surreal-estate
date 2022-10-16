import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";
import SavedProperty from "./SavedProperty";

const Favourites = ({ userId }) => {
  const [favourites, setFavourites] = useState([]);
  const { request, response, controller } = useAPI();

  const requestFavourites = () =>
    request({
      method: "get",
      endpoint: "/Favourite",
      params: `?params={"fbUserId":"${userId}"}`,
    });

  useEffect(() => {
    if (userId) requestFavourites();
  }, [userId]);

  useEffect(() => {
    if (!response) return;
    setFavourites(
      response?.data.reduce(
        (array, current) =>
          array.some((el) => el.propertyListing === current.propertyListing)
            ? array
            : [...array, current],
        []
      )
    );
  }, [response]);

  useEffect(() => () => controller?.abort(), []);

  return (
    <div className="favourites">
      {favourites.map((favourite) => {
        const { propertyListing } = favourite;
        return (
          <SavedProperty
            key={propertyListing}
            propertyListingId={propertyListing}
          />
        );
      })}
    </div>
  );
};

Favourites.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Favourites;
