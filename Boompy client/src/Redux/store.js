import { configureStore } from '@reduxjs/toolkit';
import serverURLReducer from "./serverURLSlice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";
import Calls from "./Calls";

const store = configureStore({
    reducer: {
        serverURL: serverURLReducer,
        users: usersReducer,
        auth: authReducer,
        callsActive: Calls,
    },
});

export default store;
