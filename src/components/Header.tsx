import React from "react";
import "./Header.css";
import MainLogo from "../assets/logo/MainLogo.png";

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo'>
          <img src={MainLogo} alt='Logo' />
          <span>
            QUATEST 3<sup>®</sup>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
