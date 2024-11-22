import React from "react";
import { GoBell } from "react-icons/go";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./Header.css";

const Header = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hrmsDashSidebarHeader">
      <button className="custom-toggle-button" onClick={toggleSidebar}>
        {isOpen ? <LuChevronLeft size={20} /> : <LuChevronRight size={20} />}
      </button>
      <div className="hrmsDashHeaderRight">
        <button className="hrmsDashNotificationButton">
          <GoBell size={28} />
          <span className="hrmsDashNotificationBadge">9</span>
        </button>
        <img
          className="hrmsDashProfileImage"
          src="https://randomuser.me/api/portraits/women/50.jpg"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Header;
