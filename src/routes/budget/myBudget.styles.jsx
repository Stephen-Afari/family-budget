import styled,{ createGlobalStyle }  from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

export const TableData = styled.td`
font-size:15px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol

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
&:nth-child(n+2){
    border-bottom: 1px solid #ddd;
}
margin-bottom: 5px;
`

export const TableHead = styled.th`
height:20px;
color: #686D76;
  text-align: left;
`

export const TableContainer=styled.div`
width:395px;
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