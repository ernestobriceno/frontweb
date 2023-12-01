import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#006de2',
        color: 'white',
        padding: '1rem',
        marginTop: 'auto',
      };
  return (
    <footer style={footerStyle}>
      <div className="flex justify-end">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mr-4">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mr-4">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mr-4">
          <FaInstagram size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mr-4">
          <FaLinkedin size={24} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
