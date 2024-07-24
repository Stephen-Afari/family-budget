import { createSelector } from "reselect";

//This is the budgettransaction reducer...Base selector to get the budgettransactions slice from the state
const selectActualtransactionsReducer = (state) => state.actualtransactions;

export const selectActualtransactions = createSelector(
    //selectBudgettransactionsReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgettransactions: A memoized selector that returns the budgettransactions array from the slice.
    [selectActualtransactionsReducer],
    (actualTransactionsSlice) => actualTransactionsSlice.actualtransactions
  );

  // Selector to filter budgetexpenses by selected date
export const selectActualtransactionByDate = (selectedDate)=>
   createSelector(
  [selectActualtransactions],
  (actualtransactions)=> actualtransactions.filter(
    (exp)=>(
    new Date(exp.date).toString() === new Date(selectedDate).toString())
 )
)

// Selector to calculate total exp for a selected date

export const selectActualExpenseTotalByDate = (selectedDate)=>
  createSelector(
  [selectActualtransactionByDate(selectedDate)],
  (filteredExp)=>(
filteredExp.reduce((acc,cur)=>acc + parseInt(cur.amount),0)
  )
)
