import React, { useState, useEffect } from "react";
import css from "../styles/AddProperty.module.css";
import ComboBox from "./ComboBox";
import SpinButton from "./SpinButton";
import TextBox from "./TextBox";
import Alert from "./Alert";
import cities from "../config/cities.json";
import types from "../config/types.json";
import useAPI from "../requests/useAPI";

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
  const { request, error, response, controller } = useAPI();

  const handleAddProperty = async (event) => {
    event.preventDefault();
    request({ method: "post", payload: fields });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  useEffect(() => {
    let { message, isSuccess } = initialState.alert;

    if (error) {
      message = error.message;
    }
    if (response && response.status === 201) {
      message = response.statusText;
      isSuccess = true;
    }
    setAlert({ message, isSuccess });
  }, [response, error]);

  useEffect(() => () => controller && controller.abort(), []);

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
