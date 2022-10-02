import axios from "axios";
import baseUrl from "./baseAPI_URL.json";

const addProperty = (property) =>
  axios
    .post(`${baseUrl}/PropertyListing`, property)
    .then(() => true)
    .catch(() => false);

export default addProperty;
