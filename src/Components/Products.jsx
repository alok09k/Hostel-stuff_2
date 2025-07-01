import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { AppContext } from './AppContext';
import { useContext } from 'react';
import { Search, Filter } from "lucide-react";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [pincodeFilter, setPincodeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { apiUrl } = useContext(AppContext);
  
  // States list (you can expand this as needed)
  const statesList = [
    "All States",
    "Andhra Pradesh",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
    "Bihar"
  ];

  // Fetch products from backend
  useEffect(() => {
    if (!apiUrl) return;
    
    console.log("Fetching products from:", `${apiUrl}/get-product`);
    
    setIsLoading(true);
    axios
      .get(`${apiUrl}/get-product`)
      .then((response) => {
        const productData = response.data.product || [];
        setProducts(productData);
        setFilteredProducts(productData); // Initially show all products
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, [apiUrl]);

  // Handle search and filter changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, stateFilter, pincodeFilter, products]);

  // Apply all filters (search, state, pincode)
  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) => {
          const nameMatch = product.productName?.toLowerCase().includes(query) || false;
          const descMatch = product.productDescription?.toLowerCase().includes(query) || false;
          const catMatch = product.productcategory?.toLowerCase().includes(query) || false;
          
          return nameMatch || descMatch || catMatch;
        }
      );
    }
    
    // Apply state filter
    if (stateFilter && stateFilter !== "All States") {
      filtered = filtered.filter(
        (product) => product.state?.toLowerCase() === stateFilter.toLowerCase()
      );
    }
    
    // Apply pincode filter
    if (pincodeFilter.trim() !== "") {
      filtered = filtered.filter(
        (product) => product.pincode?.toString().includes(pincodeFilter)
      );
    }
    
    setFilteredProducts(filtered);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Handle state filter changes
  const handleStateChange = (e) => {
    setStateFilter(e.target.value);
  };

  // Handle pincode filter changes
  const handlePincodeChange = (e) => {
    setPincodeFilter(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setStateFilter("");
    setPincodeFilter("");
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100" id="products">
      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8">
        Products
      </h2>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-4 bg-white rounded-lg shadow-sm">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          <button 
            onClick={toggleFilters}
            className="absolute right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
            title="Toggle filters"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* State Filter */}
            <div>
              <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                id="stateFilter"
                value={stateFilter}
                onChange={handleStateChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All States</option>
                {statesList.map((state, index) => (
                  state !== "All States" && <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            {/* Pincode Filter */}
            <div>
              <label htmlFor="pincodeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                id="pincodeFilter"
                placeholder="Enter pincode"
                value={pincodeFilter}
                onChange={handlePincodeChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Reset Filters Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        // Loading Spinner
        <div className="flex justify-center items-center h-96">
          <img
            src="/loading-spinner.svg"
            alt="Loading..."
            className="h-16 w-16 animate-spin"
          />
        </div>
      ) : products.length === 0 ? (
        // No Products Available
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No products available.</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        // Products Grid
        <div className="flex flex-wrap items-center justify-center gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} productId={product._id} />
          ))}
        </div>
      ) : (
        // No Products Found for Search/Filters
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No products found matching your criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;