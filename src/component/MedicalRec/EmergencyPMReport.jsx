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
<div class="emergency-report-container">
<div class="emergency-section">
    <h3>A Respiratory Emergencies</h3>
    <table class="emergency-table">
        <thead>
            <tr>
                <th>SN</th>
                <th>ICD Code</th>
                <th>Name of Disease</th>
                <th>Female</th>
                <th>Male</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>MD11.5</td>
                <td>Shortness of breath</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr class="alternate-row">
                <td>2</td>
                <td>CA22.0</td>
                <td>Acute exacerbation of (COPD)</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>3</td>
                <td>CA23.32</td>
                <td>Bronchial Asthma</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr class="alternate-row">
                <td>4</td>
                <td>CA40</td>
                <td>Pneumonia</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr class="alternate-row">
                <td>13</td>
                <td>CB00</td>
                <td>Acute Respiratory Distress Syndrome</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="emergency-section">
    <h3>B Cardiac Emergencies</h3>
    <table class="emergency-table">
        <thead>
            <tr>
                <th>SN</th>
                <th>ICD Code</th>
                <th>Name of Disease</th>
                <th>Female</th>
                <th>Male</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>14</td>
                <td>MD30</td>
                <td>Chest Pain</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr class="alternate-row">
                <td>15</td>
                <td>BA4Z</td>
                <td>Acute Coronary Syndrome</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>16</td>
                <td>BA41</td>
                <td>Acute Myocardial Infarction</td>
                <td>-</td>
                <td>-</td>
            </tr>
        
            <tr class="alternate-row">
                <td>21</td>
                <td>BA03</td>
                <td>Hypertensive Emergencies</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </tbody>
    </table>
</div>

</div>
                  }
       
        </>
    );
};

export default HospitalReportPage;
