import { createSlice } from "@reduxjs/toolkit";
//Method to add new objects to an array
const addObjectToActualArray = (myArr, objToAdd) => {
    return [ ...myArr , { ...objToAdd }];
  };

const removeActualItem = (actualTransactions,idToRemove)=>{
return actualTransactions.filter((actualItem)=> actualItem.id !== idToRemove)
}

export const ACTUALTRANSACTIONS_INITIAL_STATE = {
    actualtransactions: [],
  };

export const actualTransactionsSlice = createSlice({
    name: "actualtransactions",
    initialState: ACTUALTRANSACTIONS_INITIAL_STATE,
    reducers: {
      addItemToActual(state, action) {
        //once you setCategories anywhere in the code, it updates the initial state to include  what has been set into the array
        state.actualtransactions = addObjectToActualArray(state.actualtransactions, action.payload);
      },
      removeItemFromActual(state, action){
        state.actualtransactions= removeActualItem(state.actualtransactions, action.payload)
      }
    //   totalIncomes (state, action) {
    //     //once you setCategories anywhere in the code, it updates the initial state to include  what has been set into the array
    //     state.budgettransactions = sumAllIncomes(state.budgettransactions);
    //   },
    },
  });

export const { addItemToActual,removeItemFromActual} = actualTransactionsSlice.actions;
export const actualtransactionsReducer = actualTransactionsSlice.reducer;