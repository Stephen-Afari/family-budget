
//If you're fetching the user token asynchronously, you might want to handle the async logic either inside a thunk or use Redux Toolkit's createAsyncThunk. This will allow you to handle the async logic of getting the token, updating the state based on whether the request succeeds or fails, and handling loading states properly.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserToken, signUpUserToken } from "../../../api_layer/users/usersApi";

// Initial state with loading and error states
export const USERS_INITIAL_STATE = {
  users: {},
  token: localStorage.getItem("token") || null, // Initialize token from localStorage
  loading: false,
  error: null,
};

// Async action to fetch user token
export const fetchUserToken = createAsyncThunk(
  "users/fetchUserToken",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getUserToken(credentials);
      return response.token; // Assuming the API response contains a `token` field
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unable to login.");
    }
  }
);

// Async action to sign up Users
export const signUpToken = createAsyncThunk(
  "users/signUpUserToken",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signUpUserToken(credentials);
      return response.token; // Assuming the API response contains a `token` field
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unable to sign up.");
    }
  }
);

// Slice with extra reducers to handle async actions
export const usersSlice = createSlice({
  name: "users",
  initialState: USERS_INITIAL_STATE,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    logoutUser: (state) => {
      state.users = {};
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        localStorage.setItem("token", action.payload); // Save token to localStorage
      })
      .addCase(fetchUserToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signUpToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        localStorage.setItem("token", action.payload); // Save token to localStorage
      })
      .addCase(signUpToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Exporting actions
export const { setUsers, logoutUser } = usersSlice.actions;

// Exporting the reducer to be used in the store
export const usersReducer = usersSlice.reducer;


