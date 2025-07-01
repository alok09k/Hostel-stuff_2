import React from 'react';
import { Send } from 'lucide-react';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Send className="h-5 w-5 text-white" />
            </div>
            <span className="text-white text-xl font-semibold">Hostel Stuff</span>
          </div>
          <p className="text-slate-400 text-sm">
          Your one-stop destination for buying and selling pre-loved hostel essentials. 
          Save money, reduce waste, and connect with fellow hostel mates.
          </p>
        </div>

        {/* Company Links */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">Company</h3>
          <nav className="flex flex-col space-y-2">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/about" className="hover:text-white transition-colors">About us</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact us</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy policy</a>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">Subscribe to our newsletter</h3>
          <p className="text-slate-400 text-sm">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-slate-800 rounded px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
        <p>Copyright 2025 © . All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;