import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, enrollInCourse}: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; enrollInCourse: (courseId: string) => void;})
    {

        const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {currentUser && currentUser.role === "FACULTY" && ( // based on role
                <>
            <h5>New Course
            <br />
            <input value={course.name} className="form-control mb-2" 
                onChange={(e) => setCourse({ ...course, name: e.target.value }) } />

            <textarea value={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value }) }/><hr />
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
            Update
            </button>

            </h5><hr />
            </>
            )}

            {currentUser && currentUser.role === "STUDENT" && (
                <Link to="/Kanbas/EnrollCourses">
                    <button id="wd-enroll-course-click" className="btn btn-primary float-end">
                        Browse Courses
                    </button>
                </Link>
            )}

            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                            
                                <div className="card rounded-3 overflow-hidden">
                                    <img src={course.image || '/images/reactjs.jpg'} style={{ width: "100%", height: "160px", objectFit: "cover" }} alt={course.name} />
                                    <div className="card-body">
                                        <span className="wd-dashboard-course-link"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                                            {course.name}
                                        </span>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {course.description}
                                        </p>

                                        <button className="btn btn-primary">Go</button>
                                        {currentUser && currentUser.role === "FACULTY" && (  // based on role
                                            <>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                            }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">Delete
                                        </button>
                                        <button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}
                                            className="btn btn-warning me-2 float-end" >
                                            Edit
                                        </button>
                                    
                                        </>
                                        )}
                                    </div>
                                </div>
                                
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
