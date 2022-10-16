import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import css from "../styles/Properties.module.css";
import useAPI from "../hooks/useAPI";
import cities from "../config/cities.json";

const initialState = {
  alert: {
    message: "",
    isSuccess: false,
  },
};

const Properties = ({ userId }) => {
  const { search } = useLocation();
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [alert, setAlert] = useState(initialState.alert);
  const {
    request: favouriteRequest,
    error: favouriteError,
    response: favouriteResponse,
    controller: favouriteController,
  } = useAPI();
  const {
    request: propertiesRequest,
    error: propertiesError,
    response: propertiesResponse,
    controller: propertiesController,
  } = useAPI();

  console.log({ favourites });

  const requestFavourites = () => {
    favouriteRequest({
      method: "get",
      endpoint: "/Favourite",
      query: `?query={"fbUserId":"${userId}"}`,
    });
  };

  const requestProperties = () => {
    propertiesRequest({
      method: "get",
      query: search,
      endpoint: "/PropertyListing",
    });
  };

  useEffect(() => requestProperties(), [search]);
  useEffect(() => requestFavourites(), [userId]);

  useEffect(() => {
    let { message, isSuccess } = initialState.alert;

    if (propertiesError) message = propertiesError.message;
    if (propertiesResponse?.status === 200) {
      setProperties(propertiesResponse.data);
      isSuccess = true;
    }
    setAlert({ message, isSuccess });
  }, [propertiesResponse, propertiesError]);

  useEffect(() => {
    let { message, isSuccess } = initialState.alert;

    if (favouriteError) message = favouriteError.message;
    if (favouriteResponse?.status === 200) {
      const uniqueFavourites = favouriteResponse.data.reduce((array, cur) => {
        if (!array.some((el) => el.propertyListing === cur.propertyListing)) {
          return [...array, cur];
        }
        return array;
      }, []);
      setFavourites(uniqueFavourites);
      isSuccess = true;
    }
    setAlert({ message, isSuccess });
  }, [favouriteResponse, favouriteError]);

  useEffect(
    () => () => {
      favouriteController?.abort();
      propertiesController?.abort();
    },
    []
  );

  return (
    <>
      <SideBar {...{ cities }} />
      <div className={css.properties} title="properties">
        <Alert {...alert} />
        <div className={css.properties__grid}>
          {properties.map((property) => (
            <PropertyCard
              favourites={favourites}
              key={property._id}
              property={property}
              requestFavourites={requestFavourites}
              userId={userId}
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
