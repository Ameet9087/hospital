import React, { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileClicked((prev) => !prev);

  const toggleLogout = () => {
    sessionStorage.clear();
    Cookies.remove("isAuthenticated");
    Cookies.remove("moduleOrder");
    window.location.reload();
  };

  // Mock user data (Replace with real user data from API or Context)
  const user = {
    name: "John Doe",
    department: "Radiology",
    imageUrl: "", // Leave empty to test initials fallback
  };

  // Get initials (First letter of first & last name)
  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <div className="hrmsDashSidebarHeader">
      {/* Sidebar Toggle Button */}
      <button className="custom-toggle-button" onClick={toggleSidebar}>
        {isOpen ? <LuChevronLeft size={20} /> : <LuChevronRight size={20} />}
      </button>

      {/* Profile Section Inside Header */}
      <div className={`profile-container ${isProfileClicked ? "active" : ""}`}>
        {isProfileClicked && (
          <div className="profile-info">
            <span className="profile-name">Name: {user.name}</span>
            <span className="profile-department">
              Department: {user.department}
            </span>
            <button className="logout-button" onClick={toggleLogout}>
              Log out
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        )}
        <div className="profile-logo" onClick={toggleProfile}>
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-initials">{getInitials(user.name)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
