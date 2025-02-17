import React, { useState, useRef, useEffect } from "react";
import "./ManageImagingType.css";
import UpdateTemplate from "./UpdateTemplate";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

const ManageRadiologyTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null); // To manage edit state
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [templateData, setTemplateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Search-filtered data
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  const fetchAllTemplateData = async () => {
    const response = await axios.get(`${API_BASE_URL}/radiology-templates`);
    setTemplateData(response.data);
    setFilteredData(response.data);
  };

  useEffect(() => {
    fetchAllTemplateData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter templates based on module name, template code, or template name
    const filtered = templateData.filter(
      (item) =>
        item.moduleName.toLowerCase().includes(value) ||
        item.templateCode.toLowerCase().includes(value) ||
        item.templateName.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  const handleEditClick = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
    fetchAllTemplateData();
  };

  return (
    <div className="manage-imaging-type-container">
      <div>
        <button className="manage-imaging-type-btn" onClick={handleAddClick}>
          +Add Template
        </button>
      </div>
      <div className="manage-imaging-type-search-bar">
        <FloatingInput
          label={"Search"}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Module Name", "Template Code", "Template Name", "Action"].map(
                (header, index) => (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.moduleName}</td>
                  <td>{item.templateCode}</td>
                  <td>{item.templateName}</td>
                  <td>
                    <button
                      className="manage-imaging-type-edit-button"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data-message">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(null)}>
          <UpdateTemplate template={editData} onClose={handleCloseModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default ManageRadiologyTemplate;
