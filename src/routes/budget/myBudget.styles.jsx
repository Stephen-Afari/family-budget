import styled,{ createGlobalStyle }  from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

export const MyTable= styled.table`
width: 100%;

`

export const TableData = styled.td`
font-size:13px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol

  &:nth-child(1){
    padding-right: 60px; // Adjust as needed for large space between first two columns
  }
  &:nth-child(2){
    padding-left: 60px;  // Adjust as needed for large space between first two columns
  }
  &:nth-child(n+3){
    padding-left:10px; padding-left: 5px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  }
`
export const TableData1 = styled.td`
padding-right:10px;
font-size:10px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol

  &:nth-child(1){
    padding-right: 60px; // Adjust as needed for large space between first two columns
  }
  &:nth-child(2){
    padding-left: 60px;  // Adjust as needed for large space between first two columns
  }
  &:nth-child(n+3){
    padding-left:10px; padding-left: 5px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  }
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

export const TableHead = styled.th`
padding-left:15px;
height:20px;
color: #686D76;
  text-align: left;
  &:nth-child(1){
    padding-right: 50px; // Adjust as needed for large space between first two columns
  }
  &:nth-child(2){
    padding-left: 50px;  // Adjust as needed for large space between first two columns
  }
  &:nth-child(n+3){
    padding-left:10px; padding-left: 10px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  }
`

export const TableContainer=styled.div`
width:460px;
// max-width: 200px;
overflow-x: auto;
border-radius: 8px;
padding: 8px;
 background-color:white;
// height:200px;
margin-top:30px;
margin-left: 170px;

`
export const HorizontalRule=styled.hr`
display:flex;
`