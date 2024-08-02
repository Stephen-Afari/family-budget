import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { BudgetHeader,TabContentContainer,SubGroupIcon,DescriptionIcon,ParentIcon,TabContent,NavBar, RightComponent,NavTab,TableRow1,MyTable,RemoveSymbol,TableData1,HorizontalRule,AddSymbol, GlobalStyle,BudgetIconContainer, MyMiddleComponent,Table, TableHead,TableRow,TableData,TableContainer, DatePickerContainer, IncomeHeader, TabIncAmount, TabIncTotal, TabHeader, TabInc, TabExp, TabAmount, TabAmountContainer, TableBodyContainer, TabListITem, NetIncomeDisplay, BudgetHeaderContainer, BudgetHeaderLeft, NetIncomeAmount} from "./myBudget.styles";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from 'react-redux';
import { Modal } from "../../components/modal/modal";
import { addItemToBudget,removeItemFromBudget} from "../../store/budgetTransactions/budgetTransactions.reducer";
import { addIncomeItemToBudget, removeIncomeItemFromBudget } from "../../store/budgetIncome/budgetIncome.reducer";
import { selectIncomeTotal } from "../../store/budgetIncome/budgetIncome.selector";
import { selectIncomeTotalByDate } from "../../store/budgetIncome/budgetIncome.selector";
import { selectBudgettransactionByDate, selectBudgettransactions, selectExpenseTotalByDate} from "../../store/budgetTransactions/budgetTransactions.selector";
import { selectBudgetincomes } from "../../store/budgetIncome/budgetIncome.selector";

