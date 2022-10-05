import React from "react";
import PropertyCard from "./PropertyCard";
import styles from "../styles/Properties.module.css";

const properties = [
  {
    _id: 0,
    bathrooms: 2,
    bedrooms: 5,
    city: "Manchester",
    email: "james@gmail.com",
    price: 5000,
    title: "Georgian Town House",
    type: "Terraced",
  },
];

const Properties = () => {
  return (
    <main className={styles.properties} title="properties">
      {properties.map((property) => (
        <PropertyCard key={property._id} {...property} />
      ))}
    </main>
  );
};

export default Properties;
