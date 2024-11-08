import "./index.css";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
    const { cid } = useParams<{ cid: string }>();
    const { pathname } = useLocation();

    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quiz", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links.map(link => (
                <Link
                    key={link}
                    to={`/Kanbas/Courses/${cid}/${link}`}
                    className={`list-group-item border-0 ${pathname.includes(link) ? 'active' : 'text-danger'}`}
                >
                    {link}
                </Link>
            ))}
        </div>
    );
}