//Initializing the idCounter variable in the global scope ensures that it persists across multiple renders and re-renders of the React component. This way, the counter continues to increment without resetting every time the component is re-rendered.
//If you initialize idCounter inside the component, it would reset to its initial value every time the component re-renders, which would prevent you from maintaining unique IDs.
// let expenseIdCounter= 0;
// let incomeIdCounter= 0;

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
//To achieve the behavior where clicking on a tab displays content below the tab within the right-hand component, you need to manage the routing within the right-hand component itself. This involves keeping the mini navbar and its tab content within the same component structure.
const MiniNavbar =({selectProp})=>{
  const [activeTab, setActiveTab]= useState('tab1');
//data from the store
  const myBudgetIncome = useSelector(selectBudgetincomes) || [];
 const totalIncome = useSelector((state)=>selectIncomeTotalByDate(selectProp)(state));
 const totalExpense = useSelector((state)=>selectExpenseTotalByDate(selectProp)(state))
 const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
//console.log(totalExpense)
//filter inc
let filteredInc = selectProp ? 
myBudgetIncome.filter((inc)=>{
  return new Date(inc.date).toString()=== selectProp.toString()}
)
:[]

//filter exp
let filteredExp = selectProp ? 
myBudgetTransaction.filter((exp)=>{
  return new Date(exp.date).toString()=== selectProp.toString()}
)
:[]



//Tab contents displayed below the tabs
const Tab1Content=()=>{
  return(
    
    <TabContentContainer>
<TabInc>
  <TabHeader>
    Incomes
  </TabHeader>
   {/* {filteredInc.map((inc)=>(
    <TabContent key={inc.id}>
   <TabAmountContainer> <TabAmount>{inc.parent}</TabAmount>  <TabAmount>{formatCurrency(inc.amount)}</TabAmount></TabAmountContainer>
    </TabContent>
   
   ))} */}
<TabContent>
 <TabAmountContainer> <TabIncTotal>Total Income </TabIncTotal> <TabIncTotal>{formatCurrency(totalIncome)}</TabIncTotal></TabAmountContainer>
  
</TabContent>
</TabInc> 

<TabExp>
<TabHeader>
    Expenses
  </TabHeader>
  {/* {filteredExp.map((exp)=>(
    <TabContent key={exp.id}>
   <TabAmountContainer> <TabAmount>{exp.parent}</TabAmount>  <TabAmount>{formatCurrency(exp.amount)}</TabAmount></TabAmountContainer>
    </TabContent>
   
   ))} */}
<TabContent>
  <TabAmountContainer><TabIncTotal>Total Expense </TabIncTotal> <TabIncTotal>{formatCurrency(totalExpense)}</TabIncTotal></TabAmountContainer>
  
</TabContent>
</TabExp>

    </TabContentContainer>

    
  )
}
const Tab2Content=()=>{
  return(
   
       
    <TabContentContainer>
<TabInc>
  <TabHeader>
    Incomes
  </TabHeader>
   {filteredInc.map((inc)=>(
    <TabContent key={inc.id}>
    <TabAmountContainer><TabAmount><TabListITem/>{inc.subGroup}</TabAmount>  <TabAmount>{formatCurrency(inc.amount)}</TabAmount></TabAmountContainer>
    </TabContent>
   
   ))}
<TabContent>
  <TabAmountContainer><TabIncTotal>Total Income </TabIncTotal> <TabIncTotal>{formatCurrency(totalIncome)}</TabIncTotal></TabAmountContainer>
  
</TabContent>
</TabInc> 

<TabExp>
<TabHeader>
    Expenses
  </TabHeader>
  {filteredExp.map((exp)=>(
    <TabContent key={exp.id}>
    <TabAmountContainer><TabAmount><TabListITem/>{exp.subGroup}</TabAmount>  <TabAmount>{formatCurrency(exp.amount)}</TabAmount></TabAmountContainer>
    </TabContent>
   
   ))}
<TabContent>
 <TabAmountContainer> <TabIncTotal>Total Expense</TabIncTotal> <TabIncTotal>{formatCurrency(totalExpense)}</TabIncTotal></TabAmountContainer>
  
</TabContent>
</TabExp>

    </TabContentContainer>
   
  )
}

const Tab3Content=()=>{
  return(
   
    <TabContentContainer>
    <TabInc>
      <TabHeader>
        Incomes
      </TabHeader>
       {filteredInc.map((inc)=>(
        <TabContent key={inc.id}>
        <TabAmountContainer><TabAmount><TabListITem/>{inc.description}</TabAmount>  <TabAmount>{formatCurrency(inc.amount)}</TabAmount></TabAmountContainer>
        </TabContent>
       
       ))}
    <TabContent>
      <TabAmountContainer><TabIncTotal>Total Income </TabIncTotal><TabIncTotal>{formatCurrency(totalIncome)}</TabIncTotal></TabAmountContainer>
      
    </TabContent>
    </TabInc> 
    
    <TabExp>
    <TabHeader>
        Expenses
      </TabHeader>
      {filteredExp.map((exp)=>(
        <TabContent key={exp.id}>
       <TabAmountContainer> <TabAmount><TabListITem/>{exp.description}</TabAmount>  <TabAmount>{formatCurrency(exp.amount)}</TabAmount></TabAmountContainer>
        </TabContent>
       
       ))}
    <TabContent>
      <TabAmountContainer><TabIncTotal>Total Expense </TabIncTotal><TabIncTotal>{formatCurrency(totalExpense)}</TabIncTotal></TabAmountContainer>
      
    </TabContent>
    </TabExp>
    
        </TabContentContainer>
   
  )
}

  const renderTabContent =()=>{
    switch(activeTab){
      case 'tab1':
        return <Tab1Content/>;
      case 'tab2':
        return <Tab2Content/>;
      case 'tab3':
        return <Tab3Content/>
      default:
        return null;
    }
  }
  return(
    <div>
      <NavBar>
<NavTab  active={activeTab ==='tab1'? "true": "false"} //Once you click on this tab, change the state of activeTab to tab1 and make the active prop true
onClick={()=>setActiveTab('tab1')}
>
  <ParentIcon/>
  Parent
</NavTab>
<NavTab
active ={activeTab ==='tab2'? "true": "false"}
onClick={()=>setActiveTab('tab2')}
>
  <SubGroupIcon/>
  SubGrp.</NavTab>
<NavTab active={activeTab==='tab3'?"true": "false"}
onClick={()=>setActiveTab('tab3')}
>
  <DescriptionIcon/>
  Details
</NavTab>
      </NavBar>
<TabContent>
  {renderTabContent()}
</TabContent>

    </div>
    
   
  )
}

//Rigth comp
const RightComponent1=({selectDate})=>{
  return(
  
    <RightComponent>
<MiniNavbar selectProp={selectDate}/>
    </RightComponent>
  )
}

