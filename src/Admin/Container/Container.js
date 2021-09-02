import React from "react";
import {useSelector} from "react-redux";
import Upload from "./Upload/Upload";
import Folder from "./Folder/Folder";

const Container = () => {
    const uploadedTabSelected = useSelector(state => state.tab.uploadTabSelected)
    const driveTabSelected = useSelector(state => state.tab.driveTabSelected)
    return (
        <React.Fragment>
            {uploadedTabSelected && !driveTabSelected && <Upload/>}
            {driveTabSelected && !uploadedTabSelected && <Folder/>}
        </React.Fragment>
    )
}

export default Container;
