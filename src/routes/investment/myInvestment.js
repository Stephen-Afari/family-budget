import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { InvestmentHeader, InvestmentIconContainer } from "./myInvestment.styles";

const MiddleComponent=({name})=>{
    return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
  }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyInvestmentScreen=()=>{
    return(
      <>
     <InvestmentHeader><InvestmentIconContainer><IoReorderFourSharp /> </InvestmentIconContainer>Investment</InvestmentHeader>
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MiddleComponent name="Middle"/>
      <RightComponent name1="Right"/>
        </SplitScreen>
        </>
    )
  }