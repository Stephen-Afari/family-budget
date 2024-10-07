import { combineReducers } from "@reduxjs/toolkit";
import { budgettransactionsReducer } from "./budgetTransactions/budgetTransactions.reducer";
import { budgetincomesReducer } from "./budgetIncome/budgetIncome.reducer";
import { actualincomesReducer } from "./actualIncome/actualIncome.reducer";
import { actualtransactionsReducer} from "./actualTransactions/actualTransactions.reducer";
import { actualApiincomesReducer } from "./apiData/actualIncome/actualAPIIncome.reducer";
import { usersReducer } from "./apiData/users/users.reducer";
import { actualApitransactionReducer } from "./apiData/actualTransaction/actualAPITransaction.reducer";
import { budgetApiincomesReducer } from "./apiData/budgetIncome/budgetAPIIncome.reducer";
import { budgetApitransactionReducer } from "./apiData/budgetTransaction/budgetAPITransaction.reducers";

export const rootReducer = combineReducers({
   
    budgettransactions:budgettransactionsReducer,
    budgetincomes: budgetincomesReducer,
    actualincomes: actualincomesReducer,
    actualtransactions:actualtransactionsReducer,
    actualapiincomes: actualApiincomesReducer,
    users:usersReducer,
    actualapitransaction:actualApitransactionReducer,
    budgetapiincomes:budgetApiincomesReducer,
    budgetapitransaction:budgetApitransactionReducer
    

  });