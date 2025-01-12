import styled from 'styled-components';

export const AccountHeader = styled.h4`
display: flex;
margin-top: 2px;
`
export const RefreshButton = styled.button`
diplay: flex;
height:30px;
width: 100px;
margin-left: 450px;
border-radius: 10px;
cursor: pointer;

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

`

export const TableContainer = styled.div`
  width:920px;
// max-width: 200px;
overflow-y:auto;
border-radius: 8px;
padding: 8px;
 background-color:white;
// height:200px;
margin-top:30px;
margin-left: 80px;
height:460px;
`;



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
export const TableHead = styled.th`
padding-left:5px;
height:20px;
color: #686D76;
  text-align: left;
  &:nth-child(1){
    //padding-right: 40px; // Adjust as needed for large space between first two columns
 width: 100px;
  }
  &:nth-child(2){
    padding-left: 15px;  // Adjust as needed for large space between first two columns
    width: 70px;
    
  }
  &:nth-child(3){
    padding-left:18px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
    
}
  &:nth-child(n+4){
    padding-left:1px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
    
}
  &:last-child{
    padding-left:0px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
    width:55px;
}



`
export const TableRow1 = styled.tr`
display: flex;
padding: 5px;
justify-content: space-between;

//from the second child onwards (ie. n starts from zero)
&:nth-child(n+1){
    border-bottom: 1px solid #ddd;
}
margin-bottom: 10px;
`
export const TableData = styled.td`
// color: ${(props)=> props.varpcnt >0 ?'red':'green'};
font-size:13px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol
  

  &:nth-child(1){
    padding-right:5px; // Adjust as needed for large space between first two columns
    width: 110px;
  }
  &:nth-child(2){
    padding-left: 40px;  // Adjust as needed for large space between first two columns
    
    width: 150px;
  }
    &:nth-child(3){
    padding-left: 10px;  // Adjust as needed for large space between first two columns
    
    width: 100px;
  }
    &:nth-child(4){
    padding-left: 15px;  // Adjust as needed for large space between first two columns
    
    width: 99px;
  }
  &:nth-child(n+5){
    padding-left:12px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  width: 100px;
    }
   &:last-child{
    padding-left:35px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  width: 90px;
    }
  font-family: 'Courier New', Courier, monospace; /* Monospaced font */
  overflow: hidden;
  text-overflow: ellipsis;
  &: hover{
    overflow: visible;
  }
  white-space: nowrap; /* Prevent text from wrapping */
`

export const TableDataVarPcnt = styled.td`
color: ${(props)=> {if(isNaN(props.varpcnt)){return 'gray' }   return props.varpcnt > 0 ? 'green':'red'}};
font-style: italic;
font-size:13px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol
  

  &:nth-child(1){
    padding-right:5px; // Adjust as needed for large space between first two columns
    width: 110px;
  }
  &:nth-child(2){
    padding-left: 40px;  // Adjust as needed for large space between first two columns
    
    width: 150px;
  }
    &:nth-child(3){
    padding-left: 10px;  // Adjust as needed for large space between first two columns
    
    width: 100px;
  }
    &:nth-child(4){
    padding-left: 15px;  // Adjust as needed for large space between first two columns
    
    width: 99px;
  }
  &:nth-child(n+5){
    padding-left:12px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  width: 100px;
    }
   &:last-child{
    padding-left:35px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  width: 90px;
    }
  font-family: 'Courier New', Courier, monospace; /* Monospaced font */
  overflow: hidden;
  text-overflow: ellipsis;
  &: hover{
    overflow: visible;
  }
  white-space: nowrap; /* Prevent text from wrapping */
`

export const TableDataProps = styled.td`
  color: ${(props) => props.variance < 0 ? 'red' : 'green'};
//font-style: italic;
font-size:13px;
// padding: 10px;
  position: relative; // Ensure positioning context for RemoveSymbol
  

  &:nth-child(1){
    padding-right:5px; // Adjust as needed for large space between first two columns
    width: 110px;
  }
  &:nth-child(2){
    padding-left: 40px;  // Adjust as needed for large space between first two columns
    
    width: 150px;
  }
    &:nth-child(3){
    padding-left: 10px;  // Adjust as needed for large space between first two columns
    
    width: 100px;
  }
    &:nth-child(4){
    padding-left: 15px;  // Adjust as needed for large space between first two columns
    
    width: 99px;
  }
  &:nth-child(n+5){
    padding-left:12px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  width: 100px;
    }
   &:last-child{
    padding-left:35px;  // Adjust as needed for equal spacing from the third column onwards (n starts from zero)
  width: 90px;
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

export const TableBodyContainer=styled.tbody`

`

export const TableBodyContainerExp=styled.tbody`
overflow-y: scroll;
`