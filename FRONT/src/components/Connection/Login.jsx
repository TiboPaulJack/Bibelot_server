


export default function Login() {






  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <div className="login">
      <div className="login__form">
        <div className="login__form__title">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="login__form__input">
            <input type="text"
                   name="email"
                   placeholder="Email" />
          </div>
          <div className="login__form__input">
            <input type="password"
                   name="password"
                   placeholder="Password" />
          </div>
          <div className="login__form__button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>

  )

}

