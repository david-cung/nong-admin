import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";

interface Service {
  title: string;
  image: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Service[]>([]);

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
      }}
    >
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
