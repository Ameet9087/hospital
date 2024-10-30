// Sidebar.jsx
import React, { useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { FaClinicMedical } from 'react-icons/fa';
import './Sidebar.css';
import hospitallogo from '../Images/hospitallogo.png';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleItemClick = (menu, submenu) => {
    setActiveLink(`${menu}-${submenu}`);
  };

  const menuItems = [
    {
      title: "Dispensary",
      icon: <FaClinicMedical />,
      subItems: [
        { title: "Prescription", path: "/dispensary/disPrescription" },
        { title: "Sale", path: "/dispensary/dispenSales" },
        { title: "Stock", path: "/dispensary/salesStockDetails" },
        // Add more paths as needed
      ],
    },
  ];
  

  return (
    <div className={`custom-sidebar ${isOpen ? '' : 'custom-sidebar-closed'}`}>
      <div className="custom-logo-container">
        {isOpen ? (
          <span>
            <img style={{ width: '30px', marginRight: '10px' }} src={hospitallogo} alt="Hospital Logo" />
            <span>HIMS</span>
          </span>
        ) : (
          <img style={{ width: '30px' }} src={hospitallogo} alt="Hospital Logo" />
        )}
      </div>
      <ul className="custom-sidebar-links">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className={`custom-nav-item ${activeLink?.startsWith(menu.title.toLowerCase()) ? 'custom-nav-item-active' : ''}`}
          >
            <div className="custom-nav-link-content" onClick={() => handleLinkClick(menu.title)}>
              <span>{menu.icon}</span>
              {isOpen && <span className="custom-nav-link-text">{menu.title}</span>}
              <span className="custom-dropdown-icon">
                {openMenus[menu.title] ? <LuChevronUp /> : <LuChevronDown />}
              </span>
            </div>
            {openMenus[menu.title] && isOpen && (
              <ul className="custom-submenu">
                {menu.subItems.map((submenu, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => handleItemClick(menu.title.toLowerCase(), submenu.title.toLowerCase())}
                    className={activeLink === `${menu.title.toLowerCase()}-${submenu.title.toLowerCase()}` ? 'custom-submenu-active' : ''}
                  >
                    <Link to={submenu.path}>{submenu.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
