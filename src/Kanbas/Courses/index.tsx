import React from "react";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Grades from './Grades';
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";


export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams<{ cid: string }>();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    const sectionName = pathname.split("/").pop();

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} {sectionName && `> ${sectionName}`}
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
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
