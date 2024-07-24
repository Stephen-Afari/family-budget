import { createSlice } from "@reduxjs/toolkit";
//Method to add new objects to an array
const addIncObjectToActualArray = (myArr, objToAdd) => {
    return [ ...myArr , { ...objToAdd }];
  };

const removeIncActualItem = (actualincomes,idToRemove)=>{
return actualincomes.filter((actualItem)=> actualItem.id !== idToRemove)
}

export const ACTUALINCOMES_INITIAL_STATE = {
    actualincomes: [],
  };

export const actualIncomesSlice = createSlice({
    name: "actualincomes",
    initialState: ACTUALINCOMES_INITIAL_STATE,
    reducers: {
      addIncomeItemToActual(state, action) {
        //once you setCategories anywhere in the code, it updates the initial state to include  what has been set into the array
        state.actualincomes = addIncObjectToActualArray(state.actualincomes, action.payload);
      },
      removeIncomeItemFromActual(state, action){
        state.actualincomes= removeIncActualItem(state.actualincomes, action.payload)
      }
   
    },
  });

export const { addIncomeItemToActual,removeIncomeItemFromActual} = actualIncomesSlice.actions;
export const actualincomesReducer = actualIncomesSlice.reducer;