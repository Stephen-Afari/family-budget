import { fetchAllBudgetTransactions } from "../../api_layer/budget/budgetTransactionsApi";
import { setBudgetApiTransaction } from "../../store/apiData/budgetTransaction/budgetAPITransaction.reducers";
import { useToken } from "./hooks/useToken";


export const BudgetTransactionFetcher=()=>{
    const token = useToken();

//BUDGET TRANSACTION
const {
    data: budgTransaction,
    isLoading:isLoadingBudgetTransaction,
    isSuccess:isSuccessBudgetTransaction,
    isError:isErrorBudgetTransaction,
    error:errorBudgetTransaction
  } = useQuery("budget_transactions", ()=> fetchAllBudgetTransactions(token), //Pass a function that React Query will execute when `isReady`
  {
    enabled: isReady, // Only run query if token is available
    onSuccess: (data)=>{
        // Dispatch Redux action to update the reducer
        
        dispatch(setBudgetApiTransaction(data.data.data));
       // console.log(selectAllApiIncomes)
    }
  });
  return null;
}