import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { DatePickerContainer, GlobalStyle, MyMiddleComponent, MyTable, TableContainer, TableHead, TableRow, TransactionHeader,TransactionIconContainer } from "./transactions.styles";
import DatePicker from "react-datepicker";
import { useState } from "react";

// const MiddleComponent=({name})=>{
//     return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
//   }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyTransactionScreen=()=>{
    const [selectedDate, setSelectedDate]= useState(null);
    return(
      <>
     <TransactionHeader><TransactionIconContainer><IoReorderFourSharp /> </TransactionIconContainer>Transaction</TransactionHeader>
     <DatePickerContainer>
        <GlobalStyle/>
      <DatePicker selected={selectedDate} onChange={(selectedDate)=>setSelectedDate(selectedDate)}  dateFormat="MMMM-d-yyyy"
          placeholderText="Select a date"/></DatePickerContainer>
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MyMiddleComponent>
      <TableContainer>
        <MyTable>
          <thead>
          <TableRow>
            <TableHead>Income</TableHead>
            
            <TableHead>Actual</TableHead>
            <TableHead>(%)</TableHead>
            <TableHead>Targ.</TableHead>
        </TableRow>
          </thead>

        </MyTable>
      </TableContainer>
      </MyMiddleComponent>
      <RightComponent name1="Right"/>
        </SplitScreen>
        </>
    )
  }