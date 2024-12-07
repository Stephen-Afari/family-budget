import { useQuery } from "react-query";
import { fetchAllBudgetIncomes } from "../../api_layer/budget/budgetIncomeApi";
import { selectUserToken } from "../../store/apiData/users/users.selector";
import { selectBudgetApiIncomes } from "../../store/apiData/budgetIncome/budgetAPIIncome.selector";
import { useToken } from "./hooks/useToken";
import { setBudgetApiIncomes } from "../../store/apiData/budgetIncome/budgetAPIIncome.reducer";
import { useDispatch } from "react-redux";


export const BudgetIncomeFetcher=()=>{
const token = useToken();
// const dispatch = useDispatch();
//BUDGET INCOME QUERY
const {
    data: budgIncomes,
    isLoading:isLoadingBudgetIncomes,
    isSuccess:isSuccessBudgetIncomes,
    isError:isErrorBudgetIncomes,
    error:errorBudgetIncomes
  } = useQuery("budget_incomes", ()=> fetchAllBudgetIncomes(token), //Pass a function that React Query will execute when `isReady`
  {
    enabled: isReady, // Only run query if token is available
    onSuccess: (data)=>{
        // Dispatch Redux action to update the reducer
        
        dispatch(setBudgetApiIncomes(data.data.data));
       //console.log(data.data.data)
    }
  });
  


    return null; //render nothing
}