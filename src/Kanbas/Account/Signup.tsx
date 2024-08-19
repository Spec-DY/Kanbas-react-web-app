import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Signup() {

const [error, setError] = useState("");
const [user, setUser] = useState<any>({ role: "FACULTY" });
const navigate = useNavigate();

const dispatch = useDispatch();
const signup = async () => {
  try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
  } catch (err: any) {
      setError(err.response.data.message);
  }

  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
      <input value={user.username} 
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="wd-username form-control mb-2" 
              placeholder="username" />
      <input value={user.password} 
              onChange={(e) => setUser({ ...user, password: e.target.value })} 
              type="password"
              className="wd-password form-control mb-2" 
              placeholder="password" />

      {/* identity group choice */}
      <select
        id="wd-role"
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        value={user.role}
        className="form-control mb-2"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </select>

      <button onClick={signup} 
              className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
  );
}
