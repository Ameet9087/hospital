import React, { useState, useEffect, useRef } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from '../../../CustomModel/CustomModal';
import PopupTable from '../../../FloatingInputs/PopupTable';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import './AutopsyReportDistributionform.css';
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';

const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`autopsy-report-floating-field ${isFocused || hasValue ? "active" : ""}`}>
      <input
        type={type}
        className="autopsy-report-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="autopsy-report-floating-label">{label} :</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className={`autopsy-report-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="autopsy-report-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '');
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="autopsy-report-floating-label">{label}</label>
    </div>
  );
};

const AutopsyReportDistributionForm = () => {
  const [formData, setFormData] = useState({
    autopsyReportFormId: "",
    patientId: "",
    patientName: "",
    distributionTo: {
      requestingPhysician: false,
      family: false,
      policeDepartment: false,
      legalAuthorities: false,
      governmentHealthDepartment: false,
      other: "",
    },
    specify: "",
    methodOfDistribution: "",
    dateOfDistribution: "",
    comments: "",
  });

  const [activePopup, setActivePopup] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchAutopsyReportData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/autopsy-report-form`);
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching autopsy report data:', error);
      alert('Failed to fetch autopsy report data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Distribution Reports
  const fetchDistributionReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/autopsy-report-distribution`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching distribution reports:', error);
      alert('Failed to fetch distribution reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributionReports();
  }, []);

  // Submit Autopsy Report Distribution
  const submitAutopsyReport = async (reportData) => {
    try {
      const payload = {
        distributedTo: reportData.patientName,
        specify: reportData.specify || "",
        methodOfDistribution: reportData.methodOfDistribution,
        dateOfDistribution: reportData.dateOfDistribution,
        comments: reportData.comments || "",
        autopsyRequestFormDTO: {
          autopsyreqId: reportData.autopsyReportFormId || null
        }
      };

      console.log(JSON.stringify(payload, null, 2));

      const response = await axios.post(`${API_BASE_URL}/autopsy-report-distribution`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('Autopsy report distribution saved successfully');
      fetchDistributionReports();
      return response.data;
    } catch (error) {
      console.error('Detailed Error:', error.response ? error.response.data : error);
      alert(`Failed to save: ${error.response ? error.response.data.message : error.message}`);
      throw error;
    }
  };

  // Handle Search Click
  const handleSearchClick = () => {
    setActivePopup("AutopsyReportId");
    fetchAutopsyReportData();
  };

  // Handle Select from Popup
  const handleSelect = (selectedData) => {
    setFormData(prevData => ({
      ...prevData,
      autopsyReportFormId: selectedData.autopsyReportFormId,
      patientName: selectedData.firstName
    }));
    setActivePopup(null);
  };

  const getPopupData = () => {
    return {
      columns: ["autopsyReportFormId", "firstName"],
      data: reportData.map(report => ({
        autopsyReportFormId: report.autopsyReportFormId,
        firstName: report.autopsyRequestForm?.firstName
      }))
    };
  };

  const { columns, data: popupData } = getPopupData();

  // Handle Form Submit
  const handleFormSubmit = async () => {
    try {
      const distributionToUpdated = {
        requestingPhysician: document.getElementById('requestingPhysician').checked,
        family: document.getElementById('family').checked,
        policeDepartment: document.getElementById('policeDepartment').checked,
        legalAuthorities: document.getElementById('legalAuthorities').checked,
        governmentHealthDepartment: document.getElementById('governmentHealthDepartment').checked,
        other: ""
      };

      const updatedFormData = {
        ...formData,
        distributionTo: distributionToUpdated
      };

      await submitAutopsyReport(updatedFormData);
      setShowModal(false);

      // Reset form data
      setFormData({
        autopsyReportFormId: "",
        patientId: "",
        patientName: "",
        distributionTo: {
          requestingPhysician: false,
          family: false,
          policeDepartment: false,
          legalAuthorities: false,
          governmentHealthDepartment: false,
          other: "",
        },
        specify: "",
        methodOfDistribution: "",
        dateOfDistribution: "",
        comments: "",
      });

      // Reset checkboxes
      ['requestingPhysician', 'family', 'policeDepartment', 'legalAuthorities', 'governmentHealthDepartment'].forEach(id => {
        document.getElementById(id).checked = false;
      });

    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  // Handle Edit and Delete
  const handleEdit = async (id) => {
    console.log('Edit:', id);
    // Implement edit logic
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/autopsy-report-distribution/${id}`);
      alert('Report deleted successfully');
      fetchDistributionReports();
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report');
    }
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className='autopsy-report-info-container'>
      <button onClick={handleAdd} className='autopsy-report-add-btn'>+ Add Report</button>

      <table ref={tableRef} className="autopsy-report-table">
        <thead>
          <tr>
            {[
              'Autopsy Report ID',
              'Patient Name',
              'Method of Distribution',
              'Date of Distribution',
              'Actions'
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
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center">Loading...</td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">No autopsy reports found.</td>
            </tr>
          ) : (
            data?.map((item) => (
              <tr key={item.distributionFormId}>
                <td>{item.distributionFormId}</td>
                <td>{item.distributedTo}</td>
                <td>{item.methodOfDistribution}</td>
                <td>{item.dateOfDistribution}</td>
                <td className="autopsy-report-action">
                  <button
                    className="autopsy-report-status-btn"
                    onClick={() => handleEdit(item.distributionFormId)}
                  >
                    Edit
                  </button>
                  <button
                    className="autopsy-report-status-btn"
                    onClick={() => handleDelete(item.distributionFormId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <CustomModal isOpen={showModal} onClose={handleClose} className="autopsy-report-custom">
        <div className='autopsy-report-container'>
          <div className='autopsy-report-section'>
            <div className='autopsy-report-form-header'>Autopsy Report Distribution</div>
            <div className='autopsy-report-grid'>
              <div className="autopsy-report-search-field">
                <FloatingInput
                  label="Autopsy Report ID"
                  name="autopsyReportFormId"
                  value={formData.autopsyReportFormId}
                  onChange={(e) => {
                    setFormData(prevData => ({
                      ...prevData,
                      autopsyReportId: e.target.value
                    }));
                  }}
                />
                <FontAwesomeIcon
                  className='autopsy-report-search-icon'
                  icon={faSearch}
                  onClick={handleSearchClick}
                />
              </div>

              {activePopup && (
                <PopupTable
                  columns={columns}
                  data={popupData}
                  onSelect={handleSelect}
                  onClose={() => setActivePopup(null)}
                />
              )}

              <FloatingInput
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={(e) => {
                  setFormData(prevData => ({
                    ...prevData,
                    patientName: e.target.value
                  }));
                }}
              />

              <div className="billing-ipBilling-form-row-chechbox">
                <input
                  type="checkbox"
                  id="requestingPhysician"
                  onChange={(e) => {
                    setFormData(prevData => ({
                      ...prevData,
                      distributionTo: {
                        ...prevData.distributionTo,
                        requestingPhysician: e.target.checked
                      }
                    }));
                  }}
                />
                <label htmlFor="requestingPhysician" className="iPBilling-checkbox-label">
                  Requesting Physician
                </label>
              </div>
              {/* Similar changes for other checkboxes */}
              <div className="billing-ipBilling-form-row-chechbox">
                <input
                  type="checkbox"
                  id="family"
                  onChange={(e) => {
                    setFormData(prevData => ({
                      ...prevData,
                      distributionTo: {
                        ...prevData.distributionTo,
                        family: e.target.checked
                      }
                    }));
                  }}
                />
                <label htmlFor="family" className="iPBilling-checkbox-label">
                  Family
                </label>
              </div>
              <div className="billing-ipBilling-form-row-chechbox">
                <input
                  type="checkbox"
                  id="policeDepartment"
                  onChange={(e) => {
                    setFormData(prevData => ({
                      ...prevData,
                      distributionTo: {
                        ...prevData.distributionTo,
                        policeDepartment: e.target.checked
                      }
                    }));
                  }}
                />
                <label htmlFor="policeDepartment" className="iPBilling-checkbox-label">
                  Police Department
                </label>
              </div>

              <div className="billing-ipBilling-form-row-chechbox">
                <input
                  type="checkbox"
                  id="legalAuthorities"
                  onChange={(e) => {
                    setFormData(prevData => ({
                      ...prevData,
                      distributionTo: {
                        ...prevData.distributionTo,
                        legalAuthorities: e.target.checked
                      }
                    }));
                  }}
                />
                <label htmlFor="legalAuthorities" className="iPBilling-checkbox-label">
                  Legal Authorities
                </label>
              </div>

              <div className="billing-ipBilling-form-row-chechbox">
                <input
                  type="checkbox"
                  id="governmentHealthDepartment"
                  onChange={(e) => {
                    setFormData(prevData => ({
                      ...prevData,
                      distributionTo: {
                        ...prevData.distributionTo,
                        governmentHealthDepartment: e.target.checked
                      }
                    }));
                  }}
                />
                <label htmlFor="governmentHealthDepartment" className="iPBilling-checkbox-label">
                  Government Health Department
                </label>
              </div>

              <FloatingInput
                name="specify"
                label="Other Specify"
                value={formData.specify}
                onChange={(e) => {
                  setFormData(prevData => ({
                    ...prevData,
                    specify: e.target.value
                  }));
                }}
              />

              <FloatingSelect
                label="Method of Distribution"
                name="methodOfDistribution"
                value={formData.methodOfDistribution}
                onChange={(e) => {
                  setFormData(prevData => ({
                    ...prevData,
                    methodOfDistribution: e.target.value
                  }));
                }}
                options={[
                  { value: "Email", label: "Email" },
                  { value: "Physical Copy", label: "Physical Copy" },
                  { value: "Fax", label: "Fax" },
                ]}
              />

              <FloatingInput
                label="Date of Distribution"
                name="dateOfDistribution"
                type="date"
                value={formData.dateOfDistribution}
                onChange={(e) => {
                  setFormData(prevData => ({
                    ...prevData,
                    dateOfDistribution: e.target.value
                  }));
                }}
              />
              <FloatingInput
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={(e) => {
                  setFormData(prevData => ({
                    ...prevData,
                    comments: e.target.value
                  }));
                }}
              />

              <div className='autopsy-report-button'>
                <button onClick={handleFormSubmit} className="autopsy-report-submit-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AutopsyReportDistributionForm;
