import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import styles from "../styles/Properties.module.css";
import getProperties from "../requests/getProperties";
import cities from "../config/cities.json";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  });
  const { pathname, search } = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const { data } = await getProperties({ search, source });
        setProperties(data);
        setAlert({ message: "", isSuccess: true });
      } catch (err) {
        setAlert({
          message: "Something went wrong, please try again later",
          isSuccess: false,
        });
      }
    })();
    return () => {
      source.cancel();
    };
  }, [search]);

  return (
    <>
      <SideBar
        {...{ pathname, search, cities, isSideBarOpen, setIsSideBarOpen }}
      />
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
