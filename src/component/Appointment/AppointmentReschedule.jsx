import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentReschedule.css';
import { API_BASE_URL } from '../api/api';

const AppointmentReschedule = ({ slots,update,onClose }) => {
  console.log(slots);
  
  const appointmentId = update.outPatientId; // Extract appointmentId from the URL
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointments`);
        console.log(response.data);
        const appointmentsData = Array.isArray(response.data)
          ? response.data
          : response.data.appointments || [];
        const activeAppointments = appointmentsData.filter(
          (appt) => appt.status !== 'Cancelled' && appt.appointmentDate === selectedDate
        );
        const unavailableSlots = activeAppointments.map((appt) => appt.appointmentTime);
        const availableSlots = slots.filter((slot) => !unavailableSlots.includes(slot));
        setFilteredSlots(availableSlots);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [slots, selectedDate]);
  const handleUpdate = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/appointments/rescheduled`, 
        null,
        {
          params: {
            appointmentId:parseInt(appointmentId),
            appointmentDate: selectedDate,
            appointmentTime: selectedSlot,
          },
        }
      );
      alert('Appointment rescheduled successfully');
      onClose();

    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      alert('Failed to reschedule the appointment. Please try again.');
    }
  };

  return (
    <div className="AppointmentRescheduleContainer">
      <div className="Appointment-Reschedule-Sub">
        <label htmlFor="appointment-date">Date:</label>
        <input
          type="date"
          id="appointment-date"
          name="appointment-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="Appointment-Reschedule-Sub">
        <label htmlFor="time-slot">Time:</label>
        <select
          id="time-slot"
          name="time-slot"
          className="Appointment-Reschedule-dropdown"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="" disabled>
            Select a time slot
          </option>
          {filteredSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <div className="Appointment-Reschedule-btn">
        <button className="Appointment-Reschedule-button" onClick={handleUpdate}>
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default AppointmentReschedule;
