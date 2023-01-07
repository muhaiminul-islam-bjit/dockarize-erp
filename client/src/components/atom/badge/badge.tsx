import React from "react";
import "./badge.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  isLarge?: boolean;
  danger?: boolean;
}

const Badge: React.FC<ButtonProps> = ({ label, onClick, isLarge, danger }) => {
  return (
    <span className={`a-badge ${isLarge && 'a-badge--large'} ${danger && 'a-badge--danger'}`} onClick={onClick}>
      {label}
    </span>
  );
};

export default Badge;
