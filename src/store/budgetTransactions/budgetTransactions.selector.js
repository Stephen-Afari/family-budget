import { createSelector } from "reselect";

//This is the budgettransaction reducer...Base selector to get the budgettransactions slice from the state
const selectBudgettransactionsReducer = (state) => state.budgettransactions;

export const selectBudgettransactions = createSelector(
    //selectBudgettransactionsReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgettransactions: A memoized selector that returns the budgettransactions array from the slice.
    [selectBudgettransactionsReducer],
    (budgetTransactionsSlice) => budgetTransactionsSlice.budgettransactions
  );

  // export const selectIncomeTotal = createSelector(
  //  //You should use selectBudgettransactions within selectIncomeTotal to first get the budgettransactions array.
  //  //selectIncomeTotal: A memoized selector that uses selectBudgettransactions to get the budgettransactions array and then calculates the total income using the reduce method with an initial accumulator value of 0.l
  //   [selectBudgettransactions],
  //   (budgettransactions) => budgettransactions.reduce((acc,cur)=> acc + parseInt(cur.amount),0)
  // );

