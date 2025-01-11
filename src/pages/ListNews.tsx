import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  image: string;
  content: string;
  updatedAt: string;
  category: string; // New field to store service type (category)
}

export default function NewsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/v1/news", {
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
    setShowDeleteConfirmation(id);
  };

  const confirmDelete = async (id: string) => {
    try {
      await axios.delete(`/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== id));
      setShowDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-news/${id}`);
  };

  const handleAddService = () => {
    navigate("/add-news"); // Navigate to the "Add Service" page
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* Top section with "Add Service" button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #ddd",
        }}
      >
        <button
          onClick={handleAddService}
          style={{
            padding: "10px 15px",
            backgroundColor: "#20C997",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Thêm tin tức
        </button>
      </div>

      {/* Posts Table */}
      <table
        style={{
          width: "100%",
          height: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Ngày Cập Nhật
            </th>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Hình Ảnh
            </th>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Tiêu Đề
            </th>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Loại Dịch Vụ {/* New column for service type */}
            </th>
            <th
              style={{
                padding: "2px",
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
          {posts.map((post) => (
            <tr
              key={post.id}
              style={{
                borderBottom: "0.5px solid #ddd",
                padding: "2px",
              }}
            >
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                {new Date(post.updatedAt).toLocaleDateString()}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                {post.title}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                {post.category} {/* Display service type */}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "center",
                }}
              >
                {showDeleteConfirmation === post.id ? (
                  <div>
                    <p>Bạn có chắc chắn muốn xoá dịch vụ này?</p>
                    <button
                      onClick={() => confirmDelete(post.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FF5733",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Xoá dịch vụ này
                    </button>
                    <button
                      onClick={cancelDelete}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#808080",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Huỷ
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(post.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FFA500",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Chỉnh Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FF5733",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Xoá
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
