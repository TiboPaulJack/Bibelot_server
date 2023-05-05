import './homePage.css'

import Header from "../Header/Header.jsx";
import Hero from "../Hero/Hero.jsx";
import Footer from "../Footer/Footer.jsx";


export default function HomePage() {

  return (
    <>
      <Header />
        <div className="homePage">
          <Hero />
        </div>
    <Footer />
    </>
  )
}
