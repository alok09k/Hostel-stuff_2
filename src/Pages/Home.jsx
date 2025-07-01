import React from 'react'
import Header from '../Components/Header'
import About from '../Components/About'
import Products from '../Components/Products'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'
import { useContext } from "react";
import { AppContext } from "../Components/AppContext";
import SignUp from '../Components/SignUp'


function Home() {

    const { showAuth } = useContext(AppContext);

    return (
        <div className="w-full overflow-hidden">
            <Header />
            {showAuth && <SignUp />}
            <About />
            <Products />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home