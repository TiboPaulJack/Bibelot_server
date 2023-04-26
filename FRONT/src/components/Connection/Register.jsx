import baseApi from "../../assets/baseApi.js";
import baseHost from "../../assets/baseHost.js";

export default function Register() {
  
  
  const register = async (data) => {
    
    try {
      const response = await fetch(baseHost + "/user/add", {
        method: "POST",
        body: data
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    
    if (password !== passwordConfirm) {
      alert("Passwords are not the same");
      return;
    }
    // Delete passwordConfirm from the form data
    formData.delete("passwordConfirm");
    
    // Send the data to the API
    register(formData).then((response) => {
      console.log("response API :", response);
    });
  };

  return (
    <div className="register">
      <div className="register__form">
        <div className="register__form__title">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="register__form__input">
            <input type="text" name="firstname" placeholder="First Name" />
          </div>
          <div className="register__form__input">
            <input type="text" name="lastname" placeholder="Last Name" />
          </div>
          <div className="register__form__input">
            <input type="text" name="pseudo" placeholder="Username" />
          </div>
          <div className="register__form__input">
            <input type="text" name="email" placeholder="Email" />
          </div>
          <div className="register__form__input">
            <input type="text" name="password" placeholder="Password" />
          </div>
          <div className="register__form__input">
            <input
              type="text"
              name="passwordConfirm"
              placeholder="Confirm Password"
            />
          </div>
          <div className="register__form__input">
            <input type="file" accept="image/*" name="picture" placeholder="Avatar" />
          </div>
          <div className="register__form__button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
