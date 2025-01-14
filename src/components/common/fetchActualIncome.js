import { useQuery } from "react-query";
import { fetchAllActualIncomes } from "../../api_layer/actuals/actualIncomeApi";
import { setActualApiIncomes } from "../../store/apiData/actualIncome/actualAPIIncome.reducer";
import { useToken } from "./hooks/useToken";
import { useDispatch } from "react-redux";

export const ActualIncomeFetcher=()=>{
    const token = useToken();
    const dispatch = useDispatch();

//Use React Query to Manage Data Fetching and Caching: React Query will handle the data fetching, caching, and error/loading states.
const {
    data: actIncomes,
    isLoading:isLoadingIncomes,
    isSuccess:isSuccessIncomes,
    isError:isErrorIncomes,
    error:errorIncomes
  } = useQuery("actual_incomes", ()=> fetchAllActualIncomes(token), //Pass a function that React Query will execute when `isReady`
  {
   // enabled: isReady, // Only run query if token is available
   staleTime: Infinity, // Data is always fresh (no refetching)
   cacheTime: 10 * 60 * 1000, // Keep cached data for 10 minutes
   refetchOnWindowFocus: false, // Do not refetch on window focus
    onSuccess: (data)=>{
        // Dispatch Redux action to update the reducer
        
        dispatch(setActualApiIncomes(data.data.data));
       //console.log(data.data.data);
    }
  });

  return null;
}