import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";

import * as client from "./Courses/client";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";



export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);

    const fetchCourses = async () => {
        const courses = await client.fetchAllCourses();
        setCourses(courses);
      };
    
    useEffect(() => {
    fetchCourses();
    }, []);
    

    const [course, setCourse] = useState<any>({
        _id: "New Course", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async () => {
        const { _id, ...newCourseData } = course;
        const newCourse = await client.createCourse(newCourseData);
        setCourses([...courses, newCourse]);
    };
    const deleteCourse = async (courseId: any) => {
        await client.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = async() => {
        await client.updateCourse(course);
        setCourses(
        courses.map((c) => {
            if (c._id === course._id) {
            return course;
            } else {
            return c;
            }
        })
        );
    };

    return (
        <Provider store={store}>
        <div id="wd-kanbas">
            <KanbasNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="Account/*" element={<Account />} />
                    <Route path="Dashboard" element={
                        <ProtectedRoute>
                        <Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}/>
                            </ProtectedRoute>} />
                    <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                    <Route path="Calendar" element={<h1>Calendar</h1>} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
        </Provider>
);}