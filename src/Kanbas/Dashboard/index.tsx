import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import courses from "../Database/courses.json";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                                <div className="card rounded-3 overflow-hidden">
                                    <img src={course.image || '/images/default.jpg'} style={{ width: "100%", height: "160px", objectFit: "cover" }} alt={course.name} />
                                    <div className="card-body">
                                        <span className="wd-dashboard-course-link"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                                            {course.name}
                                        </span>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {course.description}
                                        </p>
                                        <button className="btn btn-primary">Go</button>
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
