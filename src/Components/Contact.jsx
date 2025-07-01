import React from 'react'
import {toast} from 'react-hot-toast'

function Contact() {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "6b5cb739-2cd6-4c75-a62c-01ee967f2841");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            toast.success('Form Submitted Successfully')
            setResult("Form Submitted Successfully");
            event.target.reset();
           
        } else {
            console.log("Error", data);
            toast.error(data.message)
            setResult(data.message);
        }
    };

    return (
        <div className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden' id='contact'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Contact
                <span className='underline underline-offset-4 decoration-1 under font-light'>With Us</span> </h1>
            <p className='tect-center text-gray-500 mb-12 max-w-80 mx-auto'> Ready to Make a Move? Lets's Build Our Future Together</p>


            <form onSubmit={onSubmit} className='max-w-2xl mx-auto text-gray-600 pt-5'>
                <div className='flex gap-5 '>
                    <div className='w-full md:w-1/2 text-left'>
                        Your Name
                        <input type="text" placeholder='Your Name' required name='Name'
                            className='w-full border border-gray-300 rounded px-4 py-3 mt-2' />
                    </div>
                    <div className='w-full md:w-1/2 text-left'>
                        Your Email
                        <input type="text" placeholder='Your Email' required name='Email'
                            className='w-full border border-gray-300 rounded px-4 py-3 mt-2' />
                    </div>
                </div>
                <div className='my-6 text-left'>
                    Message
                    <textarea name="Message" placeholder='Message' required
                        className='w-full border border-gray-300 rounded px-4 py-3 mt-2 h-48 resize-none'
                    ></textarea>
                </div>
                <button
                    className="bg-blue-600 text-white py-3 px-8 mb-10 rounded"
                    disabled={result === "Sending...."}
                >
                    {result === "Sending...." ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    )
}

export default Contact