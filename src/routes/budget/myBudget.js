import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { BudgetHeader,TabContent,NavBar, RightComponent,NavTab,TableRow1,MyTable,RemoveSymbol,TableData1,HorizontalRule,AddSymbol, GlobalStyle,BudgetIconContainer, MyMiddleComponent,Table, TableHead,TableRow,TableData,TableContainer, DatePickerContainer} from "./myBudget.styles";
import { useState } from "react";
import { Route,Routes } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from 'react-redux';
import { Modal } from "../../components/modal/modal";
import { Outlet } from "react-router-dom";
import { addItemToBudget,removeItemFromBudget} from "../../store/budgetTransactions/budgetTransactions.reducer";
import { addIncomeItemToBudget, removeIncomeItemFromBudget } from "../../store/budgetIncome/budgetIncome.reducer";
import { selectIncomeTotal } from "../../store/budgetIncome/budgetIncome.selector";
import { selectBudgettransactions} from "../../store/budgetTransactions/budgetTransactions.selector";
import { selectBudgetincomes } from "../../store/budgetIncome/budgetIncome.selector";
//Initializing the idCounter variable in the global scope ensures that it persists across multiple renders and re-renders of the React component. This way, the counter continues to increment without resetting every time the component is re-rendered.
//If you initialize idCounter inside the component, it would reset to its initial value every time the component re-renders, which would prevent you from maintaining unique IDs.
let expenseIdCounter= 0;
let incomeIdCounter= 0;

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
  return new Intl.NumberFormat(locale, { style: 'currency', currency,minimumFractionDigits: 0,
  maximumFractionDigits: 0, }).format(value);
};
//arrays for dropdowns
const subGroups= ['long-term', 'short-term','maint.& repairs','tuition','transport','water','electricity','groceries','fuel','insurance','clothing','grooming','vacation','events','gifts','donation','internet','trash','gas','cleaning','childcare','loans','building','equipment','investment','tv','petty expense','household supplies','miscellaneous'];
const parents =['savings','transport','child & educ.','utilities','food','personal care','recreation','parental care','housing','worship','debt repay.','project','family support','investment','household supplies','supplies','kindness','miscell.']
const subGroups_inc= ['mthly_sal.-A','mthly_sal.-B','annual_bonus'];
const parents_inc =['salary-A','salary-B','bonus']


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

