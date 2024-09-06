// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {Global} from "@emotion/react";
import {globalStyles} from "./styles/global.ts";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <BrowserRouter>
            <Global styles={globalStyles}/>
            <App/>
        </BrowserRouter>
    // </React.StrictMode>,
);
