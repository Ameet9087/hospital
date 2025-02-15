import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './InPatientReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';

const InpatientCensus = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [wards, setWards] = useState([]);
  const [patientCounts, setPatientCounts] = useState({}); // Store patient counts per room type
  const [dischargedCounts, setDischargedCounts] = useState({});


  useEffect(() => {
    // Fetch room types from API
    axios
      .get(`${API_BASE_URL}/room-types`)
      .then((response) => {
        setWards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ward data:", error);
      });
  }, []);

  useEffect(() => {
    if (wards.length > 0) {
      const fetchPatientCounts = async () => {
        const counts = {};
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        console.log("Fetching patient counts for wards:", wards);

        await Promise.all(
          wards.map(async (ward) => {
            try {
              console.log(`Fetching data for ward ID: ${ward.id}`);
              const response = await axios.get(
                `${API_BASE_URL}/ip-admissions/patients-by-room-type/${ward.id}`
              );

              const patients = response.data; // Assuming response is an array of patients
              const newAdmissions = patients.filter(
                (patient) => patient.admissionDate === today
              ).length;

              console.log(`Ward ID: ${ward.id}, New Admissions: ${newAdmissions}`);

              counts[ward.id] = {
                inBed: patients.length, // Total patients in bed
                newAdmission: newAdmissions, // Patients admitted today
              };

            } catch (error) {
              console.error(`Error fetching patient count for ward ${ward.id}:`, error);
              counts[ward.id] = { inBed: 0, newAdmission: 0 };
            }
          })
        );

        console.log("Final patient counts:", counts);
        setPatientCounts(counts);
      };

      fetchPatientCounts();
    }
  }, [wards]);

  useEffect(() => {
    if (wards.length > 0) {
      const fetchDischargedCounts = async () => {
        const counts = {};

        await Promise.all(
          wards.map(async (ward) => {
            try {
              const response = await axios.get(
                `${API_BASE_URL}/ip-admissions/discharged-patients/${ward.id}`
              );

              const dischargedPatients = response.data.length; // Assuming API returns an array of discharged patients

              counts[ward.id] = dischargedPatients;

            } catch (error) {
              console.error(`Error fetching discharged count for ward ${ward.id}:`, error);
              counts[ward.id] = 0;
            }
          })
        );

        setDischargedCounts(counts);
      };

      fetchDischargedCounts();
    }
  }, [wards]);



  return (
    <div className="inpatient-census-report-range-container">
      <h3 className="user-collection-report-title">⚛ Inpatient Census Report</h3>

      <div className="inpatient-census-report-range-date-range-container">
        {/* <label>From: </label>
        <input type="date" defaultValue="2024-09-01" />
        <label>To: </label>
        <input type="date" defaultValue="2024-09-01" /> */}
        <button className="inpatient-census-report-range-show-report-button">Show Report</button>
      </div>

      <div className="inpatient-census-report-range-totals-container">
        <div className="inpatient-census-report-range-totals">
          Total Admitted: {Object.values(patientCounts).reduce((sum, count) => sum + (count.inBed || 0), 0)} &nbsp;&nbsp;

          Total Discharged: {Object.values(dischargedCounts).reduce((sum, count) => sum + (count || 0), 0)}

        </div>
      </div>

      <div className="inpatient-census-report-range-census-header">
        <h3>Inpatient Census (All Wards) for the selected dates</h3>
      </div>

      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Ward Name",
              "In Bed",
              "New Admission",

              "Discharged",
              "Total Pt.",
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
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {wards.length > 0 ? (
            wards.map((ward) => {
              const inBed = patientCounts[ward.id]?.inBed ?? 0;
              const newAdmission = patientCounts[ward.id]?.newAdmission ?? 0;
              const discharged = dischargedCounts[ward.id] ?? 0;
              const totalPatients = inBed + newAdmission + discharged;

              return (
                <tr key={ward.id}>
                  <td>{ward.roomtype}</td>
                  <td>{inBed}</td>
                  <td>{newAdmission}</td>
                  <td>{discharged}</td>
                  <td>{totalPatients}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>Loading data...</td>
            </tr>
          )}

          {/* "All Wards" Total Row */}
          <tr className="inpatient-census-report-range-totals-row">
            <td>All Wards</td>
            <td>
              {Object.values(patientCounts).reduce((sum, count) => sum + (count.inBed || 0), 0)}
            </td>
            <td>
              {Object.values(patientCounts).reduce((sum, count) => sum + (count.newAdmission || 0), 0)}
            </td>
            <td>
              {Object.values(dischargedCounts).reduce((sum, count) => sum + (count || 0), 0)}
            </td>
            <td>
              {Object.values(patientCounts).reduce((sum, count) => sum + (count.inBed || 0) + (count.newAdmission || 0), 0) +
                Object.values(dischargedCounts).reduce((sum, count) => sum + (count || 0), 0)}
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  );
};

export default InpatientCensus;
