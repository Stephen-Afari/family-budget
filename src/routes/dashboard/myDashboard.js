import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { BarChartHeader, DashboardHeader,DashboardIconContainer, DropdownContainer, PieChartContainer, PieChartContainerPlan, PieChartHeader, VisualsContainer, YearDropdown } from "./myDashboard.styles";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import combinedFilteredItems from "../../components/common/combineFIlters";
import { useEffect, useState } from "react";
import { years } from "../../components/common/periods";
import { useSelector } from "react-redux";
import { selectActualincomes, selectActualIncomeTotalByYear, selectActualIncomeTotalByYearAndMonth } from "../../store/actualIncome/actualIncome.selector";
import { selectActualExpenseTotalByYear, selectActualExpenseTotalByYearAndMonth, selectActualtransactions } from "../../store/actualTransactions/actualTransactions.selector";
import { selectBudgetincomes, selectBudgetIncomeTotalByYear } from "../../store/budgetIncome/budgetIncome.selector";
import { selectBudgettransactions, selectExpenseTotalByYear } from "../../store/budgetTransactions/budgetTransactions.selector";
import { months } from "../../components/common/periods";
//import { years } from "../../components/common/periods";

export const MyDashBoardScreen=()=>{
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth]= useState(new Date().getMonth());
    const myActualIncomes = useSelector(selectActualincomes) || [];
    const myActualExpenses = useSelector(selectActualtransactions) || [];
    const myBudgetIncome = useSelector(selectBudgetincomes) || [];
    const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
  
    //Once the application loads, set the year and month to the ff.
    useEffect(()=>{
      setSelectedYear(new Date().getFullYear());
     
      setSelectedMonth('All')

    },[])

    const filterDataByYear = (data, year) => {
      return data.filter((item) => {
        let itemDate = new Date(item.date);
        let itemYear = itemDate.getFullYear();
       
    // Return true if the year matches, otherwise false
    return itemYear === year;
      });
    };
    const filteredActualIncomes = filterDataByYear(myActualIncomes,selectedYear);
    const filteredActualTransactions = filterDataByYear(myActualExpenses,selectedYear);
    const filteredPlanIncomes = filterDataByYear(myBudgetIncome,selectedYear);
    const filteredPlanTransactions = filterDataByYear(myBudgetTransaction,selectedYear);
     const totalPlanIncome = useSelector((state)=>selectBudgetIncomeTotalByYear(selectedYear)(state))
    const totalPlanExpense = useSelector((state)=>selectExpenseTotalByYear(selectedYear)(state))
    const totalActIncome = useSelector((state)=>selectActualIncomeTotalByYear(selectedYear)(state));
    const totalActExpense= useSelector((state)=>selectActualExpenseTotalByYear(selectedYear)(state));
    const totalActIncomeByYearAndMonth = useSelector((state)=>selectActualIncomeTotalByYearAndMonth(selectedYear, selectedMonth,months)(state));
const totalActExpenseByYearAndMonth = useSelector((state)=>selectActualExpenseTotalByYearAndMonth(selectedYear, selectedMonth,months)(state));

//console.log(combinedFilteredItems(filteredPlanIncomes,filteredActualIncomes,totalPlanIncome,totalActIncome))
//console.log(totalActIncomeByYearAndMonth)

const combinedIncomes = combinedFilteredItems(filteredPlanIncomes, filteredActualIncomes, totalPlanIncome, totalActIncome);
const combinedExpenses = combinedFilteredItems(filteredPlanTransactions, filteredActualTransactions, totalPlanExpense, totalActExpense);

  // Prepare data for charts
  const chartData =combinedIncomes.map((item)=>(
    {
    name: item.planParent || item.actualParent,
    Plan: item.planAmount,
    //Actual: item.actualAmount
    }
  ))
///This is for Income/Expense using parent as the key
  const chartDataDisplay = (filtInc)=>{
   let totalsMap= filtInc.reduce((map,inc)=>{
      if(!map[inc.parent]){
        map[inc.parent]={amount:0}
      }
      //NB: This is not the else part of the code-just the next step.
        map[inc.parent].amount += parseInt(inc.amount);
      
     return map;

  },{});
  //  return [totalsMap];
 // Convert totalsMap to an array
  let totals = Object.keys(totalsMap).map((item)=>({
    name: item,
    Value: totalsMap[item].amount,
  }))

  return totals;
  
  }

  ///This uses SubGrouping as key
  const chartDataDisplaySubGrp= (filtInc)=>{
    let totalsMap= filtInc.reduce((map,inc)=>{
       if(!map[inc.subGroup]){
         map[inc.subGroup]={amount:0}
       }
       //NB: This is not the else part of the code-just the next step.
         map[inc.subGroup].amount += parseInt(inc.amount);
       
      return map;
 
   },{});
   //  return [totalsMap];
  // Convert totalsMap to an array
   let totals = Object.keys(totalsMap).map((item)=>({
     name: item,
     Value: totalsMap[item].amount,
   }))
 
   return totals;
   
   }
   
   //Aggregate monthly data for actual income and expenses
//    Array.from({ length: 12 }, ...):

// Array.from is a method that creates a new array from an array-like or iterable object.
// In this case, { length: 12 } is an object that defines the desired length of the array (12 elements), which corresponds to the 12 months of the year.
// (_, index) => ({ month: index, value: 0 }):

