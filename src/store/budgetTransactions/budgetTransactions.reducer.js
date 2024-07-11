import { createSlice } from "@reduxjs/toolkit";
//Method to add new objects to an array
const addObjectToBudgetArray = (myArr, objToAdd) => {
    return [ ...myArr , { ...objToAdd }];
  };

const removeBudgetItem = (budgetTransactions,idToRemove)=>{
return budgetTransactions.filter((budgetItem)=> budgetItem.id !== idToRemove)
}

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
      removeItemFromBudget(state, action){
        state.budgettransactions= removeBudgetItem(state.budgettransactions, action.payload)
      }
    //   totalIncomes (state, action) {
    //     //once you setCategories anywhere in the code, it updates the initial state to include  what has been set into the array
    //     state.budgettransactions = sumAllIncomes(state.budgettransactions);
    //   },
    },
  });

export const { addItemToBudget,removeItemFromBudget} = budgetTransactionsSlice.actions;
export const budgettransactionsReducer = budgetTransactionsSlice.reducer;