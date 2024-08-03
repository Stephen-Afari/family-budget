import { createSelector } from "reselect";

//This is the budgetincomes reducer...Base selector to get the budgettransactions slice from the state
const selectActualincomesReducer = (state) => state.actualincomes;

export const selectActualincomes = createSelector(
    //selectBudgetincomesReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgetincomes: A memoized selector that returns the budgetincomes array from the slice.
    [selectActualincomesReducer],
    (actualIncomesSlice) => actualIncomesSlice.actualincomes
  );
//To be removed.
  //export const selectIncomeTotal = createSelector(
   //You should use selectBudgetincomes within selectIncomeTotal to first get the budgettransactions array.
   //selectIncomeTotal: A memoized selector that uses selectBudgettransactions to get the budgettransactions array and then calculates the total income using the reduce method with an initial accumulator value of 0.l
   // [selectBudgetincomes],
  //  (budgetincomes) => budgetincomes.reduce((acc,cur)=> acc + parseInt(cur.amount),0)
  //);

  // Selector to filter budgetincomes by selected date
export const selectActualincomesByDate = (selectedDate) =>
  createSelector(
    [selectActualincomes],
    (actualincomes) =>
      actualincomes.filter(
        (income) => new Date(income.date).toDateString() === new Date(selectedDate).toDateString()
      )
  );

// Selector to calculate total income for a selected date
export const selectActualIncomeTotalByDate = (selectedDate) =>
  createSelector(
    [selectActualincomesByDate(selectedDate)],
    (filteredIncomes) => filteredIncomes.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
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
export const selectActualincomesByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualincomes],
    (actualincomes) =>
      actualincomes.filter(
        
        (income) => {

          const {month, year}= parseDate(income.date);
        
          if(year !== selectedYear) return false;
          if(selectedMonth ==='All') return true;

          return month ===  months.indexOf(selectedMonth) - 1;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectActualIncomeTotalByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualincomesByYearAndMonth(selectedYear,selectedMonth, months)],
    (filteredIncomesByYearAndMonth) => filteredIncomesByYearAndMonth.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

