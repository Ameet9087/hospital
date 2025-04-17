import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ManageImagingType.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import CustomModal from "../../../CustomModel/CustomModal";
import { useFilter } from "../../ShortCuts/useFilter";
import axios from "axios";
import { FloatingInput, PopupTable } from "../../../FloatingInputs";
import { toast } from "react-toastify";

const ManageImagingItem = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isValidForReporting, setIsValidForReporting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [imagingTypes, setImagingTypes] = useState([]);
  const [imagingTypeList, setImagingTypeList] = useState([]);
  const [selectedImagingType, setSelectedImagingType] = useState("");
  const [procedureCode, setProcedureCode] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activePopup, setActivePopup] = useState("");

  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState();

  const [radiologyTemplate, setRadiologyTemplate] = useState([]);
  const [selectedRadiologyTemplate, setSelectedRadiologyTemplate] = useState();

  const tableRef = useRef(null);
  useEffect(() => {
    fetchImagingItems();
    fetchImagingTypes();
    fetchServiceDetails();
    fetchAllRadiologyTemplate();
  }, []);

  const fetchImagingItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/imaging-items/getAll`);
      const data = await response.json();
      setImagingTypes(data);
    } catch (error) {
      console.error("Error fetching imaging items:", error);
    }
  };

  const fetchImagingTypes = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/imaging-type/imaging-types`
      );
      const data = await response.json();
      setImagingTypeList(data);
    } catch (error) {
      console.error("Error fetching imaging types:", error);
    }
  };

  const fetchServiceDetails = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/service-details/sorted-map?serviceTypeName=Radiology`
    );
    setServiceDetails(response.data);
  };

  const fetchAllRadiologyTemplate = async () => {
    const response = await axios.get(`${API_BASE_URL}/radiology-templates`);
    setRadiologyTemplate(response.data);
  };

  const getPopupData = () => {
    if (activePopup === "serviceDetails") {
      return {
        columns: ["serviceDetailsId", "serviceName", "serviceTypeName"],
        data: serviceDetails,
      };
    } else if (activePopup === "imagingType") {
      return {
        columns: ["imagingTypeId", "imagingTypeName"],
        data: imagingTypeList,
      };
    } else if (activePopup === "radiologyTemplate") {
      return {
        columns: ["radiologyTemplateId", "templateName"],
        data: radiologyTemplate,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup === "serviceDetails") {
      setSelectedServiceDetails(data);
    } else if (activePopup === "imagingType") {
      setSelectedImagingType(data);
    } else if (activePopup === "radiologyTemplate") {
      setSelectedRadiologyTemplate(data);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setRole(item.imagingItemName);
      setIsActive(item.isActive === "true");
      setIsValidForReporting(item.isValidForReporting === "true");
      setSelectedImagingType(item.imagingType);
      setSelectedRadiologyTemplate(item.radiologyTemplateDTO);
      setProcedureCode(item.procedureCode || "");
      setIsEditMode(true);
    } else {
      setCurrentItem(null);
      setRole("");
      setIsActive(false);
      setIsValidForReporting(false);
      setSelectedImagingType("");
      setProcedureCode("");
      setIsEditMode(false);
    }
    setShowEditModal(true);
  };

  const handleCloseModal = () => setShowEditModal(false);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = useFilter(imagingTypes, searchTerm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newItem = {
      imagingItemName: selectedServiceDetails?.serviceName || role,
      isActive: isActive ? "true" : "false",
      isValidForReporting: isValidForReporting ? "true" : "false",
      imagingType: {
        imagingTypeId: selectedImagingType?.imagingTypeId,
      },
      radiologyTemplateDTO: {
        radiologyTemplateId: selectedRadiologyTemplate?.radiologyTemplateId,
      },
      createdDate: date,
      createdTime: time,
      procedureCode,
    };
    try {
      if (isEditMode) {
        await fetch(
          `${API_BASE_URL}/imaging-items/update/${currentItem.imagingItemId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
          }
        );
        toast.success("Item Updated Successfully");
      } else {
        await fetch(`${API_BASE_URL}/imaging-items/create-imaging-items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        toast.success("New item added");
      }
      fetchImagingItems();
    } catch (error) {
      toast.error("Error submitting form:", error);
    }
    setShowEditModal(false);
  };
  const resetForm = (e) => {
    e.preventDefault(); // Prevent form submission when resetting
    setRole("");
    setIsActive(false);
    setIsValidForReporting(false);
    setSelectedImagingType("");
    setProcedureCode("");
    setSelectedServiceDetails(null);
    setSelectedRadiologyTemplate(null);
    setIsEditMode(false);
  };

  return (
    <>
      <div className="manage-imaging-item-container">
        <div>
          <button
            className="manage-imaging-item-btn"
            onClick={() => handleOpenModal()}
          >
            + Add Item
          </button>
        </div>
        <div className="manage-imaging-item-search-bar">
          <FloatingInput
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="manage-item">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Type",
                  "Item Name",
                  "Procedure Code",
                  "isActive",
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
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.imagingType?.imagingTypeName || ""}</td>
                  <td>{item.imagingItemName}</td>
                  <td>{item.procedureCode}</td>
                  <td>{item.isActive}</td>
                  <td>
                    <button
                      className="manage-imaging-item-edit-button"
                      onClick={() => handleOpenModal(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CustomModal isOpen={showEditModal} onClose={handleCloseModal}>
          <div className="manage-modal-dialog-item">
            <div className="manage-modal-modal-header">
              <div className="manage-modal-modal-title">
                {isEditMode ? "Update Imaging Item" : "Add New Imaging Item"}
              </div>
            </div>
            <div className="manage-modal-modal-body-item">
              <form onSubmit={handleSubmit}>
                {/* Section 1: Imaging Type and Item Details */}
                <div className="manage-modal-section">
                  <h3 className="manage-modal-section-title">
                    Imaging Details
                  </h3>

                  <div className="manage-modal-form-group">
                    <FloatingInput
                      label={"Imaging Type"}
                      type="search"
                      value={selectedImagingType?.imagingTypeName}
                      required
                      onIconClick={() => setActivePopup("imagingType")}
                    />
                  </div>

                  <div className="manage-modal-form-group">
                    <FloatingInput
                      label={"Imaging Item Name"}
                      type="search"
                      value={selectedServiceDetails?.serviceName || role}
                      placeholder="Imaging Item Name"
                      onIconClick={() => setActivePopup("serviceDetails")}
                      required
                    />
                  </div>
                  <div className="manage-modal-form-group">
                    <FloatingInput
                      label={"Template"}
                      type="search"
                      value={selectedRadiologyTemplate?.templateName}
                      placeholder="Template Name"
                      required
                      onIconClick={() => setActivePopup("radiologyTemplate")}
                    />
                  </div>

                  <div className="manage-modal-form-group">
                    <FloatingInput
                      label={"Procedure Code"}
                      type="text"
                      value={procedureCode}
                      onChange={(e) => setProcedureCode(e.target.value)}
                      placeholder="Procedure Code"
                      required
                    />
                  </div>
                </div>
                {/* Active Status */}
                <div className="manage-modal-form-group">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="manage-modal-form-check-input"
                  />
                  <label>Is Active</label>
                </div>

                <div className="manage-modal-form-group">
                  <input
                    type="checkbox"
                    checked={isValidForReporting}
                    onChange={(e) => setIsValidForReporting(e.target.checked)}
                    className="manage-modal-form-check-input"
                  />
                  <label>Is Valid For Reporting</label>
                </div>

                <button type="submit" className="manage-modal-submit-btn">
                  {isEditMode ? "Update" : "Add"}
                </button>
                <button className="manage-modal-submit-btn" onClick={resetForm}>Reset</button>
              </form>
            </div>
          </div>
        </CustomModal>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
};

export default ManageImagingItem;
