import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { ExportHeader, ExportIconContainer } from "./myExport.styles";

const MiddleComponent=({name})=>{
    return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
  }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyExportScreen=()=>{
    return(
      <>
     <ExportHeader><ExportIconContainer><IoReorderFourSharp /> </ExportIconContainer>Export</ExportHeader>
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MiddleComponent name="Middle"/>
      <RightComponent name1="Right"/>
        </SplitScreen>
        </>
    )
  }