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
      <button className="sidebar__btn" onClick={handleClick}>
        <svg
          width="34px"
          height="34px"
          strokeWidth="2.4"
          viewBox="0 0 24 24"
          fill="none"
          color="#000000"
        >
          <path
            d="M3 5h18M3 12h18M3 19h18"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
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
