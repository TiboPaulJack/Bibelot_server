import './header.css'
import {useNavigate} from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="header__title" onClick={() => navigate('/')}>Titre</h1>

      <nav className="header__nav">
        <button className="nav__button"
                onClick={() => navigate('/models')}
        >
                Models
        </button>
        <div className={"nav__auth"}>
          <button className={"auth__button"}
                  onClick={() => navigate('/auth')}
          >
            Login
          </button>
        </div>
      </nav>

    </header>
  )
}
