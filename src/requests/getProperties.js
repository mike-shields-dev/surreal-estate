import axios from "axios";
import baseUrl from "./baseAPI_URL.json";

const getProperties = (source) =>
  axios.get(`${baseUrl}/PropertyListing`, {
    cancelToken: source.token,
    timeout: 5000,
  });

export default getProperties;
