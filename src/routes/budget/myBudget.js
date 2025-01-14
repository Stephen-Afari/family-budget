import { SplitScreen } from "../../components/splitScreen/splitScreen";
import { IoReorderFourSharp } from "react-icons/io5";
import { BudgetHeader,TabContentContainer,SubGroupIcon,DescriptionIcon,ParentIcon,TabContent,NavBar, RightComponent,NavTab,TableRow1,MyTable,RemoveSymbol,TableData1,HorizontalRule,AddSymbol, GlobalStyle,BudgetIconContainer, MyMiddleComponent,Table, TableHead,TableRow,TableData,TableContainer, DatePickerContainer, IncomeHeader, TabIncAmount, TabIncTotal, TabHeader, TabInc, TabExp, TabAmount, TabAmountContainer, TableBodyContainer, TabListITem, NetIncomeDisplay, BudgetHeaderContainer, BudgetHeaderLeft, NetIncomeAmount} from "./myBudget.styles";
import { useEffect, useMemo, useState } from "react";
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
import { parents, parents_inc, subGroups, subGroups_inc } from "../../components/common/parents_subgroups";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { createBudgetExpense } from "../../api_layer/budget/createBudgetApiExpense";
import { createBudgetIncome } from "../../api_layer/budget/createBudgetApiIncome";
import { selectUserToken } from "../../store/apiData/users/users.selector";

import { selectBudgetApiIncomes, selectBudgetApiIncomeTotalByDate } from "../../store/apiData/budgetIncome/budgetAPIIncome.selector";
import { selectBudgetApiTransaction, selectBudgetApiTransactionTotalByDate } from "../../store/apiData/budgetTransaction/budgetAPITransaction.selectors";
import { deleteBudgetIncome } from "../../api_layer/budget/deleteBudgetApiIncome";
import { deleteBudgetExpense } from "../../api_layer/budget/deleteBudgetApiTransaction";

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
//const subGroups= ['long-term', 'short-term','maint.& repairs','tuition','transport','water','electricity','groceries','fuel','insurance','clothing','grooming','vacation','events','gifts','donation','internet','trash','gas','cleaning','childcare','loans','building','equipment','investment','tv','petty expense','household supplies','miscellaneous'];
// const parents =['savings','transport','child & educ.','utilities','food','personal care','recreation','parental care','housing','worship','debt repay.','project','family support','investment','household supplies','kindness']
// //const subGroups_inc= ['mthly_sal.-A','mthly_sal.-B','annual_bonus'];
// const parents_inc =['salary-A','salary-B']

// const subGroups ={
//   "savings":['long-term', 'short-term','miscellaneous'],
//   "transport": ['transportation','fuel','insurance','maint.& repairs','miscellaneous'],
//   "child & educ.":['childcare','transport','tuition','supplies','miscellaneous'],
//   "utilities":['electricity','water','gas','internet','trash','tv','miscellaneous'],
//   "food":['groceries','miscellaneous'],
//   "personal care":['grooming','clothing','supplies','miscellaneous'],
//   "recreation":['events','vacation','miscellaneous'],
//   "parental care":['gifts','insurance','miscellaneous'],
//   "housing":['maint.& repairs','supplies','cleaning','equipment','miscellaneous'],
//   "worship":['donation','miscellaneous'],
//   "debt repay.":['loan','miscellaneous'],
//   "project":['building','supplies','business','miscellaneous'],
//   "family support":['donation','supplies','miscellaneous'],
//   "investment":['business','long-term','miscellaneous'],
//   "household supplies":['gas','miscellaneous'],
//   "kindness":['donation','miscellaneous'],
//   "miscell":['petty expenses'],
//   "salary-A":['mthly_sal-A','bonuses','miscellaneous'],
//   "salary-B":['mthly_sal-B','bonuses','miscellaneous']
// }
// ;

// const subGroups_inc= {

//   "salary-A":['mthly_sal-A','bonuses','miscellaneous'],
//   "salary-B":['mthly_sal-B','bonuses','miscellaneous']
// };
// const parentSubGroupingMapping =(input)=>{
//   input.map((parent)=>(

//   ))

// } 


// const transactions=[
//   {id: 1, date: '06-10-2024', subGroup:'water', parent:'utilities', description:'water bill',amount: 70, target:100},
//   {id: 2, date: '06-10-2024', subGroup:'electricity', parent:'utilities',description:'light bill' ,amount: 700, target:100},
//   {id: 3, date: '06-10-2024', subGroup:'maintenance', parent:'housing', description:'window frame' ,amount: 200, target:100},
//   {id: 4, date: '03-10-2024', subGroup:'fees', parent:'childcare & education', description:'Afia fees' ,amount: 200, target:100},
// ]

