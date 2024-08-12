import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { DropdownContainer, InvestmentHeader, InvestmentIconContainer, YearDropdown } from "./myInvestment.styles";
import { years } from "../../components/common/periods";
import { useEffect, useState } from "react";

  
  export const MyInvestmentScreen=()=>{
    const [selectedYear, setSelectedYear]= useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth]= useState(new Date().getMonth());

    useEffect(()=>{
      setSelectedYear(new Date().getFullYear())
    })
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
        </>
    )
  }