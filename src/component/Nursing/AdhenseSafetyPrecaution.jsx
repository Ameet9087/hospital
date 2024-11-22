import React, { useState } from 'react';
import './AdhenseSafetyPrecaution.css';

const SafetyPrecautionForm = () => {
  // Form state variables
  const [employeeCode, setEmployeeCode] = useState('');
  const [EmployeeName, setEmployeeName] = useState('');
  const [age, setage] = useState('');
  const [sex, setSex] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  
  const [adherencetoSPre, setadherencetoSPre] = useState(false);
  const [ppeGloves, setppeGloves] = useState(false);
  const [GlovesWorn, setGlovesWorn] = useState(false);
  const [Labcoatworn, setLabcoatworn] = useState(false);
  const [TLDbatchesworn, setTLDbatchesworn] = useState(false);
  const [Leadapronsworn, setLeadapronsworn] = useState(false);
  const [Thyroidguardworn, setThyroidguardworn] = useState(false);
  const [remark, setRemark] = useState('');
  const [observationDoneBy, setobservationDoneBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      employeeCode,
      EmployeeName,
      age,
      sex,
      designation,
      department,
      date,
      adherencetoSPre,
      ppeGloves,
      GlovesWorn,
      Labcoatworn,
      TLDbatchesworn,
      Leadapronsworn,
      Thyroidguardworn,
      remark,
      observationDoneBy,
    };
    console.log('Form Data:', formData);
  };

  return (
    <div className="safety-precaution-form">
      <h2>Employee Safety Observation Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="left-group">
            <div className="safety-precaution-group">
              <label>Employee Code:</label>
              <input type="text" value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} required />
            </div>
            <div className="safety-precaution-group">
              <label>Employee Name:</label>
              <input type="text" value={EmployeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
            </div>
            <div className="safety-precaution-group">
              <label>Age:</label>
              <input type="number" value={age} onChange={(e) => setage(e.target.value)} required />
            </div>
            <div className="safety-precaution-group">
              <label>Sex:</label>
              <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} required />
            </div>
            <div className="safety-precaution-group">
              <label>Designation:</label>
              <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
            </div>
            <div className="safety-precaution-group">
              <label>Department:</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
            </div>
            <div className="safety-precaution-group">
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="safety-precaution-group">
              <label>Remark:</label>
              <textarea className='remarktextarea' value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
            </div>
            <div className="safety-precaution-group">
              <label>Observation Done By:</label>
              <input type="text" value={observationDoneBy} onChange={(e) => setobservationDoneBy(e.target.value)} required />
            </div>
          </div>

          <div className="right-group">
            <div className="safety-precaution-group">
              <label>Adherence to Safety Precaution In:</label>
              <select>
                <option>RADIOLOGY</option>
                <option>OT</option>
                <option>GASTRO</option>
                <option>CATH LAB</option>
              </select>
            </div>
            <div className="safety-precaution-group1">
              <input type="checkbox" checked={ppeGloves} onChange={(e) => setppeGloves(e.target.checked)} />
              <label>PPE provided by the hospital (gloves & lab coat)</label>
            </div>
            <div className="safety-precaution-group1">
              <input type="checkbox" checked={GlovesWorn} onChange={(e) => setGlovesWorn(e.target.checked)} />
              <label>Gloves Worn</label>
            </div>
            <div className="safety-precaution-group1">
              <input type="checkbox" checked={Labcoatworn} onChange={(e) => setLabcoatworn(e.target.checked)} />
              <label>Lab coat worn</label>
            </div>
            <div className="safety-precaution-group1">
              <input type="checkbox" checked={TLDbatchesworn} onChange={(e) => setTLDbatchesworn(e.target.checked)} />
              <label>TLD batches worn</label>
            </div>
            <div className="safety-precaution-group1">
              <input type="checkbox" checked={Leadapronsworn} onChange={(e) => setLeadapronsworn(e.target.checked)} />
              <label>Lead Aprons worn</label>
            </div>
            <div className="safety-precaution-group1">
              <input type="checkbox" checked={Thyroidguardworn} onChange={(e) => setThyroidguardworn(e.target.checked)} />
              <label>Thyroid Guard Worn</label>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SafetyPrecautionForm;
