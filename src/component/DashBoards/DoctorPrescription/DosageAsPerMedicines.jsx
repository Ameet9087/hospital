import React, { useEffect } from "react";
import "./DosageAsPerMedicines.css";

const Dosage = ({ selectedMedicines }) => {
  const dosages = ["500mg", "200mg", "250mg", "10mg", "500mg"];
useEffect(()=>{
  console.log("Selected Medicines in Dosage Component:", selectedMedicines);

},[])
  


  return (
    <div className="dosage-container">
      <h2>Dosage Information</h2>
      {selectedMedicines.length > 0 ? (
        <table className="dosage-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {selectedMedicines.map((med, index) => (
              <tr key={index}>
                <td>{med}</td>
                <td>
                  <select>
                    {dosages.map((dosage, idx) => (
                      <option key={idx} value={dosage}>
                        {dosage}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medicines selected.</p>
      )}
    </div>
  );
};

export default Dosage;
