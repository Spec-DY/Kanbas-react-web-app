import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Courses() {
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                Course 1234
            </h2>
            <hr />
            <div className="d-flex">
                <div className="flex-shrink-0">
                    <CoursesNavigation />
                </div>
                <div className="flex-grow-1 ms-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:id" element={<AssignmentEditor />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
