import api from '../api';

const URLS = {
  logInUserUrl: "users/login",
  signUpUserUrl: "users/signup",
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

export const signUpUserToken = async({name,email,password,passwordConfirm,family, role}, config={}) => {
    
  const response = await api.post(URLS.signUpUserUrl, 
    JSON.stringify({
      name,
        email,
        password,
        passwordConfirm,
        family,
        role
      }),
      {
        headers: { "Content-Type": "application/json" },
        ...config,
      }
     
  );
   
    return response.data;  
  ;
};