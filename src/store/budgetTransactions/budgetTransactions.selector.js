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



//////////////////////////
//This function parses a date string and returns an object with the year and month extracted. This helps avoid repeated date parsing logic in selectors.
const parseDate =(passedDate)=>{
  let incDate = new Date(passedDate),
       incMonth = incDate.getMonth(),
      incYear = incDate.getFullYear();
  return{
    month: incMonth,
    year: incYear
  }
}
    // Selector to filter budgetincomes by selected year and month
export const selectExpenseByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectBudgettransactions],
    (budgettransactions) =>
      budgettransactions.filter(
        
        (exp) => {

          const {month, year}= parseDate(exp.date);
        
          if(year !== selectedYear) return false;
          if(selectedMonth ==='All') return true;

          return month ===  months.indexOf(selectedMonth) - 1;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectExpenseTotalByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectExpenseByYearAndMonth(selectedYear,selectedMonth, months)],
    (filteredExpenseByYearAndMonth) => filteredExpenseByYearAndMonth.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

  /////////////////////
      // Selector to filter budgetincomes by selected year and month
export const selectExpenseByYear = (selectedYear) =>
  createSelector(
    [selectBudgettransactions],
    (budgettransactions) =>
      budgettransactions.filter(
        
        (exp) => {

          const {month, year}= parseDate(exp.date);
        
          //if(year !== selectedYear) return false;
          //if(selectedMonth ==='All') return true;

          return year ===  selectedYear;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectExpenseTotalByYear = (selectedYear) =>
  createSelector(
    [selectExpenseByYear(selectedYear)],
    (filteredExpenseByYear) => filteredExpenseByYear.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );


