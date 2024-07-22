import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { DatePickerContainer,TableRow1 ,GlobalStyle, MyMiddleComponent, MyTable, TableBodyContainer, TableContainer, TableData, TableData1, TableHead, TableRow, TransactionHeader,TransactionIconContainer, RemoveSymbol, AddSymbol } from "./transactions.styles";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Modal } from "../../components/modal/modal";

//Initializing the idCounter variable in the global scope ensures that it persists across multiple renders and re-renders of the React component. This way, the counter continues to increment without resetting every time the component is re-rendered.
//If you initialize idCounter inside the component, it would reset to its initial value every time the component re-renders, which would prevent you from maintaining unique IDs.
let expenseIdCounter= 0;
let incomeIdCounter= 0;
let idCounter= 0;

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



// const MiddleComponent=({name})=>{
//     return(<p style={{backgroundColor: 'yellow'}}>{name}</p>)
//   }
  
  const RightComponent=({name1})=>{
    return(<p style={{backgroundColor: 'green'}}>{name1}</p>)
  }
  
  export const MyTransactionScreen=()=>{
    const [selectedDate, setSelectedDate]= useState(null);

  //filtering to show data for the selected date only 
  const filteredData = (data,date)=>{
    let results=[];
    if(date){
     results = data.filter((item)=>(
        new Date(item.date).toDateString() === new Date(date).toDateString() ))
    } 
 
   return results;
  } 
  //console.log(filteredData(incomes,selectedDate))

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
  let dataWithId = {...data, id:idCounter++};
   setCollectedData(dataWithId);
  // if(modalHeader==='Add Expense'){
  //   dispatch(addItemToBudget({...data, id:expenseIdCounter++}))
  // } else{
  //   dispatch(addIncomeItemToBudget({...data, id:incomeIdCounter++}))
  // }
    
 };
 //////////////////////SEND DATA TO REDUCER///////////////////////////////

    return(
      <>
     <TransactionHeader><TransactionIconContainer><IoReorderFourSharp /> </TransactionIconContainer>Transaction</TransactionHeader>
     <DatePickerContainer>
        <GlobalStyle/>
      <DatePicker selected={selectedDate} onChange={(selectedDate)=>setSelectedDate(selectedDate)}  dateFormat="MMMM-d-yyyy"
          placeholderText="Select a date"/></DatePickerContainer>
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
{filteredData(incomes,selectedDate).length >0 ? (
filteredData(incomes,selectedDate).map((income,id)=>(
  <TableRow1 key={income.id}>
        
  <TableData><RemoveSymbol />{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</TableData>
 
  <TableData>{formatCurrency(income.amount)}</TableData>
 
  <TableData1>{formatPercentage(income.amount)}</TableData1>
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
    
      {filteredData(transactions,selectedDate).length >0 ?
      (filteredData(transactions,selectedDate).map((transaction)=>(
        <TableRow1 key={transaction.id}>
          
       <TableData><RemoveSymbol />{transaction.parent.slice(0,1).toUpperCase()+transaction.parent.slice(1).toLowerCase()}</TableData>
      
       
       <TableData>{formatCurrency(transaction.amount)}</TableData>
       <TableData1>{formatPercentage(transaction.amount)}</TableData1>
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
      <RightComponent name1="Right"/>
        </SplitScreen>
        </>
    )
  }