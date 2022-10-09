import axios from "axios";
import { useState } from "react";
import baseUrl from "../config/baseAPI_URL.json";

axios.defaults.baseURL = baseUrl;

const useAddProperty = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();

  const addProperty = (property) => {
    setIsLoading(true);

    axios
      .post("/PropertyListing", {
        data: property,
        signal: controller.signal,
        timeout: 5000,
      })
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  return [{ response, error, isLoading, controller }, addProperty];
};

export default useAddProperty;
