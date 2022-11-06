import React from "react";
import "./sidebarlight.scss";
import Logo from "../../../assets/images/erp.png";
import Menu from "../../atom/menu/menu";
import { NavLink } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import { DashboardOutlined } from "@ant-design/icons";

interface SidebarLightProps {
  children?: React.ReactNode;
  sideBarActive: boolean;
  handleSidebarIconClick: () => void;
}

const SidebarLight: React.FC<SidebarLightProps> = ({
  children,
  sideBarActive,
  handleSidebarIconClick,
}) => {
  return (
    <div
      className={`m-sidebarLight ${
        sideBarActive ? "m-sidebarLight--active" : "m-sidebarLight--close"
      }`}
    >
      <div className="m-sidebarLight__upper">
        <div className="m-sidebarLight__logo">
          {sideBarActive && (
            <>
              <img src={Logo} alt="" height={35} />
              <span className="m-sidebarLight__logoText">Nikash Online</span>
            </>
          )}

          <span
            className="m-sidebarLight__arrow"
            onClick={handleSidebarIconClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 24 24"
              width="1em"
              className="svg-icon--material svg-icon brand-aside-toggle-close"
              data-name="Material--FirstPage"
            >
              <path d="M24 0v24H0V0h24z" fill="none" opacity="0.87"></path>
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z"></path>
            </svg>
          </span>
        </div>
        <div className="m-sidebarLight__menuWrapper">
          <Menu mainMenu={{icon:<DashboardOutlined />,label:'Dashboard',url:'/dashboard'}} />
          <Menu mainMenu={{icon:<DashboardOutlined />,label:'Account',url:'/account'}} subMenu={[{label:'All Account', url:'/account'},{label:'Add Amount',url:'/account/add-money'}]} />
        </div>
      </div>
      <div className="m-sidebarLight__lower">
        <NavLink className="m-sidebarLight__lowerItem" to="/pos">POS</NavLink>
        <NavLink className="m-sidebarLight__lowerItem" to="/pos">Account Information</NavLink>
        <NavLink className="m-sidebarLight__lowerItem" to="/pos">Notifications</NavLink>
        <NavLink className="m-sidebarLight__lowerItem" to="/pos">Logout</NavLink>
      </div>
    </div>
  );
};

export default SidebarLight;
