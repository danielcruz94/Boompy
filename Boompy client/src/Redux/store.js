import {configureStore} from '@reduxjs/toolkit';
import usersReducer from "./usersSlice"
import authReducer from "./authSlice"

const store=configureStore({
    reducer:{
        users:usersReducer,
        auth:authReducer,

        
    },


})

export default store;