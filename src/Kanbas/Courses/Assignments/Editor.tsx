import 'bootstrap/dist/css/bootstrap.min.css';
import './Editor.css';

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label">Description</label>
                <textarea id="wd-description" className="form-control" rows={5}>
                    The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section. Links to each of the lab assignments. Link to the Kanbas application. Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page.
                </textarea>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input id="wd-ppoints" type="number" className="form-control" value={100} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                    <select id="wd-group" className="form-control">
                        <option value="assignments">ASSIGNMENTS</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                    <select id="wd-display-grade-as" className="form-control">
                        <option value="percentage">Percentage</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                    <select id="wd-submission-type" className="form-control">
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
                    <input id="wd-assign-to" type="text" className="form-control" value="Everyone" />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-due-date" className="form-label">Due</label>
                    <input id="wd-due-date" type="date" className="form-control" value="2024-05-13" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input id="wd-available-from" type="date" className="form-control" value="2024-05-06" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="wd-available-until" className="form-label">Until</label>
                    <input id="wd-available-until" type="date" className="form-control" value="2024-05-20" />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2">Cancel</button>
                <button className="btn btn-success">Save</button>
            </div>
        </div>
    );
}
