import './auth.css'
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";



export default function Auth() {

  return (
    <>
      <Header />
      <div className="auth">
        <Register />
        <Login />
      </div>
      <Footer />
    </>
  )
}
