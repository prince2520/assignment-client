import React from "react";
import {tabActions} from "../../../../store/tab";
import {useDispatch} from "react-redux";

import styles from './NoFile.module.css'

const NoFile = () => {
    const dispatch = useDispatch();
    return(
        <React.Fragment>
            <h2 className={styles.noFileHeading}>No file exist!</h2>
            <button className={styles.noFileUploadButton} onClick={()=> dispatch(tabActions.uploadSelectedHandler())}>Upload a file</button>
        </React.Fragment>
    )
}

export default NoFile;
