import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJwt } from "../../../services/authServices";
import MainBody from "../../organism/mainBody/mainBody";
import Sidebar from "../../molecules/sidebar/sidebar";
import "./admin.scss";
import SidebarLight from "../../molecules/sidebarlight/sidebarlight";
import { type } from "os";

interface AdminProps {
  children: React.ReactNode;
  type: "facit" | "light";
  noCard?: boolean;
}

const Admin: React.FC<AdminProps> = ({ children, type, noCard }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const handleSidebarIconClick = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const token = getJwt();
    if (!token) {
      navigate("login");
    }
  });
  return (
    <div className="dashboard__wrapper">
      <div className="dashboard__sidebar">
        {type === "light" ? (
          <SidebarLight
            handleSidebarIconClick={handleSidebarIconClick}
            sideBarActive={sidebarOpen}
          />
        ) : (
          <Sidebar
            handleSidebarIconClick={handleSidebarIconClick}
            sideBarActive={sidebarOpen}
          />
        )}
      </div>
      <div
        className={`dashboard__mainBody ${!sidebarOpen && "dashboard--wide"}`}
      >
        <MainBody noCard={noCard} >{children}</MainBody>
      </div>
    </div>
  );
};

export default Admin;
