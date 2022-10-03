import React from "react";
import PropertyCard from "./PropertyCard";

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
    <div data-testid="properties">
      {properties.map((property) => (
        <PropertyCard key={property._id} {...property} />
      ))}
    </div>
  );
};

export default Properties;
