// context/AppContext.js
import { createContext, useState } from "react";
import axios from 'axios';

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [phone, setPhone] = useState("");

  const apiUrl = "https://hostel-stuff-backend.onrender.com";

  const buyNow = async (productData, onSuccess, onError) => {
    try {
      const amount = productData.get('price') * 100; // Razorpay uses paise

      const options = {
        key: 'rzp_test_Bfn1uxrkPmW4RI', // Replace with your Razorpay key
        amount: amount * 0.05,
        currency: 'INR',
        name: 'My Store',
        description: 'Test Transaction',
        handler: async function (response) {
          // After successful payment
          try {
            const res = await axios.post(`${apiUrl}/add-product`, productData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            onSuccess && onSuccess(res.data);
          } catch (err) {
            onError && onError(err);
          }
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      onError && onError(err);
    }
  };

  // whatsapp redirect
  const handleWhatsAppRedirect = () => {
    const phoneNumber = 91+phone; // Replace with your number (with country code, no +)
    const message = 'Hello! I want to know more.'; // Optional message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };


  const value = {
    showAuth,
    setShowAuth,
    showLogin,
    setShowLogin,
    userDetails,
    setUserDetails,
    apiUrl,
    buyNow,
    phone, setPhone, handleWhatsAppRedirect
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
