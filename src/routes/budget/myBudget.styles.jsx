import styled,{ createGlobalStyle }  from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { TbHierarchy } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineSummarize } from "react-icons/md";
import { IoListCircleOutline } from "react-icons/io5";


export const MyTable= styled.table`
width: 100%;
border-collapse: collapse;
table-layout: fixed;  //fixed table layout
font-family: 'Courier New', Courier, monospace; /* Monospaced font */
`

export const TableData = styled.td`
font-size:13px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol

  &:nth-child(1){
    padding-right: 30px; // Adjust as needed for large space between first two columns
    width: 160px;
  }
  &:nth-child(2){
    padding-left: 55px;  // Adjust as needed for large space between first two columns
    width: 150px;
  }
  &:nth-child(n+3){
    padding-left:10px; padding-left: 8px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  }
  font-family: 'Courier New', Courier, monospace; /* Monospaced font */
  overflow: hidden;
  text-overflow: ellipsis;
  &: hover{
    overflow: visible;
  }
  white-space: nowrap; /* Prevent text from wrapping */
`
export const TableData1 = styled.td`
padding-right:10px;
font-size:10px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol

  &:nth-child(1){
    padding-right: 30px; // Adjust as needed for large space between first two columns
  }
  &:nth-child(2){
    padding-left: 30px;  // Adjust as needed for large space between first two columns
  }
  &:nth-child(n+3){
    padding-left:10px; padding-left: 5px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  }
  font-family: 'Courier New', Courier, monospace; /* Monospaced font */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Prevent text from wrapping */
`

export const RemoveSymbol = styled(CiCircleRemove)`

visibility: hidden;
  cursor: pointer;

  // Show the icon on hover of the TableData component
  ${TableData}:hover & {
    visibility: visible;
    color: red;
  }

`
export const TabListITem = styled(IoListCircleOutline)`
margin-right:2px;
// margin-top: 2px;
font-size:9px;
`
export const ParentIcon =styled(TbHierarchy)`
margin-left: 13px;
`
export const DescriptionIcon =styled(TbListDetails)`
margin-left: 13px;
`
export const SubGroupIcon =styled(MdOutlineSummarize)`
margin-left: 13px;
`

//styling for a React Icon.
export const AddSymbol= styled(IoIosAddCircleOutline)`
font-size:20px;
margin-left: 6px;
margin-top:2px;

&:hover{
    color: green;
    cursor: pointer;
}
`
//createGlobalStyle from styled-components is used to define global styles that target the react-datepicker input elements.
export const GlobalStyle= createGlobalStyle`
.react-datepicker__input-container input {
    border: none;
    box-shadow: none;
  }

  .react-datepicker__input-container input:focus {
    outline: none;
  }
`

export const BudgetHeader = styled.h4`
display: flex;
margin-top: 2px;
margin-left: 5px
`
export const BudgetIconContainer = styled.div`
margin-top: 2px;
`

export const MyMiddleComponent = styled.div`
background-color: #EEEEEE;
width: 100%;
height: 540px;
display: flex;
flex-direction: column;
// justify-content: center;


`
export const Table = styled.table`
width:370px;
margin-left:1px;
margin-right:1px;
margin-top: 1%

`
export const DatePickerContainer=styled.div`
margin-left:6px;

`
export const TableRow = styled.tr`
display: flex;
padding: 5px;
justify-content: space-between;
&:first-child {
    background-color:#EEF7FF;
}
//from the second child onwards (ie. n starts from zero)
&:nth-child(n+2){
    border-bottom: 1px solid #ddd;
}
margin-bottom: 5px;
`
export const TableRow1 = styled.tr`
display: flex;
padding: 5px;
justify-content: space-between;

//from the second child onwards (ie. n starts from zero)
&:nth-child(n+1){
    border-bottom: 1px solid #ddd;
}
margin-bottom: 5px;
`

export const TableHead = styled.th`
padding-left:15px;
height:20px;
color: #686D76;
  text-align: left;
  &:nth-child(1){
    //padding-right: 40px; // Adjust as needed for large space between first two columns
 width: 150px;
  }
  &:nth-child(2){
    padding-left: 65px;  // Adjust as needed for large space between first two columns
    width: 70px;
    
  }
  &:nth-child(3){
    padding-left:87px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
    
}
  &:nth-child(n+4){
    padding-left:1px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
    
}
  
`

export const TableContainer=styled.div`
width:460px;
// max-width: 200px;
overflow-y: auto;
border-radius: 8px;
padding: 8px;
 background-color:white;
// height:200px;
margin-top:30px;
margin-left: 170px;

`
export const TableBodyContainer=styled.tbody`

`
export const HorizontalRule=styled.hr`
display:flex;
`

export const NavBar= styled.div`
display: flex;
// border-bottom: 1px solid #ccc;
`

export const NavTab = styled(NavLink)`
display: flex;
flex-direction: column;
justify-content: center;
padding: 10px 20px;
  text-decoration: none;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
${(props)=>
  props.active === 'true'?
  `
  border-bottom: 2px solid black;
  font-weight: bold
  `
  :
  `
  border-bottom: none;
  font-weight: normal;
  `
}

`;

export const RightComponent= styled.div`
margin-right:0px;
`

export const TabContent = styled.div`
margin-top: 5px;
`

export const TabContentContainer = styled.div`
margin-top: 20px;
margin-left: 5px;
overflow: scroll;
height: 450px;
`
export const TabHeader = styled.h4`
//border-bottom: 1px solid black;
width: 85px;
font-size:14px;
`
export const TabAmount = styled.p`
font-family: 'Courier New', Courier, monospace; /* Monospaced font */
font-size:12px;
width: 120px;
margin-left:1px;
margin-bottom: 2px;
`
export const TabAmountContainer=styled.div`
display: flex;
flex-direction:row;
gap: 30px;
`
export const TabIncTotal = styled.p`
font-weight: bold;
font-size:12px;
width: 120px;
`
export const TabInc = styled.div`

`
export const TabExp = styled.div`
margin-top: 50px;
`
export const NetIncomeDisplay= styled.div`
background-color: ${(props)=>props.netInc >0 ? 'green' :
props.netInc ===0 ?'yellow':'red'
};
border-radius: 5px;
padding: 0px 10px 0px 10px;
color: white;
font-size:12px;
height: 35px;
font-weight: bold;
margin-top: 5px;
`
export const NetIncomeAmount= styled.div`

`
export const BudgetHeaderLeft= styled.div`

`
export const BudgetHeaderContainer= styled.div`
display:flex;
flex-direction:row;
gap: 240px;
`