import {configureStore} from '@reduxjs/toolkit';


const store=configureStore({
    reducer:{
        data:{
            users:usersReducer,

        }
    },


})

export default store;