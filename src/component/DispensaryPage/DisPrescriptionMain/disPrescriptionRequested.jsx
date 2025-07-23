import React from "react";
import './popup.css';

const disPrescriptionRequested = () => {
    return(
        <div className="desPriscription-container">
        <div className="desPriscription-content">
        <div className="desPriscription-close">
        <button className="close">X</button>
        </div>
            <div className="desPriscription-head">
                <p>KRA PIN:,</p>
                <p>Phone No.</p>
                <h3>Pharmacy Unit</h3>
            </div>
                <div className="desPriscription-mid">
                  <div className="mid-left">
                <p>Hospital Code: 2406003769</p>
                <p>Patient Name: <b>Joy Prudence </b> </p>
                </div>
                <div className="mid-right">
                <p > Requested By: admin admin</p>
                <p  >Date: Oct 1,2024</p>
                </div>
                </div>
                <div className="desPriscription-prescription">
                <h4>Prescription Details </h4>
                <table>
                    <thead>
                        <tr>
                        <th>S.N</th>
                        <th>Item Name</th>
                        <th>Frequency</th>
                        <th>Days</th>
                        <th>AvaidesPriscriptionility</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>.OSMOLAX</td>
                        <td>0</td>
                        <td>0</td>
                        <td style={{ color: 'dark purple' }}>YES</td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="desPriscription-pop-btn">
               <button className="desPriscription-print">Print <FontAwesomeIcon icon="fa-solid fa-turn-down" rotation={270} /></button>
               <button className="desPriscription-dispatch" >Dispatch <FontAwesomeIcon icon="fa-solid fa-print" /></button>
              
            </div>


        </div>
       </div>
    )
}
export default disPrescriptionRequested;