import React from "react";
import styles from './Share.module.css'
import {useDispatch} from "react-redux";
import {helperActions} from "../../../../../store/helper";

const Share = (props) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.share}>
            <div className={styles.overlay} onClick={()=>dispatch(helperActions.showShareHandler())}/>
            <div className={styles.model}>
                <h2>Share a link</h2>
                <textarea disabled value={props.link}  id="" cols="25" rows="10"/>
                <button onClick={()=>dispatch(helperActions.showShareHandler())}>Close</button>
            </div>
        </div>
    )
}

export default Share;
