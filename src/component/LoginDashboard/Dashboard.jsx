import React from "react";
import "./Dashboard.css";
import { FaUserInjured, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import CountUp from "react-countup";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h3>Welcome to Hospital Information Management System </h3>
      </div>
      <div className="dashboard-container-login">
        <div className="dashboard-box flip-card" id="dashboardbox1">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <FaUserInjured size={50} />
              <h3>Total No of Registration Patients</h3>
              <p>
                <CountUp end={1234} duration={2.5} />
              </p>
            </div>
            <div className="flip-card-back">
              <p>These are the total registered patients this month.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-box flip-card" id="dashboardbox2">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <FaUserMd size={50} />
              <h3>Total No of Doctors</h3>
              <p>
                <CountUp end={56} duration={2.5} />
              </p>
            </div>
            <div className="flip-card-back">
              <p>These are the total doctors available in the hospital.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-box flip-card" id="dashboardbox3">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <FaCalendarCheck size={50} />
              <h3>Total No of Appointments</h3>
              <p>
                <CountUp end={789} duration={2.5} />
              </p>
            </div>
            <div className="flip-card-back">
              <p>These are the total scheduled appointments this month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
