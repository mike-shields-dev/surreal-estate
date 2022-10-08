import React, { useState } from "react";
import styles from "../styles/AddProperty.module.css";
import ComboBox from "./ComboBox";
import SpinButton from "./SpinButton";
import TextBox from "./TextBox";
import Alert from "./Alert";
import addProperty from "../requests/addProperty";
import cities from "../config/cities.json";
import types from "../config/types.json";

const initialState = {
  alert: {
    message: "",
    isSuccess: false,
  },
  fields: {
    title: "",
    city: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
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
    setFields(initialState.fields);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div className={styles["add-property"]} title="add property">
      <form
        className={styles["add-property__form"]}
        name="add property"
        onSubmit={handleAddProperty}
      >
        <Alert {...alert} />
        <TextBox
          field="title"
          onChange={handleFieldChange}
          type="text"
          value={fields.title}
          maxLength="48"
        />
        <ComboBox
          field="type"
          onChange={handleFieldChange}
          options={types}
          value={fields.type}
        />
        <SpinButton
          field="bedrooms"
          min="0"
          onChange={handleFieldChange}
          step="1"
          value={fields.bedrooms}
        />
        <SpinButton
          field="bathrooms"
          min="0"
          onChange={handleFieldChange}
          step="1"
          value={fields.bathrooms}
        />
        <SpinButton
          field="price"
          min="0"
          onChange={handleFieldChange}
          step="1"
          units="£"
          value={fields.price}
        />
        <ComboBox
          field="city"
          onChange={handleFieldChange}
          options={cities}
          value={fields.city}
        />
        <TextBox
          field="email"
          onChange={handleFieldChange}
          value={fields.email}
          type="email"
          maxLength="64"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProperty;
