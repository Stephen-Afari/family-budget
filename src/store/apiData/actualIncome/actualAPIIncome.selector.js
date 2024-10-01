import { createSelector } from "reselect";

//This is the budgetincomes reducer...Base selector to get the actualapiincomes slice from the state
const selectActualApiIncomesReducer = (state) => state.actualapiincomes;

export const selectActualApiIncomes = createSelector(
    //selectActualApiincomesReducer: A base selector that returns the budgettransactions slice from the state.
    //selectBudgetincomes: A memoized selector that returns the budgetincomes array from the slice.
    [selectActualApiIncomesReducer],
    (actualApiIncomesSlice) => actualApiIncomesSlice.actualapiincomes
  );


  // Selector to filter incomes by selected date
export const selectActualApiIncomesByDate = (selectedDate) =>
  createSelector(
    [selectActualApiIncomes],
    (actualapiincomes) =>
      actualapiincomes.filter(
        (income) => new Date(income.date).toDateString() === new Date(selectedDate).toDateString()
      )
  );

// Selector to calculate total income for a selected date
export const selectActualApiIncomeTotalByDate = (selectedDate) =>
  createSelector(
    [selectActualApiIncomesByDate(selectedDate)],
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
export const selectActualApiIncomesByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualApiIncomes],
    (actualapiincomes) =>
      actualapiincomes.filter(
        
        (income) => {

          const {month, year}= parseDate(income.date);
        
          if(year !== selectedYear) return false;
          if(selectedMonth ==='All') return true;

          return month ===  months.indexOf(selectedMonth) - 1;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectActualApiIncomeTotalByYearAndMonth = (selectedYear,selectedMonth, months) =>
  createSelector(
    [selectActualApiIncomesByYearAndMonth(selectedYear,selectedMonth, months)],
    (filteredApiIncomesByYearAndMonth) => filteredApiIncomesByYearAndMonth.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

  ////////////////
     // Selector to filter budgetincomes by selected year and month
export const selectActualApiIncomesByYear = (selectedYear) =>
  createSelector(
    [selectActualApiIncomes],
    (actualapiincomes) =>
      actualapiincomes.filter(
        
        (income) => {

          const {month, year}= parseDate(income.date);
        
          //if(year !== selectedYear) return false;
          //if(selectedMonth ==='All') return true;

          return year ===  selectedYear;
        }
      )
  );

  // Selector to calculate total income for a selected date
export const selectActualApiIncomeTotalByYear = (selectedYear) =>
  createSelector(
    [selectActualApiIncomesByYear(selectedYear)],
    (filteredIncomesByYear) => filteredIncomesByYear.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
  );

