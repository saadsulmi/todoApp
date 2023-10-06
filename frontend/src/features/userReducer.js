import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        create_user :(state,action)=>{
            state.user = action.payload;
        },
        reset_user:(state)=>{
            state.user = null;
        }
    }
})

export const { create_user,reset_user} = userSlice.actions;

const UserReducer = userSlice.reducer

export default UserReducer