//Component for displaying NetIncome
const NetIcomeComponent=({totalInc, totalExp})=>{
  
  const netIncomeValue = totalInc - totalExp;
  const netIncomeFormatted = formatCurrency(netIncomeValue); //formatCurrency formats it as a string
return(
  <NetIncomeDisplay netinc={netIncomeValue}>Net Income
      <NetIncomeAmount>
        {netIncomeFormatted}
      </NetIncomeAmount>
         </NetIncomeDisplay>
)
}

  export const MyBudgetScreen=()=>{
    const [selectedDate, setSelectedDate]= useState(null);
    const dispatch = useDispatch();
 
      //interact with the data from the reducer
  const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
  const totalIncome = useSelector((state)=>selectIncomeTotalByDate(selectedDate)(state));
  const totalExpense = useSelector((state)=>selectExpenseTotalByDate(selectedDate)(state))
  const myBudgetIncome = useSelector(selectBudgetincomes) || [];
 // const totalIncome = useSelector(selectIncomeTotal);


 ////////////MODAL DETAILS///////////////////////////////
//  const headerType='Add Expense'
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [collectedData, setCollectedData] = useState(null);
 const [modalHeader, setModalHeader]= useState(null) //set if it's an expense or income
 const [expenseIdCounter,setexpenseIdCounter ]= useState(() => {
  return parseInt(localStorage.getItem('expenseIdCounter')) || 0;
});
 const [incomeIdCounter,setIncomeIdCounter ]= useState(() => {
  return parseInt(localStorage.getItem('incomeIdCounter')) || 0;
});
//Use useEffect to save the counter value to localStorage whenever it changes.
useEffect(() => {
  localStorage.setItem('expenseIdCounter', expenseIdCounter);
}, [expenseIdCounter]);

useEffect(() => {
  localStorage.setItem('incomeIdCounter', incomeIdCounter);
}, [incomeIdCounter]);

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
  let newId= expenseIdCounter;
  setexpenseIdCounter(expenseIdCounter + 1)
    dispatch(addItemToBudget({...data, id:newId}))
  } else{
    let newId=incomeIdCounter;
    setIncomeIdCounter(incomeIdCounter + 1);
    dispatch(addIncomeItemToBudget({...data, id:newId}))
  }
    
 };
 //console.log(incomeIdCounter)
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
      <BudgetHeaderContainer>
      <BudgetHeaderLeft>
     <BudgetHeader><BudgetIconContainer><IoReorderFourSharp /> </BudgetIconContainer>Budget</BudgetHeader>
     {/* //Date Picker component */}
      <DatePickerContainer>
        <GlobalStyle/>
      <DatePicker selected={selectedDate} onChange={(selectedDate)=>setSelectedDate(selectedDate)}  dateFormat="MMMM-d-yyyy"
          placeholderText="Select a date"/></DatePickerContainer>
      </BudgetHeaderLeft>
      <NetIcomeComponent 
      totalInc={totalIncome}   //pass info as props
      totalExp={totalExpense}
      />
      </BudgetHeaderContainer>
      <SplitScreen  middleWeight={1} rightWeight={4}>
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
        <TableBodyContainer>
      {filteredIncome.length >0 ? (
       
      filteredIncome.map((income)=>(
       <TableRow1 key={income.id}>
        
       <TableData><RemoveSymbol onClick={()=>removeFromBudget(income.id)}/>{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</TableData>
      
       <TableData>{formatCurrency(income.amount)}</TableData>
      
       <TableData1>{formatPercentage(income.amount / totalIncome)}</TableData1>
       <TableData1>{formatPercentage(income.target/100)}</TableData1>
        </TableRow1>

   ))):(<TableRow><TableData>No Transaction selected for this date</TableData></TableRow>)}
   </TableBodyContainer>
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
      <TableBodyContainer>
    
      {filteredTransactions.length >0 ?
      (filteredTransactions.map((transaction)=>(
        <TableRow1 key={transaction.id}>
          
       <TableData><RemoveSymbol onClick={()=>removeFromBudget(transaction.id)}/>{transaction.parent.slice(0,1).toUpperCase()+transaction.parent.slice(1).toLowerCase()}</TableData>
      
       
       <TableData>{formatCurrency(transaction.amount)}</TableData>
       <TableData1>{formatPercentage(transaction.amount/totalIncome)}</TableData1>
       <TableData1>{formatPercentage(transaction.target/100)}</TableData1>
        </TableRow1>
        
        
      ))):(<TableRow><TableData>No Transaction selected for this date</TableData></TableRow>)}
    </TableBodyContainer>
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
      <RightComponent1 selectDate={selectedDate}/>
    
        </SplitScreen>
        </>
       
    )
  
  }