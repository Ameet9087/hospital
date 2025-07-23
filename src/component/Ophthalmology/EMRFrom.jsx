import React, { useState } from 'react';
import "./EMRFrom.css";
import Anterior from "../../assets/EyeAnterior.jpg";
import EyePosteriorL from "../../assets/EyePosterior.jpg";
import EyePosteriorR from "../../assets/EyePosteriorLeft.jpg";

const EMRFrom = ({onClose,patient}) => {
    console.log(patient);
    
  const [formData, setFormData] = useState({
    prescription: "",
    pgpODsph: "", pgpODcyl: "", pgpODaxis: "", pgpODva: "",
    pgpOSsph: "", pgpOScyl: "", pgpOSaxis: "", pgpOSva: "",
    vaOD: "", vaOS: "",
    retinoODsph: "", retinoODcyl: "", retinoODaxis: "", retinoODva: "",
    retinoOSsph: "", retinoOScyl: "", retinoOSaxis: "", retinoOSva: "",
    acceptODsph: "", acceptODcyl: "", acceptODaxis: "", acceptODva: "",
    acceptOSsph: "", acceptOScyl: "", acceptOSaxis: "", acceptOSva: "",
    tplus: false, cp: false, ctc: false, atropine: false,
    iopOD: "", iopOS: "",
    schirmerOD: "", schirmerOS: "",
    tbutOD: "", tbutOS: "",
    finalClassOD: "", finalClassOS: "",
    adviceDiagnosis: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create the form object based on the patient data
    const form = patient.patientId
      ? { ...formData, patientDTO: { patientId: patient.patientId } }
      : { ...formData, newPatientVisitDTO: { newPatientVisitId: patient.newPatientVisitId } };
  
    console.log('Form data being submitted:', form);
  
    try {
      const response = await fetch('http://localhost:1415/api/emrs/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        // Log the response status and status text for debugging
        console.error('Network response error:', response.status, response.statusText);
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
  
      // Optionally reset the form or close the EMR form after success
      onClose(); // Close the EMR form after submission
    } catch (error) {
      console.error('Error:', error);
      // You may want to display an error message to the user here
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className='EMR-conatainer'>
    
     <div className='EMR-fullwidth-container'>
        <label htmlFor="prescription">Prescription</label>
        <textarea name="prescription" value={formData.prescription} onChange={handleChange} rows="1" cols="50"></textarea>
      </div>
      
      <div className='EMR-twoSection-container'>
        <div className='EMR-twoSection-left'>
          <p>PGP</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
                <th>VA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OD</td>
                <td><input type="text" name="pgpODsph" value={formData.pgpODsph} onChange={handleChange} /></td>
                <td><input type="text" name="pgpODcyl" value={formData.pgpODcyl} onChange={handleChange} /></td>
                <td><input type="text" name="pgpODaxis" value={formData.pgpODaxis} onChange={handleChange} /></td>
                <td><input type="text" name="pgpODva" value={formData.pgpODva} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>OS</td>
                <td><input type="text" name="pgpOSsph" value={formData.pgpOSsph} onChange={handleChange} /></td>
                <td><input type="text" name="pgpOScyl" value={formData.pgpOScyl} onChange={handleChange} /></td>
                <td><input type="text" name="pgpOSaxis" value={formData.pgpOSaxis} onChange={handleChange} /></td>
                <td><input type="text" name="pgpOSva" value={formData.pgpOSva} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='EMR-twoSection-right'>
          <p>VA Unaided</p>
          <table>
            <tbody>
              <tr>
                <td>OD</td>
                <td><input type="text" name="vaOD" value={formData.vaOD} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>OS</td>
                <td><input type="text" name="vaOS" value={formData.vaOS} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='EMR-twoSection-container'>
        <div className='EMR-twoSection-left'>
          <p>Retinoscopy</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
                <th>VA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OD</td>
                <td><input type="text" name="retinoODsph" value={formData.retinoODsph} onChange={handleChange} /></td>
                <td><input type="text" name="retinoODcyl" value={formData.retinoODcyl} onChange={handleChange} /></td>
                <td><input type="text" name="retinoODaxis" value={formData.retinoODaxis} onChange={handleChange} /></td>
                <td><input type="text" name="retinoODva" value={formData.retinoODva} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>OS</td>
                <td><input type="text" name="retinoOSsph" value={formData.retinoOSsph} onChange={handleChange} /></td>
                <td><input type="text" name="retinoOScyl" value={formData.retinoOScyl} onChange={handleChange} /></td>
                <td><input type="text" name="retinoOSaxis" value={formData.retinoOSaxis} onChange={handleChange} /></td>
                <td><input type="text" name="retinoOSva" value={formData.retinoOSva} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='EMR-twoSection-right'>
          <p>Acceptance</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
                <th>VA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OD</td>
                <td><input type="text" name="acceptODsph" value={formData.acceptODsph} onChange={handleChange} /></td>
                <td><input type="text" name="acceptODcyl" value={formData.acceptODcyl} onChange={handleChange} /></td>
                <td><input type="text" name="acceptODaxis" value={formData.acceptODaxis} onChange={handleChange} /></td>
                <td><input type="text" name="acceptODva" value={formData.acceptODva} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>OS</td>
                <td><input type="text" name="acceptOSsph" value={formData.acceptOSsph} onChange={handleChange} /></td>
                <td><input type="text" name="acceptOScyl" value={formData.acceptOScyl} onChange={handleChange} /></td>
                <td><input type="text" name="acceptOSaxis" value={formData.acceptOSaxis} onChange={handleChange} /></td>
                <td><input type="text" name="acceptOSva" value={formData.acceptOSva} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='EMR-twoSection-container'>
        <div className='EMR-twoSection-left'>
          <p>Anterior Segment Right</p>
          <img src={Anterior} alt="Anterior Segment Right" />
        </div>

        <div className='EMR-twoSection-right'>
          <p>Anterior Segment Left</p>
          <img src={Anterior} alt="Anterior Segment Left" />
        </div>
      </div>

      <div className='EMR-twoSection-container'>
        <div className='EMR-twoSection-left'>
          <p>Dilate</p>
          <div>
          <label ><input type="checkbox" name="tplus" checked={formData.tplus} onChange={handleChange} /> T+</label>
          <label ><input type="checkbox" name="cp" checked={formData.cp} onChange={handleChange} /> CP</label>
          <label ><input type="checkbox" name="ctc" checked={formData.ctc} onChange={handleChange} /> CTC</label>
          <label ><input type="checkbox" name="atropine" checked={formData.atropine} onChange={handleChange} /> Atropine</label>
          </div>
        </div>

        <div className='EMR-twoSection-right'>
          <p>IOP</p>
          <table>
            <tbody>
                <tr>
                    <td>OD</td>
                    <td><input type="text" name="iopOD" value={formData.iopOD} onChange={handleChange} /></td>
                    </tr>
                <tr> 
                    <td>OS</td>
                    <td><input type="text" name="iopOS" value={formData.iopOS} onChange={handleChange} /></td>
                </tr>
            </tbody>
          </table>  
        </div>
      </div>
      <div className='EMR-twoSection-container'>
        <div className='EMR-twoSection-left'>
            <p>Posterior Segment Right</p>
          <img src={EyePosteriorL} alt="Anterior Segment Right" />
        </div>

        <div className='EMR-twoSection-right'>
            <p>Posterior Segment Left</p>
            <img src={EyePosteriorR} alt="Anterior Segment Right" />
        </div>
      </div>

      <div className='EMR-twoSection-container'>
        <div className='EMR-twoSection-left'>
          <p>Schirmer</p>
          <table>
            <tbody>
                <tr>
                    <td>OD:</td>
                    <td><input type="text" name="schirmerOD" value={formData.schirmerOD} onChange={handleChange} /></td>
                </tr>
                <tr>
                    <td>OS:</td>
                    <td><input type="text" name="schirmerOS" value={formData.schirmerOS} onChange={handleChange} /></td>
                </tr>
            </tbody>
          </table>
        </div>

        <div className='EMR-twoSection-right'>
          <p>TBUT</p>
          <table>
            <tbody>
                <tr>
                    <td>OD:</td>
                    <td><input type="text" name="tbutOD" value={formData.tbutOD} onChange={handleChange} /></td>
                </tr>
                <tr>
                    <td>OS:</td>
                    <td><input type="text" name="tbutOS" value={formData.tbutOS} onChange={handleChange} /></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='EMR-twoSection-container'>
        <div className='EMR-twoSection-left'>
        <p>Final Class</p>
        <table>
            <tbody>
                <tr>
                    <td>OD:</td>
                    <td><input type="text" name="schirmerOD" value={formData.schirmerOD} onChange={handleChange} /></td>
                </tr>
                <tr>
                    <td>OS:</td>
                    <td><input type="text" name="finalClassOS" value={formData.finalClassOS} onChange={handleChange} /></td>
                </tr>
            </tbody>
          </table>
        </div>
        <div className='EMR-twoSection-right-textarea'>
        <label htmlFor="adviceDiagnosis">Advice / Diagnosis</label>
        <textarea name="adviceDiagnosis" value={formData.adviceDiagnosis} onChange={handleChange} rows="3" cols="50"></textarea>
        </div>
      </div>

      <div className='EMR-saveBtn-container'>
        <button type='submit' className='EMR-saveBtn'> Save All</button>
        <button onClick={onClose} className='EMR-closeButton'>Back</button>
      </div>
    </form>
  );
};

export default EMRFrom;
