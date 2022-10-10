import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import styles from "../styles/Properties.module.css";
import useAPI from "../requests/useAPI";
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
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    request({ method: "get", search });
  }, [search]);

  useEffect(() => {
    console.log({ error, response });
    let { message, isSuccess } = initialState.alert;

    if (error) {
      message = error.message;
    }
    if (response && response.statusText.match(/ok/i)) {
      isSuccess = true;
      setProperties(response.data);
    }
    setAlert({ message, isSuccess });
  }, [response, error]);

  useEffect(() => controller && controller.abort(), []);

  return (
    <>
      <SideBar {...{ cities, isSideBarOpen, setIsSideBarOpen }} />
      <div className={styles.properties} title="properties">
        <Alert {...alert} />
        <div className={styles.properties__grid}>
          {properties.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Properties;
