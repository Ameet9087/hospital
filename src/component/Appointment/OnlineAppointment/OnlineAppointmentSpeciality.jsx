import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OnlineAppointmentSpeciality.css";
import CustomModal from "../../../CustomModel/CustomModal";
import doctorIcon from "../../../assets/doctor-icon.png";
import myImage from "../../.././assets/speciality.jpeg";
import { API_BASE_URL } from "../../api/api";
import { Route, Routes, useNavigate } from "react-router-dom";

const Speciality = ({ searchQuery = "", location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [sepcialisations, setSpecialisations] = useState([]);

  const handleCardClick = (dept) => {
    setIsModalOpen(true);
    setSelectedDepartment(dept);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  useEffect(() => {
    const fetchSpeciality = async () => {
      const response = await axios.get(`${API_BASE_URL}/specialisations`);
      setSpecialisations(response.data);
    };
    fetchSpeciality();
  }, []);

  const handleSelectDoctor = (data) => {
    const currentDate = new Date(); // Get the current date
    const formattedDate = currentDate.toISOString().split("T")[0];
    navigate("/appointment/onlinedoctorappts/onlinedoctorschedule", {
      state: {
        doctor: data,
        locations: location,
        appointmentDate: formattedDate,
      },
    });
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.specialisationId?.specialisationName === selectedDepartment
  );

  return (
    <>
      <div className="Speciality-container">
        <div className="Speciality-grid">
          {sepcialisations.length > 0 &&
            sepcialisations.map((dept, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(dept.specialisationName)}
                className="Speciality-card"
              >
                <div className="Speciality-icon">
                  <img src={myImage} alt="icon" />
                </div>
                <div className="Speciality-text">{dept.specialisationName}</div>
              </div>
            ))}
        </div>
      </div>

      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="OnlineAppointmentSpeciality-doctor-heading">
          <h2>{selectedDepartment}</h2>
        </div>
        <div className="OnlineAppointmentSpeciality-doctor-card">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div key={doctor.doctorId} className="Speciality-doctor-card">
                <div className="Speciality-doctor-card-image">
                  <img src={doctorIcon} alt="doctor-icon" className="Speciality-doctor-card-image-logo" />
                </div>
                <div className="Speciality-doctor-card-content">
                  <h3>{doctor.doctorName}</h3>
                  <p>Degree: {doctor.degree}</p>
                  <p>
                    Specialisation: {doctor.specialisationId.specialisationName}
                  </p>
                  <button
                    onClick={() => handleSelectDoctor(doctor)}
                    className="appointment-button"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors available for {selectedDepartment}.</p>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default Speciality;
