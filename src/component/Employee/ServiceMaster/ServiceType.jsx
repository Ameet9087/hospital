import React, { useEffect, useRef, useState } from "react";
import "./ServiceType.css";
import { FloatingInput, PopupTable } from "../../../FloatingInputs";
import CustomModal from "../../../CustomModel/CustomModal";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { toast } from "react-toastify";
function ServiceType() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [formData, setFormData] = useState({
    serviceTypeName: "",
    serviceTypeCode: "",
    description: "",
    status: "no",
    emergencyPercentOPD: "",
    emergencyPercentIPD: "",
    rismodality: "",
  });
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [id, setId] = useState(0);
  const [groupServiceData, setGroupServiceData] = useState([]);
  const [activePopup, setActivePopup] = useState(false);
  const [selectedGroupService, setSelectedGroupService] = useState();

  const fetchserviceType = async () => {
    const response = await axios.get(`${API_BASE_URL}/servicetypes`);
    setServiceData(response.data);
  };

  const fetchGroupServiceType = async () => {
    const response = await axios.get(`${API_BASE_URL}/group-service-types`);
    setGroupServiceData(response.data);
  };

  useEffect(() => {
    fetchGroupServiceType();
    fetchserviceType();
  }, []);
  const handlechange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "status" ? "yes" : value, // Fixed the extra space
    }));
  };

  const getPopupData = () => {
    if (activePopup) {
      return {
        columns: ["groupServiceId", "groupServiceTypeName"],
        data: groupServiceData,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup) {
      setSelectedGroupService(data);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditData(true);
    setSelectedGroupService(item.groupServiceTypeDTO);
    setIsModelOpen(true);
    setId(item.serviceTypeId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    formData.groupServiceTypeDTO = {
      groupServiceId: selectedGroupService.groupServiceId,
    };
    let response;
    try {
      if (editData) {
        response = await axios.put(
          `${API_BASE_URL}/servicetypes/${id}`,
          formData
        );
      } else {
        response = await axios.post(`${API_BASE_URL}/servicetypes`, formData);
      }
      if (response) {
        {
          editData
            ? toast.success("Data Updated Successfully")
            : toast.success("Data Added Successfully");
        }
      }
      setEditData(false);
      setIsModelOpen(false);
      setFormData({
        serviceTypeName: "",
        serviceTypeCode: "",
        description: "",
        status: "no",
        emergencyPercentOPD: "",
        emergencyPercentIPD: "",
        rismodality: "",
      });
      fetchserviceType();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/servicetypes/${id}`);
      toast.success("Data Deleted Successfully");
      fetchserviceType();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="serviceTypeCon">
        <button
          onClick={() => setIsModelOpen(true)}
          className="serviceType-btn"
        >
          Add Service Type
        </button>
        <div className="serviceType-table">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "SN",
                  "Service Name",
                  "Service Code",
                  "Description",
                  "Status",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] || "auto" }}
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
              {serviceData?.length > 0 ? (
                serviceData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.serviceTypeName}</td>
                    <td>{item.serviceTypeCode}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(item)}
                        className="serviceType-edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.serviceTypeId)}
                        className="serviceType-delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <div className="serviceTypeForm-con">
          <h1>
            {editData ? "Update Group Service Type" : "Add Group Service Type"}
          </h1>
          <form className="serviceTypeForm" onSubmit={handleSubmit}>
            <FloatingInput
              label={"Group Service Type"}
              type="search"
              value={selectedGroupService?.groupServiceTypeName}
              onIconClick={() => setActivePopup(true)}
            />
            <FloatingInput
              label={"Service Type Name"}
              name={"serviceTypeName"}
              value={formData.serviceTypeName}
              onChange={handlechange}
            />
            <FloatingInput
              label={"Service Type Code"}
              name={"serviceTypeCode"}
              value={formData.serviceTypeCode}
              onChange={handlechange}
            />
            <FloatingInput
              label={"Description"}
              name={"description"}
              value={formData.description}
              onChange={handlechange}
            />
            <FloatingInput
              label={"Emergency Percent OPD"}
              name={"emergencyPercentOPD"}
              value={formData.emergencyPercentOPD}
              onChange={handlechange}
            />
            <FloatingInput
              label={"Emergency Percent IPD"}
              name={"emergencyPercentIPD"}
              value={formData.emergencyPercentIPD}
              onChange={handlechange}
            />
            <label>
              Is Active{" "}
              <input
                type="checkbox"
                name="status"
                value={formData.status}
                onChange={handlechange}
              ></input>
            </label>
            <button className="serviceTypeForm-subBtn" type="submit">
              {editData ? "update" : "Submit"}
            </button>
          </form>
        </div>
      </CustomModal>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onClose={() => setActivePopup(false)}
          onSelect={handleSelect}
        />
      )}
    </>
  );
}

export default ServiceType;
