import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { DropdownContainer, InvestmentHeader, InvestmentIconContainer, YearDropdown } from "./myInvestment.styles";
import { years } from "../../components/common/periods";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectActualtransactions } from "../../store/actualTransactions/actualTransactions.selector";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


  
  export const MyInvestmentScreen=()=>{
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth]= useState(new Date().getMonth());
    const myActualExpenses = useSelector(selectActualtransactions) || [];

    useEffect(()=>{
      setSelectedYear(new Date().getFullYear())
    },[])

    
    const filterDataByYearAndInvestment = (data, year) => {
      return data.filter((item) => {
        let itemDate = new Date(item.date);
        let itemYear = itemDate.getFullYear();
       if(item.parent !== 'investment') return false;
    // Return true if the year matches, otherwise false
    return itemYear === year;
      });
    };
    const filteredActualInvestmentTransactions = filterDataByYearAndInvestment(myActualExpenses,selectedYear);
    
// [
//   { month: 0, value: 0 },  // January
//   { month: 1, value: 0 },  // February
//   { month: 2, value: 0 },  // March
//   { month: 3, value: 0 },  // April
//   { month: 4, value: 0 },  // May
//   { month: 5, value: 0 },  // June
//   { month: 6, value: 0 },  // July
//   { month: 7, value: 0 },  // August
//   { month: 8, value: 0 },  // September
//   { month: 9, value: 0 },  // October
//   { month: 10, value: 0 }, // November
//   { month: 11, value: 0 }  // December
// ]
    //Aggregate Monthly and Cumulatively
const aggregateMonthlyAndCumulatively = (data)=>{
  const monthsArr = Array.from({length: 12},(_,index)=>({month:index, value:0}));
  
  // It does not return a new array, but instead modifies the original array
  data.forEach((item)=>{
    let itemDate = new Date(item.date);
    let itemMonth= itemDate.getMonth();

    monthsArr[itemMonth].value += parseInt(item.amount);

  })
  
  //Cumulatively Sum
  for(let i=1; i<monthsArr.length; i++){
    monthsArr[i].value =  monthsArr[i].value + monthsArr[i-1].value;
  }
  return monthsArr;
}

let monthYTD = aggregateMonthlyAndCumulatively(filteredActualInvestmentTransactions);
//console.log(aggregateMonthlyAndCumulatively(filteredActualInvestmentTransactions))

//Preparing the data for the chart
//[
  //   { month: January, value: 10},  // January
  //   { month: February, value: 30 },  // February
  //   { month: March, value: 50},  // March
 //...........
  //   { month:December, value: 90}  // December
  // ]
const cumulativeMonthlyChartData = monthYTD.map((item)=>({
month:new Date(0,item.month).toLocaleString('default',{month:'long'}),
investment:item.value
}))
//console.log(cumulativeMonthlyChartData)
  // Function to format Y-axis labels
  const formatYAxis = (tickItem) => {
    return tickItem / 1000; // Convert the value to thousands
  };

  //// Utility function for currency formatting
const formatCurrency = (value, locale = 'en-GH', currency = 'GHS') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency,minimumFractionDigits: 0,
  maximumFractionDigits: 0, }).format(value);
};
    return(
      <>
     <InvestmentHeader><InvestmentIconContainer><IoReorderFourSharp /> </InvestmentIconContainer>Investment</InvestmentHeader>
      <DropdownContainer>
        <YearDropdown value={selectedYear} onChange={(e)=>setSelectedYear(parseInt(e.target.value))}>
          {years.map((year)=>(
            <option key={year} value={year}>{year}</option>
          ))}

        </YearDropdown>
      </DropdownContainer>
      <ResponsiveContainer width="100%" height={490} >
      <LineChart
        data={cumulativeMonthlyChartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        {/* <YAxis tickFormatter={(value) => formatCurrency(value)} /> Format Y-axis labels as currency */}
        <Tooltip formatter={(value) => formatCurrency(value)} /> {/* Format tooltip values as currency */}
        <Legend />
        <Line type="monotone" dataKey="investment" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>

        </>
    )
  }