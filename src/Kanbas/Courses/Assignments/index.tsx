import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { FaPlus, FaCheckCircle, FaSearch, FaRegEdit, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import {  deleteAssignment, setAssignment } from './reducer';
import * as client from "./client";

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const assignments = useSelector((state: any) => state.assignmentsReducer.assignments.filter((assignment: any) => assignment.course === cid));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignment(assignments));
      };
      useEffect(() => {
        fetchAssignments();
      }, []);

    const [showDialog, setShowDialog] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<any | null>(null);

    const handleDeleteClick = (assignment: any) => {
        setAssignmentToDelete(assignment);
        setShowDialog(true);
    };

    const removeAssignment = async (assignmentId: string) => {
        await client.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };


    const confirmDelete = () => {
        if (assignmentToDelete) {
            removeAssignment(assignmentToDelete._id);
        }
        setShowDialog(false);
    };

    return (
        <div id="wd-assignments" className="p-3">
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="input-group w-50">
                    <span className="input-group-text bg-white"><FaSearch /></span>
                    <input id="wd-search-assignment" className="form-control" placeholder="Search for Assignments" />
                </div>
                <div>
                    <button className="btn btn-outline-secondary me-2"><FaPlus className="me-1" /> Group</button>
                    <button className="btn btn-danger" onClick={() => navigate(`New`)}><FaPlus className="me-1" /> Assignment</button>
                </div>
            </div>
            <h3 id="wd-assignments-title" className="mb-3 d-flex justify-content-between align-items-center">
                <span>ASSIGNMENTS</span>
                <span className="badge bg-secondary rounded-pill">40% of Total</span>
                <button className="btn btn-outline-secondary btn-sm"><FaPlus /></button>
            </h3>
            <ul id="wd-assignment-list" className="list-group">
                {assignments.map((assignment: any) => (
                    <li key={assignment._id} className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center flex-grow-1">
                            <BsThreeDotsVertical className="me-2" />
                            <FaRegEdit className="me-2" />
                            <div>
                                <Link className="wd-assignment-link" to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                    {assignment.title}
                                </Link>
                                <div>
                                    <span className="text-danger">Multiple Assignmentss</span> |
                                    <strong> Not available until</strong> {assignment.availableFrom} |
                                    <strong> Due</strong> {assignment.dueDate} | {assignment.points} pts
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <FaCheckCircle className="text-success me-2" />
                            <FaTrash className="text-danger me-2" onClick={() => handleDeleteClick(assignment)} />
                            <BsThreeDotsVertical />
                        </div>
                    </li>
                ))}
            </ul>

            {showDialog && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Assignment</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDialog(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this assignment?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDialog(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
