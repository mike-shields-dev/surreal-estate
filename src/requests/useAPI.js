import { useState } from "react";
import axios from "axios";
import baseUrl from "../config/baseAPI_URL.json";

axios.defaults.baseURL = baseUrl;

const useAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  let controller;

  const request = ({ method, payload, search }) => {
    controller = new AbortController();
    setIsLoading(true);
    setResponse(null);
    setError(null);

    if (method.match(/get/i)) {
      axios
        .get(`/PropertyListing${search}`, {
          signal: controller.signal,
        })
        .then((res) => setResponse(res))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }

    if (method.match(/post/i)) {
      axios
        .post("/PropertyListing", payload, {
          signal: controller.signal,
        })
        .then((res) => setResponse(res))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
  };

  return {
    request,
    response,
    error,
    isLoading,
    controller,
  };
};

export default useAPI;
