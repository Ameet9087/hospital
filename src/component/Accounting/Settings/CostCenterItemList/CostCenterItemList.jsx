import React, { useState, useRef } from "react";
import "./CostCenterItemList.css"; // Assuming you'll create a CSS file for styling
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const CostCenterItemList = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const [costCenters, setCostCenters] = useState([
    { name: "Hospital", parentCostCenter: "", description: "", isActive: true },
    {
      name: "Sana'a",
      parentCostCenter: "Hospital",
      description: "",
      isActive: true,
    },
    { name: "School", parentCostCenter: "", description: "", isActive: true },
    {
      name: "Tahrir",
      parentCostCenter: "Sana'a",
      description: "",
      isActive: true,
    },
    { name: "HR", parentCostCenter: "Sana'a", description: "", isActive: true },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    parentCostCenter: "",
    description: "",
    isActive: true,
  });

  const handleEdit = (costCenter) => {
    setShowEdit(true);
    setFormData({
      name: costCenter.name,
      parentCostCenter: costCenter.parentCostCenter,
      description: costCenter.description,
      isActive: costCenter.isActive,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    // Add new cost center logic here
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (
    <div className="CostCenterManager">
      <section className="CostCenterManager-addCostCenter">
        <h2 className="CostCenterManager-sectionTitle">Add Cost Center</h2>
        <form className="CostCenterManager-form">
          <label>
            Cost Center Name:
            <input
              className="CostCenterManager-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Cost Center Name"
            />
          </label>
          <label>
            Parent Cost Center:
            <select
              className="CostCenterManager-select"
              name="parentCostCenter"
              value={formData.parentCostCenter}
              onChange={handleInputChange}
            >
              <option value="">--Select Parent Cost Center--</option>
              {costCenters.map((cc) => (
                <option key={cc.name} value={cc.name}>
                  {cc.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Description:
            <input
              className="CostCenterManager-input"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
          </label>
          <label className="CostCenterManager-checkboxLabel">
            <input
              className="CostCenterManager-checkbox"
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
            />
            Is Active
          </label>
          {showEdit ? (
            <>
              <button className="CostCenterManager-addButton" type="button">
                Update
              </button>
              <button
                onClick={() => {
                  setFormData({
                    name: "",
                    parentCostCenter: "",
                    description: "",
                  });
                  setShowEdit(false);
                }}
                className="CostCenterManager-cancelButton"
                type="button"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="CostCenterManager-addButton"
              type="button"
              onClick={handleAdd}
            >
              Add
            </button>
          )}
        </form>
      </section>

      <section className="CostCenterManager-costCenterList">
        <div className="CostCenterManager-search-bar">
          <div className="CostCenterManager-search-container">
            <input type="text" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
          <div>
            <span className="CostCenterManager-results-count">
              Showing {costCenters.length} / {costCenters.length}
            </span>
            <button className="CostCenterManager-print-btn">Print</button>
          </div>
        </div>
        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Cost Center",
                  "Parent Cost Center",
                  "Description",
                  "Is Active",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(
                          tableRef,
                          setColumnWidths
                        )(index)}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {costCenters.map((cc) => (
                <tr key={cc.name}>
                  <td>{cc.name}</td>
                  <td>{cc.parentCostCenter}</td>
                  <td>{cc.description}</td>
                  <td>{cc.isActive.toString()}</td>
                  <td>
                    {!cc.isActive ? (
                      <button
                        onClick={() => {
                          setDeactivate(false);
                          cc.isActive = true;
                        }}
                        className="CostCenterManager-deactivateButton"
                      >
                        Activate
                      </button>
                    ) : (
                      <>
                        <button
                          className="CostCenterManager-editButton"
                          onClick={() => handleEdit(cc)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeactivate(true);
                            cc.isActive = false;
                          }}
                          className="CostCenterManager-deactivateButton"
                        >
                          Deactivate
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="CostCenterManager-pagination">
          <button className="CostCenterManager-paginationButton">First</button>
          <button className="CostCenterManager-paginationButton">
            Previous
          </button>
          <span className="CostCenterManager-paginationInfo">Page 1 of 1</span>
          <button className="CostCenterManager-paginationButton">Next</button>
          <button className="CostCenterManager-paginationButton">Last</button>
        </div> */}
      </section>
    </div>
  );
};

export default CostCenterItemList;
