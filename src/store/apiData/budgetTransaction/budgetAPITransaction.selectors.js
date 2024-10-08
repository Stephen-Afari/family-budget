import { createSelector } from "reselect";

//This is the Base selector to get the actualapiincomes slice from the state
const selectBudgetApiTransactionReducer = (state) => state.budgetapitransaction;

export const selectBudgetApiTransaction = createSelector(
    //selectActualApiincomesReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgetincomes: A memoized selector that returns the budgetincomes array from the slice.
    [selectBudgetApiTransactionReducer],
    (budgetApiTransactionSlice) => budgetApiTransactionSlice.budgetapitransaction
  );


  // Selector to filter incomes by selected date
export const selectBudgetApiTransactionByDate = (selectedDate) =>
  createSelector(
    [selectBudgetApiTransaction],
    (budgetapitransaction) =>
      budgetapitransaction.filter(
        (transaction) => new Date(transaction.date).toDateString() === new Date(selectedDate).toDateString()
      )
  );

// Selector to calculate total income for a selected date
export const selectBudgetApiTransactionTotalByDate = (selectedDate) =>
  createSelector(
    [selectBudgetApiTransactionByDate(selectedDate)],
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
export const selectBudgetApiTransactionByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectBudgetApiTransaction],
    (budgetapitransaction) =>
      budgetapitransaction.filter(
        
        (transaction) => {

          const {month, year}= parseDate(transaction.date);
        
          if(year !== selectedYear) return false;
          if(selectedMonth ==='All') return true;

          return month ===  months.indexOf(selectedMonth) - 1;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectBudgetApiTransactionTotalByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectBudgetApiTransactionByYearAndMonth(selectedYear,selectedMonth, months)],
    (filteredApiTransactionByYearAndMonth) => filteredApiTransactionByYearAndMonth.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

  ////////////////
     // Selector to filter budgetincomes by selected year and month
export const selectBudgetApiTransactionByYear = (selectedYear) =>
  createSelector(
    [selectBudgetApiTransaction],
    (budgetapitransaction) =>
      budgetapitransaction.filter(
        
        (transaction) => {

          const {month, year}= parseDate(transaction.date);
        
          //if(year !== selectedYear) return false;
          //if(selectedMonth ==='All') return true;

          return year ===  selectedYear;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectBudgetApiTransactionTotalByYear = (selectedYear) =>
  createSelector(
    [selectBudgetApiTransactionByYear(selectedYear)],
    (filteredTransactionByYear) => filteredTransactionByYear.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

