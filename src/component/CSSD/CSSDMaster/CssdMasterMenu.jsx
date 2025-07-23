import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CssdMasterMain.css';

function CssdMaster() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const buttons = [
    { label: "CSSD Item Master", path: "CSSDItemMaster" },
    { label: "CSSD Kit Category", path: "cssd-kit-category" },
    { label: "CSSD Kit Master", path: "cssd-kit-master" },
    { label: "Machine Master", path: "cssd-machine-master" },
  ];

  const handleClick = (index, path) => {
    setSelected(index);
    navigate(path);
  };

  return (
    <nav className="CssdMaster-navbar">
      {buttons.map((button, index) => (
        <div
          key={index}
          className={`CssdMaster-nav-item ${selected === index ? "CssdMaster-active" : ""}`}
          onClick={() => handleClick(index, button.path)}
        >
          {button.label}
        </div>
      ))}
    </nav>
  );
}

export default CssdMaster;
