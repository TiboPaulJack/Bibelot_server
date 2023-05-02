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
        <form onSubmit={handleSubmit}>
          <div className="register__form__input">
            <legend><label htmlFor="firstname">First Name</label></legend>
            <input type="text"
                   name="firstname"
            />
          </div>
          <legend><label htmlFor="lastname">Last Name</label></legend>
          <div className="register__form__input">
            <input type="text"
                   name="lastname"
            />
          </div>
          <legend><label htmlFor="pseudo">Username</label></legend>
          <div className="register__form__input">
            <input type="text"
                   name="pseudo"
            />
          </div>
          <legend><label htmlFor="email">Email</label></legend>
          <div className="register__form__input">
            <input type="text"
                   name="email"
            />
          </div>
          <legend><label htmlFor="password">Password</label></legend>
          <div className="register__form__input">
            <input type="text"
                   name="password"
            />
          </div>
          <legend><label htmlFor="passwordConfirm">Confirm Password</label></legend>
          <div className="register__form__input">
            <input
              type="text"
              name="passwordConfirm"
            />
          </div>
          <div className="register__form__button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
