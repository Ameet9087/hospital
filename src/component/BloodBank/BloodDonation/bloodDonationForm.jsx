import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./bloodDonationForm.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import CustomModal from "../../../CustomModel/CustomModal";
import { toast } from "react-toastify";
const BloodDonationForm = (isOpen, onClose) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    weight: "",
    lastDonationDate: "",
    medication: "",
    surgeries: "",
    chronicIllness: "",
    travelHistory: "",
    infectiousDisease: "",
    healthComments: "",
    donationDate: "",
    donationType: "",
    donationCenter: "",
    timeSlot: "",
    consent: false,
    shareInfo: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [donors, setDonors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phoneNumber" || name === "postalCode") {
      if (!/^\d*$/.test(value)) {
        return; 
      }
      if ((name === "phoneNumber" && value.length > 10) || 
          (name === "postalCode" && value.length > 6)) {
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.gender ||
      !formData.bloodGroup ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode ||
      !formData.weight ||
      !formData.lastDonationDate ||
      !formData.medication ||
      !formData.surgeries ||
     
      !formData.timeSlot
    ) {
      toast.error("All fields are mandatory. Please fill in all details.");
      return;
    }
  
    const formattedData = {
      ...formData,
      dob: formatDate(formData.dob),
      lastDonationDate: formatDate(formData.lastDonationDate),
      donationDate: formatDate(formData.donationDate),
    };
  
    axios
      .post(`${API_BASE_URL}/donors/register`, formattedData)
      .then((response) => {
        setDonors([...donors, response.data]); // Add new donor to the list
        setSubmissionStatus("Success! Form submitted.");
        setShowForm(false); // Hide the form after submission
        toast.success("Proposal saved successfully!");
      })
      .catch((error) => {
        setSubmissionStatus("Failed to submit the form.");
        toast.error("Failed to save proposal. Please try again.");
        console.error("There was an error submitting the form!", error);
      });
  };
  
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/donors/allDonors`)
      .then((response) => {
        setDonors(response.data); // Update the donors state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });
  }, [donors]);

  return (
    <div className="blood-donation-patient-form-container">
      <button
        className="blood-donation-submit-btn"
        onClick={() => setShowForm(true)}
      >
        Add New Donor
      </button>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Full Name",
                "Date of Birth",
                "Gender",
                "Blood Group",
                "Phone Number",
                "Email",
                "City",
                "Donation Date",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {donors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.fullName}</td>
                <td>{donor.dob}</td>
                <td>{donor.gender}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.phoneNumber}</td>
                <td>{donor.email}</td>
                <td>{donor.city}</td>
                <td>{donor.donationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomModal isOpen={showForm} onClose={() => setShowForm(false)}>
        <div className="blood-donation-patient-con">
          <h3 className="header-BloodDonation">Blood Donation Registration</h3>
          <form className="blood-donation-patient-form" onSubmit={handleSubmit}>
            <div className="blood-donation-patient-left">
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      handleInputChange(e);
                    }
                  }}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Date of Birth"}
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  placeholder="Date of Birth"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <label>
                  Gender:
                </label>
                <div className="blood-donation-patient-gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                      required
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                      required
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleInputChange}
                      required
                    />
                    Other
                  </label>
                </div>
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Blood Group"}
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  placeholder="Blood Group"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Phone Number"}
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Email"}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Address"}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"City"}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"State"}
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Postal Code"}
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal Code"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Weight"}
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Weight (kg)"
                  min="0"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Last Donation Date"}
                  type="date"
                  name="lastDonationDate"
                  value={formData.lastDonationDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="blood-donation-patient-right">
              {/* Right Side Inputs */}
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Medication"}
                  type="text"
                  name="medication"
                  value={formData.medication}
                  onChange={handleInputChange}
                  placeholder="Medication"
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Surgeries"}
                  type="text"
                  name="surgeries"
                  value={formData.surgeries}
                  onChange={handleInputChange}
                  placeholder="Surgeries"
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Chronic Illness"}
                  type="text"
                  name="chronicIllness"
                  value={formData.chronicIllness}
                  onChange={handleInputChange}
                  placeholder="Chronic Illness"
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Travel History"}
                  type="text"
                  name="travelHistory"
                  value={formData.travelHistory}
                  onChange={handleInputChange}
                  placeholder="Travel History"
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Infectious Disease"}
                  type="text"
                  name="infectiousDisease"
                  value={formData.infectiousDisease}
                  onChange={handleInputChange}
                  placeholder="Infectious Disease"
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Health Comments"}
                  name="healthComments"
                  value={formData.healthComments}
                  onChange={handleInputChange}
                  placeholder="Health Comments"
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Donation Date"}
                  type="date"
                  name="donationDate"
                  value={formData.donationDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={" Donation Type "}
                  type="text"
                  name="donationType"
                  value={formData.donationType}
                  onChange={handleInputChange}
                  placeholder="Donation Type"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={" Donation Center"}
                  type="text"
                  name="donationCenter"
                  value={formData.donationCenter}
                  onChange={handleInputChange}
                  placeholder="Donation Center"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <FloatingInput
                  label={"Time Slot"}
                  type="time"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  placeholder="Time Slot"
                  required
                />
              </div>
              <div className="blood-donation-patient-group">
                <label>I consent to donate blood.</label>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                />
              </div>
              <div className="blood-donation-patient-group">
                <label>
                  I consent to share my information with relevant parties.
                </label>
                <input
                  type="checkbox"
                  name="shareInfo"
                  checked={formData.shareInfo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="blood-donation-button">
                <button type="submit" className="blood-donation-submit-btn">
                  Submit
                </button>
              </div>
          </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export default BloodDonationForm;
