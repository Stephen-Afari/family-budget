import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { BudgetHeader, GlobalStyle,BudgetIconContainer, MyMiddleComponent,Table, TableHead,TableRow,TableData,TableContainer, DatePickerContainer} from "./myBudget.styles";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//Date format MM/dd/yy
const transactions=[
  {id: 1, date: '06-10-2024', subGroup:'water', parent:'utilities', description:'water bill',amount: 70},
  {id: 2, date: '05-10-2024', subGroup:'electricity', parent:'utilities',description:'light bill' ,amount: 700},
  {id: 3, date: '04-10-2024', subGroup:'maintenance', parent:'housing', description:'window frame' ,amount: 200},
  {id: 4, date: '03-10-2024', subGroup:'fees', parent:'childcare & education', description:'Afia fees' ,amount: 200},
]

const incomes=[
  {id: 1, date: '06-10-2024', subGroup:'paycheck', parent:'salary', description:'person 1',amount: 70},
  {id: 2, date: '05-10-2024', subGroup:'paycheck', parent:'salary',description:'person 2' ,amount: 700},
  {id: 3, date: '04-10-2024', subGroup:'paycheck', parent:'bonus', description:'person 1' ,amount: 200},
  {id: 4, date: '03-10-2024', subGroup:'paycheck', parent:'bonus', description:'person 2' ,amount: 200},
  {id: 4, date: '03-10-2024', subGroup:'windfall', parent:'miscellaneous', description:'windfall' ,amount: 200},
]

// const MiddleComponent=()=>{
//     return(<MyMiddleComponent></MyMiddleComponent>)
//   }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyBudgetScreen=()=>{
  
    const [selectedDate, setSelectedDate]= useState(null);
    //filtering to show data for the selected date only 
    const filteredTransactions = selectedDate ?
      transactions.filter((transaction)=>{
        return new Date(transaction.date).toString()===selectedDate.toString();
       
      }):[];
     //filtering to show data for the selected date only 
     const filteredIncome = selectedDate ? (
      incomes.filter((income)=>{
       return new Date(income.date).toString()=== selectedDate.toString();
      })
     ):[];
    return(
      <>
     <BudgetHeader><BudgetIconContainer><IoReorderFourSharp /> </BudgetIconContainer>Budget</BudgetHeader>
     {/* //Date Picker component */}
      <DatePickerContainer>
        <GlobalStyle/>
      <DatePicker selected={selectedDate} onChange={(selectedDate)=>setSelectedDate(selectedDate)}  dateFormat="MMMM-d-yyyy"
          placeholderText="Select a date"/></DatePickerContainer>
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MyMiddleComponent >
<TableContainer>
      <Table>
        <TableRow>
            <TableHead>Income</TableHead>
            
            <TableHead>Amount</TableHead>
        </TableRow>
      {filteredIncome.length >0 ? (
      filteredIncome.map((income)=>(
       <TableRow key={income.id}>
       <TableData>{income.parent}</TableData>
      
       <TableData>{income.amount}</TableData>
        </TableRow>
   ))):(<div>No Transaction selected for this date</div>)}
   </Table>
</TableContainer>

<TableContainer>
      <Table>
        <TableRow>
            <TableHead>Income</TableHead>
            
            <TableHead>Amount</TableHead>
        </TableRow>
      {filteredTransactions.length >0 ?
      (filteredTransactions.map((transaction)=>(
        <TableRow key={transaction.id}>
       <TableData>{transaction.parent}</TableData>
      
       <TableData>{transaction.amount}</TableData>
        </TableRow>
      ))):(<div>No Transaction selected for this date</div>)}
    </Table>
    </TableContainer>
      </MyMiddleComponent>
      <RightComponent name1="Right"/>
        </SplitScreen>
        </>
    )
  }