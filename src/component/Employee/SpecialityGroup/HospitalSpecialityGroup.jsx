import React, { useEffect, useState } from "react";
import "./HospitalSpecialityGroup.css";
import CustomModal from "../../../CustomModel/CustomModal";
import SpecialityMaster from "./SpecialityGroup";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";

const HospitalSpecialityGroup = () => {
  const [show, setShow] = useState(false);
  const [specialisations, setSpecialisations] = useState([]);

  useEffect(() => {
    const fetchSpecialisations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/specialityGroups`);
        setSpecialisations(response.data);
      } catch (error) {
        console.error("Error fetching specialisations:", error);
      }
    };

    fetchSpecialisations();
  }, [show]);
  const handleAddSpecialisation = () => {
    setShow(true);
  };

  return (
    <div className="HospitalSpecialityGroup">
      <button
        className="HospitalSpecialityGroup__create-btn"
        onClick={handleAddSpecialisation}
      >
        Create Specialisation
      </button>
      <table>
        <thead>
          <tr>
            <th>Speciality Group</th>
            <th>MIs Heads</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {specialisations?.map((item, index) => (
            <tr key={index}>
              <td>{item.specialityGroup}</td>
              <td>{item.misHeads}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomModal isOpen={show} onClose={() => setShow(false)}>
        <SpecialityMaster onClose={() => setShow(false)} />
      </CustomModal>
    </div>
  );
};

export default HospitalSpecialityGroup;
