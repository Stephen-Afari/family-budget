import styled,{ createGlobalStyle }  from 'styled-components';

export const TransactionHeader = styled.h4`
display: flex;
margin-top: 2px;
`
export const TransactionIconContainer = styled.div`
margin-top: 2px;
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
export const DatePickerContainer=styled.div`
margin-left:6px;

`
export const MyMiddleComponent = styled.div`
background-color: #EEEEEE;
width: 100%;
height: 540px;
display: flex;
flex-direction: column;
// justify-content: center;

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
export const MyTable= styled.table`
width: 100%;
border-collapse: collapse;
table-layout: fixed;  //fixed table layout
font-family: 'Courier New', Courier, monospace; /* Monospaced font */
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
