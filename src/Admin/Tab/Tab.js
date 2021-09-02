import styles from './Tab.module.css'
import {useDispatch, useSelector} from "react-redux";

import {tabActions} from "../../store/tab";

const Tab = () => {
    const dispatch = useDispatch();

    const uploadTabSelected = useSelector(state => state.tab.uploadTabSelected)
    const driveTabSelected = useSelector(state => state.tab.driveTabSelected)

    return (
        <div className={styles.tabs}>
            <div onClick={()=>{
                dispatch(tabActions.uploadSelectedHandler())
            }} className={uploadTabSelected ? styles.tabActive : ''}
            >
                <span>
                    <h3>Upload</h3>
                </span>
            </div>
            <div onClick={()=>{
                dispatch(tabActions.driveSelectedHandler())
            }} className={driveTabSelected ? styles.tabActive : ''}
            >
                <h3>Drive</h3>
            </div>
        </div>
    )
}

export default Tab;
