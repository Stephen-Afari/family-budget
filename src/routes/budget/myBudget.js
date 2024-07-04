import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { BudgetHeader,MyTable,RemoveSymbol,TableData1,HorizontalRule,AddSymbol, GlobalStyle,BudgetIconContainer, MyMiddleComponent,Table, TableHead,TableRow,TableData,TableContainer, DatePickerContainer} from "./myBudget.styles";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from 'react-redux';
import { Modal } from "../../components/modal/modal";
import { addItemToBudget } from "../../store/budgetTransactions/budgetTransactions.reducer";
import { selectBudgettransactions,selectIncomeTotal} from "../../store/budgetTransactions/budgetTransactions.selector";
//Initializing the idCounter variable in the global scope ensures that it persists across multiple renders and re-renders of the React component. This way, the counter continues to increment without resetting every time the component is re-rendered.
//If you initialize idCounter inside the component, it would reset to its initial value every time the component re-renders, which would prevent you from maintaining unique IDs.
let idCounter=0;
// Utility function to format as percentage
const formatPercentage = (value, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

//// Utility function for currency formatting
const formatCurrency = (value, locale = 'en-GH', currency = 'GHS') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
};
const subGroups= ['long-term', 'short-term','maint.& repairs','tuition','transport','water','electricity','groceries','fuel','insurance','clothing','grooming','vacation','events','gifts','donation','internet','trash','gas','cleaning','childcare','loans','building','equipment','investment','tv','petty expense','household supplies','miscellaneous'];
const parents =['savings','transportation','childcare & education','utilities','food','personal care','recreation','parental care','housing','worship','debt repayment','project','family support','investment','household supplies','supplies','kindness','miscellaneous']

//Date format MM/dd/yy
const transactions=[
  {id: 1, date: '06-10-2024', subGroup:'water', parent:'utilities', description:'water bill',amount: 70, target:100},
  {id: 2, date: '06-10-2024', subGroup:'electricity', parent:'utilities',description:'light bill' ,amount: 700, target:100},
  {id: 3, date: '06-10-2024', subGroup:'maintenance', parent:'housing', description:'window frame' ,amount: 200, target:100},
  {id: 4, date: '03-10-2024', subGroup:'fees', parent:'childcare & education', description:'Afia fees' ,amount: 200, target:100},
]

const incomes=[
  {id: 1, date: '06-10-2024', subGroup:'paycheck', parent:'salary', description:'person 1',amount: 70, target:200},
  {id: 2, date: '05-10-2024', subGroup:'paycheck', parent:'salary',description:'person 2' ,amount: 700, target:200},
  {id: 3, date: '04-10-2024', subGroup:'paycheck', parent:'bonus', description:'person 1' ,amount: 200, target:200},
  {id: 4, date: '03-10-2024', subGroup:'paycheck', parent:'bonus', description:'person 2' ,amount: 200, target:200},
  {id: 5, date: '03-10-2024', subGroup:'windfall', parent:'miscellaneous', description:'windfall' ,amount: 200, target:200},
]

