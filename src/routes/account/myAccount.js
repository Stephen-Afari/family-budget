import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { AccountHeader,AccountIconContainer, Dropdown, DropdownContainer, MonthDropdown, MyExpenseTable, MyIncomeTable, MyTable, RefreshButton, TableBodyContainer, TableBodyContainerExp, TableContainer, TableData, TableData1, TableDataProps, TableDataVarPcnt, TableHead, TableRow, TableRow1, YearDropdown } from "./myAccount.styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import combinedFilteredItems from "../../components/common/combineFIlters";
import { selectActualincomes, selectActualIncomeTotalByDate, selectActualIncomeTotalByYearAndMonth } from "../../store/actualIncome/actualIncome.selector";
import { selectActualExpenseTotalByDate, selectActualExpenseTotalByYearAndMonth, selectActualtransactions } from "../../store/actualTransactions/actualTransactions.selector";
import { selectBudgetincomes, selectBudgetIncomeTotalByYearAndMonth, selectIncomeTotalByDate } from "../../store/budgetIncome/budgetIncome.selector";
import { selectBudgettransactions, selectExpenseTotalByDate, selectExpenseTotalByYearAndMonth } from "../../store/budgetTransactions/budgetTransactions.selector";
import { years,months } from "../../components/common/periods";
import { QueryCache, QueryClient, useQuery, useQueryClient } from "react-query";
import { setActualApiIncomes } from "../../store/apiData/actualIncome/actualAPIIncome.reducer";
import { fetchAllActualIncomes } from "../../api_layer/actuals/actualIncomeApi";
import { selectActualApiIncomes, selectActualApiIncomeTotalByYearAndMonth } from "../../store/apiData/actualIncome/actualAPIIncome.selector";
import { selectUser } from "../../store/apiData/users/users.selector";
import { fetchAllActualTransactions } from "../../api_layer/actuals/actualTransactionsApi";
import { setActualApiTransaction } from "../../store/apiData/actualTransaction/actualAPITransaction.reducer";
import { selectActualApiTransaction, selectActualApiTransactionTotalByYearAndMonth } from "../../store/apiData/actualTransaction/actualAPITransaction.selector";
import { fetchAllBudgetIncomes } from "../../api_layer/budget/budgetIncomeApi";
import { selectBudgetApiIncomes, selectBudgetApiIncomeTotalByYearAndMonth } from "../../store/apiData/budgetIncome/budgetAPIIncome.selector";
import { setBudgetApiIncomes } from "../../store/apiData/budgetIncome/budgetAPIIncome.reducer";
import { selectBudgetApiTransaction, selectBudgetApiTransactionTotalByYearAndMonth } from "../../store/apiData/budgetTransaction/budgetAPITransaction.selectors";
import { setBudgetApiTransaction } from "../../store/apiData/budgetTransaction/budgetAPITransaction.reducers";
import { fetchAllBudgetTransactions } from "../../api_layer/budget/budgetTransactionsApi";
import { selectUserToken } from "../../store/apiData/users/users.selector";

// const years = [2022, 2023, 2024,2025,2026,2027,2028,2029,2030];
// const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//// Utility function for currency formatting
const formatCurrency = (value, locale = 'en-GH', currency = 'GHS') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency,minimumFractionDigits: 0,
  maximumFractionDigits: 0, }).format(value);
};

