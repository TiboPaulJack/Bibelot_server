import "./header.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";

export default function Header(props) {
  const navigate = useNavigate();
  
  const { logged } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  
  
  const handleProfile = () => {
    if(props.rendered){
      const { rendered } = props;
      rendered("UserProducts");
    }
    
    navigate("/user");
  }
  const handleLogout = () => {
    logout();
  }

  return (
    <header className="header">
      <h1 className="header__title" onClick={() => navigate("/")}>
        Titre
      </h1>

      <nav className="header__nav">
        <button className="nav__button" onClick={() => navigate("/models")}>
          Models
        </button>
        
        {logged &&
          <>
          <button className="nav__button" onClick={handleProfile}>
            Profile
          </button>
          <button className={"auth__button"} onClick={handleLogout}>
          Logout
          </button>
          </>
        }
        
        {!logged &&
          <button className={"auth__button"} onClick={() => navigate("/auth")}>
            Login
          </button>
        }
        
        
        
      </nav>
    </header>
  );
}
