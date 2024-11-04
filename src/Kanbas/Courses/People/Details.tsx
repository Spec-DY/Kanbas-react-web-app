import { FaPencil } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";

type PeopleDetailsProps = {
  user: any;
  fetchUsers: () => void;
  onClose: () => void;
};

export default function PeopleDetails({ user: initialUser, fetchUsers, onClose }: PeopleDetailsProps) {
  const navigate = useNavigate();
  const { cid } = useParams();

  console.log(cid);

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    fetchUsers();
    onClose();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };

    const [user, setUser] = useState(initialUser);
    const [name, setName] = useState(`${user.firstName} ${user.lastName}`);
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);


  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };

  if (!user) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <Link to={`/Kanbas/Courses/${cid}/People`} className="btn position-fixed end-0 top-0 wd-close-details" onClick={onClose}>
        <IoCloseSharp className="fs-1" /> </Link>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && (
          <input className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}
          />
        )}
      </div>

      <hr />
      {/* email */}
      <div className="wd-email mt-3">
        <b>Email:</b>
        {!editing ? (
          <div onClick={() => setEditing(true)}>
            {email}
          </div>
        ) : (
          <input
            type="email"
            className="form-control w-100 wd-edit-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>

      {/* role drop down */}
      <div className="wd-role mt-3">
        <b>Role:</b>
        {!editing ? (
          <div onClick={() => setEditing(true)}>
            {role}
          </div>
        ) : (
          <select
            className="form-select w-100 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="TA">Teaching Assistant</option>
            <option value="FACULTY">Faculty</option>
          </select>
        )}
      </div>
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button onClick={() => deleteUser(user._id)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => { navigate(`/Kanbas/Courses/${cid}/People`); onClose && onClose(); }}
              className="btn btn-secondary float-start float-end me-2 wd-cancel"> Cancel </button>
    </div>
  );
}
