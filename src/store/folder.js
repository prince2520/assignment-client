import {createSlice} from "@reduxjs/toolkit";

const initialDriveState = {
    fileUrl:[]
};

const folderSlice = createSlice({
    name:'folder',
    initialState:initialDriveState,
    reducers:{
        addFileHandler(state,action){
            if(action.payload.deleteFolder){
                state.fileUrl = []
            }else {
                state.fileUrl.push({
                    _id:action.payload._id,
                    format:action.payload.format,
                    fileUrl:action.payload.fileUrl,
                    fileName:action.payload.fileName,
                });
            }
        },
        deleteFileHandler(state,action){
            state.fileUrl = state.fileUrl.filter(({_id})=>{
                return _id !== action.payload._id
            })
        }
    }
})

export const folderActions = folderSlice.actions;
export default folderSlice.reducer;
