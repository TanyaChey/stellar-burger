import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/app/app";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";

const root = ReactDOM.createRoot( 
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
