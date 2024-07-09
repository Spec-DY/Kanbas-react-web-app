import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router";

export default function Courses() {
    return (
    <div id="wd-courses">
    <h2>Course 00X</h2>
    <hr />
    <table>
        <tr>
            <td valign="top">
                <CoursesNavigation />
            </td>
            <td valign="top">
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<h2>Assignments</h2>} />
                    <Route path="Assignments/:id" element={<h2>Assignment Editor</h2>} />
                </Routes>
            </td>
            </tr>
        </table>
    </div>
);}