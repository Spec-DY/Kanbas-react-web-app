import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllCourses } from "../Courses/client"; // Import the function to fetch all courses

export default function EnrollCourses({ enrollInCourse }: { enrollInCourse: (courseId: string) => void }) {
    const [courses, setCourses] = useState<any[]>([]);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [message, setMessage] = useState<{ [key: string]: string }>({});
    useEffect(() => {
        const fetchCourses = async () => {
            const allCourses = await fetchAllCourses();
            setCourses(allCourses);
        };
        fetchCourses();
    }, []);

    const handleEnroll = async (courseId: any) => {
        try {
            await enrollInCourse(courseId);
            setMessage({ ...message, [courseId]: "Enrollment successful!" }); // 仅更新点击的课程的提示信息
        } catch (error) {
            setMessage({ ...message, [courseId]: "Enrollment failed. Please try again." }); // 设置错误提示信息
        }
    };

    return (
        <div id="wd-enroll-courses">
            <h1>Available Courses</h1>
            <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="wd-course-card col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <img src={course.image || '/images/default-course.jpg'} style={{ width: "100%", height: "160px", objectFit: "cover" }} alt={course.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{course.name}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => handleEnroll(course._id)}>
                                        Enroll
                                    </button>

                                    {message[course._id] && (
                                        <div className="alert alert-info mt-3">
                                            {message[course._id]}
                                        </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
