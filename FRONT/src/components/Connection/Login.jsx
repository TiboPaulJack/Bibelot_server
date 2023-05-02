import baseHost from "../../assets/baseHost.js";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { logged, setLogged } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { userId, setUserId } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  const navigate = useNavigate();
  
  const login = async (formData) => {
    // Convert the formData to a URLSearchParams object
    const form = new URLSearchParams(formData);
    try {
      const response = await fetch(baseHost + "/user/signin", {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data)
        setLogged(true);
        setUserId(data.userId);
        setUser(data.pseudo);
        localStorage.setItem("token", data.token);
        navigate("/user")
        setInterval(() => {
          logout()
        } , 60 * 60 * 1000) // 1 hour
        console.log("user ID AT LOGGIN ", userId)
      }
    } catch (error) {
      console.log("error :", error.status, error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    return login(formData);
  };

  return (
    <div className="login">
      <div className="login__form">
        <form onSubmit={handleSubmit}>
          <div className="login__form__input">
            <legend><label htmlFor="email">Email</label></legend>
            <input type="text"
                   name="email"
            />
          </div>
          <div className="login__form__input">
            <legend><label htmlFor="password">Password</label></legend>
            <input type="password"
                   name="password"
            />
          </div>
          <div className="login__form__button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
