import { createSlice } from "@reduxjs/toolkit";
import { getUserToken } from "../../../api_layer/users/usersApi";

export const USERS_INITIAL_STATE = {
    users: {},
  };

export const usersSlice = createSlice({
    name: "users",
    initialState: USERS_INITIAL_STATE,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload; // Ensure it updates the correct state
          },
      },

  });

export const {setUsers} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;