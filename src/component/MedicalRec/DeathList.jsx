import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../MedicalRec/DeathList.css";

function BirthList() {
  const [isMenuVisible, setisMenuVisible] = useState(false);

  const [addDeathDetails, setdeathDetails] = useState(false);
  const [addCertificate, setAddCertificate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deathListData, setdeathListData] = useState(false);
  const [showDeathCertificate, setshowDeathCertificate] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    all: false,
    diagnosisAdded: false,
    diagnosisPending: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Update this according to your data

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const addDeathDetailsButton = () => {
    setdeathDetails(!addDeathDetails);
    setIsModalOpen(true);
  };

  const addCertificateButton = () => {
    setshowDeathCertificate(!showDeathCertificate);
    // setIsModalOpen(true);
  };

  const handleOpenCertificateModal = () => setshowDeathCertificate(true);
  const handleCloseCertificateModal = () => setshowDeathCertificate(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const [filterOption, setFilterOption] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleFilterData = () => {
    // Implement filter logic here
    console.log(
      `Filtering data from ${fromDate} to ${toDate} with option ${filterOption}`
    );
    setdeathListData(!deathListData);
  };
  const toggleMenu = () => {
    setisMenuVisible(!isMenuVisible);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="outer-medical-record">
      <div className="MRInPatient-tableContainer">
        <button
          onClick={addDeathDetailsButton}
          className="AddNewBirthCertificate"
        >
          {" "}
          &#43; Add Death Certificate
        </button>
        <h5>Filter by Death Date:</h5>
        <div className="MROInPatient-date-filter">
          <label>
            From:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>

          <button style={{ marginLeft: "5px" }}>★</button>
          <button style={{ marginLeft: "5px" }} onClick={toggleMenu}>
            {" "}
            -{" "}
          </button>
          {isMenuVisible && (
            <ul
              style={{
                marginLeft: "5px",
                listStyleType: "none",
                padding: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
              }}
            >
              <li>Last 1 Week</li>
              <li>Last 1 Month</li>
              <li>Last 3 Months</li>
            </ul>
          )}
          <button onClick={handleFilterData}>OK</button>
        </div>

        {deathListData && (
          <>
            <div className="MRIn-Patient-Header">
              <input
                type="text"
                placeholder="Search"
                className="MRIn-Patient-searchInput"
              />
              <div className="MRIn-Patient-actions">
                <span className="MRIn-Patient-results">
                  Showing 0/0 results
                </span>
              </div>
            </div>

            <table className="MRIn-patientsTable">
              <thead>
                <tr>
                  <th> Certificate No. </th>
                  <th>Patient Name</th>
                  <th>Death Date </th>
                  <th>Death Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="MROut-tableRow">
                  <td>1</td>
                  <td>Jenifer</td>
                  <td>2023-12-11</td>
                  <td>17:46:00</td>
                  <td>
                    <div className="Actions-actions">
                      <button
                        className="edit-final-diaggnosois"
                        onClick={addCertificateButton}
                      >
                        Certificate
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="MROut-tableRow">
                  <td>1</td>
                  <td>Jenifer</td>
                  <td>2023-12-11</td>
                  <td>17:46:00</td>
                  <td>
                    <div className="Actions-actions">
                      <button
                        className="edit-final-diaggnosois"
                        onClick={addCertificateButton}
                      >
                        Certificate
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="MROut-tableRow">
                  <td>1</td>
                  <td>Jenifer</td>
                  <td>2023-12-11</td>
                  <td>17:46:00</td>
                  <td>
                    <div className="Actions-actions">
                      <button
                        className="edit-final-diaggnosois"
                        onClick={addCertificateButton}
                      >
                        Certificate
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <div className="MROut-pagination">
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="MROut-pagination-info">
                {`Page ${currentPage} of ${totalPages}`}
              </span>
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div> */}
          </>
        )}
      </div>
      {addDeathDetails && isModalOpen && (
        <div className="death-FinalDiagnosis-container deathReport">
          <div className="death-modal-overlay">
            <div className="death-modal-content">
              <div
                className="death-modal-header-deathlist"
                style={{ textAlign: "right" }}
              >
                <button className="death-close-button" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <h5>Add Death Details</h5>
              <br></br>

              <div class="death-form-containe">
                <div class="death-form-group">
                  <label for="certificateNumber">
                    Select Patient :<span className="mandatory">*</span>{" "}
                  </label>
                  <input type="text" placeholder="Search" className="" />
                </div>
                <div class="death-form-group">
                  <label for="certificateNumber">Certificate Number</label>
                  <input
                    type="text"
                    id="certificateNumber"
                    name="certificateNumber"
                  />
                </div>
              </div>

              <div class="death-form-group">
                <label for="birthDate">Death Date *</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  required
                />
              </div>
              <div class="death-form-group">
                <label for="birthTime">Death Time *</label>
                <input
                  type="time"
                  id="birthTime"
                  name="birthTime"
                  required
                />
              </div>

              <div className="defooter-buttons">
                <button className="submit-button-death">
                  Add Death Details
                </button>
                <button className="cancel-button-death" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeathCertificate && (
        <div className="death-certificate-container" >
          <div className="death-certificate-modal-overlay" style={{width:"100%", height:"100%"}}>
            <div className="death-certificate-modal-content" style={{width: "1000px", height:"800px"}}>
              <div className="death-certificate-modal-header">
                <h3>Death Record of Sonia Chebii</h3>
                <button 
                  className="death-certificate-close-button" 
                  onClick={() => {
                    handleCloseCertificateModal();
                    setshowDeathCertificate(false);
                  }}
                >
                  &times;
                </button>
              </div>
              <hr></hr>
              
              <div className="death-certificate-modal-body">
                <div className="death-certificate-header">
                  <div className="fiscal-info">
                    <strong>Fiscal Year:</strong> 2023
                  </div>
                  <div className="death-certificate-number">
                    <strong>Certificate No:</strong> 1
                  </div>
                </div>

                <h3 className="death-certificate-title">Medical Certificate of Death</h3>

                <div className="death-certificate-content">
                  <p>
                    This is to certify that Ms. Sonia Chebii, daughter of Mr.
                    <input type="text" className="death-certificate-inline-input" />
                    and Ms.
                    <input type="text" className="death-certificate-inline-input" />
                    spouse of Mr.
                    <input type="text" className="death-certificate-inline-input" />
                    as per hospital record resident of Country
                    <strong> Kenya</strong> district
                    <strong> Belgut Sub County</strong> village/Sub County and
                    inpatient/Emergency number expired on BS
                    <strong> (2023/12/11 AD, YYYY/MM/DD)</strong> time
                    <strong> 17:46:00</strong> (24 hours) at the age of
                    <strong> 11 days</strong>. Her cause of death was
                    <input type="text" className="death-certificate-inline-input cause-input" />
                  </p>
                </div>

                <div className="death-certificate-section">
                  <h5>Certified By</h5>
                  <input type="text" placeholder="Issued By" className="death-certificate-full-width-input" />
                </div>

                <div className="death-certificate-hospital-section">
                  <h4>Hospital/Health Facility</h4>
                  <p>
                    <strong>Name:</strong> Demo Hospital<br />
                    <strong>Address:</strong> <a href="/">P.O Box 1718 RUIRU</a>
                  </p>
                </div>

                <div className="death-certificate-signature-section">
                  <h4>Doctor Signature:</h4>
                  <textarea rows={3} className="death-certificate-signature-input"></textarea>
                </div>
              </div>

              <div className="death-certificate-modal-footer">
                <button 
                  className="death-certificate-submit-button" 
                  onClick={() => {
                    handleCloseCertificateModal();
                    setHandleOpenCertificateModal(false);
                  }}
                >
                  Save and Print
                </button>
                <button 
                  className="death-certificate-cancel-button" 
                  onClick={() => {
                    handleCloseCertificateModal();
                    setHandleOpenCertificateModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BirthList;
