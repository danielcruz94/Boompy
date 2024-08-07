import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    error: null,
    loading: false,
    infoComplete: false, // Add a loading state to indicate ongoing login process
  },
  reducers: {
    loadUser: (state, action) => {
      return {
        ...state,
        loading: true,
        isLoggedIn: true,
        user: action.payload,
      };
    },
    login: (state, action) => {
      return {
        ...state,
        loading: true,
        isLoggedIn: true,
        user: action.payload,
      };
    },
    completeInfo: (state, action) => {
        if (action.payload === "Tutor") {
          return {
            ...state,
            infoComplete: true,
            user: {
                ...state.user,
              role: action.payload
            }
          };
        }
        return {
            ...state,
            infoComplete: true

        }
         // Return unchanged state if not 'Tutor' action
      },
    logout: (state, action) => {
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
        user: null,
      };
    },
  },
});

export const {login,completeInfo,logout,loadUser}=authSlice.actions;
export default authSlice.reducer;