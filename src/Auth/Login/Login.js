import styles from '../Auth.module.css';
import {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import AuthContext from "../../context/auth";

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const authCtx = useContext(AuthContext)


    const submitFormHandler = async (event) => {
        event.preventDefault();
        authCtx.loginFormHandler(email,password)
    }

    return (
        <div className={styles.authContainer}>
            <form onSubmit={submitFormHandler} className={styles.authForm}>
                <h1 className={styles.authHeading}>Login</h1>
                <label htmlFor="email" className={styles.authLabel}>Email</label>
                <input type="email" name='email' onChange={(event => setEmail(event.target.value))}/>
                <label htmlFor="password" className={styles.authLabel}>Password</label>
                <input type="password" onChange={(event => setPassword(event.target.value))}/>
                <div className={styles.authLink}>
                    <p>Don't have an account?<NavLink to="/signup" onClick={()=>authCtx.removeErrorHandler()} style={{textDecoration:'none'}}>Create an account</NavLink> </p>
                </div>
                {authCtx.error.length > 0 && authCtx.error.map(error=><p className={styles.authFormErrorMsg}>{error}</p>)}
                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

export default Login;
