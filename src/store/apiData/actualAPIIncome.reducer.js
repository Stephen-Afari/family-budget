import { createSlice } from "@reduxjs/toolkit";
import { fetchAllActualIncomes } from "../../api_layer/actuals/actualIncomeApi";

export const ACTUALAPIINCOMES_INITIAL_STATE = {
    actualapiincomes: [],
  };

export const actualApiIncomesSlice = createSlice({
    name: "actualapiincomes",
    initialState: ACTUALAPIINCOMES_INITIAL_STATE,
    reducers: {
        setActualApiIncomes: (state, action) => action.payload,
      },

  });

export const {setActualApiIncomes} = actualApiIncomesSlice.actions;
export const actualApiincomesReducer = actualApiIncomesSlice.reducer;