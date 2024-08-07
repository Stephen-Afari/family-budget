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
export const selectActualtransactionByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualtransactions],
    (actualtransactions) =>
      actualtransactions.filter(
        
        (exp) => {

          const {month, year}= parseDate(exp.date);
        
          if(year !== selectedYear) return false;
          if(selectedMonth ==='All') return true;

          return month ===  months.indexOf(selectedMonth) - 1;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectActualExpenseTotalByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualtransactionByYearAndMonth(selectedYear,selectedMonth, months)],
    (filteredExpenseByYearAndMonth) => filteredExpenseByYearAndMonth.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

  ////////

      // Selector to filter budgetincomes by selected year and month
export const selectActualtransactionByYear = (selectedYear) =>
  createSelector(
    [selectActualtransactions],
    (actualtransactions) =>
      actualtransactions.filter(
        
        (exp) => {

          //const {month, year}= parseDate(exp.date);
        
         
          const {month, year}= parseDate(exp.date);
        
          //if(year !== selectedYear) return false;
          //if(selectedMonth ==='All') return true;

          return year ===  selectedYear;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectActualExpenseTotalByYear = (selectedYear) =>
  createSelector(
    [selectActualtransactionByYear(selectedYear)],
    (filteredExpenseByYear) => filteredExpenseByYear.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );




