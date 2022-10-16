import { useState } from "react";
import axios from "axios";
import baseUrl from "../config/baseAPI_URL.json";

axios.defaults.baseURL = baseUrl;

const useAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  let controller;

  const request = ({ method, data, endpoint, query }) => {
    controller = new AbortController();
    setResponse(null);
    setError(null);
    setIsLoading(true);

    if (endpoint.match(/propertylisting/i)) {
      if (method.match(/get/i)) {
        axios
          .get(`/PropertyListing${query}`, {
            signal: controller.signal,
          })
          .then((res) => setResponse(res))
          .catch((err) => setError(err))
          .finally(() => setIsLoading(false));

        return;
      }

      if (method.match(/post/i)) {
        axios
          .post("/PropertyListing", data, {
            signal: controller.signal,
          })
          .then((res) => setResponse(res))
          .catch((err) => setError(err))
          .finally(() => setIsLoading(false));

        return;
      }
    }

    if (endpoint.match(/favourite/i)) {
      if (method.match(/get/i)) {
        axios
          .get(`/Favourite`)
          .then((res) => setResponse(res))
          .catch((err) => setError(err))
          .finally(() => setIsLoading(false));

        return;
      }

      if (method.match(/post/i)) {
        axios
          .post(`/Favourite${query}`, data, {
            signal: controller.signal,
          })
          .then((res) => setResponse(res))
          .catch((err) => setError(err))
          .finally(() => setIsLoading(false));
      }
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
