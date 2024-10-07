import { createSlice } from "@reduxjs/toolkit";

export const BUDGETAPITRANSACTION_INITIAL_STATE = {
    budgetapitransaction: [],
  };

export const budgetApiTransactionSlice = createSlice({
    name: "budgetapitransaction",
    initialState: BUDGETAPITRANSACTION_INITIAL_STATE,
    reducers: {
        setBudgetApiTransaction: (state, action) => {
            state.budgetapitransaction = action.payload; // Ensure it updates the correct state
          },
      },

  });

export const {setBudgetApiTransaction} = budgetApiTransactionSlice.actions;
export const budgetApitransactionReducer = budgetApiTransactionSlice.reducer;