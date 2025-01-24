import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import "./ErInitialAssessmentForm.css";
const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div
      className={`er-initial-assessment-com-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="er-initial-assessment-com-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="er-initial-assessment-com-floating-label">
        {label}
      </label>
    </div>
  );
};
const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div
      className={`er-initial-assessment-com-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="er-initial-assessment-com-floating-select"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="er-initial-assessment-com-floating-label">
        {label}
      </label>
    </div>
  );
};
const ErInitialAssessmentForm = () => {
  const [selectedTab, setSelectedTab] = useState("services");
  const [columnWidths, setColumnWidths] = useState({});
  const [test, setTest] = useState([]);
  const tableRef = useRef(null);
  const [patientType, setPatientType] = useState("old");
  const [hr, setHr] = useState(60);
  const [spo2, setSpo2] = useState(82);
  const [rr, setRr] = useState(12);
  const [cbg, setCbg] = useState(0);
  const [bpSystolic, setBpSystolic] = useState(0);
  const [bpDiastolic, setBpDiastolic] = useState(0);
  const [temp, setTemp] = useState(92);
  const [consciousness, setConsciousness] = useState("");
  const [triagePriority, setTriagePriority] = useState({
    red: false,
    orange: false,
    yellow: false,
    green: false,
    black: false,
  });

  const [totalScore, setTotalScore] = useState()
  const [formData, setFormData] = useState({
    erNo: "",
    patientType: "",
    mrNo: "",
    mobileNumber: "",
    ipNo: "",
    nameInitial: "",
    patientName: "",
    dob: "",
    sex: "",
    relativeName: "",
    date: "",
    bedNo: "",
    roomNo: "",
    floorNo: "",
    mlc: "",
    timeOfArrival: "",
    modeOfArrival: "",
    allergies: "",
    weight: "",
    attendingERPhysician: "",
    patientComplaints: "",
    others: "",
    hrScoreValue: "",
    rrScoreValue: "",
    bpSystolic: "",
    bpSystolicScore: "",
    bpDiastolic: "",
    temperature: "",
    temperatureScore: "",
    totalAmount: "",
    triagePriority: "",
  });


  React.useEffect(() => {
    const calculatedTotal =
      (hr / 3) * 3 +
      (rr / 3) * 3 +
      (bpSystolic / 3) * 3 +
      (bpDiastolic / 3) * 3 +
      (temp / 3) * 3 +
      (spo2 / 3) * 3 +
      (cbg / 3) * 3;
    setTotalScore(calculatedTotal);
    determineTriagePriority(calculatedTotal);
  }, [hr, rr, bpSystolic, bpDiastolic, temp, spo2, cbg]);



  const determineTriagePriority = (score) => {
    const updatedPriority = {
      red: score >= 20,
      orange: score >= 15 && score < 20,
      yellow: score >= 10 && score < 15,
      green: score >= 5 && score < 10,
      black: score < 5,
    };
    setTriagePriority(updatedPriority);
  };



  const handlePatientTypeChange = (event) => {
    setPatientType(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      patientType: event.target.value,
    }));

    if (event.target.value === "new") {
      fetchPatientDetails(formData.mrNo);
    }
  };
  const [gcsValues, setGcsValues] = useState({
    e: "E4(tv)",
    v: "V5(G)",
    m: "M6(v)",
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setGcsValues({ ...gcsValues, [name]: value });
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="er-initial-assessment-com-container">
        <div className="er-initial-assessment-com-section"></div>

        <div className="er-initial-assessment-com-section">
          <div className="er-initial-assessment-com-header">
            ER Initial Assessment
          </div>
          <div className="er-initial-assessment-com-grid">
            <FloatingInput label="ERNo" />

            <FloatingSelect
              label="Patient Type"
              options={[
                { value: "old ", label: "OLD Patient" },
                { value: "new", label: "New  Patient" },
              ]}
              onChange={handlePatientTypeChange}
            />
          </div>
          {formData.patientType === "new" && (
            <div className="er-initial-assessment-com-grid">
              <div className="er-initial-assessment-com-search-field">
                <FloatingInput label="MRNo" />
                <button className="er-initial-assessment-com-search-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
              <div className="er-initial-assessment-com-search-field">
                <FloatingInput label="Mobile Number" />
                <button className="er-initial-assessment-com-search-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
              <FloatingInput label="IPNO" />
            </div>
          )}
          <div className="er-initial-assessment-com-grid">
            <FloatingSelect
              label="Name Initial"
              options={[
                { value: "mr", label: "Mr" },
                { value: "ms", label: "Ms" },
              ]}
            />
            <FloatingInput label="Patient Name" />
            <FloatingInput label="DOB" />
            <FloatingSelect
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
            <FloatingSelect label="Relative Name" />
            <FloatingInput label=" Date" type="date" />
          </div>
        </div>

        <div className="er-initial-assessment-com-section">
          <div className="er-initial-assessment-com-header">Bed Allocation</div>
          <div className="er-initial-assessment-com-grid">
            <div className="er-initial-assessment-com-search-field">
              <FloatingInput label="Bed No" />
              <button className="er-initial-assessment-com-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <div className="er-initial-assessment-com-search-field">
              <FloatingInput label="Room No" />
              <button className="er-initial-assessment-com-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <FloatingInput label="Floor No" />

            <div className="er-initial-assessment-com-form-group">
              <label>MLC:</label>
              <div className="er-initial-group">
                <label>
                  <input type="radio" name="survivalToDischarge" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" name="survivalToDischarge" value="no" />
                  No
                </label>
              </div>
            </div>
            <FloatingInput label="Time Of Arrival" type="time" />

            <div className="er-initial-assessment-com-form-group">
              <label>Mode Of Arrival :</label>
              <div className="er-initial-group">
                <label>
                  <input type="radio" name="survivalToDischarge" value="self" />
                  Self
                </label>
                <label>
                  <input type="radio" name="survivalToDischarge" value="ems" />
                  EMS
                </label>
              </div>
            </div>

            <div className="er-initial-assessment-com-form-group">
              <label>Allergies :</label>
              <div className="er-initial-group">
                <label>
                  <input type="radio" name="survivalToDischarge" value="notKnown" />
                  Not Known
                </label>

                <label>
                  <input type="radio" name="survivalToDischarge" value="yes" />
                  Yes
                </label>

              </div>
            </div>

            <FloatingInput label="Weight" />
            <div className="er-initial-assessment-com-search-field">
              <FloatingInput label="Attending ER Physician" />
              <button className="er-initial-assessment-com-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <FloatingInput label="Patient Complaints" />
          </div>
        </div>

        <div className="er-initial-assessment-com-section">
          <div className="er-initial-assessment-com-header">Vital Signs</div>
          <div className="er-initial-assessment-com-grid">
            <div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>HR:</label>
                  60
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={hr}
                    onChange={(e) => setHr(e.target.value)}
                  />
                  120
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>HR Score Value:</label>
                  <input type="text" value={(hr / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>RR:</label>
                  12
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={rr}
                    onChange={(e) => setRr(e.target.value)}
                  />
                  60
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>RR Score Value:</label>
                  <input type="text" value={(rr / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>BP Systolic :</label>
                  0
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(e.target.value)}
                  />
                  180
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>BP Systolic Score Value:</label>
                  <input type="text" value={(bpSystolic / 3) * 3} readOnly />
                </div>
              </div>
            </div>
            <div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>BP Diastolic:</label>
                  0
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(e.target.value)}
                  />
                  160
                </div>
              </div>

              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>Temp:</label>
                  92
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                  />
                  108
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>Temperture Score :</label>
                  <input type="text" value={(temp / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>Spo2:</label>
                  82
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                  />
                  140
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>Spo2 Score Value:</label>
                  <input type="text" value={(spo2 / 3) * 3} readOnly />
                </div>
              </div>
            </div>
            <div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>CBG:</label>
                  60
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={cbg}
                    onChange={(e) => setCbg(e.target.value)}
                  />
                  120
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>CGS :</label>
                  <FloatingSelect
                    label="E"
                    id="e"
                    name="e"
                    value={gcsValues.e}
                    onChange={handleSelectChange}
                    options={[
                      { value: "E1", label: "E1" },
                      { value: "E2", label: "E2" },
                      { value: "E3", label: "E3" },
                      { value: "E4", label: "E4" },
                      { value: "E5(tv)", label: "E5(tv)" },
                    ]}
                  />

                  <div className="er-initial-assessment-com-vital">
                    <FloatingSelect
                      label="V"
                      id="v"
                      name="v"
                      value={gcsValues.e}
                      onChange={handleSelectChange}
                      options={[
                        { value: "V1", label: "V1" },
                        { value: "V2", label: "V2" },
                        { value: "V3", label: "V3" },
                        { value: "V4", label: "V4" },
                        { value: "V5(G)", label: "V5(G)" },
                      ]}
                    />
                  </div>
                  <div className="er-initial-assessment-com-vital">
                    <FloatingSelect
                      label="M"
                      id="m"
                      name="m"
                      value={gcsValues.e}
                      onChange={handleSelectChange}
                      options={[
                        { value: "M1", label: "M1" },
                        { value: "M2", label: "M2" },
                        { value: "M3", label: "M3" },
                        { value: "M4", label: "M4" },
                        { value: "M5(G)", label: "M5(G)" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="er-initial-assessment-com-form-group">
                <label>Level Of Consciousness:</label>
                <div className="er-initial-assessment-com-radio-button">
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="alert"
                    />
                    Alert
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="responseToVerbalCommands"
                    />
                    Response To Verbal Commands
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="responseToPainOnly"
                    />
                    Response To Pain Only
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="unresponsive"
                    />
                    Unresponsive
                  </label>
                </div>
              </div>

              <div className="er-initial-assessment-com-section">
                <div className="er-initial-assessment-com-grid">
                  <div className="er-initial-assessment">
                    <label htmlFor="">score total No.</label>
                    <FloatingInput value={totalScore} />
                  </div>
                  <div className="er-initial-group">
                    <label>
                      <input type="radio" name="action" value="reference" />
                      Reference
                    </label>
                    <label>
                      <input type="radio" name="action" value="close" />
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="er-initial-assessment-com-section">
        <div className="er-initial-assessment-com-header">Pain Scale</div>
        <div className="er-initial-assessment-com-grid">
          <div className="er-initial-assessment-com-form-group">
            <label>Pain Scale:</label>
            <div className="er-initial-group">
              <label>
                <input
                  type="radio"
                  name="painScale"
                  value="alert"
                  checked={selectedValue === "alert"}
                  onChange={handleRadioChange}
                />
                Wrong Bakers
              </label>
              <label>
                <input
                  type="radio"
                  name="painScale"
                  value="painScale"
                  checked={selectedValue === "painScale"}
                  onChange={handleRadioChange}
                />
                Numeric Pain Rating
              </label>
            </div>
          </div>
          <div className="er-initial-assessment-com-radio-button">
            {selectedValue === "alert" && (
              <div className="wrong-bakers-images">
                <img src="wrong-bakers-image1.jpg" alt="Wrong Bakers 1" />
                <img src="wrong-bakers-image2.jpg" alt="Wrong Bakers 2" />
                <img src="wrong-bakers-image2.jpg" alt="Wrong Bakers 2" />
                <img src="wrong-bakers-image2.jpg" alt="Wrong Bakers 2" />

              </div>
            )}

            {selectedValue === "painScale" && (
              <div className="numeric-pain-rating">
                <FloatingInput label=" Wong Baker Rating" />
              </div>
            )}
          </div>
          <div className="er-initial-assessment-com-form-group">
            <FloatingInput label="Pain Score" />
          </div>
          <div className="er-initial-assessment-com-grid">
            <div className="er-initial-assessment-com-form-group">
              <label>Triage Priority:</label>
              <div className="er-initial-group">
                <label>
                  <input
                    type="checkbox"
                    name="red"
                    checked={triagePriority.red}
                    readOnly
                  />
                  Red (≥ 20)
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="orange"
                    checked={triagePriority.orange}
                    readOnly
                  />
                  Orange (15 - 19)
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="yellow"
                    checked={triagePriority.yellow}
                    readOnly
                  />
                  Yellow (10 - 14)
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="green"
                    checked={triagePriority.green}
                    readOnly
                  />
                  Green (5 - 9)
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="black"
                    checked={triagePriority.black}
                    readOnly
                  />
                  Black ( 5)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="er-initial-assessment-com-buttons">
        <button className="btn-blue">Save</button>
        <button className="btn-red">Close</button>
      </div>
    </>
  );
};
export default ErInitialAssessmentForm;
