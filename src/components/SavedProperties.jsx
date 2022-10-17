import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SavedProperty from "./SavedProperty";
import { getFavourites } from "../requests/API";

const SavedProperties = ({ userId }) => {
  const [favourites, setFavourites] = useState([]);
  

  useEffect(() => {
    (async () => {
      setFavourites(await getFavourites(userId));
    })();
  }, [userId]);

  return (
    <div className={css.SavedProperties}>
      {favourites.map(({ _id, propertyListing }) => {
        return (
          <SavedProperty
            key={_id}
            {...{ userId, _id, propertyListing, setFavourites }}
          />
        );
      })}
    </div>
  );
};

SavedProperties.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default SavedProperties;
