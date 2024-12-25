import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { ButtonContainer, DropdownContainer, ExportActual, ExportButton, ExportHeader, ExportIconContainer, MonthDropdown, YearDropdown } from "./myExport.styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectActualApiIncomes } from "../../store/apiData/actualIncome/actualAPIIncome.selector";
import { selectActualApiTransaction } from "../../store/apiData/actualTransaction/actualAPITransaction.selector";
import { selectBudgetApiIncomes } from "../../store/apiData/budgetIncome/budgetAPIIncome.selector";
import { selectBudgetApiTransaction } from "../../store/apiData/budgetTransaction/budgetAPITransaction.selectors";
import { months, years } from "../../components/common/periods";
import * as XLSX from "xlsx";
import { CiExport } from "react-icons/ci";

const MiddleComponent=({name})=>{
    return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
  }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyExportScreen=()=>{
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth]= useState(new Date().getMonth());

    const myActualIncomes = useSelector(selectActualApiIncomes) || [];
    const myActualExpenses = useSelector(selectActualApiTransaction) || [];
    const myBudgetIncome = useSelector(selectBudgetApiIncomes) || [];
    const myBudgetTransaction = useSelector(selectBudgetApiTransaction) || [];
// console.log('actual_income', myActualIncomes);
// console.log('actual_exp', myActualExpenses);
    //Once the application loads, set the year and month to the ff.
    useEffect(()=>{
      setSelectedYear(new Date().getFullYear());
      setSelectedMonth('All')

    },[])

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

// Combine and format the actual data
// const combinedData = [...filteredActualIncomes, ...filteredActualTransactions].map((item) => ({
//   Date: new Date(item.date).toLocaleDateString(),
//   SubGroup: item.subGroup,
//   Parent: item.parent,
//   Description: item.description || "N/A",
//   Amount: item.amount,
//   Target: item.target,
//   Type: filteredActualIncomes.includes(item) ? "Actual_Income" : "Actual_Expense", // Tag income or expense
// }));
const combinedData = [...filteredActualIncomes, ...filteredActualTransactions,...filteredPlanTransactions,...filteredPlanIncomes].map((item) => ({
  Date: new Date(item.date).toLocaleDateString(),
  SubGroup: item.subGroup,
  Parent: item.parent,
  Description: item.description || "N/A",
  Amount: item.amount,
  Target: item.target,
  Type: filteredActualIncomes.includes(item)
    ? "Actual_Income"
    : filteredActualTransactions.includes(item)
    ? "Actual_Transaction"
    : filteredPlanTransactions.includes(item)
    ? "Planned_Transaction"
    : "Planned_Income", // Default to Planned_Income
  
}));
//console.log(combinedData);
// Export to Excel
const exportToExcel = (data, fileName = "CombinedData.xlsx") => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert JSON data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Income and Expenses");

  // Save the file
  XLSX.writeFile(workbook, fileName);
};

// Trigger the export (e.g., on button click)
const handleExport = () => {
  if (combinedData.length === 0) {
    alert("No data available to export.");
    return;
  }

  exportToExcel(combinedData);
};
// useEffect(()=>{
//   handleExport();
// },[])
// const ExportButton = () => {
//   return (
//     <button
//       onClick={handleExport}
//       style={{
//         padding: "10px 20px",
//         backgroundColor: "#4CAF50",
//         color: "white",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//       }}
//     >
//       Export Combined Data to Excel
//     </button>
//   );
// };

    return(
      <>
     <ExportHeader><ExportIconContainer><IoReorderFourSharp /> </ExportIconContainer>Export</ExportHeader>
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
      {/* <SplitScreen  middleWeight={1} rightWeight={3}>
      <MiddleComponent name="Middle"/>
      <RightComponent name1="Right"/>
        </SplitScreen> */}
          {/* <ExportButton/> */}
       
          <ExportButton onClick={handleExport}><CiExport />  Export Data</ExportButton>  
         
          
        </>
      
    )
  }