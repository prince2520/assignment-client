import {createSlice} from "@reduxjs/toolkit";

const initialDriveState = {
    uploadTabSelected: true,
    driveTabSelected: false,
    editTabSelected: false
};

const tabSlice = createSlice({
    name:'tab',
    initialState:initialDriveState,
    reducers:{
        uploadSelectedHandler(state){
            state.uploadTabSelected = true;
            state.driveTabSelected = false;
            state.editTabSelected = false;
        },
        driveSelectedHandler(state){
            state.uploadTabSelected = false;
            state.driveTabSelected = true;
            state.editTabSelected = false;
        },
        editSelectedHandler(state){
            state.uploadTabSelected = false;
            state.driveTabSelected = false;
            state.editTabSelected = true;
        }
    }
})

export const tabActions = tabSlice.actions;
export default tabSlice.reducer;
