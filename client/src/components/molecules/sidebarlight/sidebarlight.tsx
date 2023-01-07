import React from "react";
import "./sidebarlight.scss";
import Logo from "../../../assets/images/erp.png";
import Menu from "../../atom/menu/menu";
import { NavLink } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import { AccountBookOutlined, AppstoreAddOutlined, BuildOutlined, DashboardOutlined, DollarOutlined, RadarChartOutlined, UsergroupAddOutlined, UserSwitchOutlined } from "@ant-design/icons";

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
        <div className="m-sidebarLight__logoWrapper">
          <img className="m-sidebarLight__logo" src={Logo} alt="" />
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
          <Menu
            mainMenu={{
              icon: <DashboardOutlined />,
              label: "Dashboard",
              url: "/dashboard",
            }}
            isOpen={sideBarActive}
          />
          <Menu
            mainMenu={{
              icon: <DollarOutlined />,
              label: "Account",
            }}
            subMenu={[
              { label: "All Account", url: "/accounts" },
              { label: "Add Amount", url: "/account/add-money" },
              { label: "Widthdraw Amount", url: "/account/widthdraw-money" },
              { label: "History", url: "/account/history" },
            ]}
            isOpen={sideBarActive}
          />
          <Menu
            mainMenu={{
              icon: <AppstoreAddOutlined />,
              label: "Item",
            }}
            subMenu={[
              { label: "Unit", url: "/unit" },
              { label: "Brand", url: "/brand" },
              { label: "Category", url: "/category" },
              { label: "Product", url: "/product/item/list" },
            ]}
            isOpen={sideBarActive}
          />
          <Menu
            mainMenu={{
              icon: <UserSwitchOutlined />,
              label: "Supplier",
              url: "/supplier",
            }}
            isOpen={sideBarActive}
          />
          <Menu
            mainMenu={{
              icon: <UsergroupAddOutlined />,
              label: "Customer",
              url: "/customer",
            }}
            isOpen={sideBarActive}
          />
          <Menu
            mainMenu={{
              icon: <BuildOutlined />,
              label: "Purchase",
              url: "/product/item/purchase/list",
            }}
            isOpen={sideBarActive}
          />
          <Menu
            mainMenu={{
              icon: <RadarChartOutlined />,
              label: "Pos",
              url: "/pos",
            }}
            isOpen={sideBarActive}
          />
        </div>
      </div>
      <div className="m-sidebarLight__lower">
        <NavLink className="m-sidebarLight__lowerItem" to="/pos">
          POS
        </NavLink>
        <NavLink className="m-sidebarLight__lowerItem" to="/all-sell">
          All Sell
        </NavLink>
        <NavLink className="m-sidebarLight__lowerItem" to="/customers-payment-list">
          Customer Payment
        </NavLink>
        <NavLink className="m-sidebarLight__lowerItem" to="/suppliers-payment-list">
          Supplier Payment
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarLight;
