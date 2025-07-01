import React, { useState, useContext } from "react";
import white_heart from '../assets/white_heart.png';
import pink_heart from '../assets/pink_heart.png';
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from './AppContext';

const ProductCard = ({ product, productId }) => {
  const [heart, setHeart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const { apiUrl,handleWhatsAppRedirect } = useContext(AppContext);

  const handleLike = async () => {
    if (!userId) return toast.error('Please login first');
    setIsLoading(true);
    try {
      await axios.post(`${apiUrl}/liked-product`, { userId, productId });
      setHeart(true);
      toast.success('Added to favorites');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to favorites');
    }
    setIsLoading(false);
  };

  const handleDislike = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/liked-product`, { data: { userId, productId } });
      setHeart(false);
      toast.success('Removed from favorites');
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove from favorites');
    }
    setIsLoading(false);
  };

  const truncateDescription = (text, maxLength = 50) => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col items-center border rounded-lg p-2 shadow-md hover:shadow-lg transition w-60 relative">
      <div className="relative w-full">
        <img
          src={product.imageurl}
          alt={product.productName}
          className="w-full h-40 object-cover rounded-md"
        />
        <div className="absolute top-2 right-2">
          <div className="bg-white p-1 rounded-full shadow-sm">
            {isLoading ? (
              <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-pink-500 animate-spin"></div>
            ) : heart ? (
              <img
                src={pink_heart}
                className="w-5 h-5 cursor-pointer"
                onClick={handleDislike}
                alt="Remove from favorites"
              />
            ) : (
              <img
                src={white_heart}
                className="w-5 h-5 cursor-pointer"
                onClick={handleLike}
                alt="Add to favorites"
              />
            )}
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-800 text-center mt-2 line-clamp-2">
        {product.productName}
      </h3>

      <div className="flex items-center space-x-1 text-yellow-500 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.857 1.417 8.376L12 18.897l-7.417 4.642 1.417-8.376-6.001-5.857 8.332-1.151z" />
          </svg>
        ))}
      </div>

      {product.state && product.pincode && (
        <div className="flex items-center mt-1 text-xs text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {product.state}, {product.pincode}
        </div>
      )}

      <p className="text-gray-600 mt-2 text-xs text-center h-12 overflow-hidden">
        {truncateDescription(product.productDescription)}
      </p>

      <p className="text-base font-bold text-gray-800 mt-2">₹{product.price}</p>

      {/* Buy Now button with no function */}
      <button 
        className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md mt-3 hover:bg-blue-600 transition w-full"
        onClick={() => handleWhatsAppRedirect()} // does nothing for now
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
