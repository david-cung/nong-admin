// PostList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Post {
  title: string;
  image: string;
  content: string;
  updatedAt: string;
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

  const handleDelete = (id: string) => {
    // Xử lý xoá bài viết theo id
    console.log(`Delete post with id: ${id}`);
    // Call API xoá bài viết
  };

  const handleEdit = (id: string) => {
    // Chuyển hướng đến trang chỉnh sửa bài viết
    navigate(`/edit-post/${id}`);
  };

  return (
    <div
      style={{
        width: "100%", // Full chiều rộng
        height: "100%", // Full chiều cao
        overflowY: "auto", // Thêm thanh cuộn nếu bảng quá dài
      }}
    >
      <table
        style={{
          width: "100%",
          height: "100%",
          borderCollapse: "collapse", // Xoá khoảng cách giữa các ô
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "2px", // Giảm padding trong header
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Ngày Cập Nhật
            </th>
            <th
              style={{
                padding: "2px", // Giảm padding trong header
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Hình Ảnh
            </th>
            <th
              style={{
                padding: "2px", // Giảm padding trong header
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Tiêu Đề
            </th>
            <th
              style={{
                padding: "2px", // Giảm padding trong header
                textAlign: "center",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Thao Tác
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "0.5px solid #ddd", // Giảm khoảng cách giữa các dòng thêm 80%
                padding: "2px", // Giảm padding cho mỗi dòng
              }}
            >
              <td
                style={{
                  padding: "2px", // Giảm padding giữa các item
                  textAlign: "left",
                  fontSize: "16px", // Tăng kích thước chữ 70%
                }}
              >
                {new Date(post.updatedAt).toLocaleDateString()}
              </td>
              <td
                style={{
                  padding: "2px", // Giảm padding giữa các item
                  textAlign: "left",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "150px", // Kích thước ảnh lớn hơn
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td
                style={{
                  padding: "2px", // Giảm padding giữa các item
                  textAlign: "left",
                  fontSize: "16px", // Tăng kích thước chữ tiêu đề 70%
                }}
              >
                {post.title}
              </td>
              <td
                style={{
                  padding: "2px", // Giảm padding giữa các item
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => handleEdit(post.title)}
                  style={{
                    padding: "5px 10px", // Tăng kích thước nút lên 70%
                    backgroundColor: "#FFA500",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "5px", // Giảm khoảng cách giữa các nút
                  }}
                >
                  Chỉnh Sửa
                </button>
                <button
                  onClick={() => handleDelete(post.title)}
                  style={{
                    padding: "5px 10px", // Tăng kích thước nút lên 70%
                    backgroundColor: "#FF5733",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
