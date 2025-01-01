import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56 bg-slate-300'>
        <DashSidebar setTab={setTab} />
      </div>
      <div
        className='flex-grow flex items-center justify-center bg-gray-100'
        style={{ padding: "20px" }}
      >
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPost />}
      </div>
    </div>
  );
}
