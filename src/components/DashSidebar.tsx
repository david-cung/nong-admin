import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            onClick={() => navigate("/dashboard?tab=profile")}
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            active={tab === "posts"}
            icon={HiDocumentText}
            onClick={() => navigate("/dashboard?tab=posts")}
          >
            Posts
          </Sidebar.Item>
          <hr className='my-2 border-gray-300' />
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={() => console.log("Sign Out")}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
