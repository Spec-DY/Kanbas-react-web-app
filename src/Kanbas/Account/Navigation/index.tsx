import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './index.css'

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kanbas/Account/${link}`} className={`list-group-item border-0
           ${ pathname.includes(link) ? 'active' : 'text-danger' }`}> {link} </Link>
      ))}
    </div>
  );
}
