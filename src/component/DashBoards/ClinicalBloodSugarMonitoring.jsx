import React, { useRef, useState, useEffect } from "react";
import "./ClinicalBloodSugarMonitoring.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingInput } from "../../FloatingInputs";

const ClinicalBloodSugarMonitoring = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [bloodData, setBloodData] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    addedDate: "",
    addedTime: "",
    rbs: "",
    insulin: "",
    remarks: "",
  });

  const [newFormData, setNewFormData] = useState({
    addedDate: "",
    addedTime: "",
    rbs: "",
    insulin: "",
    remarks: "",
  });

  const fetchBloodSugarData = () => {
    let endpoint = "";

    // Determine if newPatientVisitId or admissionId should be used
    if (outPatientId) {
      endpoint = `${API_BASE_URL}/blood-sugar-monitoring/by-newPatientVisitId?newPatientVisitId=${outPatientId}`;
    } else if (patientId) {
      endpoint = `${API_BASE_URL}/blood-sugar-monitoring/by-patientId?patientId=${patientId}`;
    }

    // Fetch data if a valid endpoint is determined
    if (endpoint) {
      axios
        .get(endpoint)
        .then((response) => {
          if (response.data.length > 0) {
            setBloodData(response.data);
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching blood sugar data:", error);
        });
    }
  };
  // Fetch blood sugar data
  useEffect(() => {
    if (outPatientId || patientId) {
      fetchBloodSugarData();
    }
  }, [outPatientId, patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormData({
      ...newFormData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response; // Declare response outside the if...else block
    try {
      // Prepare blood data for submission
      const bloodData = {
        addedDate: newFormData.addedDate,
        addedTime: newFormData.addedTime,
        rbs: newFormData.rbs,
        insulin: newFormData.insulin,
      };

      // If editing an existing record, include the id in the data
      if (formData.id) {
        // Do not pass patientDTO or newPatientVisitDTO for updates
        console.log("Updating existing record:", bloodData);
        // Use PUT method for updating
        const endpoint = `${API_BASE_URL}/blood-sugar-monitoring/update/${formData.id}`;
        response = await axios.put(endpoint, bloodData); // Assign response here
      } else {
        // For new entries, attach patient or visit info
        if (patientId > 0) {
          bloodData.inPatientDTO = { inPatientId: patientId };
        } else if (outPatientId) {
          bloodData.outPatientDTO = { outPatientId };
        }

        console.log("Saving new record:", bloodData);
        response = await axios.post(
          `${API_BASE_URL}/blood-sugar-monitoring/save`,
          bloodData
        ); // Assign response here
      }

      // Check response status and handle success
      if (response.status === 200) {
        toast.success("Data saved successfully");
        handleCloseForm();
        fetchBloodSugarData();
      }
    } catch (error) {
      toast.error("Error saving data:", error);
    }
  };

  const handleAddNew = () => {
    setShowForm(true);
    setNewFormData({
      addedDate: "",
      addedTime: "",
      rbs: "",
      insulin: "",
      remarks: "",
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEdit = (record) => {
    setNewFormData({
      // Set the newFormData directly from the record
      addedDate: record.addedDate, // Keep the format as needed for input
      addedTime: record.addedTime,
      rbs: record.rbs,
      insulin: record.insulin,
      remarks: record.remarks,
    });
    setFormData({
      // Set formData to hold the id for submission
      id: record.bloodSugarId,
    });
    setShowForm(true);
  };

  return (
    <div className="clinical-blood-sugar-monitoring-container">
      <div className="clinical-blood-sugar-monitoring-header">
        <h2 className="clinical-blood-sugar-monitoring-title">
          Blood Sugar Monitoring
        </h2>
        <button
          className="clinical-blood-sugar-monitoring-add-new"
          onClick={handleAddNew}
        >
          + Add New
        </button>
      </div>

      <div className="clinical-blood-sugar-monitoring-main-content">
        {/* Left Panel with Table */}
        <div className="clinical-blood-sugar-monitoring-left-panel">
          <table className="patientList-table" ref={tableRef}>
            <thead>
              <tr>
                {["Date", "Time", "RBS", "Insulin", "Remarks", "Actions"].map(
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
              {bloodData.length > 0 ? (
                bloodData.map((record) => (
                  <tr key={record.bloodSugarId}>
                    <td>{record.addedDate}</td>
                    <td>{record.addedTime}</td>
                    <td>{record.rbs}</td>
                    <td>{record.insulin}</td>
                    <td>{record.remarks}</td>
                    <td>
                      <button className="clinical-blood-sugar-monitoring-add-new" onClick={() => handleEdit(record)}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="clinical-blood-sugar-monitoring-no-rows"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Form on the right, only visible when 'Add New' or 'Edit' is clicked */}
        {showForm && (
          <div className="clinical-blood-sugar-monitoring-right-panel">
            <div className="clinical-blood-sugar-monitoring-header">
              <h3>
                {formData.id
                  ? "Edit Blood Sugar Entry"
                  : "Blood Sugar New Entry"}
              </h3>
              <button
                className="clinical-blood-sugar-monitoring-close"
                onClick={handleCloseForm}
              >
                ✖
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="clinical-blood-sugar-monitoring-entry-fields">
                <div className="clinical-blood-sugar-monitoring-sub-div">
                  <FloatingInput
                    label={"Date"}
                    type="date"
                    name="addedDate"
                    value={newFormData.addedDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="clinical-blood-sugar-monitoring-sub-div">
                  <FloatingInput
                    label={"Time"}
                    type="time"
                    name="addedTime"
                    value={newFormData.addedTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="clinical-blood-sugar-monitoring-sub-div">
                  <FloatingInput
                    label={"RBS"}
                    type="text"
                    name="rbs"
                    placeholder="RBS"
                    value={newFormData.rbs}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="clinical-blood-sugar-monitoring-sub-div">
                  <FloatingInput
                    label={"Insulin"}
                    type="text"
                    name="insulin"
                    placeholder="Insulin"
                    value={newFormData.insulin}
                    onChange={handleChange}
                  />
                </div>
                <div className="clinical-blood-sugar-monitoring-sub-div">
                  <FloatingInput
                    label={"Remarks"}
                    type="text"
                    name="remarks"
                    placeholder="Remarks"
                    value={newFormData.remarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="clinical-blood-sugar-monitoring-form-buttons">
                {/* <button
                  type="button"
                  className="clinical-blood-sugar-monitoring-discard"
                  onClick={handleCloseForm}
                >
                  Discard
                </button> */}
                <button
                  type="submit"
                  className="clinical-blood-sugar-monitoring-discard"
                >
                  {formData.id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalBloodSugarMonitoring;
