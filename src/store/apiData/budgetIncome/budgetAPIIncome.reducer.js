import { createSlice } from "@reduxjs/toolkit";


export const BUDGETAPIINCOMES_INITIAL_STATE = {
    budgetapiincomes: [],
  };

export const budgetApiIncomesSlice = createSlice({
    name: "budgetapiincomes",
    initialState: BUDGETAPIINCOMES_INITIAL_STATE,
    reducers: {
        setBudgetApiIncomes: (state, action) => {
            state.budgetapiincomes = action.payload; // Ensure it updates the correct state
          },
      },

  });

export const {setBudgetApiIncomes} = budgetApiIncomesSlice.actions;
export const budgetApiincomesReducer = budgetApiIncomesSlice.reducer;