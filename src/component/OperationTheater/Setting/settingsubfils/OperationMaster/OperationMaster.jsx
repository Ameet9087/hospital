import React, { useState, useEffect } from 'react';
import './OperationMaster.css';
import axios from 'axios';
import { API_BASE_URL } from "../../../../api/api"

const OperationMaster = () => {
  const [formData, setFormData] = useState({
    operationName: '',
    operationType: '',
    entryCode: '',
    companyName: '',
    companyCode: '',
    calculationMethodology: '',
    category: '',
    source: '',
    timeInMinutes: '',
    department: '',
    departmentSelection: '',
    equipment: '',
    packageDtl: '',
    docterFeeVisit: '',
    emergencyFee: '',
    increase: '',
    message: '',
    classification: '',
    sacCODE: '',
    gstCategory: '',
    serviceDetailsIds: []
  });

  const [rows, setRows] = useState([{ id: 1, serviceName: "", displayName: "", companyCode: "" }]);
  const [serviceOptions, setServiceOptions] = useState([]);


  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch service options from the API
 const fetchServices = async () => {
  try {
    const response = await axios.get(`${ API_BASE_URL }/service-details`);
    const services = response.data.map((service) => ({
      id: service.sn,
      name: service.serviceName,
      displayName: service.displayName,
      companyCode: service.companyCode,
    }));
    setServiceOptions(services);
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("Network error or no response:", error.message);
    } else {
      console.error("Unexpected error:", error.message);
    }
    alert("Failed to fetch service details. Please check your network or API configuration.");
  }
};

  // Handle row updates on service selection
  const handleServiceChange = (id, serviceName) => {
    const selectedService = serviceOptions.find(service => service.name === serviceName);
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          serviceName,
          displayName: selectedService?.displayName || '',
          companyCode: selectedService?.companyCode || ''
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Handle input changes in table rows
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Add a new row
  const addRow = () => {
    const newRow = { id: rows.length + 1, serviceName: "", displayName: "", companyCode: "" };
    setRows([...rows, newRow]);
  };

  // Delete a row
  const deleteRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter(row => row.id !== id);
      setRows(updatedRows);
    } else {
      alert("Cannot delete the last row.");
    }
  };

  // Submit the form data
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const serviceDetailsIds = rows
      .map((row) => {
        const service = serviceOptions.find((s) => s.name === row.serviceName);
        return service?.id || null;
      })
      .filter((id) => id);

    const operationMasterData = {
      ...formData,
      serviceDetailsIds,
    };

    console.log("Submitting Operation Master Data:", operationMasterData);

    const response = await axios.post(`${API_BASE_URL}/operation-Master`, operationMasterData);

    alert("Operation Master data saved successfully!");
    console.log("Response from API:", response.data);

    setFormData({
      operationName: '',
      operationType: '',
      entryCode: '',
      companyName: '',
      companyCode: '',
      calculationMethodology: '',
      category: '',
      source: '',
      timeInMinutes: '',
      department: '',
      departmentSelection: '',
      equipment: '',
      packageDtl: '',
      docterFeeVisit: '',
      emergencyFee: '',
      increase: '',
      message: '',
      classification: '',
      sacCODE: '',
      gstCategory: '',
      serviceDetailsIds: [],
    });
    setRows([{ id: 1, serviceName: "", displayName: "", companyCode: "" }]);
  } catch (error) {
    console.error("Error saving Operation Master data:", error);
    alert("Failed to save Operation Master data. Please check your input or API configuration.");
  }
};

  

  return (
    <div className="operation-master">
    <div className="operationMaster-title-bar">
      <div className="operationMaster-header">
        <span>Operation Master</span>
      </div>
    </div>
    <form className="operationMaster-content-wrapper" onSubmit={handleSubmit}>
      <div className="operationMaster-main-section">
        {/* Panel 1 */}
        <div className="operationMaster-panel operation-details">
          <div className="operationMaster-panel-header">Operation Details (1)</div>
          <div className="operationMaster-panel-content">
            {Object.keys(formData)
              .slice(0, Math.ceil(Object.keys(formData).length / 2))
              .map((key) => (
                key !== 'serviceDetailsIds' && (
                  <div className="operationMaster-form-row" key={key}>
                    <label>{key.replace(/([A-Z])/g, ' $1')}: *</label>
                    <input
                      type={key === 'timeInMinutes' ? 'number' : 'text'}
                      name={key}
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                    />
                  </div>
                )
              ))}
          </div>
        </div>
  
        {/* Panel 2 */}
        <div className="operationMaster-panel operation-details">
          <div className="operationMaster-panel-header">Operation Details (2)</div>
          <div className="operationMaster-panel-content">
            {Object.keys(formData)
              .slice(Math.ceil(Object.keys(formData).length / 2))
              .map((key) => (
                key !== 'serviceDetailsIds' && (
                  <div className="operationMaster-form-row" key={key}>
                    <label>{key.replace(/([A-Z])/g, ' $1')}: *</label>
                    <input
                      type={key === 'timeInMinutes' ? 'number' : 'text'}
                      name={key}
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                    />
                  </div>
                )
              ))}
          </div>
        </div>
      </div>
    </form>
  
    {/* Table Section */}
    <div className="operationMaster-table-section">
      <h3>Service Details</h3>
      <table className="operation-master-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Service Name</th>
            <th>Display Name</th>
            <th>Company Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <select
                  value={row.serviceName}
                  onChange={(e) => handleServiceChange(row.id, e.target.value)}
                >
                  <option value="">Select Service</option>
                  {serviceOptions.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input type="text" value={row.displayName} readOnly />
              </td>
              <td>
                <input type="text" value={row.companyCode} readOnly />
              </td>
              <td>
                <button type="button" onClick={() => deleteRow(row.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="operation-master-actions">
        <button type="button" onClick={addRow}>
          Add Row
        </button>
      </div>
    </div>
    <div className="operationMaster-action-buttons">
  <button type="submit" onClick={handleSubmit}>
    Submit
  </button>
</div>

  </div>
  
  );
};

export default OperationMaster;
