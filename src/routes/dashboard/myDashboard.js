import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { DashboardHeader,DashboardIconContainer, DropdownContainer, YearDropdown } from "./myDashboard.styles";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import combinedFilteredItems from "../../components/common/combineFIlters";
import { useEffect, useState } from "react";
import { years } from "../../components/common/periods";
import { useSelector } from "react-redux";
import { selectActualincomes, selectActualIncomeTotalByYear } from "../../store/actualIncome/actualIncome.selector";
import { selectActualExpenseTotalByYear, selectActualtransactions } from "../../store/actualTransactions/actualTransactions.selector";
import { selectBudgetincomes, selectBudgetIncomeTotalByYear } from "../../store/budgetIncome/budgetIncome.selector";
import { selectBudgettransactions, selectExpenseTotalByYear } from "../../store/budgetTransactions/budgetTransactions.selector";
export const MyDashBoardScreen=()=>{
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const myActualIncomes = useSelector(selectActualincomes) || [];
    const myActualExpenses = useSelector(selectActualtransactions) || [];
    const myBudgetIncome = useSelector(selectBudgetincomes) || [];
    const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
  
    //Once the application loads, set the year and month to the ff.
    useEffect(()=>{
      setSelectedYear(new Date().getFullYear());
      

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
//console.log(combinedFilteredItems(filteredPlanIncomes,filteredActualIncomes,totalPlanIncome,totalActIncome))
//console.log(filteredPlanIncomes)

const combinedIncomes = combinedFilteredItems(filteredPlanIncomes, filteredActualIncomes, totalPlanIncome, totalActIncome);
const combinedExpenses = combinedFilteredItems(filteredPlanTransactions, filteredActualTransactions, totalPlanExpense, totalActExpense);

  // Prepare data for charts
  const chartData =combinedIncomes.map((item)=>(
    {
    name: item.planParent || item.actualParent,
    Plan: item.planAmount,
    Actual: item.actualAmount
    }
  ))

  const chartDataPlan = (filtInc)=>{
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
    plan: totalsMap[item].amount,
  }))

  return totals;
  
  }


  console.log(chartDataPlan(filteredActualIncomes))


    // Prepare data for charts
    const chartDataExp =combinedExpenses.map((item)=>(
      {
      name: item.planParent || item.actualParent,
      Plan: item.planAmount,
      Actual: item.actualAmount
      }
    ))
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];





    return(
      <>
     <DashboardHeader><DashboardIconContainer><IoReorderFourSharp /> </DashboardIconContainer>Dashboard</DashboardHeader>
     <DropdownContainer>
        <YearDropdown value={selectedYear} onChange={(e)=>setSelectedYear(parseInt(e.target.value))}>
        {years.map((year)=>(
          <option key={year} value={year}>{year}</option>
        ))}
        </YearDropdown>
     
        </DropdownContainer>

        <div style={{ width: '30%', height: 300 }}>
          <h3>Income </h3>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Plan" fill="#8884d8" />
            <Bar dataKey="Actual" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '30%', height: 300 }}>
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
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={chartData} dataKey="Plan" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {/* <Pie data={chartData} dataKey="Actual" nameKey="name" cx="50%" cy="50%" innerRadius={90} outerRadius={120} fill="#82ca9d" label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie> */}
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>


        </>
    )
  }