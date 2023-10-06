import {createSlice} from '@reduxjs/toolkit'

const initialState={
    auth : localStorage.getItem('auth-token') ? localStorage.getItem('auth-token'):null,
}

const AuthSlice= createSlice({
    name:'auth',
    initialState,
    reducers : {
        Auth_state: state =>{
            state.auth = localStorage.getItem('auth-token')
        },
        Reset_auth : state => {
            state.auth = null;
        }
    }
})

export const {Auth_state,Reset_auth} = AuthSlice.actions

const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
