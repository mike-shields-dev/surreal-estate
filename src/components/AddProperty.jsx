import React, { useState } from "react";
import styles from "../styles/AddProperty.module.css";
import ComboBox from "./ComboBox";
import SpinButton from "./SpinButton";
import TextBox from "./TextBox";
import Alert from "./Alert";
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
  alert: {
    message: "",
    isSuccess: false,
  },
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
  const [alert, setAlert] = useState(initialState.alert);

  const handleAddProperty = async (event) => {
    event.preventDefault();
    const isPropertyAdded = await addProperty(fields);
    setAlert({
      message: isPropertyAdded
        ? "Property added"
        : "Something went wrong, please try again later",
      isSuccess: isPropertyAdded,
    });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div className={styles["add-property"]} data-testid="add-property">
      <Alert {...alert} />
      <form
        className={styles["add-property__form"]}
        name="add property"
        onSubmit={handleAddProperty}
      >
        <TextBox
          field="title"
          onChange={handleFieldChange}
          type="text"
          value={fields.title}
        />
        <ComboBox
          field="type"
          onChange={handleFieldChange}
          value={fields.type}
          values={types}
        />
        <SpinButton
          field="bedrooms"
          min={0}
          onChange={handleFieldChange}
          step={1}
          value={fields.bedrooms}
        />
        <SpinButton
          field="bathrooms"
          min={0}
          onChange={handleFieldChange}
          step={1}
          value={fields.bathrooms}
        />
        <SpinButton
          field="price"
          min={0}
          onChange={handleFieldChange}
          step={5000}
          units="£"
          value={fields.price}
        />
        <ComboBox
          field="city"
          onChange={handleFieldChange}
          value={fields.city}
          values={cities}
        />
        <TextBox
          field="email"
          onChange={handleFieldChange}
          value={fields.email}
          type="email"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProperty;
