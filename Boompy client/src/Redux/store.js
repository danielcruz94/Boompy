import { configureStore } from '@reduxjs/toolkit';
import serverURLReducer from "./serverURLSlice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        serverURL: serverURLReducer,
        users: usersReducer,
        auth: authReducer,
        
    },
});

export default store;
