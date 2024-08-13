import React from 'react';
import { useParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaFileImport, FaFileExport, FaCog } from 'react-icons/fa';
import './index.css';
import * as db from '../../Database';

export default function Grades() {
    const { cid } = useParams<{ cid: string }>();

    // get students for current course
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === cid);
    const students = enrollments.map((enrollment) => {
        return db.users.find((user) => user._id === enrollment.user);
    }).filter(Boolean);

    // get assignments for current course
    const assignments = db.assignments.filter((assignment) => assignment.course === cid);

    // get students grades
    const getGrade = (studentId: string, assignmentId: string) => {
        const gradeEntry = db.grades.find((grade) => grade.student === studentId && grade.assignment === assignmentId);
        return gradeEntry ? gradeEntry.grade : 'N/A';
    };

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
                            {assignments.map((assignment) => (
                                <th key={assignment._id}>
                                    {assignment.title} <small>(Out of 100)</small>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student!._id}>
                                <td>{student!.firstName} {student!.lastName}</td>
                                {assignments.map((assignment) => (
                                    <td key={assignment._id}>{getGrade(student!._id, assignment._id)}%</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
