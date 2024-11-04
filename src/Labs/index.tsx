import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
    console.log('Hello World!');
return (
    <Provider store={store}>
        <div id="wd-labs">
            <h1>Canbas Readme</h1>
            <TOC />
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
            </Routes>
        </div>
    </Provider>
);} 
