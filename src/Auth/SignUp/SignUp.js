import {useContext, useState} from "react";
import AuthContext from "../../context/auth";
import styles from '../Auth.module.css';
import {NavLink} from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const authCtx = useContext(AuthContext)


    const submitFormHandler = async (event) => {
        event.preventDefault();
        authCtx.signUpFormHandler(username, email, password)
    }

    return (
        <form onSubmit={submitFormHandler} className={styles.authForm}>
            <h1 className={styles.authHeading}>SignUp</h1>
            <label htmlFor="username" className={styles.authLabel}>Username</label>
            <input type="text" name='username' onChange={(event => setUsername(event.target.value))}/>
            <label htmlFor="email" className={styles.authLabel}>Email</label>
            <input type="email" name='email' onChange={(event => setEmail(event.target.value))}/>
            <label htmlFor="password" className={styles.authLabel}>Password</label>
            <input type="password" onChange={(event => setPassword(event.target.value))}/>
            <div className={styles.authLink}>
                <p>Already have an account? <br/><NavLink onClick={()=>authCtx.removeErrorHandler()} style={{textDecoration:'none'}} to='/login'>Login with an account</NavLink></p>
            </div>
            {authCtx.error.length > 0 && authCtx.error.map(error=><p className={styles.authFormErrorMsg}>{error}</p>)}
            <button type='submit' >Submit</button>
        </form>
    )
}

export default SignUp;