// Utility function to format as percentage
const formatPercentage = (value, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

  //This is the Budget vs Actual Page
  export const MyAccountScreen=()=>{
    //get Token
// const token = useSelector(selectUserToken)
// //  const userToken = useToken();
// //console.log("testingToken",token)
// const [isReady, setIsReady]= useState(false);
// // Wait for the token to be set
//  useEffect(()=>{
// if(token && Object.keys(token).length>0){
//   setIsReady(true); // Only set ready when token is not empty
// }
//  },[token]);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    //Selecting API data
    // const actualApiIncomes= useSelector(selectActualApiIncomes);
    // const actualApiTransaction = useSelector(selectActualApiTransaction);
    // const budgetApiIncomes = useSelector(selectBudgetApiIncomes);
    // const budgetApiTransaction= useSelector(selectBudgetApiTransaction);
    //console.log('Budg_Inc',budgetApiIncomes);
    ///////////////
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth]= useState(new Date().getMonth());
    
    //const myActualIncomes = useSelector(selectActualincomes) || [];
    //const myActualExpenses = useSelector(selectActualtransactions) || [];
    //const myBudgetIncome = useSelector(selectBudgetincomes) || [];
    //const myBudgetTransaction = useSelector(selectBudgettransactions) || [];

    const myActualIncomes = useSelector(selectActualApiIncomes) || [];
    const myActualExpenses = useSelector(selectActualApiTransaction) || [];
    const myBudgetIncome = useSelector(selectBudgetApiIncomes) || [];
    const myBudgetTransaction = useSelector(selectBudgetApiTransaction) || [];
    const [selectedDate, setSelectedDate]= useState(null);

///////////////////////////////////////////////////



  
  // Test the API layer and Redux state changes ... 
  // useEffect(() => {
  //   if (isSuccessBudgetIncomes) {
    
  //   console.log('Redux State (budget transaction):', budgetApiTransaction);
  //   }
  //   }, [isSuccessTransaction,budgetApiTransaction]);
  

  // Handle loading and error states for each query
  // if (isLoadingIncomes || isLoadingTransaction)
  //   return <div>Loading...</div>;
//////////////////////////////////////////////////



//Once the application loads, set the year and month to the ff.
    useEffect(()=>{
      setSelectedYear(new Date().getFullYear());
      setSelectedMonth('All')

    },[])
    //filter arrays
//     const filterData = (data,mydate)=>{
//       let results=[];
//     if(mydate){
//     results =  data.filter((item)=>{
//         return new Date(item.date).toDateString() === new Date(mydate).toDateString()
//       })
//     }
     
// return results;
//     }

    //Function to filter date by year and month
    const filterDataByYearAndMonth = (data, year, month)=>{
      return data.filter((item)=>{
      let itemDate = new Date(item.date);
      let itemYear = itemDate.getFullYear();
      let itemMonth = itemDate.getMonth();

     // Check if the year matches
    if (itemYear !== year) return false;

    // Check if the month is 'All'
    if (month === 'All') return true;

    // Check if the month matches
    return itemMonth === months.indexOf(month) - 1; //indexOf(month) returns the index of the month string within the months array. For example, months.indexOf('January') returns 1.months.indexOf(month) - 1 converts the one-based index (starting from 1) to a zero-based index (starting from 0) to match the zero-based index returned by getMonth()

    })
    }
const filteredActualIncomes = filterDataByYearAndMonth(myActualIncomes,selectedYear, selectedMonth);
const filteredActualTransactions = filterDataByYearAndMonth(myActualExpenses,selectedYear, selectedMonth);
const filteredPlanIncomes = filterDataByYearAndMonth(myBudgetIncome,selectedYear, selectedMonth);
const filteredPlanTransactions = filterDataByYearAndMonth(myBudgetTransaction,selectedYear, selectedMonth);

  //const totalPlanIncome = useSelector((state)=>selectBudgetIncomeTotalByYearAndMonth(selectedYear, selectedMonth,months)(state))
 //const totalPlanExpense = useSelector((state)=>selectExpenseTotalByYearAndMonth(selectedYear, selectedMonth,months)(state))
//const totalActIncome = useSelector((state)=>selectActualIncomeTotalByYearAndMonth(selectedYear, selectedMonth,months)(state));
//const totalActExpense= useSelector((state)=>selectActualExpenseTotalByYearAndMonth(selectedYear, selectedMonth,months)(state));

const totalPlanIncome = useSelector((state)=>selectBudgetApiIncomeTotalByYearAndMonth(selectedYear, selectedMonth,months)(state))
 const totalPlanExpense = useSelector((state)=>selectBudgetApiTransactionTotalByYearAndMonth(selectedYear, selectedMonth,months)(state))
const totalActIncome = useSelector((state)=>selectActualApiIncomeTotalByYearAndMonth(selectedYear, selectedMonth,months)(state));
const totalActExpense= useSelector((state)=>selectActualApiTransactionTotalByYearAndMonth(selectedYear, selectedMonth,months)(state));

//console.log(totalActExpense, totalActIncome);

//  //Combining the Arrays for the Budget--returns an array of objects , map returns an array which also returns an inner object.

// //Flattening a result typically means taking a nested structure and reducing it to a simpler, one-level structure. In the context of arrays, it means converting an array of arrays into a single array that contains all the elements of the nested arrays.

// //flatMap iterates over each planItem in the planInc array.
// //For each planItem, it filters the actualInc array to find all actualItems with the same parent.
// //If there are no matching actual items, it returns an array with a single object where actualAmount is 0.
// //If there are matching actual items, it maps over these items to create an array of combined objects.
// //flatMap flattens the resulting arrays into a single array, combining all the elements into one level.
// //Flattening: Reduces a nested structure to a simpler, one-level structure.
// //const nestedArray = [[1, 2], [3, 4], [5, 6]];
// //const flattenedArray = [1, 2, 3, 4, 5, 6];
// const combinedFilteredItems = (planInc, actualInc, totalPlanIncome, totalActIncome) => {

//   // Create a map to track actual items by their parent -- {parent1:[{}], parent2:[{}]}
//  const actualItemsMap= actualInc.reduce((map,actualItem)=>{
//    if(!map[actualItem.parent]){
//      map[actualItem.parent]=[];
//    }
//    map[actualItem.parent].push(actualItem)
//  return map;
//  },{})
 
//  // Combine plan and actual items
//  const combinedItems = planInc.flatMap((planItem)=>{
//  const matchingActualItems = actualItemsMap[planItem.parent] || [];
 
//  if(matchingActualItems.length === 0){
//    return ([
//  {
 
//    planParent: planItem.parent,
//          planAmount: planItem.amount || 0,
//          planPercentage: formatPercentage(planItem.amount / totalPlanIncome),
//          actualParent: '',
//          actualAmount: 0,
//          actualPercentage: formatPercentage(0)
//  }])
//  }
//  return matchingActualItems.map((actualItem)=>({
//    planParent: planItem.parent,
//        planAmount: planItem.amount || 0,
//        planPercentage: formatPercentage(planItem.amount / totalPlanIncome),
//        actualParent: actualItem.parent,
//        actualAmount: actualItem.amount || 0,
//        actualPercentage: formatPercentage(actualItem.amount / totalActIncome)
//  }))
 
//  })
//   // Add actual items that don't have a corresponding plan item
//   actualInc.forEach((actualItem)=>{
//    if(!planInc.find((planItem)=>planItem.parent === actualItem.parent)){
//      combinedItems.push({
//        planParent: '',
//        planAmount: 0,
//        planPercentage: formatPercentage(0),
//        actualParent: actualItem.parent,
//        actualAmount: actualItem.amount || 0,
//        actualPercentage: formatPercentage(actualItem.amount / totalActIncome)
//      });
//    }
//   })
 
//  return combinedItems
 
//  };




//console.log(totalActIncome)
// console.log(totalActIncome)

//console.log(combinedFilteredItems(filteredPlanIncomes,filteredActualIncomes,totalPlanIncome,totalActIncome))
//console.log(combinedFilteredItems(filteredPlanTransactions,filteredActualTransactions,totalPlanExpense,totalActExpense))
//console.log(combinedFilteredItems(filteredPlanTransactions,filteredActualTransactions,totalPlanExpense,totalActExpense))
//console.log(combinedFilteredItems(filteredPlanTransactions,filteredActualTransactions,totalPlanExpense,totalActExpense))
// console.log(totalActExpense)
// console.log(filteredActualTransactions)

const fetchAllData = () => {
  queryClient.refetchQueries("actual_incomes");
  queryClient.refetchQueries("budget_transactions");
  queryClient.refetchQueries("actual_transactions");
  queryClient.refetchQueries("budget_incomes");

  console.log("All data refetched!");
};
    return(
      <>
     <AccountHeader><AccountIconContainer><IoReorderFourSharp /> </AccountIconContainer>Budget vs Actual</AccountHeader>
     <RefreshButton onClick={fetchAllData}>Refresh</RefreshButton>
      <DropdownContainer>
        <YearDropdown value={selectedYear} onChange={(e)=>setSelectedYear(parseInt(e.target.value))}>
        {years.map((year)=>(
          <option key={year} value={year}>{year}</option>
        ))}
        </YearDropdown>
        <MonthDropdown value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)}>
       {months.map((month)=>(
        <option key={month} value={month}>{month}</option>
       ))}
        </MonthDropdown>
        </DropdownContainer>
        <TableContainer>
       
        <MyIncomeTable>
          <thead>
            <TableRow>
              <TableHead>Income</TableHead>
              
              <TableHead>Plan</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Var</TableHead>
              <TableHead>Plan %</TableHead>
              <TableHead>Actual %</TableHead>
              <TableHead>Var %</TableHead>
            </TableRow>
          </thead>
          <TableBodyContainer>
            { combinedFilteredItems(filteredPlanIncomes,filteredActualIncomes,totalPlanIncome,totalActIncome).length > 0 ? (
               combinedFilteredItems(filteredPlanIncomes,filteredActualIncomes,totalPlanIncome,totalActIncome).map((income,index) => (
                <TableRow1 key={index}>
                  <TableData>{income.planParent.charAt(0).toUpperCase()+income.planParent.substring(1)}</TableData>
                  <TableData>{formatCurrency(income.planAmount)}</TableData>
                  <TableData>{formatCurrency(income.actualAmount)}</TableData>
                  <TableDataProps variance={income.planAmount - income.actualAmount}>{formatCurrency(income.planAmount - income.actualAmount) }</TableDataProps>
                  <TableData>{income.planPercentage}</TableData>
                  <TableData>{income.actualPercentage}</TableData>
                  <TableDataVarPcnt varpcnt={parseInt(income.planPercentage) - parseInt(income.actualPercentage) }>{`${formatPercentage((parseInt(income.planPercentage) - parseInt(income.actualPercentage))/100)}`}</TableDataVarPcnt>
                </TableRow1>
              ))
            ) : (
              <TableRow>
                <TableData colSpan="10">No incomes for the selected period</TableData>
              </TableRow>
            )}
          </TableBodyContainer>
        </MyIncomeTable>

       
        <MyExpenseTable>
        <thead>
            <TableRow>
            <TableHead>Expense</TableHead>
             
              <TableHead>Plan</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Var</TableHead>
              <TableHead>Plan %</TableHead>
              <TableHead>Actual %</TableHead>
              <TableHead>Var %</TableHead>
            </TableRow>
          </thead>
          <TableBodyContainerExp>
            {combinedFilteredItems(filteredPlanTransactions,filteredActualTransactions,totalPlanExpense,totalActIncome).length > 0 ? (
              combinedFilteredItems(filteredPlanTransactions,filteredActualTransactions,totalPlanExpense,totalActIncome).map((transaction,index) => (
                <TableRow1 key={index}>
                  <TableData>{transaction.actualParent.charAt(0).toUpperCase()+transaction.actualParent.substring(1) || transaction.planParent.charAt(0).toUpperCase()+transaction.planParent.substring(1)}</TableData>
                  <TableData>{formatCurrency(transaction.planAmount)}</TableData>
                  <TableData >{formatCurrency(transaction.actualAmount)}</TableData>
                  <TableDataProps variance={transaction.planAmount - transaction.actualAmount}>{formatCurrency(transaction.planAmount - transaction.actualAmount) }</TableDataProps>
                  <TableData>{transaction.planPercentage}</TableData>
                  <TableData>{transaction.actualPercentage}</TableData>
                  <TableDataVarPcnt varpcnt={parseInt(transaction.planPercentage) - parseInt(transaction.actualPercentage)}>{`${formatPercentage((parseInt(transaction.planPercentage) - parseInt(transaction.actualPercentage))/100)}`}</TableDataVarPcnt>
                </TableRow1>
              ))
            ) : (
              <TableRow>
                <TableData >No transactions for the selected period</TableData>
              </TableRow>
            )}
          </TableBodyContainerExp>
        </MyExpenseTable>
      </TableContainer>


   

      
        </>
    )
  }