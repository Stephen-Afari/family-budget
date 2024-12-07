import { useState } from "react"
import { selectUserToken } from "../../../store/apiData/users/users.selector";
import { useSelector } from "react-redux";
export const useToken=()=>{
   
let token = useSelector(selectUserToken);
return token;
}