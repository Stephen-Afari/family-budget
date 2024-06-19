import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { BudgetHeader, BudgetIconContainer} from "./myBudget.styles";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MiddleComponent=({name})=>{
    return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
  }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyBudgetScreen=()=>{
    const [date, setDate]= useState(new Date())
    return(
      <>
     <BudgetHeader><BudgetIconContainer><IoReorderFourSharp /> </BudgetIconContainer>Budget</BudgetHeader>
     {/* //Date Picker component */}
      <div>
      <DatePicker selected={date} onChange={(date)=>setDate(date)}  dateFormat="MMMM yyyy"
          placeholderText="Select a date"/></div>
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MiddleComponent name="Middle"/>
      <RightComponent name1="Right"/>
        </SplitScreen>
        </>
    )
  }