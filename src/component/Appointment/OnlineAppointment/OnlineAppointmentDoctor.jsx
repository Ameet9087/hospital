import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OnlineAppointmentDoctor.css";
import doctorIcon from "../../../assets/doctor-icon.png";
import { API_BASE_URL } from "../../api/api";

const DoctorCard = ({
  name,
  specialization,
  degree,
  navigateToSchedule,
  doctor,
  locations,
  appointments,
  appointmentDate,
}) => {
  // Use locations and appointments data here if needed for display or logic

  return (
    <div className="doctor-card">
      <div className="doctor-card-image">
        <img src={doctorIcon} alt="icon" className="doctor-card-image"/>
      </div>
      <div className="doctor-card-content">
        <h3>{name}</h3>
        <p>{specialization}</p>
        <p>{degree}</p>
        <button
          className="appointment-button"
          onClick={() =>
            navigateToSchedule(doctor, locations, appointments, appointmentDate)
          } // Pass additional data
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

const OnlineDoctorAppt = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    appointmentDate: new Date().toISOString().split("T")[0],
    location: "",
    specialization: "",
    doctor: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctors.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await axios.get(
          `${API_BASE_URL}/location-masters`
        );
        setLocations(locationResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const navigateToSchedulePage = (
    doctor,
    locations,
    appointments,
    appointmentDate
  ) => {
    navigate("/appointment/online-doctor-schedule", {
      state: { doctor, locations, appointments, appointmentDate },
    });
  };

  return (
    <div className="doctor-card-list">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.doctorId}
          name={doctor.doctorName}
          specialization={doctor.specialisationId.specialisationName}
          degree={doctor.degree}
          navigateToSchedule={navigateToSchedulePage}
          doctor={doctor}
          locations={locations} // Pass locations data
          appointments={appointments} // Pass appointments data
          appointmentDate={formData.appointmentDate}
        />
      ))}
    </div>
  );
};

export default OnlineDoctorAppt;
