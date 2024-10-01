import { combineReducers } from "@reduxjs/toolkit";
import { budgettransactionsReducer } from "./budgetTransactions/budgetTransactions.reducer";
import { budgetincomesReducer } from "./budgetIncome/budgetIncome.reducer";
import { actualincomesReducer } from "./actualIncome/actualIncome.reducer";
import { actualtransactionsReducer} from "./actualTransactions/actualTransactions.reducer";
import { actualApiincomesReducer } from "./apiData/actualIncome/actualAPIIncome.reducer";

export const rootReducer = combineReducers({
   
    budgettransactions:budgettransactionsReducer,
    budgetincomes: budgetincomesReducer,
    actualincomes: actualincomesReducer,
    actualtransactions:actualtransactionsReducer,
    actualapiincomes: actualApiincomesReducer,

  });