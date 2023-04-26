import baseHost from "../../assets/baseHost.js";
import { useContext, useState } from "react";
import { UserContext } from "../../App.jsx";

export default function Login() {
  const { logged, setLogged } = useContext(UserContext);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(null);

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
        setLogged(true);
        setUserId(data.user.id);
        setUser(data.user);
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log("error :", error.status, error.message);
    }
    console.log("logged :", logged);
    console.log("user :", user);
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
        <div className="login__form__title">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="login__form__input">
            <input type="text" name="email" placeholder="Email" />
          </div>
          <div className="login__form__input">
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div className="login__form__button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