//Mini NavBar with tabs for the Right Component
const MiniNavbar =()=>{
  const [activeTab, setActiveTab]= useState('tab1');
  const renderTabContent =()=>{
    switch(activeTab){
      case 'tab1':
        return <Tab1Content/>;
      case 'tab2':
        return <Tab2Content/>;
      default:
        return null;
    }
  }
  return(
    <div>
      <NavBar>
<NavTab  className={activeTab==='tab1'?'active':null}
onClick={()=>setActiveTab('tab1')}
>
  Tab 1
</NavTab>
<NavTab
className={activeTab==='tab2'?'active': null}
onClick={()=>setActiveTab('tab2')}
>Tab 2</NavTab>
      </NavBar>
<TabContent>
  {renderTabContent}
</TabContent>

    </div>
    
   
  )
}
//Test---Tab content
const Tab1Content=()=>{
  return(
    
      <p1>Tab1</p1>
    
  )
}
const Tab2Content=()=>{
  return(
   
      <p1>Tab2</p1>
   
  )
}
//Rigth comp
const RightComponent1=()=>{
  return(
  
    <RightComponent>
<MiniNavbar/>
    </RightComponent>
  )
}

  export const MyBudgetScreen=()=>{
    const [selectedDate, setSelectedDate]= useState(null);
    const dispatch = useDispatch();
 
      //interact with the data from the reducer
  const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
  const myBudgetIncome = useSelector(selectBudgetincomes) || [];
  const totalIncome = useSelector(selectIncomeTotal);
  

 ////////////MODAL DETAILS///////////////////////////////
//  const headerType='Add Expense'
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [collectedData, setCollectedData] = useState(null);
 const [modalHeader, setModalHeader]= useState(null) //set if it's an expense or income

 const handleOpenModalExpense = () => {
  setModalHeader('Add Expense')
  setIsModalOpen(true)};

  const handleOpenModalIncome = () => {
    setModalHeader('Add Income')
    setIsModalOpen(true)};
 const handleCloseModal = () => setIsModalOpen(false);
 
  ////////////MODAL DETAILS///////////////////////////////

 /////////////////////SEND DATA TO REDUCER////////////////////////////////

 const handleFormSubmit = (data) => {
  // let dataWithId = {...data, id:idCounter++};
  //  setCollectedData(dataWithId);
  if(modalHeader==='Add Expense'){
    dispatch(addItemToBudget({...data, id:expenseIdCounter++}))
  } else{
    dispatch(addIncomeItemToBudget({...data, id:incomeIdCounter++}))
  }
    
 };
 //////////////////////SEND DATA TO REDUCER///////////////////////////////

//remove item from budget upon click of the red circle.
const removeFromBudget =(id)=>{
if(modalHeader==='Add Expense'){
  dispatch(removeItemFromBudget(id))
}else{
  dispatch(removeIncomeItemFromBudget(id))
}
 }

// //filtering to show data for the selected date only 
const filteredTransactions = selectedDate ?
myBudgetTransaction.filter((transaction)=>{
    return new Date(transaction.date).toString()===selectedDate.toString();
   
  }):[];

     //filtering to show data for the selected date only 
     const filteredIncome = selectedDate ? (
      myBudgetIncome.filter((income)=>{
       return new Date(income.date).toString()=== selectedDate.toString();
      })
     ):[];
    //console.log(idCounter)
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
        <thead>
        <TableRow>
            <TableHead>Income</TableHead>
            
            <TableHead>Plan</TableHead>
            <TableHead>(%)</TableHead>
            <TableHead>Targ.</TableHead>
        </TableRow>
        </thead>
        <tbody>
      {filteredIncome.length >0 ? (
       
      filteredIncome.map((income)=>(
       <TableRow1 key={income.id}>
        
       <TableData><RemoveSymbol onClick={()=>removeFromBudget(income.id)}/>{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</TableData>
      
       <TableData>{formatCurrency(income.amount)}</TableData>
      
       <TableData1>{formatPercentage(income.amount / totalIncome)}</TableData1>
       <TableData1>{formatPercentage(income.amount / totalIncome)}</TableData1>
        </TableRow1>

   ))):(<TableRow><TableData>No Transaction selected for this date</TableData></TableRow>)}
   </tbody>
   </MyTable>
   
   <AddSymbol onClick={handleOpenModalIncome} />
</TableContainer>

<TableContainer>
      <MyTable>
        <thead>
        <TableRow>
            <TableHead>Expense</TableHead>
            
            <TableHead>Plan</TableHead>
            <TableHead>(%)</TableHead>
            <TableHead>Targ.</TableHead>
        </TableRow>
        </thead>
      <tbody>
    
      {filteredTransactions.length >0 ?
      (filteredTransactions.map((transaction)=>(
        <TableRow1 key={transaction.id}>
          
       <TableData><RemoveSymbol onClick={()=>removeFromBudget(transaction.id)}/>{transaction.parent.slice(0,1).toUpperCase()+transaction.parent.slice(1).toLowerCase()}</TableData>
      
       
       <TableData>{formatCurrency(transaction.amount)}</TableData>
       <TableData1>{formatPercentage(transaction.amount/totalIncome)}</TableData1>
       <TableData1>{formatPercentage(transaction.target/100)}</TableData1>
        </TableRow1>
        
        
      ))):(<TableRow><TableData>No Transaction selected for this date</TableData></TableRow>)}
    </tbody>
    </MyTable>
    <AddSymbol onClick={handleOpenModalExpense}/>
    </TableContainer>
   
    <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        subGroups={modalHeader==='Add Expense'? subGroups: subGroups_inc}
        parents={ modalHeader==='Add Expense'? parents: parents_inc}
        heading={modalHeader}
       
      />
      </MyMiddleComponent>
      <RightComponent1/>
    
        </SplitScreen>
        </>
       
    )
  
  }