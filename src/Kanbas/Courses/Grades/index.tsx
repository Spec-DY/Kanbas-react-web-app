import React from 'react';
import { FaSearch, FaFilter, FaFileImport, FaFileExport, FaCog } from 'react-icons/fa';
import './index.css';

export default function Grades() {
    return (
        <div id="wd-grades" className="container mt-4">
            <h1>Grades</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <div className="input-group me-3">
                        <span className="input-group-text"><FaSearch /></span>
                        <input type="text" className="form-control" placeholder="Search Students" />
                    </div>
                    <div className="input-group me-3">
                        <span className="input-group-text"><FaSearch /></span>
                        <input type="text" className="form-control" placeholder="Search Assignments" />
                    </div>
                    <button className="btn btn-secondary me-3">
                        <FaFilter /> Apply Filters
                    </button>
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn btn-secondary me-3">
                        <FaFileImport /> Import
                    </button>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="exportDropdown" data-bs-toggle="dropdown">
                            <FaFileExport /> Export
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="exportDropdown">
                            <li><a className="dropdown-item" href="#">Export as CSV</a></li>
                            <li><a className="dropdown-item" href="#">Export as Excel</a></li>
                        </ul>
                    </div>
                    <button className="btn btn-secondary ms-3">
                        <FaCog /> Settings
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>A1 SETUP <small>(Out of 100)</small></th>
                            <th>A2 HTML <small>(Out of 100)</small></th>
                            <th>A3 CSS <small>(Out of 100)</small></th>
                            <th>A4 BOOTSTRAP <small>(Out of 100)</small></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jane Adams</td>
                            <td>100%</td>
                            <td>97%</td>
                            <td>96%</td>
                            <td>98%</td>
                        </tr>
                        <tr>
                            <td>Christina Allen</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Samreen Ansari</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Han Bao</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>
                                <input type="text" className="form-control" defaultValue="90%" />
                            </td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Mahi Sai Srinivas Bobbili</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
