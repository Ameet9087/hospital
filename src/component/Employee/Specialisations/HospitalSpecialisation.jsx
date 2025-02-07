import React, { useEffect, useState } from "react";
import "./HospitalSpecialisation.css";
import CustomModal from "../../../CustomModel/CustomModal";
import Specialisations from "./Specialisations";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";

const HospitalSpecialisation = () => {
  const [showSpecialisations, setShowSpecialisations] = useState(false);
  const [specialisation, setSpecialisation] = useState([]);

  useEffect(() => {
    const fetchSpecialisation = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/specialisations`);
        setSpecialisation(response.data); // Assuming the response contains an array or object matching your state structure
      } catch (error) {
        console.error("Error fetching specialisations:", error);
      }
    };
    fetchSpecialisation();
  }, [showSpecialisations]);

  const handleAddSpecialisation = () => {
    setShowSpecialisations(true);
  };

  return (
    <div className="HospitalSpecialisation">
      <button
        className="HospitalSpecialisation__create-btn"
        onClick={handleAddSpecialisation}
      >
        Create Specialisation
      </button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Specialisation</th>
              <th>Group Speciality</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {specialisation.map((item, index) => (
              <tr key={index}>
                <td>{item.specialisationName}</td>
                <td>{item.groupSpeciality}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomModal
        isOpen={showSpecialisations}
        onClose={() => setShowSpecialisations(false)}
      >
        <Specialisations onClose={() => setShowSpecialisations(false)} />
      </CustomModal>
    </div>
  );
};

export default HospitalSpecialisation;
