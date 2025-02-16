import React, { useEffect, useRef, useState } from "react";
import "./GroupServiceType.css";
import { FloatingInput } from "../../../FloatingInputs";
import CustomModal from "../../../CustomModel/CustomModal";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { toast } from "react-toastify";
function GroupServiceType() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [formData, setFormData] = useState({
    groupServiceTypeName: "",
    groupServiceTypeCode: "",
    description: "",
    status: "no",
  });
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [groupServiceData, setGroupServiceData] = useState([]);
  const [id, setId] = useState(0);

  const fetchGroupServiceType = async () => {
    const response = await axios.get(`${API_BASE_URL}/group-service-types`);
    setGroupServiceData(response.data);
  };

  useEffect(() => {
    fetchGroupServiceType();
  }, []);
  const handlechange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "status" ? "yes" : value, // Fixed the extra space
    }));
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditData(true);
    setIsModelOpen(true);
    setId(item.groupServiceId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let response;
    try {
      if (editData) {
        response = await axios.put(
          `${API_BASE_URL}/group-service-types/${id}`,
          formData
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}/group-service-types`,
          formData
        );
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
        groupServiceTypeName: "",
        groupServiceTypeCode: "",
        description: "",
        status: "no",
      });
      fetchGroupServiceType();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/group-service-types/${id}`
      );
      toast.success("Data Deleted Successfully");
      fetchGroupServiceType();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="groupServiceTypeCon">
        <button
          onClick={() => setIsModelOpen(true)}
          className="groupServiceType-btn"
        >
          Add Group Type
        </button>
        <div className="groupServiceType-table">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "SN",
                  "Group Service Name",
                  "Group Service Code",
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
              {groupServiceData?.length > 0 ? (
                groupServiceData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.groupServiceTypeName}</td>
                    <td>{item.groupServiceTypeCode}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(item)}
                        className="groupServiceType-edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.groupServiceId)}
                        className="groupServiceType-delete-btn"
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
        <div className="groupServiceTypeForm-con">
          <h1>
            {editData ? "Update Group Service Type" : "Add Group Service Type"}
          </h1>
          <form className="groupServiceTypeForm" onSubmit={handleSubmit}>
            <FloatingInput
              label={"Group Service Type Name"}
              name={"groupServiceTypeName"}
              value={formData.groupServiceTypeName}
              onChange={handlechange}
            />
            <FloatingInput
              label={"Group Service Type Code"}
              name={"groupServiceTypeCode"}
              value={formData.groupServiceTypeCode}
              onChange={handlechange}
            />
            <FloatingInput
              label={"Description"}
              name={"description"}
              value={formData.description}
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
            <button className="groupServiceTypeForm-subBtn" type="submit">
              {editData ? "update" : "Submit"}
            </button>
          </form>
        </div>
      </CustomModal>
    </>
  );
}

export default GroupServiceType;
