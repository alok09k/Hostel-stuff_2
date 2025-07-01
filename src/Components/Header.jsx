import React from 'react'
import Navbar from './Navbar'

function Header() {
    return (
        <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden ' style={{ backgroundImage: "url('/hero-1.jpg')",opacity:0.8 }} id='header' >
            <Navbar />
            <div className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-black'>
                <h2 className='text-4xl sm:text-6xl md:text-[75px] inline-block max-w-3xl font-semibold'>Find New Homes for Your Old Stuff</h2>
                <div className='space-x-6 mt-12'>
                    <a className='border border-black px-6 py-3 rounded text-xl bg-white ' href="#products">Products</a>
                </div>
            </div>
        </div>
    )
}

export default Header