import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../features/authReducer'
import UserReducer from '../features/userReducer'

export const store = configureStore({
    reducer:{
        auth : AuthReducer,
        user : UserReducer
    }
})

export default store
