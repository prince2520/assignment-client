import { configureStore } from "@reduxjs/toolkit";
import folderReducer from './folder';
import tabReducer from './tab';
import helpReducer  from './helper'

const store = configureStore({
    reducer: {
        folder: folderReducer,
        tab: tabReducer,
        helper: helpReducer
    }
});

export default store;
