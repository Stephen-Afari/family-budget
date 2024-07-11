import { createSlice } from "@reduxjs/toolkit";
//Method to add new objects to an array
const addIncObjectToBudgetArray = (myArr, objToAdd) => {
    return [ ...myArr , { ...objToAdd }];
  };

const removeIncBudgetItem = (budgetincomes,idToRemove)=>{
return budgetincomes.filter((budgetItem)=> budgetItem.id !== idToRemove)
}

export const BUDGETINCOMES_INITIAL_STATE = {
    budgetincomes: [],
  };

export const budgetIncomesSlice = createSlice({
    name: "budgetincomes",
    initialState: BUDGETINCOMES_INITIAL_STATE,
    reducers: {
      addIncomeItemToBudget(state, action) {
        //once you setCategories anywhere in the code, it updates the initial state to include  what has been set into the array
        state.budgetincomes = addIncObjectToBudgetArray(state.budgetincomes, action.payload);
      },
      removeIncomeItemFromBudget(state, action){
        state.budgetincomes= removeIncBudgetItem(state.budgetincomes, action.payload)
      }
   
    },
  });

export const { addIncomeItemToBudget,removeIncomeItemFromBudget} = budgetIncomesSlice.actions;
export const budgetincomesReducer = budgetIncomesSlice.reducer;