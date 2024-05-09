import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: false,
        user: null,
        error: null,
        loading: false, 
        infoComplete:false// Add a loading state to indicate ongoing login process
      },
    reducers:{
        login:(state,action)=>{
            return {
                ...state,
                loading:true,
                isLoggedIn:true,
                user:action.payload
                

            };
        },
        completeInfo:(state,action) =>{
            return{
                ...state,
                infoComplete:true
            }
        }
       
    },
});

export const {login,completeInfo}=authSlice.actions;
export default authSlice.reducer;