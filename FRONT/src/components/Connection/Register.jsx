



export default function Register() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }


  return (
    <div className="register">
      <div className="register__form">
        <div className="register__form__title">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="register__form__input">
            <input type="text"
                   name="firstname"
                   placeholder="First Name" />
          </div>
          <div className="register__form__input">
            <input type="text"
                   name="lastname"
                   placeholder="Last Name" />
          </div>
          <div className="register__form__input">
            <input type="text"
                   name="pseudo"
                   placeholder="Username" />
          </div>
          <div className="register__form__input">
            <input type="text"
                   name="email"
                   placeholder="Email" />
          </div>
          <div className="register__form__input">
            <input type="password"
                   name="password"
                   placeholder="Password" />
          </div>
          <div className="register__form__input">
            <input type="password"
                   placeholder="Confirm Password" />
          </div>
          <div className="register__form__button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>

    </div>
  )

}
