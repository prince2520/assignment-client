import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
import {useContext} from "react";
import AuthContext from "./context/auth";
import Admin from "./Admin/Admin";

function App() {
    const authCtx = useContext(AuthContext)

    let route;
    if (!authCtx.isAuth) {
        route = (
            <Switch>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/signup'>
                    <SignUp/>
                </Route>
                <Route path='/'>
                    <Redirect to='/login'/>
                </Route>
            </Switch>
        )
    } else {
        route = (
            <Switch>
                <Route path='/admin'>
                    <Admin/>
                </Route>
                <Route path='/'>
                    <Redirect to='/admin'/>
                </Route>
            </Switch>)
    }

    return (
        <div className="App">
            {route}
        </div>
    );
}

export default App;
