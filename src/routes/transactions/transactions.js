import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { DatePickerContainer,TableRow1 ,GlobalStyle, MyMiddleComponent, MyTable, TableBodyContainer, TableContainer, TableData, TableData1, TableHead, TableRow, TransactionHeader,TransactionIconContainer, RemoveSymbol, AddSymbol, RightComponent, TabContentContainer, TabInc, TabHeader, TabContent, TabAmountContainer, TabIncTotal, TabExp, TabAmount, TabListITem, NavBar, NavTab, ParentIcon, SubGroupIcon, DescriptionIcon, NetIncomeDisplay, NetIncomeAmount, ActualHeaderContainer, ActualHeaderLeft } from "./transactions.styles";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Modal } from "../../components/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { selectActualincomes, selectActualIncomeTotalByDate } from "../../store/actualIncome/actualIncome.selector";
import { addIncomeItemToActual, removeIncomeItemFromActual } from "../../store/actualIncome/actualIncome.reducer";
import { selectActualExpenseTotalByDate, selectActualtransactions } from "../../store/actualTransactions/actualTransactions.selector";
import { addItemToActual, removeItemFromActual } from "../../store/actualTransactions/actualTransactions.reducer";

//Initializing the idCounter variable in the global scope ensures that it persists across multiple renders and re-renders of the React component. This way, the counter continues to increment without resetting every time the component is re-rendered.
//If you initialize idCounter inside the component, it would reset to its initial value every time the component re-renders, which would prevent you from maintaining unique IDs.
let expenseIdCounter= 0;
let incomeIdCounter= 0;
//let idCounter= 0;

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
  const myActualIncome = useSelector(selectActualincomes) || [];
 const totalIncome = useSelector((state)=>selectActualIncomeTotalByDate(selectProp)(state));
 const totalExpense = useSelector((state)=>selectActualExpenseTotalByDate(selectProp)(state))
 const myActualTransaction = useSelector(selectActualtransactions) || [];
//console.log(totalExpense)
//filter inc
let filteredInc = selectProp ? 
myActualIncome.filter((inc)=>{
  return new Date(inc.date).toString()=== selectProp.toString()}
)
:[]

//filter exp
let filteredExp = selectProp ? 
myActualTransaction.filter((exp)=>{
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
const RightComponent1=({selectProp})=>{
  return(
  
    <RightComponent>
<MiniNavbar selectProp={selectProp}/>
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
  
  export const MyTransactionScreen=()=>{
    const [selectedDate, setSelectedDate]= useState(null);

    const dispatch = useDispatch();
 
    //interact with the data from the reducer
// const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
const totalIncome = useSelector((state)=>selectActualIncomeTotalByDate(selectedDate)(state));
const totalExpense = useSelector((state)=>selectActualExpenseTotalByDate(selectedDate)(state))
const myActualIncome = useSelector(selectActualincomes) || [];
const myActualTransaction = useSelector(selectActualtransactions) || [];

// console.log(totalExpense)
  //filtering to show data for the selected date only 
  const filteredData = (data,date)=>{
    let results=[];
    if(date){
     results = data.filter((item)=>(
        new Date(item.date).toDateString() === new Date(date).toDateString() ))
    } 
 
   return results;
  } 
 //console.log(filteredData(myActualIncome,selectedDate))
 //console.log(myActualIncome)
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
  //let dataWithId = {...data, id:idCounter++};
   //setCollectedData(dataWithId);

  if(modalHeader==='Add Expense'){
    dispatch(addItemToActual({...data, id:expenseIdCounter++}))
  } else{
    dispatch(addIncomeItemToActual({...data, id:incomeIdCounter++}))
  }
  handleCloseModal(); // Close modal after submitting
 };

 //remove item from budget upon click of the red circle.
 const handleRemoveIncome = (id) => {
  dispatch(removeIncomeItemFromActual(id));
};

const handleRemoveExpense = (id) => {
  dispatch(removeItemFromActual(id));
};
 //////////////////////SEND DATA TO REDUCER///////////////////////////////

    return(
      <>
      <ActualHeaderContainer>
        <ActualHeaderLeft>
     <TransactionHeader><TransactionIconContainer><IoReorderFourSharp /> </TransactionIconContainer>Transaction</TransactionHeader>
     <DatePickerContainer>
        <GlobalStyle/>
      <DatePicker selected={selectedDate} onChange={(selectedDate)=>setSelectedDate(selectedDate)}  dateFormat="MMMM-d-yyyy"
          placeholderText="Select a date"/></DatePickerContainer>
      </ActualHeaderLeft>
      <NetIcomeComponent
       totalInc={totalIncome}   //pass info as props
       totalExp={totalExpense}
      />
      </ActualHeaderContainer>  
      <SplitScreen  middleWeight={1} rightWeight={3}>
      <MyMiddleComponent>
      <TableContainer>
        <MyTable>
          <thead>
          <TableRow>
            <TableHead>Income</TableHead>
            
            <TableHead>Actual</TableHead>
            <TableHead>(%)</TableHead>
            <TableHead>Targ.</TableHead>
        </TableRow>
          </thead>
<TableBodyContainer>
{filteredData(myActualIncome,selectedDate).length >0 ? (
filteredData(myActualIncome,selectedDate).map((income,id)=>(
  <TableRow1 key={income.id}>
        
  <TableData><RemoveSymbol onClick={() => handleRemoveIncome(income.id)}/>{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</TableData>
 
  <TableData>{formatCurrency(income.amount)}</TableData>
 
  <TableData1>{formatPercentage(income.amount/totalIncome)}</TableData1>
  <TableData1>{formatPercentage(income.target/ 100)}</TableData1>
   </TableRow1>
))
): (<TableRow><TableData>No transaction selected for this date</TableData></TableRow>)}
</TableBodyContainer>
</MyTable>
<AddSymbol onClick={handleOpenModalIncome}/>
       
      </TableContainer>

      <TableContainer>
      <MyTable>
        <thead>
        <TableRow>
            <TableHead>Expense</TableHead>
            
            <TableHead>Actual</TableHead>
            <TableHead>(%)</TableHead>
            <TableHead>Targ.</TableHead>
        </TableRow>
        </thead>
      <TableBodyContainer>
    
      {filteredData(myActualTransaction,selectedDate).length >0 ?
      (filteredData(myActualTransaction,selectedDate).map((transaction)=>(
        <TableRow1 key={transaction.id}>
          
       <TableData><RemoveSymbol onClick={() => handleRemoveExpense(transaction.id)} />{transaction.parent.slice(0,1).toUpperCase()+transaction.parent.slice(1).toLowerCase()}</TableData>
      
       
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
      <RightComponent1 selectProp={selectedDate}/>
        </SplitScreen>
        </>
    )
  }