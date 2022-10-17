import React, { useState } from "react";
import css from "../styles/AddProperty.module.css";
import ComboBox from "./ComboBox";
import SpinButton from "./SpinButton";
import TextBox from "./TextBox";
import Alert from "./Alert";
import cities from "../config/cities.json";
import types from "../config/types.json";
import { postProperty } from "../requests/API";

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
    setAlert(initialState.alert);

    postProperty(fields)
      .then(() => {
        setAlert({
          message: "Property added, thank you",
          isSuccess: true,
        });
        setFields(initialState.fields);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setAlert({
            message: "Server error, please try again",
            isSuccess: false,
          });
        } else if (err.request) {
          setAlert({
            message: "Network error, please try again",
            isSuccess: false,
          });
        }
      });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div className={css["add-property"]} title="add property">
      <form
        className={css["add-property__form"]}
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
          required
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
          required
        />
        <SpinButton
          field="bathrooms"
          min="0"
          onChange={handleFieldChange}
          step="1"
          value={fields.bathrooms}
          required
        />
        <SpinButton
          field="price"
          min="0"
          onChange={handleFieldChange}
          step="1"
          units="£"
          value={fields.price}
          required
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
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProperty;
