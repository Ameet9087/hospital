import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput } from "../../../FloatingInputs";
import CustomModal from "../../../CustomModel/CustomModal";
import { useFilter } from "../../ShortCuts/useFilter";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import "./ManageImagingType.css";

const ManageImagingType = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImagingType, setSelectedImagingType] = useState(null);
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagingTypes, setImagingTypes] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchImagingTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/imaging-type/imaging-types`);
        console.log("Fetched Data:", response.data);
        setImagingTypes(response.data);
      } catch (error) {
        console.error("Error fetching imaging types:", error);
      }
    };
    fetchImagingTypes();
  }, []);

  const filteredItems = useFilter(imagingTypes, searchTerm);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
 
  
  const handleEditClick = (type) => {
    setSelectedImagingType(type);
    setRole(type.imagingTypeName);
    setIsActive(type.isActive === "true");
    setCreatedDate(type.createdDate);
    setCreatedTime(type.createdTime);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setSelectedImagingType(null);
    setRole("");
    setIsActive(false);
    setCreatedDate("");
    setCreatedTime("");
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImagingType(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imagingTypeData = {
      imagingTypeName: role,
      isActive: isActive ? "true" : "false",
      createdDate: createdDate || new Date().toISOString().split("T")[0],
      createdTime: createdTime || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      if (isEditMode && selectedImagingType) {
        console.log("Updating Imaging Type:", selectedImagingType.imagingTypeId);
        await axios.put(
          `${API_BASE_URL}/imaging-type/imaging-types/${selectedImagingType.imagingTypeId}`,
          imagingTypeData
        );
        toast.success("Updated Successfully!");
      } else {
        console.log("Adding New Imaging Type:", imagingTypeData);
        await axios.post(`${API_BASE_URL}/imaging-type/imaging-types`, imagingTypeData);
        toast.success("Added Successfully!");
      }

      const response = await axios.get(`${API_BASE_URL}/imaging-type/imaging-types`);
      setImagingTypes(response.data);
      handleCloseModal();
    } catch (error) {
      toast.error("Error submitting imaging type.");
      console.error("Error:", error);
    }
  };
  const handleReset = (event) => {
    event.preventDefault();  // Prevent form submission when reset is clicked
    setRole("");
    setDescription("");
    setIsActive(false);
    setCreatedDate("");
    setCreatedTime("");
    setResetClicked(true);  // Mark that reset was clicked
  };
  
  return (
    <div className="manage-imaging-type-container">
      <div>
        <button className="manage-imaging-type-btn" onClick={handleAddClick}>
          + Add Imaging Type
        </button>
      </div>
      <div className="manage-imaging-type-search-bar">
        <FloatingInput label="Search" type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Type Name", "Is Active", "Action"].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((type, index) => (
              <tr key={index}>
                <td>{type.imagingTypeName}</td>
                <td>{type.isActive}</td>
                <td>
                  <button className="manage-imaging-type-edit-button" onClick={() => handleEditClick(type)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showModal} onClose={handleCloseModal}>
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">{isEditMode ? "Update Imaging Type" : "Add Imaging Type"}</div>
          </div>
          <div className="manage-modal-modal-body">
            <form onSubmit={handleSubmit}>
              <div className="manage-modal-form-group">
                <FloatingInput label="Imaging Item Name" type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
              </div>

              <div className="manage-modal-form-group">
                <label className="manage-modal-form-label">Is Active:</label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="manage-modal-form-check-input"
                />
              </div>

              <div className="manage-modal-form-group">
                <FloatingInput label="Created Date" type="date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
              </div>

              <div className="manage-modal-form-group">
                <FloatingInput label="Created Time" type="time" value={createdTime} onChange={(e) => setCreatedTime(e.target.value)} />
              </div>

              <button type="submit" className="manage-modal-employee-btn">
                {isEditMode ? "Update" : "Add"}
              </button>
              <button  className="manage-modal-employee-btn" onClick={handleReset}> Reset</button>
            </form>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ManageImagingType;