// const incomes=[
//   {id: 1, date: '06-10-2024', subGroup:'paycheck', parent:'salary', description:'person 1',amount: 70, target:200},
//   {id: 2, date: '05-10-2024', subGroup:'paycheck', parent:'salary',description:'person 2' ,amount: 700, target:200},
//   {id: 3, date: '04-10-2024', subGroup:'paycheck', parent:'bonus', description:'person 1' ,amount: 200, target:200},
//   {id: 4, date: '03-10-2024', subGroup:'paycheck', parent:'bonus', description:'person 2' ,amount: 200, target:200},
//   {id: 5, date: '03-10-2024', subGroup:'windfall', parent:'miscellaneous', description:'windfall' ,amount: 200, target:200},
// ]

//Mini NavBar with tabs for the Right Component
//To achieve the behavior where clicking on a tab displays content below the tab within the right-hand component, you need to manage the routing within the right-hand component itself. This involves keeping the mini navbar and its tab content within the same component structure.
const MiniNavbar =({selectProp})=>{
  const [activeTab, setActiveTab]= useState('tab1');
//data from the store
//   const myBudgetIncome = useSelector(selectBudgetincomes) || [];
//   const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
//  const totalIncome = useSelector((state)=>selectIncomeTotalByDate(selectProp)(state));
//  const totalExpense = useSelector((state)=>selectExpenseTotalByDate(selectProp)(state))
const myBudgetIncome = useSelector(selectBudgetApiIncomes) || [];
const myBudgetTransaction= useSelector(selectBudgetApiTransaction) || [];
const totalIncome = useSelector((state)=>selectBudgetApiIncomeTotalByDate(selectProp)(state));
const totalExpense = useSelector((state)=>selectBudgetApiTransactionTotalByDate
(selectProp)(state));

 //From API
//  const myAPIBudgetIncome = useSelector(selectBudgetApiIncomes) || [];
//  const myAPIBudgetTransaction= useSelector(selectBudgetApiTransaction) || [];
//  const totalAPIIncome = useSelector((state)=>selectBudgetApiIncomeTotalByDate(selectProp)(state));
//  const totalAPIExpense = useSelector((state)=>selectBudgetApiTransactionTotalByDate
//  (selectProp)(state));
//  console.log('totalAPI_Income', totalAPIIncome);
//  console.log('totalAPI_Expense',totalAPIExpense);
 
 
//console.log('API budget Income', myAPIBudgetIncome);
// console.log('API budget Trxn', myAPIBudgetTransaction);
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

//Right comp
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
 //Get the token
 const token = useSelector(selectUserToken);
 const queryClient = useQueryClient();
 //const BudgIncomeTest = useSelector(selectBudgetApiIncomes)
 //console.log(BudgIncomeTest)
// const [isReady, setIsReady] = useState(false); // Local state to manage readiness
// console.log(token)
  // Watch for when the token is ready
// Memoize the token to use the existing one if no new token is available yet
// const memoizedToken = useMemo(() => {
//   return token || localStorage.getItem('existingToken'); // Optionally fallback to a cached token (if saved)
// }, [token]);

// Watch for when the token is ready
// useEffect(() => {
//   if (token && Object.keys(token).length > 0) {
 
//     setIsReady(true); // Only set isReady when token is valid
//   console.log('isReady:',isReady, token)
//   }
// }, [token]);
      //interact with the data from the reducer
      // const myBudgetTransaction = useSelector(selectBudgettransactions) || [];
      // const totalIncome = useSelector((state)=>selectIncomeTotalByDate(selectedDate)(state));
      // const totalExpense = useSelector((state)=>selectExpenseTotalByDate(selectedDate)(state))
      // const myBudgetIncome = useSelector(selectBudgetincomes) || [];
      const myBudgetIncome = useSelector(selectBudgetApiIncomes) || [];
      const myBudgetTransaction= useSelector(selectBudgetApiTransaction) || [];
      const totalIncome = useSelector((state)=>selectBudgetApiIncomeTotalByDate(selectedDate)(state));
      const totalExpense = useSelector((state)=>selectBudgetApiTransactionTotalByDate
      (selectedDate)(state));
 // const totalIncome = useSelector(selectIncomeTotal);
//console.log(myBudgetTransaction); 


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
    //dispatch(addItemToBudget({...data, id:newId}))
    //This mutation, sends the data to the database
    budgetExpenseMutation.mutate({ expenseData: data, token });
    //console.log(data)
  } else{
    let newId=incomeIdCounter;
    setIncomeIdCounter(incomeIdCounter + 1);
    //dispatch(addIncomeItemToBudget({...data, id:newId}));
    //This mutation, sends the data to the database
    budgetIncomeMutation.mutate({ incData: data, token });
    //console.log(data);
  }
   
 };
 //console.log(incomeIdCounter)
 //////////////////////SEND DATA TO REDUCER///////////////////////////////

 //////////////////////SEND DATA TO DATABASE/////////////////////////////////
 ////Create mutation for Budget Income using React Query
 const budgetIncomeMutation = useMutation(createBudgetIncome, {
  onSuccess: (data) => {
    //console.log("Budget Income data posted", data.data);
  },
  onError: (error) => {
    console.error("Error creating budget income:", error.response?.data || error.message);
  },
});

