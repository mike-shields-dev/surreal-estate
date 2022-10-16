import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";

const SavedProperty = ({ propertyListingId }) => {
  const { request, response, controller } = useAPI();
  const [property, setProperty] = useState({});

  const requestProperty = () => {
    if (!propertyListingId) return;
    request({
      method: "get",
      endpoint: "/PropertyListing",
      params: `/${propertyListingId}`,
    });
  };

  useEffect(() => {
    requestProperty();
  }, []);

  useEffect(() => {
    if (!response) return;
    setProperty(response.data);
  }, [response]);

  useEffect(() => () => controller?.abort());

  return <div>{property.title}</div>;
};

SavedProperty.propTypes = {
  propertyListingId: PropTypes.string.isRequired,
};

export default SavedProperty;
