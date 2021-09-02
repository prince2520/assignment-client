import React, {useCallback, useEffect, useState} from "react";

let serverUrl ='https://assignment-serv.herokuapp.com'


const AuthContext = React.createContext({
    userID: '',
    token: '',
    isAuth: false,
    username: '',
    error:[],
    removeErrorHandler:()=>{},
    loginFormHandler: (email, password) => {},
    signUpFormHandler: (username,email,password) => {},
    logoutHandler: () => {}
});

export const AuthContextProvider = (props) => {
    const [userID, setUserID] = useState();
    const [token, setToken] = useState();
    const [isAuth, setIsAuth] = useState();
    const [username , setUsername] = useState();
    const [error, setError] = useState([]);

    const autoLogout = useCallback((milliseconds) => {
        setTimeout(() => {
            logoutHandler();
        }, milliseconds)
    },[])

    useEffect(()=>{
        const sessionToken = sessionStorage.getItem('token');
        const sessionUserID = sessionStorage.getItem('userID');
        const sessionExpiryTime = sessionStorage.getItem('expiryTime');
        const sessionUsername = sessionStorage.getItem('username')

        setUserID(sessionUserID);
        setToken(sessionToken);
        setUsername(sessionUsername)


        if(new Date(sessionExpiryTime) <= new Date()){
            setIsAuth(false)
            logoutHandler();
        }else {
            const milliseconds = new Date(sessionExpiryTime).getTime() - new Date().getTime();
            console.log(milliseconds)
            autoLogout(milliseconds)
            setIsAuth(true)
        }
    },[autoLogout]);

    const removeErrorHandler = ()=>{
        setError([]);
    }

    const logoutHandler = () => {
        setToken('');
        setUserID('')
        setIsAuth(false);
        sessionStorage.clear();
    }
    const loginFormHandler = (email, password) => {
        fetch(`${serverUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => {
            return res.json()
        }).then(result => {
            if(result.error){
                setError(result.message)
            }else {
                setError([]);
                sessionStorage.setItem('userID',result._id);
                sessionStorage.setItem('token',result.token)
                sessionStorage.setItem('username',result.username)

                setToken(result.token);
                setUserID(result._id);
                setUsername(result.username);

                const fiveMinuteSession = 60*60*1000;
                const expiryTime = new Date(new Date().getTime() + fiveMinuteSession);
                sessionStorage.setItem('expiryTime',expiryTime.toISOString());
                autoLogout(fiveMinuteSession);

                setIsAuth(true)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const signUpFormHandler = (username,email,password)=>{
        fetch(`${serverUrl}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }).then(res => {
            return res.json()
        }).then(result => {
            if(error){
                setError(result.message)
            }else {
                setError(['User Created Successfully'])
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <AuthContext.Provider value={{
            userID: userID,
            token: token,
            isAuth: isAuth,
            username: username,
            error: error,
            loginFormHandler: loginFormHandler,
            signUpFormHandler:signUpFormHandler,
            logoutHandler:logoutHandler,
            removeErrorHandler:removeErrorHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