//Budget Expense
const budgetExpenseMutation = useMutation(createBudgetExpense, {
  onSuccess: (data) => {
    //console.log("Budget Expense data posted", data.data);
  },
  onError: (error) => {
    console.error("Error creating budget expense:", error.response?.data || error.message);
  },
});

// useEffect(()=>{
//   if(token){
//     handleCreateIncome();
//   }
// },[])

// const handleCreateIncome = () => {
//   if (!token) {
//     console.error("Token is not available");
//     return;
//   }

//   const incomeData = {
//     date: "2024-10-12",
//     subGroup: "monthly_salary",
//     parent: "salary",
//     description: "October salary",
//     amount: 1000,
//     target: 1200,
//   };

//   budgetIncomeMutation.mutate({ incData: incomeData, token });
// };


//Create mutation for Budget Expense using React Query
// const budgetExpenseMutation = useMutation(createBudgetExpense, {
//   onSuccess: (data) => {
//     // Handle successful mutation (e.g., updating Redux store)
//     //console.log(token)
//     console.log('Budget Expense data posted',data.data); // Assuming 'data.data' contains the new transaction
//   },
//   onError: (error) => {
//     // Handle error (optional)
//     console.error("Error creating budget expense:", error);
//   },

// });

// // //Create mutation for Budget Expene using React Query
// const budgetIncomeMutation = useMutation(createBudgetIncome, {
//   onSuccess: (data) => {
//     // Handle successful mutation (e.g., updating Redux store)
//     console.log('Budget Income data posted',data.data); // Assuming 'data.data' contains the new transaction
//   },
//   onError: (error) => {
//     // Handle error (optional)
//     console.error("Error creating budget income:", error);
//   },
 
// });

// const incomeData = {
//   date: "2024-10-12",
//   subGroup: "monthly_salary",
//   parent: "salary",
//   description: "October salary",
//   amount: 1000,
//   target: 1200,
// };

// budgetIncomeMutation.mutate({ incData: incomeData, token });

//  // Example function to trigger the mutation
//  const handleCreateExpense = () => {
//   const expData = {
//     "id": 1,
//     "date": "07-10-2024",
//     "subGroup": "water",
//     "parent": "utilitiesOS",
//     "description": "water billOS",
//     "amount": 2000,
//     "target": 3000
// }
//    // Ensure token is available before mutating
//    console.log('Creating income with token:', token); 
//    if (isReady && token) {
//     console.log('Creating inc with token:', token); 
//     budgetExpenseMutation.mutate({ expenseData: expData, token});

//   } else {
//     console.error('Token is not available');
//   }
// };

//   // mutation.mutate({ expenseData, token });  // Trigger mutation
// // };
// useEffect(()=>{
//   if(isReady){
//     handleCreateExpense()
//     console.log(token)
//   }

// },[])
//console.log(token)
// useEffect(()=>{
//   const postExpense= async()=>{
//     const expData = {
//       "id": 1,
//       "date": "07-10-2024",
//       "subGroup": "water",
//       "parent": "utilitiesOS",
//       "description": "water billOS",
//       "amount": 2000,
//       "target": 3000
//   }

// let res = await createBudgetExpense({expenseData:expData, token})
// console.log('results:',res)
//   }

//   if(isReady){
//     postExpense()
    
//   }

// },[])

