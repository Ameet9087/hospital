import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './AppointmentBookingList.css';
import BookingAppointment from '../Appointment/BookingAppointment';
import ListVisited from '../Appointment/ListVisited';
import NewVisitedList from '../Appointment/NewVisitedList';
import OnlineAppointment from '../Appointment/OnlineAppointment';
import SSFClaim from '../Appointment/SSFClaim';
import AppointmentBookingList from '../Appointment/AppointmentBookingList';
import CheckIn from '../Appointment/CheckIn';
import AddNewAppointmentForm from './AddNewappointment';

const AppointmentRouting = () => {
  return (
    <div className="appointment-booking-list-container">
      <nav className="appointment-booking-list-nav">
        <NavLink 
          to="/appointment-booking-list" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-nav-link active" : "appointment-booking-list-nav-link"
          }
        >
          Appointment Booking List
        </NavLink>
        <NavLink 
          to="/book-appointment" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-nav-link active" : "appointment-booking-list-nav-link"
          }
        >
          Book Appointment
        </NavLink>
        <NavLink 
          to="/list-visits" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-nav-link active" : "appointment-booking-list-nav-link"
          }
        >
          List Visits
        </NavLink>
        <NavLink 
          to="/new-visit" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-nav-link active" : "appointment-booking-list-nav-link"
          }
        >
          New Visit
        </NavLink>
        <NavLink 
          to="/online-appointment" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-nav-link active" : "appointment-booking-list-nav-link"
          }
        >
          Online Appointment
        </NavLink>
        <NavLink 
          to="/ssf-claim" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-nav-link active" : "appointment-booking-list-nav-link"
          }
        >
          SSF Claim
        </NavLink>
        
        
       
      </nav>
      
      <div className="appointment-booking-list-content">
        <Routes>
          <Route path="/appointment-booking-list" element={<AppointmentBookingList />} />
          <Route path="/book-appointment" element={<BookingAppointment />} />
          <Route path="/list-visits" element={<ListVisited />} />
          <Route path="/new-visit" element={<NewVisitedList />} />
          <Route path="/online-appointment" element={<OnlineAppointment />} />
          <Route path="/ssf-claim" element={<SSFClaim />} />
          <Route path="/checkIn/*" element={<CheckIn/>}></Route>
          <Route path="*" element={<AppointmentBookingList />} />
          <Route path="/add-new-appointment" element={<AddNewAppointmentForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppointmentRouting;