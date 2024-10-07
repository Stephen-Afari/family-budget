import { createSelector } from "reselect";

//This is the Base selector to get the actualapiincomes slice from the state
const selectBudgetApiTransactionReducer = (state) => state.budgetapitransaction;

export const selectActualApiTransaction = createSelector(
    //selectActualApiincomesReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgetincomes: A memoized selector that returns the budgetincomes array from the slice.
    [selectBudgetApiTransactionReducer],
    (budgetApiTransactionSlice) => budgetApiTransactionSlice.budgetapitransaction
  );


  // Selector to filter incomes by selected date
export const selectActualApiTransactionByDate = (selectedDate) =>
  createSelector(
    [selectActualApiTransaction],
    (actualapitransaction) =>
      actualapitransaction.filter(
        (transaction) => new Date(transaction.date).toDateString() === new Date(selectedDate).toDateString()
      )
  );

// Selector to calculate total income for a selected date
export const selectActualApiTransactionTotalByDate = (selectedDate) =>
  createSelector(
    [selectActualApiTransactionByDate(selectedDate)],
    (filteredTransaction) => filteredTransaction.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

  /////////////////////

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
export const selectActualApiTransactionByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualApiTransaction],
    (actualapitransaction) =>
      actualapitransaction.filter(
        
        (transaction) => {

          const {month, year}= parseDate(transaction.date);
        
          if(year !== selectedYear) return false;
          if(selectedMonth ==='All') return true;

          return month ===  months.indexOf(selectedMonth) - 1;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectActualApiTransactionTotalByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualApiTransactionByYearAndMonth(selectedYear,selectedMonth, months)],
    (filteredApiTransactionByYearAndMonth) => filteredApiTransactionByYearAndMonth.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

  ////////////////
     // Selector to filter budgetincomes by selected year and month
export const selectActualApiTransactionByYear = (selectedYear) =>
  createSelector(
    [selectActualApiTransaction],
    (actualapitransaction) =>
      actualapitransaction.filter(
        
        (transaction) => {

          const {month, year}= parseDate(transaction.date);
        
          //if(year !== selectedYear) return false;
          //if(selectedMonth ==='All') return true;

          return year ===  selectedYear;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectActualApiTransactionTotalByYear = (selectedYear) =>
  createSelector(
    [selectActualApiTransactionByYear(selectedYear)],
    (filteredTransactionByYear) => filteredTransactionByYear.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

