import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OnlineDoctorScheduleStd.css";
import doctorIcon from "../../../assets/doctor-icon.png";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import CustomModal from "../../../CustomModel/CustomModal.jsx";
// import DoctorAppointmentPopUp from "../DoctorAppointmentPopUp.jsx";
import DoctorAppointmentPopUp from "./OnlineDoctorAppointmentPopUp.jsx";
import { toast } from "react-toastify";
const OnlineDoctorScheduleStd = () => {
  const { state } = useLocation();
  const doctor = state?.doctor || {};
  const locations = state?.locations || [];
  const appointmentDate = state?.appointmentDate || "";
 
  const [appointments, setAppointments] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [updatedAppointments, setUpdateAppointments] = useState({});
  const [appointmentsData, setAppointmentsData] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);
  const [schedule, setSchedule] = useState(null);

  const [formData, setFormData] = useState({
    appointmentDate: appointmentDate,
    givenTime: "",
    mrNo: "",
    patientName: "",
    remarks: "",
    userName: "",
    cancelStatus: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  console.log(appointments);

  useEffect(() => {
    if (locations?.id && doctor.doctorId && formData.appointmentDate) {
      handleLoadSlots({
        locationId: locations?.id, // Use the first object's id.
        doctorId: doctor.doctorId,
        appointmentDate: formData.appointmentDate,
      });
    }
  }, [locations, doctor.doctorId, formData.appointmentDate]);

  const handleLoadSlots = async ({ locationId, doctorId, appointmentDate }) => {
    console.log(locationId, doctorId, appointmentDate);
    if (!locationId || !doctorId || !appointmentDate) {
      toast.error("Please select location, doctor, and date before loading slots.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/schedules/by-location-and-doctor?locationId=${locationId}&doctorId=${doctorId}&givenDate=${appointmentDate}`
      );
      const scheduleData = response.data;
      if (scheduleData) {
        setSchedule(scheduleData);
        generateTimeSlots(
          scheduleData.dutyStartTime,
          scheduleData.dutyEndTime,
          parseInt(scheduleData.reviewTime)
        );
      } else {
        toast.error("No schedule found for the selected doctor and location.");
        setTimeSlots([]);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      toast.error("Failed to load appointment slots. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAppoitments = async () => {
      try {
        const allSchedulesResponse = await axios.get(
          `${API_BASE_URL}/appointments`
        );
        const appointmentsData = Array.isArray(allSchedulesResponse.data)
          ? allSchedulesResponse.data
          : allSchedulesResponse.data.appointments || [];  
        setAppointments(appointmentsData);
        console.log("Appointments data:", appointmentsData);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctors.");
        setLoading(false);
      }
    };

    fetchAppoitments();
  }, []);

  const generateTimeSlots = (start, end, reviewTime) => {
    const slots = [];
    let current = convertToDateTime(start);
    const endTime = convertToDateTime(end);

    while (current < endTime) {
      const slot = formatTime(current);
      slots.push(slot);
      current.setMinutes(current.getMinutes() + reviewTime);
    }
    console.log("Time slots:", slots);
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
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const isPastTimeSlot = (timeSlot) => {
    const now = new Date();
    const [hour, minute] = timeSlot.split(/:| /);
    const isPM = timeSlot.includes("PM");

    const slotHour =
      isPM && parseInt(hour) !== 12 ? parseInt(hour) + 12 : parseInt(hour);
    const slotMinute = parseInt(minute);

    const slotTime = new Date(formData.appointmentDate);
    slotTime.setHours(slotHour, slotMinute, 0, 0);

    return now > slotTime;
  };

  const openModal = (appointmentObjOrTimeSlot) => {
    if (!formData.appointmentDate) {
      toast.error("Please select an appointment date first.");
      return;
    }

    const now = new Date();
    const appointmentDate = new Date(formData.appointmentDate);
    appointmentDate.setHours(0, 0, 0, 0);

    // Check if trying to book for a past time slot today
    if (
      appointmentDate.toDateString() === now.toDateString() &&
      isPastTimeSlot(
        appointmentObjOrTimeSlot.timeSlot || appointmentObjOrTimeSlot
      )
    ) {
      toast.error("You cannot book an appointment for a past time slot today.");
      return;
    }

    const timeSlot =
      appointmentObjOrTimeSlot.timeSlot || appointmentObjOrTimeSlot;
    const existingAppointment = appointmentObjOrTimeSlot.mrNo
      ? appointmentObjOrTimeSlot
      : null;

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

  const updateModel = (object) => {
    setUpdateAppointments(object);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setUpdateAppointments(null);
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
      const selectedDoctor = state?.doctor.find(
        (doc) => doc.doctorId.toString() === value
      );

      if (selectedDoctor) {
        setFormData((prev) => ({
          ...prev,
          specialization: selectedDoctor.specialization || "",
        }));
      }

      // Automatically load slots if all prerequisites are met
      if (formData.location && state?.appointmentDate) {
        await handleLoadSlots({
          locationId: formData.location,
          doctorId: value,
          appointmentDate: state.appointmentDate,
        });
      }

      console.log(formData.location);
    }
  };

  const handleSave = () => {
    setAppointmentsData((prevAppointments) => ({
      ...prevAppointments,
      [selectedTimeSlot]: { ...formData },
    }));
    closeModal();
  };
  const handleUpdate = () => {
    setAppointmentsData((prevAppointments) => ({
      ...prevAppointments,
      [selectedTimeSlot]: { ...formData },
    }));
    closeModal();
  };
  const handleDelete = () => {
    setAppointmentsData((prevAppointments) => {
      const updatedAppointments = { ...prevAppointments };
      delete updatedAppointments[selectedTimeSlot];
      return updatedAppointments;
    });
    closeModal();
  };

  return (
    <>
      <div className="schedule-container">
        <div className="doctor-info">
          <img
            src={doctor.photo || doctorIcon}
            alt="Doctor"
            className="doctor-image"
          />
          <div className="doctor-details">
            <h2>{doctor.doctorName || ""}</h2>
            <p>{doctor.specialisationId?.specialisationName || "Dr."}</p>
            <p>{doctor.degree || "MBBS"}</p>
          </div>
        </div>
        <div className="schedule-filters">
          <div className="date-filter">
            <label htmlFor="from-date">From Date</label>
            <input
              type="date"
              id="from-date"
              value={formData.appointmentDate}
              onChange={(e) =>
                setFormData({ ...formData, appointmentDate: e.target.value })
              }
            />
          </div>
          <button
            className="action-button"
            onClick={() =>
              handleLoadSlots({
                locationId: locations[0]?.id, // Use the first object's id.
                doctorId: doctor.doctorId,
                appointmentDate: formData.appointmentDate,
              })
            }
          >
            Load Slots
          </button>
        </div>
      </div>

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
            {timeSlots?.map((timeSlot) => {
              const appointmentObj = appointments.find(
                (appt) =>
                  appt.appointmentTime === timeSlot &&
                  appt.appointmentDate === formData.appointmentDate
              );

              // Skip rendering if the appointment status is "Cancelled"
              if (appointmentObj?.status === "Cancelled") {
                return null;
              }

              return (
                <tr
                  key={timeSlot}
                  onClick={() =>
                    appointmentObj
                      ? updateModel(appointmentObj)
                      : openModal({ timeSlot })
                  }
                >
                  <td>{timeSlot}</td>
                  <td>{appointmentObj?.patient?.uhid || ""}</td>
                  <td>{appointmentObj?.patient?.firstName || ""}</td>
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
            selectedDoctor={doctor}
            date={appointmentDate}
            selectedTimeSlot={selectedTimeSlot}
            formData={formData}
            slots={timeSlots}
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
    </>
  );
};

export default OnlineDoctorScheduleStd;
