import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { AccountHeader,AccountIconContainer, Dropdown, DropdownContainer, MonthDropdown, MyExpenseTable, MyIncomeTable, MyTable, TableContainer, TableRow, YearDropdown } from "./myAccount.styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectActualincomes } from "../../store/actualIncome/actualIncome.selector";
import { selectActualtransactions } from "../../store/actualTransactions/actualTransactions.selector";

const years = [2022, 2023, 2024,2025,2026,2027,2028,2029,2030];
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  //This is the Budget vs Actual Page
  export const MyAccountScreen=()=>{
    const dispatch = useDispatch();
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth]= useState(new Date().getMonth());
    
    const myActualIncomes = useSelector(selectActualincomes) || [];
    const myActualExpenses = useSelector(selectActualtransactions) || [];

    //Function to filter date by year and month
    const filterDataByYearAndMonth = (data, year, month)=>{
      return data.filter((item)=>{
      let itemDate = new Date(item.date);
      let itemYear = itemDate.getFullYear();
      let itemMonth = itemDate.getMonth();

      if(itemYear !== year) return false;
      if(itemMonth==='All') return true;

      return itemMonth === months.indexOf(month)-1; //indexOf(month) returns the index of the month string within the months array. For example, months.indexOf('January') returns 1.months.indexOf(month) - 1 converts the one-based index (starting from 1) to a zero-based index (starting from 0) to match the zero-based index returned by getMonth()

    })
    }
const filteredIncomes = filterDataByYearAndMonth(myActualIncomes,selectedYear, selectedMonth);
const filteredTransactions = filterDataByYearAndMonth(myActualExpenses,selectedYear, selectedMonth);
console.log(filteredTransactions)
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
              <th>Income</th>
              <th>Plan</th>
              <th>Actual</th>
              <th>Var</th>
              <th>Plan %</th>
              <th>Actual %</th>
              <th>Var %</th>
            </TableRow>
          </thead>
          <tbody>
            {filteredIncomes.length > 0 ? (
              filteredIncomes.map((income) => (
                <tr key={income.id}>
                  <td>{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</td>
                  <td>{income.description}</td>
                  <td>{income.amount}</td>
                </tr>
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
              <th>Expense</th>
              <th>Plan</th>
              <th>Actual</th>
              <th>Var</th>
              <th>Plan %</th>
              <th>Actual %</th>
              <th>Var %</th>
            </TableRow>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
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