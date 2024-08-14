import * as client from "./client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
        const account = await client.profile();
        setProfile(account);
    } catch (err: any) {
        navigate("/Kanbas/Account/Signin");
    }

  };

  const dispatch = useDispatch();
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input className="form-control mb-3 wd-username"
                 value={profile.username}
                 onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
          <input className="form-control mb-3 wd-password"
                 value={profile.password}
                 onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/>
          <input className="form-control mb-3 wd-firstname" 
                 value={profile.firstName}
                 onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
          <input className="form-control mb-3 wd-lastname" 
                 value={profile.lastName}
                 onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
          <input className="form-control mb-3 wd-dob" 
                 value={profile.dob}
                 onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
          <input className="form-control mb-3 wd-email" 
                 value={profile.email}
                 onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
          <select className="form-control mb-3 wd-role" 
                 onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
          </select>
            <button onClick={signout}
                    className="wd-signout-btn btn btn-danger w-100">
                    Sign out
            </button>
        </div>
      )}
    </div>
  );
}
