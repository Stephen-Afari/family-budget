 import api from '../api';
 export const fetchAllActualIncomes=(config={})=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI4NGEyM2FiN2U0N2JlNGFkMzg2NSIsImlhdCI6MTcyNzA3MjQ1MiwiZXhwIjoxNzM0ODQ4NDUyfQ.lEnAaBGIddbSuHABzsLB4Fa4ouRxOQk5PP66shwgiJo'; 
    api.get("actincome", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
        ...config,
      }).then((res) => {
       
        res.data;  
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

 