//  const handleFormSubmit = (data) => {
//   //let token1='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI4NGEyM2FiN2U0N2JlNGFkMzg2NSIsImlhdCI6MTcyODU0OTAzNywiZXhwIjoxNzM2MzI1MDM3fQ.OIMO-gESMRWpxB1xoFoUjR72TaDnJk1r6NW-Wlf9bM0'
//    // Check if token is ready before submitting the form
//   //  if (!isReady || !token) {
//   //   console.error("Token is not ready, cannot submit the form.");
//   //   return;
//   // }
//   // let dataWithId = {...data, id:idCounter++};
//   //  setCollectedData(dataWithId);

  
//   if(modalHeader==='Add Expense'){
//     // budgetExpenseMutation.mutate({ data, token });
//     // console.log('data posted', data); 
//     // createFamily(data,token)
//   // let newId= expenseIdCounter;
//   // setexpenseIdCounter(expenseIdCounter + 1)
//     // dispatch(addItemToBudget({...data, id:newId}))
//   } else if (modalHeader === 'Add Income'){
//     budgetIncomeMutation.mutate({ data, token});
//     console.log(data)
//     console.log(token)
//     // let newId=incomeIdCounter;
//     // setIncomeIdCounter(incomeIdCounter + 1);
//     // dispatch(addIncomeItemToBudget({...data, id:newId}))
//   }
    
//  };
//////////////////////SEND DATA TO DATABASE/////////////////////////////////////
 //Create a mutation for deletion
 //////////////////////SEND DATA TO DATABASE/////////////////////////////////
 ////Create mutation for Budget Income using React Query
//  const { mutate: deleteBudgetIncome } = useMutation(deleteBudgetIncome, {
//   onSuccess: (data) => {
//     //console.log("Budget Income data posted", data.data);
//     console.log("Budget Income deleted successfully:", data);
//     QueryClient.invalidateQueries('budget_incomes'); // Refetch updated data
//   },
//   onError: (error) => {
//     console.error("Error creating budget income:", error.response?.data || error.message);
//   },
// });

//  ////Create mutation for Budget Expense using React Query
//  const { mutate: deleteBudgetExpense } = useMutation(deleteBudgetExpense, {
//   onSuccess: (data) => {
//     //console.log("Budget Income data posted", data.data);
//     console.log("Budget Income deleted successfully:", data);
//     QueryClient.invalidateQueries('budget_transactions'); // Refetch updated data
//   },
//   onError: (error) => {
//     console.error("Error creating budget income:", error.response?.data || error.message);
//   },
// });



// //remove item from budget upon click of the red circle.
// const removeFromBudget =(id)=>{
// if(modalHeader==='Add Expense'){
//   dispatch(removeItemFromBudget(id))
//   deleteBudgetExpense({expId:id, token})
// }else{
//   dispatch(removeIncomeItemFromBudget(id))
//   deleteBudgetIncome({incId:id,token})
// }
//  }
// Create mutation for Budget Income using React Query
// Import your actual mutation functions
// import { deleteBudgetIncome, deleteBudgetExpense } from './apiFunctions'; (Example)

const { mutate: deleteBudgetIncomeMutation } = useMutation(deleteBudgetIncome, {
  onSuccess: (data) => {
    console.log("Budget Income deleted successfully:", data);
    //queryClient.invalidateQueries("budget_incomes"); // Refetch updated data
  },
  onError: (error) => {
    console.error(
      "Error deleting budget income:",
      error.response?.data || error.message
    );
  },
});

const { mutate: deleteBudgetExpenseMutation } = useMutation(deleteBudgetExpense, {
  onSuccess: (data) => {
    console.log("Budget Expense deleted successfully:", data);
    //queryClient.invalidateQueries("budget_transactions"); // Refetch updated data
  },
  onError: (error) => {
    console.error(
      "Error deleting budget expense:",
      error.response?.data || error.message
    );
  },
});

// Function to handle item removal
const removeFromBudget = (id, type) => {
  if (type === "expense") {
    dispatch(removeItemFromBudget(id));
    deleteBudgetExpenseMutation({ expId: id, token }); // Use correct mutation hook
  } else if(type==='income') {
    dispatch(removeIncomeItemFromBudget(id));
    console.log(id);
    deleteBudgetIncomeMutation({ incId: id, token }); // Use correct mutation hook
  }
};



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
        
       <TableData><RemoveSymbol onClick={()=>removeFromBudget(income.id,"income")}/>{income.parent.charAt(0).toUpperCase()+income.parent.substring(1)}</TableData>
      
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
          
       <TableData><RemoveSymbol onClick={()=>removeFromBudget(transaction.id,"expense")}/>{transaction.parent.slice(0,1).toUpperCase()+transaction.parent.slice(1).toLowerCase()}</TableData>
      
       
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