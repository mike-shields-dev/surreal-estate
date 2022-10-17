import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import SideBar from "./SideBar";
import css from "../styles/Properties.module.css";
import { getProperties, getFavourites } from "../requests/API";
import cities from "../config/cities.json";

const Properties = ({ userId }) => {
  const { search } = useLocation();
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    (async () => setProperties(await getProperties(search)))();
  }, [search]);

  useEffect(() => {
    (async () => setFavourites(await getFavourites(userId)))();
  }, [userId]);

  return (
    <>
      <SideBar {...{ cities }} />
      <div className={css.properties} title="properties">
        <div className={css.properties__grid}>
          {properties.map((property) => (
            <PropertyCard
              favourites={favourites}
              key={property._id}
              property={property}
              userId={userId}
              setFavourites={setFavourites}
            />
          ))}
        </div>
      </div>
    </>
  );
};

Properties.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Properties;
