import { createSelector } from "reselect";
//This is the users reducer...Base selector to get the users slice from the state
const selectUsersReducer = (state) => state.users;

export const selectUser = createSelector(
    //selectUsersReducer: A base selector that returns the users slice from the state.
    //usersSlice: A memoized selector that returns the users array from the slice.
    [selectUsersReducer],
    (usersSlice) => usersSlice.users
  );
// Selector to get the token from the user object
export const selectUserToken = createSelector(
  [selectUsersReducer],
  (user) => user.token
);