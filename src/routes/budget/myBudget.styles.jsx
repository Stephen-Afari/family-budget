import styled,{ createGlobalStyle }  from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

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
justify-content: center;

`
export const Table = styled.table`
width:400px;
margin-left:20px;
margin-right:2px;
margin-top: 4%

`
export const DatePickerContainer=styled.div`
margin-left:6px;
width: 
`
export const TableRow = styled.tr`
display: flex;
justify-content: space-between;
&:first-child {
    background-color:#EEF7FF;
}

`

export const TableHead = styled.th`

color: #686D76;
  text-align: left;
`
export const TableData = styled.td`

`
export const TableContainer=styled.div`
width:500px;
// max-width: 200px;
overflow-x: auto;
border-radius: 8px;
padding: 20px;
 background-color:white;
height:200px;
margin-top:30px;


`