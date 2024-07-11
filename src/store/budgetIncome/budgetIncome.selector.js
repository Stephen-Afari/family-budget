import { createSelector } from "reselect";

//This is the budgetincomes reducer...Base selector to get the budgettransactions slice from the state
const selectBudgetincomesReducer = (state) => state.budgetincomes;

export const selectBudgetincomes = createSelector(
    //selectBudgetincomesReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgetincomes: A memoized selector that returns the budgetincomes array from the slice.
    [selectBudgetincomesReducer],
    (budgetIncomesSlice) => budgetIncomesSlice.budgetincomes
  );

  export const selectIncomeTotal = createSelector(
   //You should use selectBudgetincomes within selectIncomeTotal to first get the budgettransactions array.
   //selectIncomeTotal: A memoized selector that uses selectBudgettransactions to get the budgettransactions array and then calculates the total income using the reduce method with an initial accumulator value of 0.l
    [selectBudgetincomes],
    (budgetincomes) => budgetincomes.reduce((acc,cur)=> acc + parseInt(cur.amount),0)
  );

