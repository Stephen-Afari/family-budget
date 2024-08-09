import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { DashboardHeader,DashboardIconContainer, DropdownContainer, PieChartContainer, PieChartContainerPlan, PieChartHeader, YearDropdown } from "./myDashboard.styles";
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


   
let chartDataPlan= chartDataDisplay(filteredPlanIncomes);
 let chartDataActual = chartDataDisplay(filteredActualIncomes);
 let chartDataExpensePlan = chartDataDisplay(filteredPlanTransactions);
 let chartDataExpenseActual = chartDataDisplay(filteredActualTransactions);
 let chartDataSubGrpPlan = chartDataDisplaySubGrp(filteredPlanTransactions);
 let chartDataSubGrpActual = chartDataDisplaySubGrp(filteredActualTransactions);


  //console.log(chartDataSubGrpPlan)


    // Prepare data for charts
    // const chartDataSubGrp =combinedExpenses.map((item)=>(
    //   {
    //   name: item.planParent || item.actualParent,
    //   Plan: item.planAmount,
    //   Actual: item.actualAmount
    //   }
    // ))
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
       

        <div style={{ width: '30%', height:230}}>
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