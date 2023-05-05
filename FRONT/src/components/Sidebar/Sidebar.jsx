import './sidebar.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";


export default function Sidebar() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { setSideBar } = useContext(UserContext);
  const { sideBarActive } = useContext(UserContext);

  const handleClick = () => {
    setSideBar();
  }

  return (
    <div className={sideBarActive ? "sidebar active" : "sidebar"}>

      <ul className="sidebar__list">
        <li className="sidebar__list-item" onClick={() => navigate("/user")}>
          Profile
        </li>
        <li className="sidebar__list-item" onClick={() => navigate("/models")}>
          Models
        </li>
        <li className="sidebar__list-item" onClick={() => logout()}>
          Logout
        </li>
        <li className="sidebar__list-item">Help</li>
        <li className="sidebar__list-item">About</li>
        <li className="sidebar__list-item">Privacy Policy</li>
        <li className="sidebar__list-item">Contact</li>
      </ul>
    </div>
  );
}
