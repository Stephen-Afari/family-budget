import { useQuery } from "react-query";
import { fetchAllActualTransactions } from "../../api_layer/actuals/actualTransactionsApi";
import { useToken } from "./hooks/useToken";
import { setActualApiTransaction } from "../../store/apiData/actualTransaction/actualAPITransaction.reducer";
import { useDispatch } from "react-redux";

export const ActualTransactionFetcher=()=>{

const token = useToken();
const dispatch = useDispatch();
const {
    data: actTransaction,
    isLoading:isLoadingTransaction,
    isSuccess:isSuccessTransaction,
    isError:isErrorTransaction ,
    error:errorTransaction
  } = useQuery("actual_transactions", ()=> fetchAllActualTransactions(token), //Pass a function that React Query will execute when `isReady`
  {
    //enabled: isReady, // Only run query if token is available
    onSuccess: (data)=>{
        // Dispatch Redux action to update the reducer
        
        dispatch(setActualApiTransaction(data.data.data));
       // console.log(selectAllApiIncomes)
    }
  });
  // Test the API layer and Redux state changes ... 


    return null;
  }
  