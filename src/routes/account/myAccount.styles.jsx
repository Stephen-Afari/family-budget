import styled from 'styled-components';

export const AccountHeader = styled.h4`
display: flex;
margin-top: 2px;
`
export const AccountIconContainer = styled.div`
margin-top: 2px;
`
export const DropdownContainer = styled.div`
  display: flex;
flex-direction: column;
  margin-bottom: 20px;
  height: 50px;
  gap: 5px;
  margin-left: 3px;
`
export const YearDropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
  width:6%;
 border: none;
 Placeholder:'yyy'
`;
export const MonthDropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
  width:9%;
  border: none;
 
`;

export const TableRow =styled.tr`
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
width: 100%

`

export const TableContainer = styled.div`
  margin-top: 20px;
  width:2500px;
  margin-left:10px;
`;

export const TableHead = styled.thead`
 width:100%

`
export const MyIncomeTable= styled.table`
width: 100%;
border-collapse: collapse;
table-layout: fixed;  //fixed table layout
font-family: 'Courier New', Courier, monospace; /* Monospaced font */
`

export const MyExpenseTable= styled.table`
width: 100%;
border-collapse: collapse;
table-layout: fixed;  //fixed table layout
font-family: 'Courier New', Courier, monospace; /* Monospaced font */
`