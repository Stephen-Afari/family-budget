import api from '../api';

const URLS = {
  logInUserUrl: "users/login",
};

export const getUserLogIn = async({email,password}, config={}) => {
    
  const response = api.post(URLS.logInUserUrl, 
    JSON.stringify({
        email,
        password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        ...config,
      }
     
  ).then((res) => {
   
    return response.data;  
  });
};