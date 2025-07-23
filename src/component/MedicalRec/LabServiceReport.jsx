import React, { useState } from 'react';
import './LabServiceReport.css';

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
      
                 <h5>Ot Patient Morbidity Report:</h5>
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
<div class="unique-container">
<div class="unique-grid-container">
  <div class="unique-column">
    <h2>HAEMATOLOGY</h2>
    <table class="unique-table">
      <tr><th>No.</th><th>Test</th></tr>
      <tr><td>1</td><td>RBC Count</td></tr>
      <tr><td>2</td><td>TLC</td></tr>
      <tr><td>3</td><td>Platelets Count</td></tr>
    </table>
  </div>
  
  <div class="unique-column">
    <h2>IMMUNOLOGY</h2>
    <table class="unique-table">
      <tr><th>No.</th><th>Test</th></tr>
      <tr><td>35</td><td>Pregnancy Test (UPT)</td></tr>
      <tr><td>36</td><td>ASO</td></tr>
      <tr><td>37</td><td>CRP</td></tr>
    </table>
  </div>
  
  <div class="unique-column">
    <h2>BIOCHEMISTRY</h2>
    <table class="unique-table">
      <tr><th>No.</th><th>Test</th></tr>
      <tr><td>122</td><td>Blood Urea</td></tr>
      <tr><td>123</td><td>Creatine</td></tr>
      <tr><td>124</td><td>Sodium (Na)</td></tr>
    </table>
  </div>
  
  
</div>
</div>                  }
       
        </>
    );
};

export default HospitalReportPage;
