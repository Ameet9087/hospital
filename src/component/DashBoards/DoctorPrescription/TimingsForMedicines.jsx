import React, { useState } from "react";
import "./TimingsForMedicines.css";


const MedicinePage = ({ selectedMedicines }) => {
  const [selectedMedicinesState, setSelectedMedicinesState] = useState([]);

  console.log("Selected Medicines:", selectedMedicines);

  const handleCheckboxChange = (medName) => {
    setSelectedMedicinesState((prevSelected) => {
      const isSelected = prevSelected.includes(medName);
      if (isSelected) {
        return prevSelected.filter((name) => name !== medName);
      } else {
        return [...prevSelected, medName];
      }
    });
  };

  return (
    <div className="medicine-container">
      <h2 className="medicine-heading">Medicine List</h2>
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th colSpan="2">Morning</th>
            <th colSpan="2">Afternoon</th>
            <th colSpan="2">Evening</th>
            <th colSpan="2">Night</th>
          </tr>
          <tr>
            <td></td>
            <td>Before Meal</td>
            <td>After Meal</td>
            <td>Before Meal</td>
            <td>After Meal</td>
            <td>Before Meal</td>
            <td>After Meal</td>
            <td>Before Meal</td>
            <td>After Meal</td>
          </tr>
        </thead>
        <tbody>
          {selectedMedicines.map((med, index) => (
            <tr key={index}>
              <td>{med}</td>
              <td>
                <input
                  type="checkbox"
                  id={`morning-before-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`morning-after-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`afternoon-before-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`afternoon-after-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`evening-before-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`evening-after-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`night-before-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`night-after-${index}`}
                  onChange={() => handleCheckboxChange(med)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
  );
};

export default MedicinePage;
