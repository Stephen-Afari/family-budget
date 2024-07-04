import { combineReducers } from "@reduxjs/toolkit";
import { budgettransactionsReducer } from "./budgetTransactions/budgetTransactions.reducer";

export const rootReducer = combineReducers({
   
    budgettransactions:budgettransactionsReducer
    
  });