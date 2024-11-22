import React, { useRef,useState,useEffect } from 'react';
import "../DisSales/dispenSalesSales.css";
import AddExternalReferral from './dispenSalesSales1AER';
import AddNewPatient from './dispenSalesSalesAddNewPatient';
import DispenSalessalesStockDetails from './dispenSalessalesStockDetails';
import DispenSalesSalesList from './dispenSalesSalesList';
import DispenSalesReturnFromCust from './dispenSalesReturnFromCust';
import DispenSalesRetunSalesList from './dispenSalesRetunSalesList';
import DispenSalesProvisionalBill from './dispenSalesProvisionalBill';
import DispenSalesProvisionalSettelment from './dispenSalesProvisionalSettelment';
import DispenSalesProvisionalReturn from './dispenSalesProvisionalReturn';
import axios from 'axios';
import { startResizing } from "../../TableHeadingResizing/resizableColumns"
import CustomModal from '../../../CustomModel/CustomModal';

const SalesSales = () => {
  const [showExternalPopup, setShowExternalPopup] = useState(false);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showStockDetailsPopup, setShowStockDetailsPopup] = useState(false); // State for stock details popup
  const [activeTab, setActiveTab] = useState('Sale');
  const [patients, setPatients] = useState([]); // State to store patients data
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState(null); // State to store selected patient info
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:1415/api/hospital/fetch-all-patients')
      .then(response => {
        // Extract only outPatientId and patientName
        const patientData = response.data.map(patient => ({
          outPatientId: patient.outPatientId,
          patientName: patient.patientName,
          gender: patient.gender,
          age: patient.age,
          contactNumber: patient.contactNumber,
          address: patient.address,
          country: patient.country,
          pinCode: patient.pinCode
        }));
        setPatients(patientData);
      })
      .catch(error => {
        console.error('Error fetching patients data:', error);
      });
  }, []);
  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(p => p.outPatientId === parseInt(selectedPatientId));
      setSelectedPatientInfo(patient);
    }
  }, [selectedPatientId, patients]);

  const handleExternalPopupOpen = () => {
    setShowExternalPopup(true);
  };

  const handleExternalPopupClose = () => {
    setShowExternalPopup(false);
  };

  const handlePatientPopupOpen = () => {
    setShowPatientPopup(true);
  };

  const handlePatientPopupClose = () => {
    setShowPatientPopup(false);
  };
  const handleStockDetailsPopupOpen = () => {
    setShowStockDetailsPopup(true);
  };

  const handleStockDetailsPopupClose = () => {
    setShowStockDetailsPopup(false);
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="dispenSalesSales-sales-container">
      <div className="dispenSalesSales-header">
        <div className="dispenSalesSales-tabs">
           <div 
            className={`dispenSalesSales-tab ${activeTab === 'Sale' ? 'dispenSalesSales-tab-active' : ''}`}
            onClick={() => handleTabClick('Sale')}
          >
            Sale
          </div>
          <div 
            className={`dispenSalesSales-tab ${activeTab === 'Sale List' ? 'dispenSalesSales-tab-active' : ''}`}
            onClick={() => handleTabClick('Sale List')}
          >
            Sale List
          </div>
          <div
           className={`dispenSalesSales-tab ${activeTab === 'Return From Customer' ? 'dispenSalesSales-tab-active' : ''}`}
           onClick={() => handleTabClick('Return From Customer')}
          >
            Return From Customer</div>
          <div 
  className={`dispenSalesSales-tab ${activeTab === 'Return Sale List' ? 'dispenSalesSales-tab-active' : ''}`}
  onClick={() => handleTabClick('Return Sale List')} 
           >
            Return Sale List</div>
          <div 
 className={`dispenSalesSales-tab ${activeTab === 'Provisional Bills' ? 'dispenSalesSales-tab-active' : ''}`}
 onClick={() => handleTabClick('Provisional Bills')} 
           >
            Provisional Bills</div>
          <div 
 className={`dispenSalesSales-tab ${activeTab === 'Settlement' ? 'dispenSalesSales-tab-active' : ''}`}
 onClick={() => handleTabClick('Settlement')} 
           >Settlement</div>
          <div 
 className={`dispenSalesSales-tab ${activeTab === 'Provisional Return' ? 'dispenSalesSales-tab-active' : ''}`}
 onClick={() => handleTabClick('Provisional Return')}           
          
          >Provisional Return</div>
        </div>
      </div>
      {activeTab === 'Sale' ? (
        <>
      <div className="dispenSalesSales-patient-info">
      <div className="dispenSalesSales-patient-search">
              <label>Search Patient:</label>
              <select
                value={selectedPatientId || ''}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="dispenSalesSales-patient-dropdown"
              >
                <option value="">--Select Patient--</option>
                {patients.map(patient => (
                  <option key={patient.outPatientId} value={patient.outPatientId}>
                    {patient.patientName}
                  </option>
                ))}
              </select>
            </div>
            {/* {selectedPatientInfo && (
              <div className="dispenSalesSales-hospital-info">
                <div className="dispenSalesSales-hospital-info-subDiv">
                  <div>Hospital No: {selectedPatientInfo.outPatientId}</div>
                  <div>Name: {selectedPatientInfo.patientName}</div>
                  <div>Age/Sex: {selectedPatientInfo.age} / {selectedPatientInfo.gender}</div>
                  <div>Address: {selectedPatientInfo.address}</div>
                  <div>Contact No: {selectedPatientInfo.contactNumber}</div>
                </div>
              </div>
            )} */}
        <div className="dispenSalesSales-doctor-info">
          <label>Doctor:</label>
          <input type="text" value="ANONYMOUS DOCTOR" readOnly />
          <input type="checkbox" id="external" />
          <label htmlFor="external">External?</label>
          <button className="dispenSalesSales-add-button" onClick={handleExternalPopupOpen}>+</button>
        </div>

        {/* Conditionally render the AddExternalReferral popup */}
        {showExternalPopup && (
          // <div className="addExternalReferral-popup-overlay">
          <CustomModal isOpen={handleExternalPopupOpen} onClose={handleExternalPopupClose}>

            <AddExternalReferral onClose={handleExternalPopupClose} />
          </CustomModal>
          // </div>
        )}

        <div className="dispenSalesSales-register-patient">
          <span onClick={handlePatientPopupOpen}>Register New Outdoor Patient  |</span>
          <span onClick={handleStockDetailsPopupOpen}>Stock Details</span>
        </div>

        {/* Conditionally render the AddNewPatient popup */}
        {showPatientPopup && (
          // <div className="salesAddNewPatient-popup-overlay">
          <CustomModal isOpen={handlePatientPopupOpen} onClose={handlePatientPopupClose}>

            <AddNewPatient />
          </CustomModal>
          // </div>
        )}
          {/* Conditionally render the DispenSalessalesStockDetails popup */}
      {showStockDetailsPopup && (
        // <div className="salesStockDetails-popup-overlay">
        <CustomModal isOpen={handleStockDetailsPopupOpen} onClose={handleStockDetailsPopupClose}>

          <DispenSalessalesStockDetails />
        </CustomModal>
          // <button onClick={handleStockDetailsPopupClose} className="dispenSalessalesStockDetails-close-popup-btn">X</button>
        // </div>
      )}
      </div>

      <div className="dispenSalesSales-hospital-info">
        {/* <div className="dispenSalesSales-hospital-info-subDiv">
          <div>Hospital No:</div>
          <div>Name: </div>
          <div>Age/Sex: </div>
          <div>Address: </div>
          <div>Contact No:</div>
        </div> */}
                    {selectedPatientInfo && (
              <div className="dispenSalesSales-hospital-info">
                <div className="dispenSalesSales-hospital-info-subDiv">
                  <div>Hospital No: {selectedPatientInfo.outPatientId}</div>
                  <div>Name: {selectedPatientInfo.patientName}</div>
                  <div>Age/Sex: {selectedPatientInfo.age} / {selectedPatientInfo.gender}</div>
                  <div>Address: {selectedPatientInfo.address}</div>
                  <div>Contact No: {selectedPatientInfo.contactNumber}</div>
                </div>
              </div>
            )}
        <div className="dispenSalesSales-hospital-info-subDiv">
          <div>Visit Type: outpatient</div>
          <div>Membership:</div>
          <select>
            <option>Astra</option>
            <option>BRITAM</option>
            <option>General</option>
            <option>ABC</option>
            <option>XYZ</option>
            <option>PQR</option>
            <option>SVT</option>
          </select>
          <div>Price Category:</div>
          <select>
            <option>Normal</option>
          </select>
        </div>
      </div>

      <div className="dispenSalesSales-medicineInfo-N-paymentSection">
        <div className="dispenSalesSales-medicineInfo-N-invoiceSummary">
          <div className="dispenSalesSales-medicine-info">
            <div>
              <label>Generic Name</label>
              <input type="text" placeholder="--Select Generic Name--" />
            </div>
            <div>
              <label>Drug/Medicine Name</label>
              <input type="text" placeholder="--Select Medicine--" />
            </div>
            <div className="dispenSalesSales-Expiry">
              <label>Expiry</label>
              <input type="text" />
            </div>
            <div className="dispenSalesSales-Batch">
              <label>Batch</label>
              <input type="text" />
            </div>
            <div className="dispenSalesSales-Avl-Qty">
              <label>Avl Qty</label>
              <input type="text" />
            </div>
            <div className="dispenSalesSales-Qty">
              <label>Qty</label>
              <input type="text" />
            </div>
            <div className="dispenSalesSales-QSalePricety">
              <label>Sale Price</label>
              <input type="text" value="0" readOnly />
            </div>
            <div className="dispenSalesSales-SubTotal">
              <label>SubTotal</label>
              <input type="text" value="0" readOnly />
              <button className="dispenSalesSales-add-button">+</button>
            </div>
          </div>

          {/* <div className="dispenSalesSales-invoice-summary"> */}
          <div className="table-container">
          <table ref={tableRef}>
          <thead>
            
                <tr>
                {[
                  "#",
                  "GenericName",
                  "ItemName",
                  "Expiry",
                  "Batch",
                  "Qty",
                  "SalePrice",
                  "SubTotal",
                  "Discount Amt.",
                  "VAT Amt.",
                  "Total"
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
                {/* Add table rows dynamically here */}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dispenSalesSales-payment-section">
          <div className="dispenSalesSales-payment-summary">
            <div className="dispenSalesSales-payment-summary-subDiv">
              Sub Total:
              <input type="text" placeholder='0'/>
            </div>
            <div className="dispenSalesSales-payment-summary-subDiv">
              Total Amount:
              <input type="text" placeholder='0'/>
            </div>
            <div className="dispenSalesSales-payment-summary-subDiv">In Words: Only.</div>
            <div className="dispenSalesSales-payment-summary-subDiv">Payment Options:
            <select>
              <option>Cash</option>
              <option>Credit</option>
              <option>Other</option>
              {/* Add more payment options */}
            </select>
            </div>
            <div className="dispenSalesSales-payment-summary-subDiv">
              Tender:
            <input type="text" placeholder='0'/>
            </div>
            <div className="dispenSalesSales-payment-summary-subDiv">Change: 
            <div className="dispenSalesSales-payment-summary-subDiv-Kshs"> 
              
              Kshs. 0

            </div>
            </div>
            <div className="dispenSalesSales-payment-summary-subDiv">
              Remarks:
              <input type="text" />
            </div>

            <div className="dispenSalesSales-payment-summary-subDiv">Paid Amount: 
            <input type="text" placeholder='0'/>

            </div>
          </div>
          <div className="dispenSalesSales-payment-actions">
            <button className="dispenSalesSales-print-button">Print Invoice</button>
            <button className="dispenSalesSales-discard-button">Discard</button>
          </div>
        </div>
      </div>

      <div className="dispenSalesSales-history-section">
        <div className="dispenSalesSales-invoice-history">
          <h4>Invoice History</h4>
          <div>Deposit Balance: 0</div>
          <div>Credit: 0</div>
          <div>Provisional Amount: 0</div>
          <div>Total Due</div>
          <div>Balance Amount: 0</div>
        </div>
        <div className="dispenSalesSales-credit-limits">
          <h4>Credit Limits and Balances</h4>
          <div>General Credit Limit: 0</div>
          <div>IP Credit Limit: 0</div>
          <div>OP Credit Limit: 0</div>
          <div>IP Balance: 0</div>
          <div>OP Balance: 0</div>
        </div>
      </div>
      </>
      ) : activeTab === 'Sale List' ? (
        <DispenSalesSalesList />
      ) : activeTab === 'Return From Customer' ? (
        <DispenSalesReturnFromCust />
      ) : activeTab === 'Return Sale List' ? (
        <DispenSalesRetunSalesList />
      ) : activeTab === 'Provisional Bills' ? (
        <DispenSalesProvisionalBill />
      ) : activeTab === 'Settlement' ? (
        <DispenSalesProvisionalSettelment />
      ) : activeTab === 'Provisional Return' ? (
        <DispenSalesProvisionalReturn />
      ) : null}
    </div>
    
  );
};

export default SalesSales;
