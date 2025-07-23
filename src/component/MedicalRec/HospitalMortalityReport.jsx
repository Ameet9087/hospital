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
<div class="morbidity-report-container">
<h5>B. Hospital Morbidity (No. of Patients Discharged)</h5>
<table class="morbidity-table">
    <thead>
        <tr>
            <th rowspan="2">ICDCode</th>
            <th rowspan="2">Disease</th>
            <th colspan="2">0-7 Days</th>
            <th colspan="2">8-28 Days</th>
            <th colspan="2">29 Days - 1 Year</th>
            <th colspan="2">1-4 Years</th>
            <th colspan="2">5-14 Years</th>
            <th colspan="2">15-19 Years</th>
            <th colspan="2">20-29 Years</th>
            <th colspan="2">30-39 Years</th>
            <th colspan="2">40-49 Years</th>
            <th colspan="2">50-59 Years</th>
            <th colspan="2">60-69 Years</th>
            <th colspan="2">Greater than=70 Years</th>
            <th colspan="2">Total Deaths</th>
        </tr>
        <tr>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
            <th>F</th>
            <th>M</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
        </tr>
        <tr>
            <td colspan="2">TOTAL</td>
            <td colspan="26"></td>
        </tr>
    </tbody>
</table>
<div class="morbidity-actions">
    <button class="morbidity-print-btn">Print Report</button>
    <button class="morbidity-export-btn">Export</button>
</div>
</div>

                  }
       
        </>
    );
};

export default HospitalReportPage;
