import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { AccountHeader,AccountIconContainer, Dropdown, DropdownContainer, MonthDropdown, MyExpenseTable, MyIncomeTable, MyTable, TableContainer, TableData, TableData1, TableHead, TableRow, TableRow1, YearDropdown } from "./myAccount.styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectActualincomes, selectActualIncomeTotalByDate } from "../../store/actualIncome/actualIncome.selector";
import { selectActualExpenseTotalByDate, selectActualtransactions } from "../../store/actualTransactions/actualTransactions.selector";
import { selectBudgetincomes, selectBudgetIncomeTotalByYearAndMonth, selectIncomeTotalByDate } from "../../store/budgetIncome/budgetIncome.selector";
import { selectBudgettransactions, selectExpenseTotalByDate, selectExpenseTotalByYearAndMonth } from "../../store/budgetTransactions/budgetTransactions.selector";

const years = [2022, 2023, 2024,2025,2026,2027,2028,2029,2030];
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    const dispatch = useDispatch();
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth]= useState(new Date().getMonth());
    
    const myActualIncomes = useSelector(selectActualincomes) || [];
    const myActualExpenses = useSelector(selectActualtransactions) || [];
    const myBudgetIncome = useSelector(selectBudgetincomes) || [];
    const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
    const [selectedDate, setSelectedDate]= useState(null);
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
const totalActIncome = useSelector((state)=>selectActualIncomeTotalByDate(selectedDate)(state));
const totalActExpense = useSelector((state)=>selectActualExpenseTotalByDate(selectedDate)(state));
// const totalPlanIncome = useSelector((state)=>selectIncomeTotalByDate(selectedDate)(state));
  //const totalPlanExpense = useSelector((state)=>selectExpenseTotalByDate(selectedDate)(state))
  const totalPlanIncome = useSelector((state)=>selectBudgetIncomeTotalByYearAndMonth(selectedYear, selectedMonth,months)(state))
 const totalPlanExpense = useSelector((state)=>selectExpenseTotalByYearAndMonth(selectedYear, selectedMonth,months)(state))
//Combining the Arrays for the Budget--returns an array of objects , map returns an array which also returns an inner object.
const combinedFilteredIncomeItems = (planInc, actualInc)=>{
return(
planInc.map((planItem)=>{
let actualItem = actualInc.find((actItem)=>( actItem.parent === planItem.parent) || {});
return {
  planParent: planItem.parent,
  planAmount: planItem.amount || 0,
  planPercentage:formatPercentage(planItem.amount/totalPlanIncome),
  actualParent: actualItem.parent,
  actualAmount: actualItem.amount || 0,
  actualPercentage: formatPercentage(actualItem.amount/totalActIncome)

}
})

)

}
//console.log(combinedFilteredIncomeItems(filteredPlanIncomes,filteredActualIncomes))


console.log(totalPlanExpense)
    return(
      <>
     <AccountHeader><AccountIconContainer><IoReorderFourSharp /> </AccountIconContainer>Budget vs Actual</AccountHeader>
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
              <TableHead>Parent</TableHead>
              
              <TableHead>Plan</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Var</TableHead>
              <TableHead>Plan %</TableHead>
              <TableHead>Actual %</TableHead>
              <TableHead>Var %</TableHead>
            </TableRow>
          </thead>
          <tbody>
            {filteredPlanIncomes.length > 0 ? (
              filteredPlanIncomes.map((income) => (
                <TableRow1 key={income.id}>
                  <TableData>{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</TableData>
                 
                  <TableData>{formatCurrency(income.amount)}</TableData>
                </TableRow1>
              ))
            ) : (
              <tr>
                <td colSpan="3">No incomes for the selected period</td>
              </tr>
            )}
          </tbody>
        </MyIncomeTable>

       
        <MyExpenseTable>
        <thead>
            <TableRow>
            <TableHead>Parent</TableHead>
             
              <TableHead>Plan</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Var</TableHead>
              <TableHead>Plan %</TableHead>
              <TableHead>Actual %</TableHead>
              <TableHead>Var %</TableHead>
            </TableRow>
          </thead>
          <tbody>
            {filteredPlanTransactions.length > 0 ? (
              filteredPlanTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No transactions for the selected period</td>
              </tr>
            )}
          </tbody>
        </MyExpenseTable>
      </TableContainer>


   

      
        </>
    )
  }