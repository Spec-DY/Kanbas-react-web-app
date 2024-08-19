import { current } from "@reduxjs/toolkit";
import Modules from "../Modules";
import CourseStatus from "./Status";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";

export default function Home() {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    return (
        <div id="wd-home" className="container-fluid">

            <div className="row">
                <div className={`col-12 ${currentUser && currentUser.role === "FACULTY" ? "col-md-8" : "col-md-12"}`}>
                    <Modules />
                </div>
                {currentUser && currentUser.role === "FACULTY" && (
                    <div className="col-12 col-md-4">
                        <CourseStatus />
                    </div>
                )}
            
            </div>
        </div>
    );
}