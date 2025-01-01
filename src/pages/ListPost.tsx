import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng

interface Service {
  title: string;
  image: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Service[]>([]);
  const navigate = useNavigate(); // Khai báo useNavigate để chuyển hướng

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/v1/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Căn giữa theo chiều ngang
        justifyContent: "center", // Căn giữa theo chiều dọc
        height: "100vh", // Chiếm toàn bộ chiều cao màn hình
        textAlign: "center", // Căn giữa văn bản
        position: "relative", // Cần có để định vị button
      }}
    >
      {/* Button "Tạo bài viết" */}
      <button
        onClick={() => navigate("/create-post")} // Điều hướng đến trang tạo bài viết
        style={{
          position: "absolute", // Định vị tuyệt đối
          top: "20px", // Khoảng cách từ trên
          right: "20px", // Khoảng cách từ phải
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Tạo bài viết
      </button>

      {posts.length > 0 ? (
        posts.map((service, index) => (
          <div
            key={index}
            style={{
              margin: "10px 0", // Khoảng cách giữa các bài viết
            }}
          >
            <ServiceCard title={service.title} image={service.image} />
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
