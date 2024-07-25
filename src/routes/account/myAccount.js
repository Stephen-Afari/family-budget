import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { AccountHeader,AccountIconContainer } from "./myAccount.styles";

const MiddleComponent=({name})=>{
    return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
  }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyAccountScreen=()=>{
    return(
      <>
     <AccountHeader><AccountIconContainer><IoReorderFourSharp /> </AccountIconContainer>Budget vs Actual</AccountHeader>
      {/* <SplitScreen  middleWeight={1} rightWeight={1}>
      <MiddleComponent name="Middle"/>
      <RightComponent name1="Right"/>
        </SplitScreen> */}
        </>
    )
  }