import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">ASPIRANTS.SHOP</h3>
            <p className="text-gray-400">Premium game top-up platform with the best deals and instant delivery.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
              <li><Link to="/games" className="hover:text-purple-400 transition">Games</Link></li>
              <li><a href="#faq" className="hover:text-purple-400 transition">FAQ</a></li>
              <li><a href="#support" className="hover:text-purple-400 transition">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <FiMail />
                <span>support@aspirants.shop</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone />
                <span>+91 9862277104</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-green-400 transition"><FaWhatsapp size={24} /></a>
              <a href="#" className="hover:text-pink-400 transition"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-blue-300 transition"><FaTwitter size={24} /></a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} ASPIRANTS.SHOP. All rights reserved.</p>
          <p className="text-sm mt-2">Made with ❤️ for gamers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