// This is a mapping function that Array.from uses to generate each element in the array.
// The mapping function has two parameters:
// _: The first parameter represents the current element in the array, but it's not used here, so it's named _.
// index: The second parameter represents the index of the current element in the array, ranging from 0 to 11.
// { month: index, value: 0 }:

// For each element in the array, this mapping function returns an object.
// month: index assigns the current index (from 0 to 11) to the month property of the object. This index represents each month of the year, where 0 is January, 1 is February, and so on.
// value: 0 initializes the value property of the object to 0. This property will later hold the aggregated value for that month.
// Resulting Array
// The result of this code is an array of 12 objects, each with the following structure:

// javascript
// Copy code
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
   const aggregateMonthlyData = (data)=>{
    const monthlyData = Array.from({length:12}, (_,index)=>({month:index, value:0}));
data.forEach((item)=>{
  const itemDate = new Date(item.date),
      itemMonth = itemDate.getMonth();
  monthlyData[itemMonth].value += parseInt(item.amount);
})

return monthlyData;

   }

  const monthlyActualIncome = aggregateMonthlyData(filteredActualIncomes);
  const monthlyActualExpenses = aggregateMonthlyData(filteredActualTransactions);
//Prepare data for the Chart
// new Date(0, index):

// This creates a new Date object in JavaScript.
// Date(year, month) is a constructor where:
// year: The first parameter is set to 0, which corresponds to the year 1900 in the JavaScript Date object (though it isn't really used here for the purpose of getting the month name).
// month: The second parameter index is the zero-based index of the month (0 for January, 1 for February, ..., 11 for December).
// Example: If index is 0, the Date object will represent January 1, 1900. If index is 1, it represents February 1, 1900.
// .toLocaleString('default', { month: 'long' }):

// toLocaleString is a method that converts a Date object into a string, based on locale-specific formatting options.
// 'default' is the locale identifier. It uses the default locale of the runtime environment.
// { month: 'long' } is an options object that specifies how the month should be formatted:
// month: 'long' means that the month should be represented by its full name (e.g., "January", "February").
// Example: For a Date object representing January, toLocaleString would return "January".

const barChartData = monthlyActualIncome.map((income)=>({
month: new Date(0,income.month).toLocaleString('default',{month:'long'}),
Income: income.value,
Expense: monthlyActualExpenses[income.month].value
}))

//console.log(barChartData)


   
let chartDataPlan= chartDataDisplay(filteredPlanIncomes);
 let chartDataActual = chartDataDisplay(filteredActualIncomes);
 let chartDataExpensePlan = chartDataDisplay(filteredPlanTransactions);
 let chartDataExpenseActual = chartDataDisplay(filteredActualTransactions);
 let chartDataSubGrpPlan = chartDataDisplaySubGrp(filteredPlanTransactions);
 let chartDataSubGrpActual = chartDataDisplaySubGrp(filteredActualTransactions);


 
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderCustomLabel = ({ percent, x, y, name }) => {
    return (
      <text x={x} y={y} fill="black" fontSize="12px" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`} 
    </text>
    );
  };



    return(
      <>
       <VisualsContainer>
     <DashboardHeader><DashboardIconContainer><IoReorderFourSharp /> </DashboardIconContainer>Dashboard</DashboardHeader>
     <DropdownContainer>
        <YearDropdown value={selectedYear} onChange={(e)=>setSelectedYear(parseInt(e.target.value))}>
        {years.map((year)=>(
          <option key={year} value={year}>{year}</option>
        ))}
        </YearDropdown>
     
        </DropdownContainer>
       
        <PieChartContainer>
         
        <div style={{ width: '100%', height: 210 }}>
        <PieChartHeader>Planned Expense</PieChartHeader>
        <ResponsiveContainer>
          <PieChart>
            <Pie 
            data={chartDataExpensePlan} 
            dataKey="Value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8"
            label={renderCustomLabel}
            labelLine={false}
            >
              {chartDataExpensePlan.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height:230 }}>
        <PieChartHeader>Planned Expense Detail</PieChartHeader>
        <ResponsiveContainer>
          <PieChart>
            <Pie 
            data={chartDataSubGrpPlan} 
            dataKey="Value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8"
            label={renderCustomLabel}
            labelLine={false}
            >
              {chartDataSubGrpPlan.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '100%', height: 230}}>
      <PieChartHeader>Actual Expense</PieChartHeader>
        <ResponsiveContainer>
          <PieChart>
            <Pie 
            data={chartDataExpenseActual} 
            dataKey="Value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8"
            label={renderCustomLabel}
            labelLine={false}
            >
              {chartDataExpenseActual.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
           
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 230 }}>
      <PieChartHeader>Actual Expense Detail</PieChartHeader>
        <ResponsiveContainer>
          <PieChart>
            <Pie 
            data={chartDataSubGrpActual} 
            dataKey="Value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8"
            label={renderCustomLabel}
            labelLine={false}
            >
              {chartDataSubGrpActual.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
           
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

        </PieChartContainer>
       

        <div style={{ width: '100%', height: 220,marginTop:'15px' }}>
        <BarChartHeader>Monthly Income vs Expense</BarChartHeader>
        <ResponsiveContainer>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#8884d8" />
            <Bar dataKey="Expense" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </VisualsContainer>

      {/* <div style={{ width: '30%', height: 300 }}>
          <h4>Expense </h4>
        <ResponsiveContainer>
          <BarChart data={chartDataExp}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Plan" fill="#8884d8" />
            <Bar dataKey="Actual" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}

    


        </>
    )
  }