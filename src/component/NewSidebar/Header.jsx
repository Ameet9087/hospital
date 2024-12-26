import React from "react";
import { GoBell } from "react-icons/go";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogout = () => {
    sessionStorage.clear();
    Cookies.remove("isAuthenticated");
    Cookies.remove("moduleOrder");
    window.location.reload();
  };

  return (
    <div className="hrmsDashSidebarHeader">
      <button className="custom-toggle-button" onClick={toggleSidebar}>
        {isOpen ? <LuChevronLeft size={20} /> : <LuChevronRight size={20} />}
      </button>
      <div className="hrmsDashHeaderRight">
        <button className="hrmsDashNotificationButton" onClick={toggleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
