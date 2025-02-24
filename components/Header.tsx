import React from "react";
import Logo from "./icons/Logo";

// Header Component

const Header = () => {
  return (
    <div className="header">
      <a href="https://www.attractiontickets.com/" target="_blank">
        <Logo/>
      </a>
    </div>
  );
};

export default Header;