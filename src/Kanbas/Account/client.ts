import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const USERS_API = `${REMOTE_SERVER}/api/users`;


export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};
  
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

// Fetch courses associated with a specific user
export const fetchCoursesForUser = async (userId: string) => {
    const response = await axios.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

export const updateProfile = async (profile: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/profile`, profile);
    return response.data;
  };
  