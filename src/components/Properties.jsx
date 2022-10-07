import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import styles from "../styles/Properties.module.css";
import getProperties from "../requests/getProperties";

const initialState = {
  alert: {
    message: "",
    isSuccess: false,
  },
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [alert, setAlert] = useState(initialState.alert);

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const { data } = await getProperties(source);
        setProperties(data);
        setLoading(false);
        setAlert({ message: "", isSuccess: true });
      } catch (err) {
        setAlert({
          message: "Something went wrong, please try again later",
          isSuccess: false,
        });
      }
    })();
    return () => {
      source.cancel("Previous request cancelled");
    };
  }, []);

  return (
    <>
      <Alert {...alert} />
      <main className={styles.properties} title="properties">
        {properties.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))}
      </main>
    </>
  );
};

export default Properties;
