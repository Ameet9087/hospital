import React, { useState } from 'react';
import './HospitalServiceSummaryReport.css';

const HospitalReportPage = () => {
    const [showReportData,setShowReportData]=useState(false);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const showReport=()=>{
            setShowReportData(true);
    }
    return (
        <>
        <div className='outer-medical-record'>

  
    
        <div className="MRInPatient-tableContainer">
      
                 <h5>Hospital Service Summary Report:</h5>
                <div className="MROInPatient-date-filter">
                    <label>
                      From:
                      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </label>
                    <label>
                      To:
                      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </label>
    
                    <button style={{ marginLeft: '5px' }}>★</button>
                    <button style={{ marginLeft: '5px' }} onClick={toggleMenu}> - </button>
                    {
                      isMenuVisible && (
                        <ul style={{ marginLeft: '5px', listStyleType: 'none', padding: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                        <li>Last 1 Week</li>
                        <li>Last 1 Month</li>
                        <li>Last 3 Months</li>
                      </ul>
    
                      )
                    }
                 
                 <button onClick={showReport} className='AddNewBirthCertificate'> &#43;  Show Report</button>  
    
                  </div>

                  </div>

                  </div>


                  {

showReportData &&
                <div className="report-container">
                <div className="header-section">
                    
                    <div className="report-title">
                        <strong>Ministry of Health and Population</strong><br />
                        Department Of Health Services<br />
                        Public Hospital Monthly Reporting Form<br />
                        <strong>Demo Hospital</strong>
                    </div>
                </div>
                
                <div className="info-section">
                    <div className="info-row">
                        <span>Fiscal Year: 20__ to 20__</span>
                        <span>HF Code: ______</span>
                    </div>
                    <div className="info-row">
                        <span>Reference No: ______</span>
                        <span>Subject: Submission of Monthly Report on Hospital Services</span>
                    </div>
                    <div className="info-row">
                        <span>M....../Y 20__</span>
                        <span>Received Date: ______</span>
                    </div>
                </div>
                
                <table className="hospital-services-table">
                <thead>
                    <tr>
                        <th rowSpan="2">Age Group</th>
                        <th colSpan="4">Hospital Services</th>
                        <th colSpan="2">Emergency Services</th>
                    </tr>
                    <tr>
                        <th>New Client Serviced (Female)</th>
                        <th>New Client Serviced (Male)</th>
                        <th>Total Clients Served (Female)</th>
                        <th>Total Clients Served (Male)</th>
                        <th>Total Clients Served (Female)</th>
                        <th>Total Clients Served (Male)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-9 Years</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>10-14 Years</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>15-19 Years</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>20-59 Years</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>60-69 Years</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>&gt;=70 Years</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
            <table className="medical-services-table">
                <thead>
                    <tr>
                        <th rowSpan="2">Free Service Received by Impoverished Citizen</th>
                        <th colSpan="3">Female</th>
                        <th colSpan="3">Male</th>
                        <th colSpan="4">ORC Clinics / FCHV</th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>Outreach Clinic</th>
                        <th>Immunization Clinic</th>
                        <th>Immunization Session</th>
                        <th>Hygiene Promotion Session</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alzheimer</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>-</td>
                        <td>-</td>
                        <td>0</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Cancer</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>-</td>
                        <td>-</td>
                        <td>0</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Free Dialysis</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>-</td>
                        <td>-</td>
                        <td>0</td>
                        <td>-</td>
                    </tr>
                    {/* Repeat similar rows as per the image */}
                    <tr>
                        <td colSpan="7">FCHV</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td rowSpan="3">Referrals</td>
                        <td>Referral In</td>
                        <td colSpan="3">Female</td>
                        <td colSpan="3">Male</td>
                        <td>Outpatient</td>
                        <td>Inpatient</td>
                        <td>Emergency</td>
                    </tr>
                    <tr>
                        <td>Referral Out</td>
                        <td colSpan="3">0</td>
                        <td colSpan="3">0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    {/* Additional Services */}
                    <tr>
                        <td colSpan="11">
                            <div className="available-services-container">
                                <table className="available-services-table">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Available Services (Circle the appropriate code)</th>
                                            <th>Services</th>
                                            <th colSpan="2">Available Services (Circle the appropriate code)</th>
                                            <th>Services</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Birthing Center</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>DOTS Site</td>
                                            <td>1</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>BEONC Site</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>Microscopy Site</td>
                                            <td>1</td>
                                            <td>2</td>
                                        </tr>
                                        {/* Repeat rows based on the services in the image */}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="11">
                            <p>Prepared By:</p>
                            <p>Signature: ________________________</p>
                            <p>Name of Medical Recorder: ________________________</p>
                        </td>
                    </tr>
                </tbody>
            </table>
                
                
               
    
                
            </div>

                  }
       
        </>
    );
};

export default HospitalReportPage;
