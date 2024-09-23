import { useMemo, useState } from "react";
import { IDLE, defaultApiStatuses } from "../constants/api-status";
//This function takes a string s, capitalizes its first letter, and returns the modified string.
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
//This function prepares an object representing the API status in a normalized way. It converts each status from defaultApiStatuses into a boolean value, indicating if the currentStatus matches each individual status.


const prepareStatuses = (currentStatus) => {
  const statuses = {};
  //For the currentStatus, the corresponding key in the statuses object is set to true, while all other statuses are false.
  for (const status of defaultApiStatuses) {
    const normalisedStatus = capitalize(status.toLowerCase());
    const normalisedStatusKey = `is${normalisedStatus}`;
    //For the currentStatus, the corresponding key in the statuses object is set to true, while all other statuses are false.
    //If currentStatus = "LOADING", the result could be:

// {
//   isIdle: false,
//   isLoading: true,
//   isSuccess: false,
//   isError: false
// }
    statuses[normalisedStatusKey] = status === currentStatus;
  }
  return statuses;
};

export const useApiStatus = (currentStatus = IDLE) => {
  const [status, setStatus] = useState(currentStatus);
  //This memoizes the result of prepareStatuses(status) to avoid recalculating statuses unless status changes.
  //It runs prepareStatuses and gives you an object with normalized boolean keys like isIdle, isLoading, etc.
  const statuses = useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};
