import { useState } from 'react';
import './iCUDoctorEMR.css';

const ICUDoctorEMR = () => {
  const [triageValue, setTriageValue] = useState(1);
  const [isMLC, setIsMLC] = useState(false);

  const [vitals, setVitals] = useState({
    temp: 98.4,
    heartRate: 72,
    bpSystolic: 120,
    bpDiastolic: 80,
    spo2: 100,
    respiration: 20,
    height: 10,
    weight: '',
    bmi: '0.00'
  });

  const [allergyStatus, setAllergyStatus] = useState('noKnown');
  const [medications, setMedications] = useState([{ id: 1, name: '' }]);

  const addMedication = () => {
    setMedications([...medications, { id: medications.length + 1, name: '' }]);
  };

  const deleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <>
    <div className="iCUDoctorEMR-form-container">
      <div className="iCUDoctorEMR-form-row">
        <label>UHID<span className="iCUDoctorEMR-required">*</span></label>
        <span className="iCUDoctorEMR-separator">:</span>
        <input type="text" />
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>IP No</label>
        <span className="iCUDoctorEMR-separator">:</span>
        <div className="iCUDoctorEMR-search-input">
          <input type="text" />
          <button className="iCUDoctorEMR-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>Patient Name<span className="iCUDoctorEMR-required">*</span></label>
        <span className="iCUDoctorEMR-separator">:</span>
        <input type="text" />
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>Age<span className="iCUDoctorEMR-required">*</span></label>
        <span className="iCUDoctorEMR-separator">:</span>
        <input type="text" />
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>Sex<span className="iCUDoctorEMR-required">*</span></label>
        <span className="iCUDoctorEMR-separator">:</span>
        <input type="text" />
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>DOA<span className="iCUDoctorEMR-required">*</span></label>
        <span className="iCUDoctorEMR-separator">:</span>
        <input type="text" />
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>Dept<span className="iCUDoctorEMR-required">*</span></label>
        <span className="iCUDoctorEMR-separator">:</span>
        <input type="text" />
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>Consultant<span className="iCUDoctorEMR-required">*</span></label>
        <span className="iCUDoctorEMR-separator">:</span>
        <input type="text" />
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>Patient Type</label>
        <span className="iCUDoctorEMR-separator">:</span>
        <select defaultValue="select">
          <option value="select">select</option>
        </select>
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>MLC Patient</label>
        <span className="iCUDoctorEMR-separator">:</span>
        <div className="iCUDoctorEMR-radio-group">
          <label className="iCUDoctorEMR-radio-label">
            <input
              type="radio"
              name="mlc"
              checked={isMLC}
              onChange={() => setIsMLC(true)}
              />
            Yes
          </label>
          <label className="iCUDoctorEMR-radio-label">
            <input
              type="radio"
              name="mlc"
              checked={!isMLC}
              onChange={() => setIsMLC(false)}
            />
            No
          </label>
        </div>
      </div>

      <div className="iCUDoctorEMR-form-row">
        <label>If MLC</label>
        <span className="iCUDoctorEMR-separator">:</span>
        <div className="iCUDoctorEMR-mlc-input">
          <input type="text" disabled={!isMLC} />
          <button className="iCUDoctorEMR-expand-btn">⛶</button>
        </div>
      </div>

      <div className="iCUDoctorEMR-triage-section">
        <div className="iCUDoctorEMR-triage-label">TRIAGE PRIORITY</div>
        <div className="iCUDoctorEMR-triage-range">
          <span className="iCUDoctorEMR-range-start">1</span>
          <input
            type="range"
            min="1"
            max="5"
            value={triageValue}
            onChange={(e) => setTriageValue(e.target.value)}
            className="iCUDoctorEMR-range-slider"
            />
          <span className="iCUDoctorEMR-range-end">5</span>
        </div>
      </div>
    </div>
    {/* ---------------------------------------------------------------------------------------------- */}
    <div className="iCUDoctorEMR2-medical-form">
      <div className="iCUDoctorEMR2-section">
        <div className="iCUDoctorEMR2-section-header">Vitals</div>
        
        <div className="iCUDoctorEMR2-vital-row">
          <label>Temp(F)</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-range-container">
            <span className="iCUDoctorEMR2-range-value">92</span>
            <input 
              type="range" 
              min="92" 
              max="108" 
              value={vitals.temp}
              onChange={(e) => setVitals({...vitals, temp: e.target.value})}
              className="iCUDoctorEMR2-range-slider"
            />
            <div className="iCUDoctorEMR2-range-value-display">{vitals.temp}</div>
            <span className="iCUDoctorEMR2-range-value">108</span>
          </div>
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>Heart Rate</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-range-container">
            <span className="iCUDoctorEMR2-range-value">0</span>
            <input 
              type="range" 
              min="0" 
              max="300" 
              value={vitals.heartRate}
              onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
              className="iCUDoctorEMR2-range-slider"
            />
            <div className="iCUDoctorEMR2-range-value-display">{vitals.heartRate}</div>
            <span className="iCUDoctorEMR2-range-value">300</span>
          </div>
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>BP(Systolic) (MmHg)</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-range-container">
            <span className="iCUDoctorEMR2-range-value">10</span>
            <input 
              type="range" 
              min="10" 
              max="250" 
              value={vitals.bpSystolic}
              onChange={(e) => setVitals({...vitals, bpSystolic: e.target.value})}
              className="iCUDoctorEMR2-range-slider"
            />
            <div className="iCUDoctorEMR2-range-value-display">{vitals.bpSystolic}</div>
            <span className="iCUDoctorEMR2-range-value">250</span>
          </div>
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>BP(Diastolic) (MmHg)</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-range-container">
            <span className="iCUDoctorEMR2-range-value">10</span>
            <input 
              type="range" 
              min="10" 
              max="250" 
              value={vitals.bpDiastolic}
              onChange={(e) => setVitals({...vitals, bpDiastolic: e.target.value})}
              className="iCUDoctorEMR2-range-slider"
            />
            <div className="iCUDoctorEMR2-range-value-display">{vitals.bpDiastolic}</div>
            <span className="iCUDoctorEMR2-range-value">250</span>
          </div>
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>SPO2(%)</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-range-container">
            <span className="iCUDoctorEMR2-range-value">0</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={vitals.spo2}
              onChange={(e) => setVitals({...vitals, spo2: e.target.value})}
              className="iCUDoctorEMR2-range-slider"
            />
            <div className="iCUDoctorEMR2-range-value-display">{vitals.spo2}</div>
            <span className="iCUDoctorEMR2-range-value">100</span>
          </div>
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>Respiration( Per Minute)</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-range-container">
            <span className="iCUDoctorEMR2-range-value">0</span>
            <input 
              type="range" 
              min="0" 
              max="70" 
              value={vitals.respiration}
              onChange={(e) => setVitals({...vitals, respiration: e.target.value})}
              className="iCUDoctorEMR2-range-slider"
            />
            <div className="iCUDoctorEMR2-range-value-display">{vitals.respiration}</div>
            <span className="iCUDoctorEMR2-range-value">70</span>
          </div>
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>Height(In Cm)</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-range-container">
            <span className="iCUDoctorEMR2-range-value">10</span>
            <input 
              type="range" 
              min="10" 
              max="210" 
              value={vitals.height}
              onChange={(e) => setVitals({...vitals, height: e.target.value})}
              className="iCUDoctorEMR2-range-slider"
            />
            <div className="iCUDoctorEMR2-range-value-display">{vitals.height}</div>
            <span className="iCUDoctorEMR2-range-value">210</span>
          </div>
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>Weight (In Kg)</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <input type="text" value={vitals.weight} onChange={(e) => setVitals({...vitals, weight: e.target.value})} />
        </div>

        <div className="iCUDoctorEMR2-vital-row">
          <label>BMI</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <input type="text" value={vitals.bmi} readOnly />
        </div>
      </div>

      <div className="iCUDoctorEMR2-section">
        <div className="iCUDoctorEMR2-section-header">Allergy</div>
        <div className="iCUDoctorEMR2-allergy-row">
          <label>ALLERGY</label>
          <span className="iCUDoctorEMR2-separator">:</span>
          <div className="iCUDoctorEMR2-radio-group">
            <label>
              <input 
                type="radio" 
                name="allergy" 
                checked={allergyStatus === 'noKnown'} 
                onChange={() => setAllergyStatus('noKnown')}
              />
              No Known Allergy
            </label>
            <label>
              <input 
                type="radio" 
                name="allergy" 
                checked={allergyStatus === 'medication'} 
                onChange={() => setAllergyStatus('medication')}
              />
              Medication
            </label>
            <label>
              <input 
                type="radio" 
                name="allergy" 
                checked={allergyStatus === 'notKnown'} 
                onChange={() => setAllergyStatus('notKnown')}
              />
              Not Known
            </label>
          </div>
        </div>
      </div>

      <div className="iCUDoctorEMR2-section">
        <div className="iCUDoctorEMR2-section-header">Medication</div>
        <table className="iCUDoctorEMR2-medication-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Medication Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                <td>{med.id}</td>
                <td>
                  <div className="iCUDoctorEMR2-search-field">
                    <input type="text" value={med.name} />
                    <button className="iCUDoctorEMR2-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                  </div>
                </td>
                <td className="iCUDoctorEMR2-action-cell">
                  <button className="iCUDoctorEMR2-add-btn" onClick={addMedication}>Add</button>
                  <button className="iCUDoctorEMR2-del-btn" onClick={() => deleteMedication(med.id)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {/* ------------------------------------------------------------------------------------------------------------------ */}
    <div className="iCUDoctorEMR3-container">
      <Section title="Airway">
        <div className="iCUDoctorEMR3-row">
          <label>Airway:</label>
          <div className="iCUDoctorEMR3-radio-group">
            <label><input type="radio" name="airway" /> Patent</label>
            <label><input type="radio" name="airway" /> Not Patent</label>
          </div>
        </div>
        <div className="iCUDoctorEMR3-row">
          <label>If Not Patent:</label>
          <select><option>Select</option></select>
        </div>
      </Section>

      <Section title="Breathing">
        <div className="iCUDoctorEMR3-row"><label>Breathing:</label><select><option>Select</option></select></div>
        <div className="iCUDoctorEMR3-row"><label>Spo2:</label><input type="text" /></div>
        <div className="iCUDoctorEMR3-row"><label>Respiratory Rate:</label><input type="text" /></div>
        <div className="iCUDoctorEMR3-row"><label>Oxygen:</label><input type="text" /></div>
        <div className="iCUDoctorEMR3-row"><label>Intubated:</label><select><option>Select</option></select></div>
        <div className="iCUDoctorEMR3-row"><label>Tube Size:</label><input type="text" /></div>
        <div className="iCUDoctorEMR3-row"><label>Fixed At:</label><input type="text" /></div>
      </Section>

      <Section title="GCS">
        <div className="iCUDoctorEMR3-row"><label>E:</label><input type="range" min="1" max="4" /></div>
        <div className="iCUDoctorEMR3-row"><label>V:</label><input type="range" min="1" max="5" /></div>
        <div className="iCUDoctorEMR3-row"><label>M:</label><input type="range" min="1" max="6" /></div>
      </Section>

      <Section title="Pupils">
        <div className="iCUDoctorEMR3-row">
          <label>BIL:</label>
          <div className="iCUDoctorEMR3-radio-group">
            <label><input type="radio" name="bil" /> Equal</label>
            <label><input type="radio" name="bil" /> Unequal</label>
          </div>
        </div>
        <div className="iCUDoctorEMR3-row">
          <label>RT Side:</label>
          <div className="iCUDoctorEMR3-radio-group">
            <label><input type="radio" name="rt-side" /> Reactive</label>
            <label><input type="radio" name="rt-side" /> Not Reactive</label>
            <label><input type="radio" name="rt-side" /> Sluggish</label>
          </div>
          <input type="range" min="1" max="4" />
        </div>
        <div className="iCUDoctorEMR3-row">
          <label>LT Side:</label>
          <div className="iCUDoctorEMR3-radio-group">
            <label><input type="radio" name="lt-side" /> Reactive</label>
            <label><input type="radio" name="lt-side" /> Not Reactive</label>
            <label><input type="radio" name="lt-side" /> Sluggish</label>
          </div>
          <input type="range" min="1" max="4" />
        </div>
        <div className="iCUDoctorEMR3-row"><label>Temperature:</label><input type="text" /></div>
        <div className="iCUDoctorEMR3-row"><label>CBG:</label><input type="text" /></div>
      </Section>

      <Section title="Chief Complaints">
        <table className="iCUDoctorEMR3-complaints-table">
          <thead>
            <tr>
              <th>Add</th><th>SN</th><th>System NM</th><th>Symptoms</th><th>Duration</th><th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button>Add</button><button>Del</button></td>
              <td>1</td>
              <td><select><option>Select</option></select></td>
              <td><select><option>Select</option></select></td>
              <td><input type="text" /></td>
              <td><select><option>Select</option></select></td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>

            </>
  );
};
function Section({ title, children }) {
    return (
      <div className="iCUDoctorEMR3-section">
        <div className="iCUDoctorEMR3-section-title">{title}</div>
        {children}
      </div>
    );
  }

export default ICUDoctorEMR;