import { ArrowRightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./menu.scss";

interface MenuProps {
  mainMenu: { label: string; url?: string; icon: React.ReactNode };
  subMenu?: { label: string; url: string }[];
  isOpen?: boolean;
}
const Menu: React.FC<MenuProps> = ({ mainMenu, subMenu, isOpen }) => {
  const [isActive, setIsActive] = useState<Boolean>(false);
  const [listHeight, setListHeight] = useState<number>(0);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const subMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen && subMenuRef.current) {
      setListHeight(subMenuRef.current.offsetHeight);
    }
  }, [isOpen]);
  return (
    <div className={`a-menu ${!isOpen && "a-menu--close"}`} >
      {subMenu ? (
        <div
          className={`a-menu__item a-menu__item--withSubMenu ${
            isActive && isOpen && "a-menu__item--active"
          }`}
          onClick={handleClick}
          
          
        >
          <span className="a-menu__icon">{mainMenu.icon}</span>
          <span className="a-menu__label a-menu__label--subMenu">
            {mainMenu.label}
          </span>
          <div ref={subMenuRef} className="a-menu__subMenuWrapper">
            {subMenu?.map((item, i) => (
              <NavLink to={item.url} className="a-menu__subMenu" key={i}>
                <ArrowRightOutlined />
                <span className="a-menu__subMenuLabel">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <NavLink to={mainMenu.url} className="a-menu__item">
          <span className="a-menu__icon">{mainMenu.icon}</span>
          <span className="a-menu__label">{mainMenu.label}</span>
        </NavLink>
      )}
    </div>
  );
};

export default Menu;
