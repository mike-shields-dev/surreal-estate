import axios from "axios";
import baseUrl from "../config/baseAPI_URL.json";

axios.defaults.baseURL = baseUrl;

const getProperties = (params = "") => {
  return axios
    .get(`/PropertyListing${params}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getProperty = (propertyId) => {
  return axios
    .get(`PropertyListing/${propertyId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

const postProperty = (fields) => {
  return axios.post(`PropertyListing`, fields);
};

const getFavourites = (userId) => {
  return axios
    .get(`Favourite?query={"fbUserId":"${userId}"}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const postFavourite = ({ params, data }) => {
  return axios
    .post(`Favourite${params}`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteFavourite = (favouriteId) => {
  return axios
    .delete(`Favourite/${favouriteId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export {
  getProperties,
  getProperty,
  postProperty,
  getFavourites,
  postFavourite,
  deleteFavourite,
};
