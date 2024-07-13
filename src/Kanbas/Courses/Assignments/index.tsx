import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { FaPlus, FaCheckCircle, FaSearch, FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Assignments() {
    return (
        <div id="wd-assignments" className="p-3">
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="input-group w-50">
                    <span className="input-group-text bg-white"><FaSearch /></span>
                    <input id="wd-search-assignment" className="form-control" placeholder="Search for Assignments" />
                </div>
                <div>
                    <button className="btn btn-outline-secondary me-2"><FaPlus className="me-1" /> Group</button>
                    <button className="btn btn-danger"><FaPlus className="me-1" /> Assignment</button>
                </div>
            </div>
            <h3 id="wd-assignments-title" className="mb-3 d-flex justify-content-between align-items-center">
                <span>ASSIGNMENTS</span>
                <span className="badge bg-secondary rounded-pill">40% of Total</span>
                <button className="btn btn-outline-secondary btn-sm"><FaPlus /></button>
            </h3>
            <ul id="wd-assignment-list" className="list-group">
                <li className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center flex-grow-1">
                        <BsThreeDotsVertical className="me-2" />
                        <FaRegEdit className="me-2" />
                        <div>
                            <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">
                                A1 - ENV + HTML
                            </a>
                            <div>
                                <span className="text-danger">Multiple Modules</span> | 
                                <strong> Not available until</strong> May 6 at 12:00am | 
                                <strong> Due</strong> May 13 at 11:59pm | 100 pts
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <FaCheckCircle className="text-success me-2" />
                        <BsThreeDotsVertical />
                    </div>
                </li>
                <li className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center flex-grow-1">
                        <BsThreeDotsVertical className="me-2" />
                        <FaRegEdit className="me-2" />
                        <div>
                            <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/124">
                                A2 - CSS + BOOTSTRAP
                            </a>
                            <div>
                                <span className="text-danger">Multiple Modules</span> | 
                                <strong> Not available until</strong> May 13 at 12:00am | 
                                <strong> Due</strong> May 20 at 11:59pm | 100 pts
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <FaCheckCircle className="text-success me-2" />
                        <BsThreeDotsVertical />
                    </div>
                </li>
                <li className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center flex-grow-1">
                        <BsThreeDotsVertical className="me-2" />
                        <FaRegEdit className="me-2" />
                        <div>
                            <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/125">
                                A3 - JAVASCRIPT + REACT
                            </a>
                            <div>
                                <span className="text-danger">Multiple Modules</span> | 
                                <strong> Not available until</strong> May 20 at 12:00am | 
                                <strong> Due</strong> May 27 at 11:59pm | 100 pts
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <FaCheckCircle className="text-success me-2" />
                        <BsThreeDotsVertical />
                    </div>
                </li>
            </ul>
        </div>
    );
}
