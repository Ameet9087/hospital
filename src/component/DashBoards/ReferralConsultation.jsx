import React, { useState, useEffect } from "react";
import "./ReferralConsultation.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingSelect, FloatingTextarea } from "../../FloatingInputs";
const ReferralConsultation = ({ inPatientId, outPatientId }) => {
  const [doctors, setDoctors] = useState([]); // To store the fetched list of doctors
  const [selectedDoctorId, setSelectedDoctorId] = useState(""); // Selected doctor ID
  const [priority, setPriority] = useState("");
  const [reasonFor, setReasonFor] = useState("");
  const [referrals, setReferrals] = useState([]); // To store fetched referrals

  // Handle form cancel
  const handleCancel = () => {
    setSelectedDoctorId("");
    setPriority("");
    setReasonFor("");
  };

  // Fetch the list of doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        setDoctors(response.data); // Store fetched doctors in state
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to fetch doctor names.");
      }
    };

    fetchDoctors();
  }, []);

  // Fetch existing referrals for a specific patient
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        let endpoint = "";

        if (inPatientId) {
          endpoint = `${API_BASE_URL}/referrals/in-patient/${inPatientId}`;
        } else if (outPatientId) {
          endpoint = `${API_BASE_URL}/referrals/out-patient/${outPatientId}`;
        } else {
          console.error("No valid patient ID provided for Diet Orders.");
          return;
        }

        const response = await axios.get(endpoint);
        setReferrals(response.data);
      } catch (error) {
        console.error("Error fetching Referrals:", error);
      }
    };

    fetchReferrals();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the form data in the required format
    const formData = {
      priority: priority,
      reasonFor: reasonFor,
      ...(inPatientId
        ? { inPatient: { inPatientId } }
        : { outPatient: { outPatientId } }),
      referredByDoctor: {
        doctorId: 1, // Static doctor ID
      },
      referredToDoctor: {
        doctorId: parseInt(selectedDoctorId), // Selected doctor ID
      },
    };

    try {
      // Send the form data to the API
      await axios.post(`${API_BASE_URL}/referrals`, formData);
      console.log("Form submitted:", formData);
      handleCancel(); // Reset the form fields
      toast.success("Referral submitted successfully!");
    } catch (error) {
      console.error("Error submitting referral:", error);
      toast.error("Failed to submit referral.");
    }
  };

  return (
    <div className="ReferralConsultation-form-container">
      <h3>Referral / Cross Consultation</h3>

      {/* Referral form */}
      <form onSubmit={handleSubmit}>
        <div className="ReferralConsultation-content">
          <div className="ReferralConsultation-content-left">
            {/* Doctor Name Field */}
            <div className="ReferralConsultation-form-group">
              <FloatingSelect
                label={"Doctor Name"}
                name="doctorName"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                required
                options={[
                  { value: "", label: "" },
                  ...(Array.isArray(doctors)
                    ? doctors.map((doctor) => ({
                        value: doctor.doctorId,
                        label: doctor.doctorName,
                      }))
                    : []),
                ]}
              />
            </div>

            {/* Priority Field */}
            <div className="ReferralConsultation-form-group">
              <FloatingSelect
              label={"priority"}
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                options={[
                  { value: "", label: "" },
                  { value: "High", label: "High" },
                  { value: "Medium", label: "Medium" },
                  { value: "Low", label: "Low" },
                ]}
              />
            </div>
          </div>

          <div className="ReferralConsultation-content-right">
            <div className="ReferralConsultation-form-group">
            <FloatingTextarea
            label={"Reason For Referral"}
            name="reasonFor"
            value={reasonFor}
            onChange={(e) => setReasonFor(e.target.value)}
            required
            />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="ReferralConsultation-buttons">
          <button
            type="button"
            onClick={handleCancel}
            className="ReferralConsultation-cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="ReferralConsultation-submit-btn">
            Submit
          </button>
        </div>
      </form>

      {/* Display existing referrals */}
      <div className="ReferralConsultation-existing-referrals">
        <h4>Existing Referrals:</h4>
        {referrals.length > 0 ? (
          <table className="ReferralConsultation-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Doctor Name</th>
                <th>Priority</th>
                <th>Reason For Referral</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{referral.referredToDoctor?.doctorName || "N/A"}</td>
                  <td>{referral.priority}</td>
                  <td>{referral.reasonFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No existing referrals found.</p>
        )}
      </div>
    </div>
  );
};

export default ReferralConsultation;
