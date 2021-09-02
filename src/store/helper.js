import {createSlice} from "@reduxjs/toolkit";

const initialHelperState = {
    showShare: false,
    shareLink: '',
};

const helperSlice = createSlice({
    name:'helper',
    initialState:initialHelperState,
    reducers:{
        showShareHandler(state){
            state.showShare = !state.showShare
        },
        shareLinkHandler(state,action){
            state.shareLink = action.payload
        }
    }
})

export const helperActions = helperSlice.actions;
export default helperSlice.reducer;
