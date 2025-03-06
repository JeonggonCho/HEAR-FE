// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOM.createRoot(rootElement);
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <App/>
            </HelmetProvider>
        </BrowserRouter>
    // </React.StrictMode>,
);
