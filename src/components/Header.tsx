import { useNavigate } from "react-router-dom"; // Import useNavigate
import MainLogo from "../assets/logo/MainLogo.png";

const Header = () => {
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  return (
    <header
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#0056b3",
        padding: "10px 0",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div
          className='logo'
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/dashboard?tab=posts")} // Thêm sự kiện click để điều hướng
        >
          <img
            src={MainLogo}
            alt='Logo'
            style={{ width: "40px", height: "auto" }}
          />
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}>
            QUATEST 3<sup>®</sup>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
