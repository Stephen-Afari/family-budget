import api from '../api';

const URLS = {
    incomeUrl: "budginc",
  };
//  Fetch Data from the Server: Use Axios to make HTTP requests and fetch data from your server.
//  Use React Query to Manage Data Fetching and Caching: React Query will handle the data fetching, caching, and error/loading states.
//  Dispatch Redux Actions to Update the Reducers: After fetching the data with React Query, dispatch actions to your Redux store to update the reducers.
//  Update the UI from Redux: Your UI will automatically reflect the updated state from the Redux store.
//You cannot use a hook (eg. useSelector) here because fetchAllActualIncomes is not a
 
//Create the family to be used in signing up.
export const createBudgetIncome = async({incData}, config={}) => {
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI4NGEyM2FiN2U0N2JlNGFkMzg2NSIsImlhdCI6MTcyODU0OTQ1MiwiZXhwIjoxNzM2MzI1NDUyfQ.42AMCexxkGKhPGZMf0TUbMZvvavWBd2ATCfpFjKQNA4'
    const response = await api.post(URLS.incomeUrl, 
      JSON.stringify({
        incData,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
            "Content-Type": "application/json", // Set the content type to JSON
          },
          ...config,
        }
       
    );
     
      return response.data;  
    ;
  };