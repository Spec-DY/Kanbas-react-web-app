import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiFillHome, AiOutlineNotification } from "react-icons/ai";
import { BsGraphUp, BsMegaphone } from "react-icons/bs";
import { GrAnalytics } from "react-icons/gr";

export default function CourseStatus() {
    return (
        <div id="wd-course-status" style={{ width: "300px" }}>
            <h2>Course Status</h2>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <BiImport className="me-2 fs-5" />
                Import Existing Content
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <LiaFileImportSolid className="me-2 fs-5" />
                Import from Commons
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <AiFillHome className="me-2 fs-5" />
                Choose Home Page
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <BsGraphUp className="me-2 fs-5" />
                View Course Screen
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <BsMegaphone className="me-2 fs-5" />
                New Announcement
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <GrAnalytics className="me-2 fs-5" />
                New Analytics
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <AiOutlineNotification className="me-2 fs-5" />
                View Course Notifications
            </button>
        </div>
    );
}
