import api from '../api';

 
//  Fetch Data from the Server: Use Axios to make HTTP requests and fetch data from your server.
//  Use React Query to Manage Data Fetching and Caching: React Query will handle the data fetching, caching, and error/loading states.
//  Dispatch Redux Actions to Update the Reducers: After fetching the data with React Query, dispatch actions to your Redux store to update the reducers.
//  Update the UI from Redux: Your UI will automatically reflect the updated state from the Redux store.
//You cannot use a hook (eg. useSelector) here because fetchAllActualIncomes is not a
 
export const fetchAllActualTransactions=( token, config={})=>{

    return api.get("acttrxn", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
        ...config,
      }).then((res) => {
       
        return res.data;  
      })
      
    };
