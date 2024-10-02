import api from '../api';

const URLS = {
  logInUserUrl: "users/login",
};

export const getUserToken = async({email,password}, config={}) => {
    
  const response = await api.post(URLS.logInUserUrl, 
    JSON.stringify({
        email,
        password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        ...config,
      }
     
  );
   
    return response.data;  
  ;
};