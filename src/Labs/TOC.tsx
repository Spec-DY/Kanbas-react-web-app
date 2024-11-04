import { useLocation } from "react-router";
export default function TOC() {
    const { pathname } = useLocation();
    return (
        <ul className="nav nav-pills">
       
        <li className="nav-item">
        <a id="wd-a1" href="#/Labs/Lab1"
        className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>
        Readme
        </a>
        </li>

        <li className="nav-item">
            <a id="wd-k" href="#/Kanbas" className="nav-link">
        Canbas
        </a>
        </li>

        <li className="nav-item">
            <a id="wd-github-frontend" href="https://github.com/Spec-DY/Kanbas-react-web-app/tree/final" className="nav-link">Github-Frontend
            </a>
        </li>


        <li className="nav-item">
            <a id="wd-github-backend" href="https://github.com/Spec-DY/kanbas-node-server-app/tree/final" className="nav-link">Github-Backend
            </a>
        </li>


        <li className="nav-item">
            <a id="wd-render" href="https://kanbas-node-server-app-89pf.onrender.com" className="nav-link">Render
            </a>
        </li>
        </ul>




    );
}
