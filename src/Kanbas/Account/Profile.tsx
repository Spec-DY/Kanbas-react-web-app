import * as client from "./client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
      dispatch(setCurrentUser(account)); // Update current user in Redux
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFieldChange = async (field: string, value: any) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
    
    try {
      await client.updateProfile(updatedProfile);
      dispatch(setCurrentUser(updatedProfile)); // Update current user in Redux
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input
            className="form-control mb-3 wd-username"
            value={profile.username}
            onChange={(e) => handleFieldChange("username", e.target.value)}
          />
          <input
            className="form-control mb-3 wd-password"
            value={profile.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
          />
          <input
            className="form-control mb-3 wd-firstname"
            value={profile.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
          />
          <input
            className="form-control mb-3 wd-lastname"
            value={profile.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
          />
          <input
            className="form-control mb-3 wd-dob"
            value={profile.dob}
            onChange={(e) => handleFieldChange("dob", e.target.value)}
            type="date"
          />
          <input
            className="form-control mb-3 wd-email"
            value={profile.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
          <select
            className="form-control mb-3 wd-role"
            value={profile.role}
            onChange={(e) => handleFieldChange("role", e.target.value)}
          >
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
