import { createSlice } from "@reduxjs/toolkit";
//Method to add new objects to an array
const addObjectToBudgetArray = (myArr, objToAdd) => {
    return [ ...myArr , { ...objToAdd }];
  };

// const sumAllIncomes =(myArr)=>{
// //This will return a single value as the sum of all icomes in the array.
// return myArr.reduce((acc,cur)=> acc + cur.amount,0);

// }

export const BUDGETTRANSACTIONS_INITIAL_STATE = {
    budgettransactions: [],
  };

export const budgetTransactionsSlice = createSlice({
    name: "budgettransactions",
    initialState: BUDGETTRANSACTIONS_INITIAL_STATE,
    reducers: {
      addItemToBudget(state, action) {
        //once you setCategories anywhere in the code, it updates the initial state to include  what has been set into the array
        state.budgettransactions = addObjectToBudgetArray(state.budgettransactions, action.payload);
      },
    //   totalIncomes (state, action) {
    //     //once you setCategories anywhere in the code, it updates the initial state to include  what has been set into the array
    //     state.budgettransactions = sumAllIncomes(state.budgettransactions);
    //   },
    },
  });

export const { addItemToBudget} = budgetTransactionsSlice.actions;
export const budgettransactionsReducer = budgetTransactionsSlice.reducer;