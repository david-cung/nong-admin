// Dashboard.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import Header from "../components/Header"; // Đừng quên import Header
import PostList from "./ListPost";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div
      className='min-h-screen flex flex-col'
      style={{ marginTop: "60px" }} // Thêm marginTop để tránh che khuất nội dung
    >
      <Header /> {/* Hiển thị header ở trên cùng */}
      <div className='flex flex-grow md:flex-row'>
        <div className='md:w-56 bg-slate-300'>
          <DashSidebar setTab={setTab} />
        </div>
        <div
          className='flex-grow flex items-center justify-center bg-gray-100'
          style={{ padding: "20px" }}
        >
          {tab === "profile" && <DashProfile />}
          {tab === "posts" && <PostList />}
        </div>
      </div>
    </div>
  );
}
