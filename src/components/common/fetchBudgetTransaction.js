import { useQuery } from "react-query";
import { fetchAllBudgetTransactions } from "../../api_layer/budget/budgetTransactionsApi";
import { setBudgetApiTransaction } from "../../store/apiData/budgetTransaction/budgetAPITransaction.reducers";
import { useToken } from "./hooks/useToken";
import { useDispatch } from "react-redux";


export const BudgetTransactionFetcher=()=>{
    const token = useToken();
    const dispatch = useDispatch();
//BUDGET TRANSACTION
const {
    data: budgTransaction,
    isLoading:isLoadingBudgetTransaction,
    isSuccess:isSuccessBudgetTransaction,
    isError:isErrorBudgetTransaction,
    error:errorBudgetTransaction
  } = useQuery("budget_transactions", ()=> fetchAllBudgetTransactions(token), //Pass a function that React Query will execute when `isReady`
  {
    //enabled: isReady, // Only run query if token is available
    staleTime: Infinity, // Data is always fresh (no refetching)
    cacheTime: 10 * 60 * 1000, // Keep cached data for 10 minutes
    refetchOnWindowFocus: false, // Do not refetch on window focus
    onSuccess: (data)=>{
        // Dispatch Redux action to update the reducer
        
        dispatch(setBudgetApiTransaction(data.data.data));
       // console.log(selectAllApiIncomes)
    }
  });
  return null;
}