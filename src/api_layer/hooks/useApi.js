import { useState } from "react";
import { useApiStatus } from "./useApiStatus";
import { ERROR, PENDING, SUCCESS } from "../constants/api-status";

export function useApi(fn, config = {}) {
  const { initialData } = config;
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();
//exec: This function performs the API request and handles the response and error.
// Before the API call: Sets the status to PENDING to indicate the request is in progress.
// After the API call:
// If successful: Stores the response in data, changes the status to SUCCESS, and returns { data, error: null }.
// If an error occurs: Catches the error, stores it in error, changes the status to ERROR, and returns { error, data: null }.
  const exec = async (...args) => {
    try {
      setStatus(PENDING);
      const data = await fn(...args);
      setData(data);
      setStatus(SUCCESS);
      return {
        data,
        error: null,
      };
    } catch (error) {
      setError(error);
      setStatus(ERROR);
      return {
        error,
        data: null,
      };
    }
  };
  return {
    data,
    setData,
    status,
    setStatus,
    exec,
    ...normalisedStatuses,
  };
}
