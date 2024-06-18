import { SplitScreen } from "../../components/splitScreen/splitScreen"
const MiddleComponent=({name})=>{
    return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
  }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MySplitScreen=()=>{
    return(
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MiddleComponent name="Middle"/>
      <RightComponent name1="Right"/>
        </SplitScreen>
    )
  }