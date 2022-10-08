import axios from "axios";
import baseUrl from "./baseAPI_URL.json";

const getProperties = ({ search, source }) =>
  axios.get(`${baseUrl}/PropertyListing${search}`, {
    cancelToken: source.token,
    timeout: 5000,
  });

export default getProperties;
