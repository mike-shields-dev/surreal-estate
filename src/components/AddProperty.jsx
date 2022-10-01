import React, { useState } from "react";
import styles from "../styles/AddProperty.module.css";
import ComboBox from "./ComboBox";
import SpinButton from "./SpinButton";
import TextBox from "./TextBox";
import addProperty from "../requests/addProperty";

const cities = ["Manchester", "Leeds", "Sheffield", "Liverpool"];
const types = [
  "Flat",
  "Semi-detached",
  "Terraced",
  "End of Terrace",
  "Cottage",
  "Bungalow",
];

const initialState = {
  fields: {
    title: "",
    city: cities[0],
    type: types[0],
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    email: "",
  },
};

const AddProperty = () => {
  const [fields, setFields] = useState(initialState.fields);

  const handleAddProperty = async (event) => {
    event.preventDefault();
    addProperty(fields);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <>
      <p>Add Property Page</p>
      <div className={styles["add-property"]}>
        <form
          className={styles["add-property__form"]}
          name="add property"
          onSubmit={handleAddProperty}
        >
          <TextBox
            label="Title"
            name="title"
            onChange={handleFieldChange}
            type="text"
            value={fields.title}
          />
          <ComboBox
            label="Type"
            name="type"
            onChange={handleFieldChange}
            value={fields.type}
            values={types}
          />
          <SpinButton
            label="Bedrooms"
            min={0}
            name="bedrooms"
            onChange={handleFieldChange}
            step={1}
            value={fields.bedrooms}
          />
          <SpinButton
            label="Bathrooms"
            min={0}
            name="bathrooms"
            onChange={handleFieldChange}
            step={1}
            value={fields.bathrooms}
          />
          <SpinButton
            label="Price £"
            min={0}
            name="price"
            onChange={handleFieldChange}
            step={5000}
            value={fields.price}
          />
          <ComboBox
            label="City"
            name="city"
            onChange={handleFieldChange}
            value={fields.city}
            values={cities}
          />
          <TextBox
            label="Email"
            name="email"
            onChange={handleFieldChange}
            value={fields.email}
            type="email"
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
};

export default AddProperty;
