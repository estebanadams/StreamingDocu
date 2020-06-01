import React from "react";
import { DesktopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "../styles/header.scss";

const Header: React.FC = () => {
  return (
    <Link to="/" className="header-container">
      <DesktopOutlined className="icon" />
      <span className="title">Dindondodu</span>
    </Link>
  );
};

export default Header;
