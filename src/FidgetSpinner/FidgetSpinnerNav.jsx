import React from "react";
import { Link } from "react-router-dom";
import { usePopup } from "./PopupContext";
import "./FidgetSpinnerNav.css";

const Popup = () => {
  const { isOpen, links, hidePopup } = usePopup();
  return (
    <div className={`fidget-spinner-popup ${isOpen ? "open" : ""}`}>
      <div className="fidget-spinner-popup-content">
        <span className="fidget-spinner-close" onClick={hidePopup}>
          &times;
        </span>
        <p>Do you want to navigate to another page?</p>
        <div className="fidget-spinner-link-list">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="fidget-spinner-navigate-link"
              onClick={hidePopup}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
