import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Post {
  title: string;
  image: string;
  content: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

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
        marginTop: "60px", // Để tránh bị che khuất bởi header
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate("/create-post")}
          style={{
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
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Điều chỉnh để bài viết có kích thước lớn hơn
          gap: "20px", // Khoảng cách giữa các bài viết
        }}
      >
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px", // Khoảng cách giữa hình ảnh và nội dung
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Thêm bóng nhẹ cho bài viết
                height: "auto", // Tự động điều chỉnh chiều cao
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "150px", // Tăng kích thước hình ảnh
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "24px", // Tăng kích thước tiêu đề
                    fontWeight: "bold", // In đậm tiêu đề
                    color: "#333",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px", // Tăng kích thước chữ nội dung
                    color: "#666",
                    lineHeight: "1.8",
                    display: "-webkit-box",
                    WebkitLineClamp: 4, // Tăng số dòng nội dung hiển thị
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}
