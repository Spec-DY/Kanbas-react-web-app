import 'bootstrap/dist/css/bootstrap.min.css';
import './Editor.css';
import { useParams, Link } from 'react-router-dom';
import * as db from '../../Database';

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string, aid: string }>();
    console.log(`Course ID: ${cid}, Assignment ID: ${aid}`);
    const assignment = db.assignments.find((assignment) => assignment._id === aid && assignment.course === cid);
    console.log(`Found assignment: ${assignment}`);
    
    if (!assignment) {
        return <div>Assignment not found</div>;
    }

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input id="wd-name" className="form-control" value={assignment.title} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label">Description</label>
                <textarea id="wd-description" className="form-control" rows={5} readOnly>
                    {assignment.description || 'No description provided.'}
                </textarea>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input id="wd-points" type="number" className="form-control" value={assignment.points || 100} readOnly />
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
            <div className="mb-3">
                <label className="form-label">Online Entry Options</label>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                    <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="wd-website-url" />
                    <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                    <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                    <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                    <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                    <input id="wd-assign-to" type="text" className="form-control" value="Everyone" readOnly />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-due-date" className="form-label">Due</label>
                    <input id="wd-due-date" type="date" className="form-control" value="2024-05-13" readOnly />
                </div>
                <div className="col-md-4">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input id="wd-available-from" type="date" className="form-control" value="2024-05-06" readOnly />
                </div>
                <div className="col-md-4">
                    <label htmlFor="wd-available-until" className="form-label">Until</label>
                    <input id="wd-available-until" type="date" className="form-control" value="2024-05-20" readOnly />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-success">Save</Link>
            </div>
        </div>
    );
}
