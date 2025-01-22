import React, {useState} from 'react';
import './billingHome.css';

const BillingHome = () => {
    const [wards, setWards] = useState([
        { name: 'Brain Ward', inBed: 0, newAdmission: 0, transIn: 0, transOut: 0, discharged: 0, totalPt: 0 },
        { name: 'Female Ward', inBed: 4, newAdmission: 0, transIn: 0, transOut: 0, discharged: 0, totalPt: 4 },
        { name: 'ICU', inBed: 1, newAdmission: 0, transIn: 0, transOut: 0, discharged: 0, totalPt: 1 },
        { name: 'Male Ward', inBed: 4, newAdmission: 0, transIn: 0, transOut: 0, discharged: 0, totalPt: 4 },
        { name: 'MATERNITY WARD', inBed: 3, newAdmission: 0, transIn: 0, transOut: 0, discharged: 0, totalPt: 3 },
        { name: 'Private Ward', inBed: 1, newAdmission: 0, transIn: 0, transOut: 0, discharged: 0, totalPt: 1 },
      ]);
    
      const [totalAdmitted, setTotalAdmitted] = useState(0);
      const [totalDischarged, setTotalDischarged] = useState(0);
    
      const handleWardChange = (wardName, key, value) => {
        setWards(prevWards => prevWards.map(ward => {
          if (ward.name === wardName) {
            return { ...ward, [key]: value };
          }
          return ward;
        }));
      };
    
      const calculateTotals = () => {
        const admitted = wards.reduce((acc, ward) => acc + ward.newAdmission, 0);
        const discharged = wards.reduce((acc, ward) => acc + ward.discharged, 0);
        setTotalAdmitted(admitted);
        setTotalDischarged(discharged);
      };

  return (
    <div className="billing_home">
      <div className="billing_home__header">
        <div className="billing_home__header__item">
          <div className="billing_home__header__item__icon">
            <i className="fa fa-user"></i>
          </div>
          <div className="billing_home__header__item__text">
            <p>Patient Report</p>
            <p>Today: 0</p>
          </div>
          <div className="billing_home__header__item__stats">
            <p>This Week: 3</p>
            <p>This Month: 42</p>
          </div>
        </div>
        <div className="billing_home__header__item">
          <div className="billing_home__header__item__icon">
            <i className="fa fa-money"></i>
          </div>
          <div className="billing_home__header__item__text">
            <p>Income Report</p>
            <p>Today: 0.00</p>
          </div>
          <div className="billing_home__header__item__stats">
            <p>This Week: 20,000.00</p>
            <p>This Month: 99,071.00</p>
          </div>
        </div>
        <div className="billing_home__header__item">
          <div className="billing_home__header__item__icon">
            <i className="fa fa-paper-plane"></i>
          </div>
          <div className="billing_home__header__item__text">
            <p>Return Bills</p>
            <p>Today: 0.00</p>
          </div>
        
          <div className="billing_home__header__item__stats">
            <p>This Week: 0.00</p>
            <p>This Month: 0.00</p>
          </div>
        </div>
      </div>
      <div className="billing_home_date">
  <div className="date-range-billing-home">
    <label>From: </label>
    <input className="date-range-billing-home" type="date" value="2024-08-05" />
    <label>To: </label>
    <input className="date-range-billing-home" type="date" value="2024-08-12" />
    <button style={{ marginLeft: '5px' }}>★</button>
    <button style={{ marginLeft: '5px' }}>+</button>
    <button
      style={{
        marginLeft: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '5px 10px'
      }}
    >
      OK
    </button>
  </div>
</div>

      <div className="billing_home__body">
        <div className="billing_home__body__item">
          <div className="billing_home__body__item__title">
            Membership Wise Patient Invoice Count
          </div>
        </div>
        <div className="billing_home__body__item">
          <div className="billing_home__body__item__title">
            Rank Wise Patients Invoice Count
          </div>
          <div className="billing_home__body__item__chart">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
       <div className="container">
      <h1>Inpatient Census Report</h1>
      <h2>Inpatient Census (All Wards) for the selected dates</h2>
      <div className="billing-home-totals" >
        <div className="total-box" style={{border:"1px solid gray"}}>
          <p>↑ {totalAdmitted}</p>
          <p>Total Admitted</p>
        </div>
        <div className="total-box" style={{border:"1px solid gray"}}>
          <p>↑ {totalDischarged}</p>
          <p>Total Discharged</p>
        </div>
      </div>
      <table className="ward-table">
        <thead>
          <tr>
            <th className='ward-table-head'>Ward Name</th>
            <th className='ward-table-head'>In Bed</th>
            <th className='ward-table-head'>New Admission</th>
            <th className='ward-table-head'>Trans IN</th>
            <th className='ward-table-head'>Trans Out</th>
            <th className='ward-table-head'>Discharged</th>
            <th className='ward-table-head'>Total Pt</th>
          </tr>
        </thead>
        <tbody>
          {wards.map(ward => (
            <tr key={ward.name}>
              <td>{ward.name}</td>
              <td className='ward-table-data'><input className='ward-table-input' type="number" value={ward.inBed} onChange={(e) => handleWardChange(ward.name, 'inBed', parseInt(e.target.value, 10))} /></td>
              <td className='ward-table-data'><input className='ward-table-input' type="number" value={ward.newAdmission} onChange={(e) => handleWardChange(ward.name, 'newAdmission', parseInt(e.target.value, 10))} /></td>
              <td className='ward-table-data'><input className='ward-table-input' type="number" value={ward.transIn} onChange={(e) => handleWardChange(ward.name, 'transIn', parseInt(e.target.value, 10))} /></td>
              <td className='ward-table-data'><input className='ward-table-input' type="number" value={ward.transOut} onChange={(e) => handleWardChange(ward.name, 'transOut', parseInt(e.target.value, 10))} /></td>
              <td className='ward-table-data'><input className='ward-table-input' type="number" value={ward.discharged} onChange={(e) => handleWardChange(ward.name, 'discharged', parseInt(e.target.value, 10))} /></td>
              <td className='ward-table-data'>{ward.totalPt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={calculateTotals}>Calculate Totals</button>
    </div>
    </div>
  );
};

export default BillingHome;