// const MiddleComponent=()=>{
//     return(<MyMiddleComponent></MyMiddleComponent>)
//   }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }

 


  
  export const MyBudgetScreen=()=>{
    const [selectedDate, setSelectedDate]= useState(null);
    const dispatch = useDispatch();
 
      //interact with the data from the reducer
  const myBudgetTransaction = useSelector(selectBudgettransactions);
  const totalIncome = useSelector(selectIncomeTotal);
  
//     // a function to handle the dispatch
// const handleAddTransactions = ()=>{
//   let objectToAdd =  {id: 1, date: '06-10-2024', subGroup:'paycheck', parent:'salary', description:'person 1',amount: 70, target:200}
//     dispatch(addItemToBudget(objectToAdd))
// }

 //////////////////////SEND DATA TO REDUCER///////////////////////////////
    // a function to handle the dispatch
    const handleAddTransactions = ()=>{
      let objectToAdd =  {id: 1, date: '06-10-2024', subGroup:'paycheck', parent:'salary', description:'person 1',amount: 70, target:200}
        dispatch(addItemToBudget(objectToAdd))
    }

 /////////////////////SEND DATA TO REDUCER////////////////////////////////

 ////////////MODAL DETAILS///////////////////////////////
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [collectedData, setCollectedData] = useState(null);

 const handleOpenModal = () => setIsModalOpen(true);
 const handleCloseModal = () => setIsModalOpen(false);
 const expenseHeader='Add Expense'

 const handleFormSubmit = (data) => {
  let dataWithId = {...data, id:idCounter++};
   setCollectedData(dataWithId);
   handleAddTransactions()
  
 };
 //console.log('Collected Data:', collectedData); // You can process the data further here
 /////////////////////////////MODAL DETALS//////////////////
 console.log(myBudgetTransaction);

//console.log(myBudgetTransaction);
// console.log(totalIncome);
   
    //filtering to show data for the selected date only 
    const filteredTransactions = selectedDate ?
    transactions.filter((transaction)=>{
        return new Date(transaction.date).toString()===selectedDate.toString();
       
      }):[];
     //filtering to show data for the selected date only 
     const filteredIncome = selectedDate ? (
      incomes.filter((income)=>{
       return new Date(income.date).toString()=== selectedDate.toString();
      })
     ):[];
     //console.log(filteredTransactions)
    return(
      <>
     <BudgetHeader><BudgetIconContainer><IoReorderFourSharp /> </BudgetIconContainer>Budget</BudgetHeader>
     {/* //Date Picker component */}
      <DatePickerContainer>
        <GlobalStyle/>
      <DatePicker selected={selectedDate} onChange={(selectedDate)=>setSelectedDate(selectedDate)}  dateFormat="MMMM-d-yyyy"
          placeholderText="Select a date"/></DatePickerContainer>
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MyMiddleComponent >
<TableContainer>
      <MyTable>
        <TableRow>
            <TableHead>Income</TableHead>
            
            <TableHead>Plan</TableHead>
            <TableHead>(%)</TableHead>
            <TableHead>Targ.</TableHead>
        </TableRow>
      {filteredIncome.length >0 ? (
      filteredIncome.map((income)=>(
       <TableRow key={income.id}>
        
       <TableData><RemoveSymbol/>{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</TableData>
      
       <TableData>{formatCurrency(income.amount)}</TableData>
      
       <TableData1>{formatPercentage(income.amount / totalIncome)}</TableData1>
       <TableData1>{formatPercentage(income.amount / totalIncome)}</TableData1>
        </TableRow>

   ))):(<div>No Transaction selected for this date</div>)}
   </MyTable>
   
   <AddSymbol onClick={handleAddTransactions} />
</TableContainer>

<TableContainer>
      <MyTable>
        <TableRow>
            <TableHead>Expense</TableHead>
            
            <TableHead>Plan</TableHead>
            <TableHead>(%)</TableHead>
            <TableHead>Targ.</TableHead>
        </TableRow>
      {filteredTransactions.length >0 ?
      (filteredTransactions.map((transaction)=>(
        <TableRow key={transaction.id}>
          
       <TableData><RemoveSymbol/>{transaction.parent.slice(0,1).toUpperCase()+transaction.parent.slice(1).toLowerCase()}</TableData>
      
       
       <TableData>{formatCurrency(transaction.amount)}</TableData>
       <TableData1>{formatPercentage(transaction.amount/totalIncome)}</TableData1>
       <TableData1>{formatPercentage(transaction.amount/totalIncome)}</TableData1>
        </TableRow>
        
        
      ))):(<div>No Transaction selected for this date</div>)}
    
    </MyTable>
    <AddSymbol onClick={handleOpenModal}/>
    </TableContainer>
   
    <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        subGroups={subGroups}
        parents={parents}
        heading={expenseHeader}
      />
      </MyMiddleComponent>
      <RightComponent name1="Right"/>
        </SplitScreen>
        </>
       
    )
  
  }