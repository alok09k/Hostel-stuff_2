import React from 'react'
import about_img from '../assets/about_img.png'

function About() {
    return (
        <div
            className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
            id="about"
        >
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
                About
                <span className="underline underline-offset-4 decoration-1 font-light ml-2">
                    Our Platform
                </span>
            </h1>
            <p className="text-gray-500 max-w-80 text-center mb-8">
                Connecting students, reducing waste, and promoting sustainable living.
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
                <img
                    src={about_img}
                    alt="About our platform"
                    className="w-10/12 sm:w-1/2 max-w-lg"
                />
                <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
                    <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
                        <div>
                            <p className="text-3xl font-medium text-gray-800">500+</p>
                            <p>Items sold</p>
                        </div>
                        <div>
                            <p className="text-3xl font-medium text-gray-800">1,000+</p>
                            <p>Happy students</p>
                        </div>
                        <div>
                            <p className="text-3xl font-medium text-gray-800">100+</p>
                            <p>Hostels covered</p>
                        </div>
                        <div>
                            <p className="text-3xl font-medium text-gray-800">24/7</p>
                            <p>Customer support</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our platform is dedicated to simplifying the process of buying and selling pre-loved hostel essentials.
                            Whether you're a new student looking to set up your hostel room affordably or a graduate looking to pass on
                            your items, we've got you covered. With a focus on sustainability and community, we aim to reduce waste while
                            connecting students across hostels. Experience a hassle-free, secure, and reliable marketplace built just for you.
                        </p>

                        <button className='bg-blue-600 text-white px-7 py-3 rounded mt-4'>Learn more</button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default About