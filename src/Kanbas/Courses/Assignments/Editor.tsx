import 'bootstrap/dist/css/bootstrap.min.css';
import './Editor.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer';

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
}

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string, aid: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
    
    const existingAssignment = assignments.find((assignment: Assignment) => assignment._id === aid && assignment.course === cid);
    
    const [formState, setFormState] = useState<Assignment>(existingAssignment || {
        _id: "",
        title: "",
        course: cid!,
        description: "",
        points: 0,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (aid) {
            dispatch(updateAssignment(formState));
        } else {
            dispatch(addAssignment(formState));
        }
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" name="title" className="form-control" value={formState.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="wd-description" className="form-label">Description</label>
                    <textarea id="wd-description" name="description" className="form-control" rows={5} value={formState.description} onChange={handleChange} required></textarea>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="wd-points" className="form-label">Points</label>
                        <input id="wd-points" name="points" type="number" className="form-control" value={formState.points} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                        <select id="wd-group" className="form-control" value="assignments" disabled>
                            <option value="assignments">ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                        <select id="wd-display-grade-as" className="form-control" value="percentage" disabled>
                            <option value="percentage">Percentage</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                        <select id="wd-submission-type" className="form-control" value="online" disabled>
                            <option value="online">Online</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="wd-due-date" className="form-label">Due</label>
                        <input id="wd-due-date" name="dueDate" type="date" className="form-control" value={formState.dueDate} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="wd-available-from" className="form-label">Available from</label>
                        <input id="wd-available-from" name="availableFrom" type="date" className="form-control" value={formState.availableFrom} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="wd-available-until" className="form-label">Until</label>
                        <input id="wd-available-until" name="availableUntil" type="date" className="form-control" value={formState.availableUntil} onChange={handleChange} required />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}>Cancel</button>
                    <button type="submit" className="btn btn-success">Save</button>
                </div>
            </form>
        </div>
    );
}
