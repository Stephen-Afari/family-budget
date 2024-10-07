import { createSlice } from "@reduxjs/toolkit";

export const ACTUALAPITRANSACTION_INITIAL_STATE = {
    actualapitransaction: [],
  };

export const actualApiTransactionSlice = createSlice({
    name: "actualapitransaction",
    initialState: ACTUALAPITRANSACTION_INITIAL_STATE,
    reducers: {
        setActualApiTransaction: (state, action) => {
            state.actualapitransaction = action.payload; // Ensure it updates the correct state
          },
      },

  });

export const {setActualApiTransaction} = actualApiTransactionSlice.actions;
export const actualApitransactionReducer = actualApiTransactionSlice.reducer;