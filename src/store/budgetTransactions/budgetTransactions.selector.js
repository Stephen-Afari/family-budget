import { createSelector } from "reselect";

//This is the budgettransaction reducer...Base selector to get the budgettransactions slice from the state
const selectBudgettransactionsReducer = (state) => state.budgettransactions;

export const selectBudgettransactions = createSelector(
    //selectBudgettransactionsReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgettransactions: A memoized selector that returns the budgettransactions array from the slice.
    [selectBudgettransactionsReducer],
    (budgetTransactionsSlice) => budgetTransactionsSlice.budgettransactions
  );

  // Selector to filter budgetexpenses by selected date
export const selectBudgettransactionByDate = (selectedDate)=>
   createSelector(
  [selectBudgettransactions],
  (budgettransactions)=> budgettransactions.filter(
    (exp)=>(
    new Date(exp.date).toString() === new Date(selectedDate).toString())
 )
)

// Selector to calculate total exp for a selected date

export const selectExpenseTotalByDate = (selectedDate)=>
  createSelector(
  [selectBudgettransactionByDate(selectedDate)],
  (filteredExp)=>(
filteredExp.reduce((acc,cur)=>acc + parseInt(cur.amount),0)
  )
)
