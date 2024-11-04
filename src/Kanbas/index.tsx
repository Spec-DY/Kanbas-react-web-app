import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as client from "./Courses/client";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import { fetchCoursesForUser } from "./Account/client";
import EnrollCourses from "./Courses/EnrollCourses";

export default function Kanbas() {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [courses, setCourses] = useState<any[]>([]);

    const fetchCourses = async () => {
        if (currentUser) {
            const userCourses = await fetchCoursesForUser(currentUser._id);
            setCourses(userCourses);
        }
    };
    
    useEffect(() => {
        if (currentUser) {
            fetchCourses();
        }
    }, [currentUser]);
    
    const [course, setCourse] = useState<any>({
        _id: "New Course", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    
    const addNewCourse = async () => {
        const { _id, ...newCourseData } = course;
        const newCourse = await client.createCourse({ ...newCourseData, userId: currentUser._id });
        setCourses([...courses, newCourse]);
    };
    
    const deleteCourse = async (courseId: any) => {
        await client.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    
    const updateCourse = async() => {
        await client.updateCourse(course);
        setCourses(
            courses.map((c) => (c._id === course._id ? course : c))
        );
    };

    const enrollInCourse = async (courseId: string) => { 
        await client.enrollInCourse(courseId, currentUser._id);
        fetchCourses(); // Refresh the courses after enrollment
    };
    

    return (
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
                                updateCourse={updateCourse}
                                enrollInCourse={enrollInCourse}  // << 传递enrollInCourse函数
                                />
                        </ProtectedRoute>} />
                    <Route path="EnrollCourses" element={<ProtectedRoute><EnrollCourses enrollInCourse={enrollInCourse} /></ProtectedRoute>} />
                    <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                    <Route path="Calendar" element={<h1>Calendar</h1>} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}
