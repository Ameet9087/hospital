import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import "./sterilization.css";
import PendingItemList from "./PendingItem/PendingItemList";
import FinalizedItemList from "./FinalizedItem/FinalizedItemList";

function Sterilization() {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRefs = useRef([]);

  const handleNavLinkClick = (index) => {
    const navItem = navRefs.current[index];
    const left = navItem.offsetLeft;
    const width = navItem.offsetWidth;

    setUnderlineStyle({
      left: `${left}px`,
      width: `${width}px`,
      transition: "left 0.3s ease, width 0.3s ease", // Adding transition for animation
    });
  };

  useEffect(() => {
    // Initialize underline position on the first render
    handleNavLinkClick(0);
  }, []);

  return (
    <main className="sterilization-main">
      <nav className="sterilization-sub-nav">
        <ul>
          <li ref={(el) => (navRefs.current[0] = el)}>
            <NavLink
              to="PendingItems"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(0)}
            >
              Pending Item List
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[1] = el)}>
            <NavLink
              to="FinalizedItems"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(1)}
            >
              Finalized Item List
            </NavLink>
          </li>
        </ul>
        <div className="underline" style={underlineStyle}></div>
      </nav>

      <Routes>
        <Route path="PendingItems" element={<PendingItemList />} />
        <Route path="FinalizedItems" element={<FinalizedItemList />} />
        <Route path="*" element={<PendingItemList />} />
      </Routes>
    </main>
  );
}

export default Sterilization;
