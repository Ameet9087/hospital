import React, { useState, useEffect } from "react";
import "./Terms.css";
import CustomModal from "../../../CustomModel/CustomModal";
import AddTermsAndConditions from "./AddTerms";
import { API_BASE_URL } from "../../api/api";

const Terms = () => {
  const [terms, setTerms] = useState([]);
  const [isAddingTerm, setIsAddingTerm] = useState(false);
  const [isUpdatingTerm, setIsUpdatingTerm] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null); // To hold the term being edited

  // Fetch terms from API on component mount
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/terms/getAll`);
        const data = await response.json();
        setTerms(data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };

    fetchTerms();
  }, []);

  const handleAddButtonClick = () => {
    setIsAddingTerm(true);
  };

  const handleEditButtonClick = (term) => {
    setSelectedTerm(term); // Set the selected term for editing
    setIsUpdatingTerm(true);
  };

  const handleCloseAddTerm = () => {
    setIsAddingTerm(false);
  };

  const handleCloseUpdateTerm = () => {
    setIsUpdatingTerm(false);
    setSelectedTerm(null); // Reset the selected term
  };

  return (
    <div className="ateg-sub-category-container">
      <div className="ateg-content">
        <button className="ateg-add-button" onClick={handleAddButtonClick}>
          Add Terms And Conditions
        </button>

        <div className="ateg-search-bar">
          <input type="text" placeholder="Search" />
          <button className="ateg-search-button">🔍</button>
        </div>

        <div className="ateg-results-info">
          Showing {terms.length} results
          <button className="ateg-print-button">Print</button>
        </div>

        <table className="ateg-sub-category-table">
          <thead>
            <tr>
              <th>Short Name</th>
              <th>Text</th>
              <th>Is Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {terms.map((term, index) => (
              <tr key={index}>
                <td>{term.shortName}</td>
                <td>{term.text}</td>
                <td>{term.isActive ? "True" : "False"}</td>
                <td>
                  <button
                    className="ateg-edit-button"
                    onClick={() => handleEditButtonClick(term)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for Adding Term */}
      <CustomModal isOpen={isAddingTerm} onClose={handleCloseAddTerm}>
        <AddTermsAndConditions/>
      </CustomModal>

      {/* Popup for Updating Term */}
      <CustomModal isOpen={isUpdatingTerm} onClose={handleCloseUpdateTerm}>
      <AddTermsAndConditions terms={selectedTerm}/>
      </CustomModal>
    </div>
  );
};

export default Terms;
