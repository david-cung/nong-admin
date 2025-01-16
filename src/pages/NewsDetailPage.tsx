import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  content: string;
  image?: string;
}

const NewDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get<{ data: Service }>(`/v1/news/${id}`);
        setService(response.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetail();
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "flex",
            maxWidth: "1200px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Phần chi tiết tin tức */}
          <div
            style={{
              flex: 2,
              padding: "20px",
              borderRight: "1px solid #ddd",
              minHeight: "400px",
            }}
          >
            <h1
              style={{
                marginBottom: "20px",
                fontSize: "32px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {news?.title || "Tin tức không có tiêu đề"}
            </h1>
            <div
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                lineHeight: "1.6",
                textAlign: "left",
                color: "#333",
                minHeight: "200px",
              }}
              dangerouslySetInnerHTML={{
                __html: news?.content || "<p>Không có nội dung.</p>",
              }}
            ></div>
            {news?.image && (
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  backgroundImage: `url(${news?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                }}
              ></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewDetailPage;
