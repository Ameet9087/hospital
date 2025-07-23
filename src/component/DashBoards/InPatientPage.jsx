import React from 'react';
import './InpatientPage.css';

const InPatientPage = ({ patient }) => { // Accept the patient prop
  return (
    <div className="InpatientPage-patient-orders">
      <header className="InpatientPage-header">
        <div className="InpatientPage-logo">
          <img src="path_to_logo" alt="Sasa Health" />
          Sasa Health
        </div>
        <button className="InpatientPage-home-button">🏠 Home</button>
      </header>
      
      <div className="InpatientPage-content">
        <aside className="InpatientPage-sidebar">
          <div className="InpatientPage-patient-info">
            <div className="InpatientPage-patient-avatar"></div>
            <div className="InpatientPage-patient-details">
              <h2>{patient.name}</h2> {/* Display selected patient data */}
              <p>{patient.ageSex}</p>
              <p>Hospital No: {patient.hospitalNo}</p>
              <p>Ward/Bed: {patient.wardBed}</p>
              <p>Attending: {patient.providerName}</p>
            </div>
            <div className="InpatientPage-ipd-tag">IPD</div>
          </div>
          {/* Navigation menu */}
        </aside>
        
        <main className="InpatientPage-main-content">
          <section className="InpatientPage-active-orders">
            <h3>🔔 Active Orders</h3>
            <table className="InpatientPage-orders-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              
                <tr>
                  <td>Medication</td>
                  <td>OSMOLAX 0 times a day    Start Date- 02.08.2024</td>
                  <td>active</td>
                </tr>
                <tr>
                  <td>Medication</td>
                  <td>ACECLOFENAC + PARACETAMOL TABS 0 times a day    Start Date- 12.08.2024</td>
                  <td>active</td>
                </tr>
                <tr>
                  <td>Medication</td>
                  <td>ACECLOFENAC + PARACETAMOL TABS 3 times a day    Start Date- 13.08.2024</td>
                  <td>active</td>
                </tr>
                <tr>
                  <td>Medication</td>
                  <td>ACETAZOLAMIDE 250MG 2 times a day    Start Date- 13.08.2024</td>
                  <td>active</td>
                </tr>
                <tr>
                  <td>Medication</td>
                  <td>ACETAZOLAMIDE 250MG 3 times a day    Start Date- 13.08.2024</td>
                  <td>active</td>
                </tr>
              </tbody>
            
            </table>
            <button className="InpatientPage-print-medication">Print Medication</button>
          </section>
          
          <section className="InpatientPage-new-orders">
            <h3>+ New Orders</h3>
            <div className="InpatientPage-order-input">
              <select className="InpatientPage-order-type">
                <option value="">Select order type</option>
              </select>
              <input type="text" className="InpatientPage-search-order" placeholder="search order items" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default InPatientPage;
