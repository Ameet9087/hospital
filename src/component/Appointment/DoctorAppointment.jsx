import React, { useEffect, useState } from "react";
import "./DoctorAppointment.css";
import DoctorAppointmentPopUp from "./DoctorAppointmentPopUp.jsx"
import CustomModal from "../CustomModel/CustomModal.jsx";
import axios from "axios";
import { API_BASE_URL } from "../api/api.js";
export default function DoctorAppointment() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [schedule, setSchedule] = useState(null);
  const [updatedAppointments,setUpdateAppointments]=useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [locations, setLocations] = useState([]);
  const [doctors, setDoctors] = useState([]);
const [appointment,setAppointment]= useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    appointmentDate: new Date().toISOString().split("T")[0],
    location: "",
    specialization: "",
    doctor: "",
  });
  const handleLoadSlots = async ({ locationId, doctorId, appointmentDate }) => {
    if (!locationId || !doctorId || !appointmentDate) {
      alert("Please select location, doctor, and date before loading slots.");
      return;
    }
  
    try {
      const response = await axios.get(
        `${API_BASE_URL}/schedules/by-location-and-doctor?locationId=${locationId}&doctorId=${doctorId}`
      );
      const scheduleData = response.data;
  
      if (scheduleData) {
        setSchedule(scheduleData);
  
        // Generate time slots based on the fetched schedule
        generateTimeSlots(
          scheduleData.dutyStartTime,
          scheduleData.dutyEndTime,
          parseInt(scheduleData.reviewTime)
        );
      } else {
        alert("No schedule found for the selected doctor and location.");
        setTimeSlots([]);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      alert("Failed to load appointment slots. Please try again.");
    }
  };
  
  

  const isToday = (date) => {
    const today = new Date().toISOString().split("T")[0];
    return today === date;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await axios.get(
          `${API_BASE_URL}/location-masters`
        );
        setLocations(locationResponse.data);
        
        const doctorResponse = await axios.get(
          `${API_BASE_URL}/doctors`
        );
        setDoctors(doctorResponse.data);  

        const allSchedulesResponse = await axios.get(`${API_BASE_URL}/appointments`)
        setAppointment(allSchedulesResponse.data);
        console.log(allSchedulesResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // Generate time slots
  const generateTimeSlots = (start, end, reviewTime) => {
    const slots = [];
    let current = convertToDateTime(start);
    const endTime = convertToDateTime(end);

    while (current < endTime) {
      const slot = formatTime(current);
      slots.push(slot);
      current.setMinutes(current.getMinutes() + reviewTime);
    }

    setTimeSlots(slots);
  };
  const convertToDateTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
    return date;
  };
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const isPastTimeSlot = (timeSlot) => {
    const now = new Date();
    const [hour, minute] = timeSlot.split(/:| /); // Extract hour and minute
    const isPM = timeSlot.includes("PM");

    const slotHour = isPM && parseInt(hour) !== 12 ? parseInt(hour) + 12 : parseInt(hour);
    const slotMinute = parseInt(minute);

    const slotTime = new Date(formData.appointmentDate);
    slotTime.setHours(slotHour, slotMinute, 0, 0);

    return now > slotTime;
  };
  const openModal = (appointmentObjOrTimeSlot) => {
    if (!formData.appointmentDate) {
      alert("Please select an appointment date first.");
      return;
    }
  
    const now = new Date();
    const appointmentDate = new Date(formData.appointmentDate);
    appointmentDate.setHours(0, 0, 0, 0);
  
    // Check if trying to book for a past time slot today
    if (appointmentDate.toDateString() === now.toDateString() && isPastTimeSlot(appointmentObjOrTimeSlot.timeSlot || appointmentObjOrTimeSlot)) {
      alert("You cannot book an appointment for a past time slot today.");
      return;
    }
  
    const timeSlot = appointmentObjOrTimeSlot.timeSlot || appointmentObjOrTimeSlot;
    const existingAppointment = appointmentObjOrTimeSlot.mrNo ? appointmentObjOrTimeSlot : null;
  
    setSelectedTimeSlot(timeSlot);
    setFormData((prevData) => ({
      ...prevData,
      givenTime: timeSlot,
      mrNo: existingAppointment?.mrNo || "",
      patientName: existingAppointment?.patientName || "",
      remarks: existingAppointment?.remarks || "",
      userName: existingAppointment?.userName || "",
      cancelStatus: existingAppointment?.cancelStatus || "",
    }));
  
    setModalVisible(true);
  };
  

  const updateModel = (object)=>{
    setUpdateAppointments(object);
    setModalVisible(true);
  }
  

  const closeModal = () => {
    setModalVisible(false);
    setUpdateAppointments(null)
    setSelectedTimeSlot(null);
    setFormData((prevData) => ({
      ...prevData,
      mrNo: "",
      patientName: "",
      givenTime: "",
      remarks: "",
      userName: "",
      cancelStatus: "",
    }));
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    if (name === "doctor") {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.doctorId.toString() === value
      );
  
      if (selectedDoctor) {
        setFormData((prev) => ({
          ...prev,
          specialization: selectedDoctor.specialization || "",
        }));
      }
  
      // Automatically load slots if all prerequisites are met
      if (formData.location && formData.appointmentDate) {
        await handleLoadSlots({
          locationId: formData.location,
          doctorId: value,
          appointmentDate: formData.appointmentDate,
        });
      }
    }
  };
  

  const handleSave = () => {
    setAppointments((prevAppointments) => ({
      ...prevAppointments,
      [selectedTimeSlot]: { ...formData },
    }));
    closeModal();
  };
  const handleUpdate = () => {
    setAppointments((prevAppointments) => ({
      ...prevAppointments,
      [selectedTimeSlot]: { ...formData },
    }));
    closeModal();
  };
  const handleDelete = () => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = { ...prevAppointments };
      delete updatedAppointments[selectedTimeSlot];
      return updatedAppointments;
    });
    closeModal();
  };
    
  return (
    <div className="DoctorAppointments-container">
      <h1 className="DoctorAppointments-heading">Doctor Appointments</h1>
      <div className="DoctorAppointments-row">
        <div className="DoctorAppointments-field">
          <label className="DoctorAppointments-label">Date</label>
          <input
          type="date"
          className="DoctorAppointments-input"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleInputChange}
        />
        </div>
        <div className="DoctorAppointments-field">
          <label className="DoctorAppointments-label">Location</label>
          <select
          className="DoctorAppointments-input"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        >
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location.id}>
              {location.locationName}
            </option>
          ))}
        </select>
        </div>
        <div className="DoctorAppointments-field">
          <label className="DoctorAppointments-label">Specialization</label>
          <input
          type="text"
          className="DoctorAppointments-input"
          name="specialization"
          value={formData.specialization}
          readOnly
        />
        </div>
        <div className="DoctorAppointments-field">
          <label className="DoctorAppointments-label">Doctor</label>
          <select
          className="DoctorAppointments-input"
          name="doctor"
          value={formData.doctor}
          onChange={(e) => {
            handleInputChange(e); // Update the doctor value in formData
            handleLoadSlots(); // Automatically load slots after doctor selection
          }}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor.doctorId}>
              {doctor.doctorName}
            </option>
          ))}
        </select>
        </div></div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Time Slot</th>
              <th>MR No</th>
              <th>Patient Name</th>
              <th>Given Time</th>
              <th>Appointment Date</th>
              <th>Remarks</th>
              <th>User Name</th>
              <th>Cancel Status</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot) => {
               const appointmentObj = appointment.find(
                (appt) =>
                  appt.appointmentTime === timeSlot &&
                  appt.appointmentDate === formData.appointmentDate
              );
              return (
                <tr key={timeSlot} onClick={() =>
                  appointmentObj
                    ? updateModel(appointmentObj)
                    : openModal({ timeSlot })
                }>
                  <td>{timeSlot}</td>
                  <td>{appointmentObj?.uhid || ""}</td>
                  <td>{appointmentObj?.firstName || ""}</td>
                  <td>{appointmentObj?.appointmentTime || ""}</td>
                  <td>{appointmentObj?.appointmentDate || ""}</td>
                  <td>{appointmentObj?.remarks || ""}</td>
                  <td>{appointmentObj?.userName || ""}</td>
                  <td>{appointmentObj?.cancelStatus || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <CustomModal isOpen={modalVisible} onClose={closeModal}>
     <DoctorAppointmentPopUp
     selectedDoctor={formData.doctor}
     date={formData.appointmentDate}
  selectedTimeSlot={selectedTimeSlot}
  formData={formData}
  handleInputChange={handleInputChange}
  handleSave={handleSave}
  updatedAppointments={updatedAppointments}
  handleUpdate={handleUpdate} 
  handleDelete={handleDelete}
  closeModal={closeModal}
  isUpdate={!!appointments[selectedTimeSlot]} 
/>

        </CustomModal>
      )}
    </div>
  );
} 