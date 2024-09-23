 import api from '../api';
 export const fetchAllActualIncomes=(config={})=>{
    api.get("", config).then((res)=>res.data)
 }

 console.log(fetchAllActualIncomes)