import api from '../api';

const URLS = {
    expenseUrl: "acttrxn",
  };
//  Fetch Data from the Server: Use Axios to make HTTP requests and fetch data from your server.
//  Use React Query to Manage Data Fetching and Caching: React Query will handle the data fetching, caching, and error/loading states.
//  Dispatch Redux Actions to Update the Reducers: After fetching the data with React Query, dispatch actions to your Redux store to update the reducers.
//  Update the UI from Redux: Your UI will automatically reflect the updated state from the Redux store.
//You cannot use a hook (eg. useSelector) here because fetchAllActualIncomes is not a
 
//Create the family to be used in signing up.
export const createExpense = async({expenseData,token}, config={}) => {
    
    const response = await api.post(URLS.expenseUrl, 
      JSON.stringify({
        expenseData,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
          ...config,
        }
       
    );
     
      return response.data;  
    ;
  };