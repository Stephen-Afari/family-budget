import axios from "axios";
//The axiosParams object sets the base URL for the Axios instance depending on the environment
const axiosParams = {
  // Base URL should be set via environment
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:5000/api/v1/" : "https://family-budget-backend.onrender.com",
    //https://family-budget-backend.onrender.com
};
//This line of code creates a new instance of Axios with custom configuration options defined by axiosParams.
const axiosInstance = axios.create(axiosParams);

//didAbort checks if the error was caused by a canceled request using axios.isCancel(error). If so, it returns an object indicating that the request was aborted ({ aborted: true }).
export const didAbort = (error) => axios.isCancel(error) && { aborted: true };
//This function creates a cancel token source, which is used to cancel a request later.
const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error) => axios.isAxiosError(error);

//The withAbort function provides the ability to cancel the request if needed. If a request has an abort function passed in the configuration, it will set up a cancellation token using Axios's CancelToken feature. This is useful for aborting requests that are no longer needed, such as when a user navigates away from a page.
const withAbort = (fn) => {
 
  const executor = async (...args) => {
    const originalConfig = args[args.length - 1];
    //The line const { abort, ...config } = originalConfig; is using object destructuring in JavaScript to extract the abort property from the originalConfig object, while also creating a new config object that contains all the remaining properties from originalConfig (excluding abort).
    const { abort, ...config } = originalConfig;
//If the abort function is provided, it creates a cancelToken and attaches it to the request config.
//If the request is canceled (via the abort function), didAbort will catch the cancel event and modify the error object.
    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }
//The executor handles requests with or without a body by checking the number of arguments (args).
    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      if (didAbort(error)) {
        error.aborted = true;
      }

      throw error;
    }
  };

  return executor;
};
//This function wraps the request promise and catches any errors. If there's an error, it logs detailed information, such as the response data, status, and headers. This logging only happens when REACT_APP_DEBUG_API is set in the environment variables, which is useful for debugging during development.
//withLogger is an error-logging utility. It catches errors from Axios requests and logs details to the console if the REACT_APP_DEBUG_API environment variable is set.
export const withLogger = async (promise) =>
  promise.catch((error) => {
    if (!process.env.REACT_APP_DEBUG_API) throw error;
//error.response: The request was made, but the server responded with a status code that falls out of the 2xx range.
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      //error.request: The request was made, but no response was received.
    } else if (error.request) {
      console.log(error.request);
    } else {
      //General error: Any other errors (e.g., network issues).
      console.log("Error", error.message);
    }
    console.log(error.config);
    throw error;
  });
  //The api function takes axios as a parameter and returns an object that exposes different HTTP methods (get, delete, post, patch, and put). Each method is wrapped with withLogger and withAbort.
const api = (axios) => {
  return {
    //Sends an HTTP GET request to the given url with an optional config.
    //Wrapped in withLogger to log errors and withAbort to enable cancellation.
    get: (url, config = {}) => withLogger(withAbort(axios.get)(url, config)),
    delete: (url, config = {}) =>
      withLogger(withAbort(axios.delete)(url, config)),
    //Sends an HTTP POST request to the url with a body and an optional config.
    post: (url, body, config = {}) =>
      withLogger(withAbort(axios.post)(url, body, config)),
    patch: (url, body, config = {}) =>
      withLogger(withAbort(axios.patch)(url, body, config)),
    put: (url, body, config = {}) =>
      withLogger(withAbort(axios.put)(url, body, config)),
  };
};

export default api(axiosInstance);
