import { combineReducers } from "@reduxjs/toolkit";
import { budgettransactionsReducer } from "./budgetTransactions/budgetTransactions.reducer";
import { budgetincomesReducer } from "./budgetIncome/budgetIncome.reducer";

export const rootReducer = combineReducers({
   
    budgettransactions:budgettransactionsReducer,
    budgetincomes: budgetincomesReducer
    
  });