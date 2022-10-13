import React, { useState, useEffect } from "react";
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

const Properties = () => {
  const { search } = useLocation();
  const { request, error, response, controller } = useAPI();
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState(initialState.alert);

  const handleSaveProperty = (propertyId) => {
    console.log({ propertyId });
  };

  useEffect(() => {
    request({ method: "get", search });
  }, [search]);

  useEffect(() => {
    let { message, isSuccess } = initialState.alert;

    if (error) message = error.message;
    if (response && response.status === 200) {
      setProperties(response.data);
      isSuccess = true;
    }

    setAlert({ message, isSuccess });
  }, [response, error]);

  useEffect(() => controller && controller.abort(), []);

  return (
    <>
      <SideBar {...{ cities }} />
      <div className={css.properties} title="properties">
        <Alert {...alert} />
        <div className={css.properties__grid}>
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              {...{ handleSaveProperty, property }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Properties;
