// Header.tsx
import React from "react";
import MainLogo from "../assets/logo/MainLogo.png";

const Header = () => {
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#f0f0f0", // Hoặc màu nền bạn muốn
        padding: "10px 0", // Khoảng cách trên và dưới của header
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Đảm bảo header luôn hiển thị ở trên cùng
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px", // Chiều rộng tối đa của header
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div className='logo'>
          <img
            src={MainLogo}
            alt='Logo'
            style={{ width: "40px", height: "auto" }}
          />
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
            QUATEST 3<sup>®</sup>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
