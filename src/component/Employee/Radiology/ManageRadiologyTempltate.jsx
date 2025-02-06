import React, { useState, useRef, useEffect } from "react";
import "./ManageImagingType.css";
import UpdateTemplate from "./UpdateTemplate";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";

const ManageRadiologyTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null); // To manage edit state
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [templateData, setTemplateData] = useState([]);
  const fetchAllTemplateData = async () => {
    const response = await axios.get(`${API_BASE_URL}/radiology-templates`);
    setTemplateData(response.data);
  };

  useEffect(() => {
    fetchAllTemplateData();
  }, []);

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
      <input
        type="text"
        className="manage-imaging-type-search-bar"
        placeholder="Search"
      />

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
            {templateData.map((item, index) => (
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
            ))}
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
