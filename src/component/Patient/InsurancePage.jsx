 //prachi parab patientRegisteration css 13/9
import React, { useEffect, useState } from 'react';
import './InsurancePage.css';

function InsurancePage({ sendinsurancedata, insuranceData }) {
  const [insuranceDataPatient, setInsuranceDataPatient] = useState({
    insuranceProvider: 'NHIF',
    insuranceName: '',
    cardNo: '',
    insuranceNo: '',
    facilityCode: '',
    initialBalance: '0',
  });

  // Update state when insuranceData changes
  useEffect(() => {
    if (insuranceData) {
      setInsuranceDataPatient(prevState => {
        // Only update if the values are different
        if (
          insuranceData.insuranceProvider !== prevState.insuranceProvider ||
          insuranceData.insuranceName !== prevState.insuranceName ||
          insuranceData.cardNo !== prevState.cardNo ||
          insuranceData.insuranceNo !== prevState.insuranceNo ||
          insuranceData.facilityCode !== prevState.facilityCode ||
          insuranceData.initialBalance !== prevState.initialBalance
        ) {
          return {
            insuranceProvider: insuranceData.insuranceProvider || 'NHIF',
            insuranceName: insuranceData.insuranceName || '',
            cardNo: insuranceData.cardNo || '',
            insuranceNo: insuranceData.insuranceNo || '',
            facilityCode: insuranceData.facilityCode || '',
            initialBalance: insuranceData.initialBalance || '0',
          };
        }
        return prevState; // If no changes, do nothing
      });
    }
  }, [insuranceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state with form input change
    const updatedInsuranceData = {
      ...insuranceDataPatient,
      [name]: value,
    };

    // Set the updated state
    setInsuranceDataPatient(updatedInsuranceData);

    // Immediately pass updated data to the parent component
    sendinsurancedata(updatedInsuranceData);
  };

  return (
    <div className="insurance-page">
      <h5 style={{marginBottom:'20px'}}>Insurance Information</h5>
      <form className='insurance-page-form'>
        <div>
          <label htmlFor="insuranceProvider">Insurance Provider<span className='mandatory'>*</span>:</label>
          <select
            id="insuranceProvider"
            name="insuranceProvider"
            value={insuranceDataPatient.insuranceProvider}
            onChange={handleChange}
            required
          >
            <option value="NHIF">NHIF</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="insuranceName">Insurance Name:</label>
          <input
            type="text"
            id="insuranceName"
            name="insuranceName"
            value={insuranceDataPatient.insuranceName}
            onChange={handleChange}
            placeholder="Insurance name"
          />
        </div>
        <div>
          <label htmlFor="cardNo">Card Number (ID No)<span className='mandatory'>*</span>:</label>
          <input
            type="text"
            id="cardNo"
            name="cardNo"
            value={insuranceDataPatient.cardNo}
            onChange={handleChange}
            placeholder="Card number (ID No)"
            required
          />
        </div>
        <div>
          <label htmlFor="insuranceNo">Insurance Number (Member No)<span className='mandatory'>*</span>:</label>
          <input
            type="text"
            id="insuranceNo"
            name="insuranceNo"
            value={insuranceDataPatient.insuranceNo}
            onChange={handleChange}
            placeholder="Insurance number (Member No)"
            required
          />
        </div>
        <div>
          <label htmlFor="facilityCode">Facility Code<span className='mandatory'>*</span>:</label>
          <input
            type="text"
            id="facilityCode"
            name="facilityCode"
            value={insuranceDataPatient.facilityCode}
            onChange={handleChange}
            placeholder="Facility Code"
            required
          />
        </div>
        <div>
          <label htmlFor="initialBalance">Initial Balance<span className='mandatory'>*</span>:</label>
          <input
            type="number"
            id="initialBalance"
            name="initialBalance"
            value={insuranceDataPatient.initialBalance}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default InsurancePage;
