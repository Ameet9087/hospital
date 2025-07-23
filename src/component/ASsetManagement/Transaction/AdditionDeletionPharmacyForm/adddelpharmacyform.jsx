// AjharTamboli 29-11-24 addDelPharmcyForm.jsx
import React, { useState, useEffect } from 'react';
import './addDelPharmcyForm.css';
const AddDelPharmcyForm = () => {
  const [selectedTab, setSelectedTab] = useState('services');
  const [servicesData, setServicesData] = useState([

    {
      sn: 1,
      approvedBy: 'Sandesh',
      priority: 'Tara',

    },
    {
      sn: 2,
      approvedBy: 'Tara',
      priority: 'Tara',

    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      sn: servicesData.length + 1,
      approvedBy: 'Tara',

    };
    setServicesData([...servicesData, newRow]);
  };

  const handleDeleteRow = (snToDelete) => {
    const updatedData = servicesData.filter(row => row.sn !== snToDelete)
      .map((row, index) => ({ ...row, sn: index + 1 }));
    setServicesData(updatedData);
  };

  const renderServicesTable = () => {
    return (
      <div className="services-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>SN</th>
              <th>Approved By</th>
              <th>Priority</th>

            </tr>
          </thead>
          <tbody>
            {servicesData.map((row) => (
              <tr key={row.sn}>
                <td>
                  <div className="table-actions">
                    <button
                      className="addDelPharmcyForm-add-btn"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                    <button
                      className="addDelPharmcyForm-del-btn"
                      onClick={() => handleDeleteRow(row.sn)}
                      disabled={servicesData.length <= 1}
                    >
                      Del
                    </button>
                  </div>
                </td>
                <td>{row.sn}</td>
                <td>{row.approvedBy}</td>
                <td>{row.priority}</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTable = () => {
    switch (selectedTab) {
      case 'testGrid':
      // Existing package table rendering

      case 'services':
        return renderServicesTable();

      default:
        return null;
    }
  };
  return (
    <div className="addDelPharmcyForm">
      <div className="addDelPharmcyForm-title-bar">
        <div className="addDelPharmcyForm-header">
          <span>Addtion/Deletion Pharmcy Form</span>
        </div>
      </div><div className="addDelPharmcyForm-content-wrapper">
        <div className="addDelPharmcyForm-main-section">
          <div className="addDelPharmcyForm-panel operation-details">
            <div className="addDelPharmcyForm-panel-content">

              <div className="addDelPharmcyForm-form-row">
                <label>Request For:</label>
                <select>
                  <option>Addition</option>
                </select>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Entry Reference No:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Drug / Asset Code:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Entry Date:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Doctor Name: *</label>
                <div className="addDelPharmcyForm-input-with-search">
                  <input ty_pe="text" />
                  <button className="addDelPharmcyForm-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Consultant / Department :</label>
                <input type="text" />
              </div>
            </div>
            <div className="addDelPharmcyForm-panel-header">Name Of Drug/Surgical Consumables Proposed For Introduction</div>
            <div className="addDelPharmcyForm-panel-content">
              <div className="addDelPharmcyForm-form-row">
                <label>In The Pharmacopia:</label>
                <select>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>New Durg/Item :</label>
                <select>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Chargeable To Patients:</label>
                <select>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Trade Name:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Generic/Molecule Name: *</label>
                <div className="addDelPharmcyForm-input-with-search">
                  <input type="text" />
                  <button className="addDelPharmcyForm-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Manufacture: *</label>
                <div className="addDelPharmcyForm-input-with-search">
                  <input type="text" />
                  <button className="addDelPharmcyForm-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Itemtype: *</label>
                <div className="addDelPharmcyForm-input-with-search">
                  <input type="text" />
                  <button className="addDelPharmcyForm-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Category Of Durg: *</label>
                <div className="addDelPharmcyForm-input-with-search">
                  <input type="text" />
                  <button className="addDelPharmcyForm-magnifier-btn">🔍</button>
                </div>
              </div>
            </div>
          </div>

          <div className="addDelPharmcyForm-panel dis-templates">
            <div className="addDelPharmcyForm-panel-content">
              <div className="addDelPharmcyForm-form-row">
                <label>MRP:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Any Other:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Quantity:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>Consumption Approx In Month:</label>
                <input type="text" />
              </div>
              <div className="addDelPharmcyForm-form-row">
                <label>AMS/DMS/JMS Remark:</label>
                <textarea name="" id=""></textarea>
              </div>

              <div className="addDelPharmcyForm-form-row">
                <label>Ms Remark:</label>
                <textarea name="" id=""></textarea>
              </div>

              <div className="addDelPharmcyForm-form-row">
                <label>MD Remark:</label>
                <textarea name="" id=""></textarea>
              </div>

            </div>
            <div className="addDelPharmcyForm-panel-header">Purchase Department</div>
            <div className="addDelPharmcyForm-panel-content">

              <div className="addDelPharmcyForm-form-row">
                <label>Rate Comparison:</label>
                <input type="text" />
              </div>

              <div className="addDelPharmcyForm-form-row">
                <label>Remark:</label>
                <textarea name="" id=""></textarea>
              </div>

              <div className="addDelPharmcyForm-form-row">
                <label>Location: *</label>
                <div className="addDelPharmcyForm-input-with-search">
                  <input type="text" />
                  <button className="addDelPharmcyForm-magnifier-btn">🔍</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="addDelPharmcyForm-services-section">
          <div className="addDelPharmcyForm-tab-bar">
            <button
              className={`addDelPharmcyForm-tab ${selectedTab === 'testGrid' ? 'active' : ''}`}
              onClick={() => setSelectedTab('testGrid')}
            >
              Approval Details
            </button>


          </div>

          {/* Dynamically render tables based on selected tab */}
          {renderTable()}
        </div>
        <div className="addDelPharmcyForm-action-buttons">
          <button className="btn-blue">Save</button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button>
          <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green">Print</button>
          <button className="btn-blue">Export</button>
          <button className="btn-gray">Import</button>
          <button className="btn-green">Health</button>
          <button className="btn-gray">Version Comparison</button>
          <button className="btn-gray">SDC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button>
        </div>
      </div>
    </div>
  );
};

export default AddDelPharmcyForm;

// AjharTamboli 29-11-24 addDelPharmcyForm.jsx