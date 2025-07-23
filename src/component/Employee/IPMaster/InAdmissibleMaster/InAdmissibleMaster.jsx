import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./InAdmissibleMaster.css";

function InAdmissibleMaster() {
  const [rows, setRows] = useState([{ id: 1, serviceName: "" }]);
  const [activeTab, setActiveTab] = useState("Services");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [corporateName, setCorporateName] = useState(""); // State for corporate name
  const [corporateNameError, setCorporateNameError] = useState(""); // Error state for corporate name


  const toggleSearch = () => setIsSearchVisible((prevState) => !prevState);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, serviceName: "" };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    if (id === 1) return;
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, serviceName: value } : row)));
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setRows([{ id: 1, serviceName: "" }]);
  };

  const getSearchLink = () => {
    if (activeTab === "Services") return "/services-name-search";
    if (activeTab === "Investigations") return "/investigations-name-search";
    if (activeTab === "Pharmacy") return "/pharmacy-name-search";
    return "/";
  };

  // const handleSave = async () => {
  //   try {
  //     const payload = {
  //       corporateName,
  //       addItems: rows.map((row) => ({ id: row.id })),
  //       investigations: activeTab === "Investigations" ? rows.map((row) => ({ id: row.id })) : [],
  //       serviceDetails: activeTab === "Services" ? rows.map((row) => ({ id: row.id })) : [],
  //     };

  //     const response = await axios.post("http://192.168.0.117:8080/api/inadmissibles", payload);
  //     alert("Data saved successfully!");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //     alert("Failed to save data. Please try again.");
  //   }
  // };

  const validateForm = () => {
    let isValid = true;

    if (!corporateName.trim()) {
      setCorporateNameError("Corporate Name is required.");
      isValid = false;
    } else {
      setCorporateNameError("");
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        corporateName,
        addItems: rows.map((row) => ({ id: row.id })),
        investigations: activeTab === "Investigations" ? rows.map((row) => ({ id: row.id })) : [],
        serviceDetails: activeTab === "Services" ? rows.map((row) => ({ id: row.id })) : [],
      };

      const response = await axios.post("http://192.168.0.117:8080/api/inadmissibles", payload);
      alert("Data saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="InadmissibleMaster-container">
      <div className="InadmissibleMaster-header"></div>
      <form>
        <label className="InadmissibleMaster-label">
          Corporate Name: <span className="InadmissibleMaster-required">*</span>
          <input
            type="text"
            className="InadmissibleMaster-input"
            placeholder="Enter Corporate Name"
            value={corporateName}
            onChange={(e) => setCorporateName(e.target.value)}
          />
        </label>

        <div className="InadmissibleMaster-tabs">
          <button
            type="button"
            className={`InadmissibleMaster-tab ${activeTab === "Services" ? "active" : ""}`}
            onClick={() => handleTabClick("Services")}
          >
            Services
          </button>
          <button
            type="button"
            className={`InadmissibleMaster-tab ${activeTab === "Investigations" ? "active" : ""}`}
            onClick={() => handleTabClick("Investigations")}
          >
            Investigations
          </button>
          <button
            type="button"
            className={`InadmissibleMaster-tab ${activeTab === "Pharmacy" ? "active" : ""}`}
            onClick={() => handleTabClick("Pharmacy")}
          >
            Pharmacy
          </button>
        </div>

        <table className="InadmissibleMaster-table">
          <thead>
            <tr className="InadmissibleMaster-top-row">
              <th colSpan="3" className="InadmissibleMaster-top-row-header">
                <div className="header-container">
                  <span>{activeTab.toUpperCase()} (Control + Enter For New Row)</span>
                  <FaSearch
                    className="search-icon"
                    onClick={toggleSearch}
                    style={{ cursor: "pointer" }}
                  />
                  {isSearchVisible && (
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search..."
                      onBlur={() => setIsSearchVisible(false)}
                    />
                  )}
                </div>
              </th>
            </tr>
            <tr className="InadmissibleMaster-header-row">
              <th className="InadmissibleMaster-cell">Actions</th>
              <th className="InadmissibleMaster-cell">SN</th>
              <th className="InadmissibleMaster-cell">{activeTab} Name</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="InadmissibleMaster-row">
                <td className="InadmissibleMaster-cell">
                  <button
                    type="button"
                    className="InadmissibleMaster-button add"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="InadmissibleMaster-button delete"
                    onClick={() => handleDeleteRow(row.id)}
                    disabled={row.id === 1}
                  >
                    Del
                  </button>
                </td>
                <td className="InadmissibleMaster-cell">{row.id}</td>
                <td className="InadmissibleMaster-cell">
                  <div className="InadmissibleMaster-input-container">
                    <input
                      type="text"
                      placeholder={`Enter ${activeTab} Name`}
                      value={row.serviceName}
                      onChange={(e) => handleInputChange(row.id, e.target.value)}
                      className="InadmissibleMaster-input"
                    />
                    <NavLink
                      to={getSearchLink()}
                      className={({ isActive }) =>
                        isActive
                          ? "InadmissibleMaster-link active"
                          : "InadmissibleMaster-link"
                      }
                    >
                      <FaSearch className="InadmissibleMaster-search-icon" />
                    </NavLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <div className="InadmissibleMaster-actions">
        <button type="button" onClick={handleSave} className="InadmissibleMaster-save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default InAdmissibleMaster;
