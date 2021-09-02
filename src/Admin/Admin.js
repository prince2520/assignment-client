import styles from './Admin.module.css'
import Tab from "./Tab/Tab";
import Container from "./Container/Container";
import {useContext, useEffect} from "react";
import AuthContext from "../context/auth";
import {useDispatch} from "react-redux";
import {folderActions} from "../store/folder";
const Admin = () => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch()

    useEffect(()=>{
        return ()=>{
            dispatch(folderActions.addFileHandler({deleteFolder:true}))
        }
    },[dispatch])

    return (
        <div className={styles.admin}>
            <div className={styles.adminTab}>
                <h2>{authCtx.username.toUpperCase()}</h2>
                <button onClick={()=>authCtx.logoutHandler()}>Logout</button>
            </div>
            <Tab/>
            <Container/>
        </div>
    )
}

export default Admin;
