import axios from "axios";
import baseUrl from "./baseAPI_URL.json";

const addProperty = (property) =>
  axios
    .post(`${baseUrl}/PropertyListing`, property)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

export default addProperty;
