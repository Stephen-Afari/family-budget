 import api from '../api';
 import { selectUser } from '../../store/apiData/users/users.selector';
 import { useSelector } from 'react-redux';
 

//  Fetch Data from the Server: Use Axios to make HTTP requests and fetch data from your server.
//  Use React Query to Manage Data Fetching and Caching: React Query will handle the data fetching, caching, and error/loading states.
//  Dispatch Redux Actions to Update the Reducers: After fetching the data with React Query, dispatch actions to your Redux store to update the reducers.
//  Update the UI from Redux: Your UI will automatically reflect the updated state from the Redux store.
//You cannot use a hook (eg. useSelector) here because fetchAllActualIncomes is not a

//creating a custom hook to fetch token
export const useToken =()=>{
let userToken = useSelector(selectUser);

return userToken;


}
 
export const fetchAllActualIncomes=( config={})=>{
  const token = useToken();
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI4NGEyM2FiN2U0N2JlNGFkMzg2NSIsImlhdCI6MTcyNzA3MjQ1MiwiZXhwIjoxNzM0ODQ4NDUyfQ.lEnAaBGIddbSuHABzsLB4Fa4ouRxOQk5PP66shwgiJo'; 
    
    return api.get("actincome", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
        ...config,
      }).then((res) => {
       
        return res.data;  
      })
      
    };



    // export const fetchAllActualIncomes=(config={})=>{
    //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI4NGEyM2FiN2U0N2JlNGFkMzg2NSIsImlhdCI6MTcyNzA3MjQ1MiwiZXhwIjoxNzM0ODQ4NDUyfQ.lEnAaBGIddbSuHABzsLB4Fa4ouRxOQk5PP66shwgiJo'; 
    //     api.get("actincome", {
    //         headers: {
    //           Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
    //         },
    //         ...config,
    //       }).then((res) => {
    //         // Logging the response to see what the API sends back
    //         console.log("API Response:", res.data.data.data);
    //         return res.data;  // Return the data to the calling function
    //       })
    //       .catch((error) => {
    //         // Logging the error to understand what went wrong
    //         console.error("Error fetching incomes:", error);
    //         throw error;  // Re-throw the error so it can be handled further up
    //       });
    //     };

 