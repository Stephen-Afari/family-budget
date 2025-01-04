import { useQuery } from "react-query";
import { fetchAllBudgetIncomes } from "../../api_layer/budget/budgetIncomeApi";
import { selectUserToken } from "../../store/apiData/users/users.selector";
import { selectBudgetApiIncomes } from "../../store/apiData/budgetIncome/budgetAPIIncome.selector";
import { useToken } from "./hooks/useToken";
import { setBudgetApiIncomes } from "../../store/apiData/budgetIncome/budgetAPIIncome.reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";


export const BudgetIncomeFetcher=()=>{
const token = useToken();
// const [isReady, setIsReady]= useState(false);
const dispatch = useDispatch();
// if(token){
//   setIsReady(true);
// }
//BUDGET INCOME QUERY
const {
    data: budgIncomes,
    isLoading:isLoadingBudgetIncomes,
    isSuccess:isSuccessBudgetIncomes,
    isError:isErrorBudgetIncomes,
    error:errorBudgetIncomes
  } = useQuery("budget_incomes", ()=> fetchAllBudgetIncomes(token), //Pass a function that React Query will execute when `isReady`
  {
    //enabled: token, // Only run query if token is available
    staleTime: Infinity, // Data is always fresh (no refetching)
    cacheTime: 10 * 60 * 1000, // Keep cached data for 10 minutes
    refetchOnWindowFocus: false, // Do not refetch on window focus
    onSuccess: (data)=>{
        // Dispatch Redux action to update the reducer
        
        dispatch(setBudgetApiIncomes(data.data.data));
       //console.log(data.data.data)
    }
  });
  


    return null; //render nothing
}