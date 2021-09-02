import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthContextProvider} from "./context/auth";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import store from "./store/store";

ReactDOM.render(
<BrowserRouter>
    <Provider store={store}>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </Provider>
</BrowserRouter>,
  document.getElementById('root')
);

