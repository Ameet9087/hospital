/* Mohini_PaediatricNutritionForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PaediatricVitalsExaminationForm.css'; // Ensure correct CSS file is linked

const PaediatricNutritionForm = () => {
  const [formData, setFormData] = useState({
    dietType: '',
    feedingInstructions: '',
    caloricRequirements: '',
    foodAllergies: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="immunization-record-form-container">
      <h2 className="immunization-record-form-title">Paediatric Nutrition Form</h2>
      <form onSubmit={handleSubmit} className="immunization-record-form">
        <div className="immunization-record-form-left">
          <div className="immunization-record-form-group">
            <label htmlFor="dietType" className="immunization-record-form-label">
              Diet Type<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="dietType"
              name="dietType"
              value={formData.dietType}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="feedingInstructions" className="immunization-record-form-label">
              Feeding Instructions:
            </label>
            <textarea
              id="feedingInstructions"
              name="feedingInstructions"
              value={formData.feedingInstructions}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            ></textarea>
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="caloricRequirements" className="immunization-record-form-label">
              Caloric Requirements:
            </label>
            <input
              type="number"
              id="caloricRequirements"
              name="caloricRequirements"
              value={formData.caloricRequirements}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="foodAllergies" className="immunization-record-form-label">
              Food Allergies:
            </label>
            <textarea
              id="foodAllergies"
              name="foodAllergies"
              value={formData.foodAllergies}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            ></textarea>
          </div>
          <div className="immunization-record-form-buttons">
          <button type="submit" className="immunization-record-form-submit-btn">
            Submit
          </button>
          <button
            type="button"
            className="immunization-record-form-submit-btn"
            onClick={() =>
              setFormData({
                dietType: '',
                feedingInstructions: '',
                caloricRequirements: '',
                foodAllergies: '',
              })
            }
          >
            Cancel
          </button>
        </div>
        </div>

      
      </form>
    </div>
  );
};

export default PaediatricNutritionForm;
/* Mohini_PaediatricNutritionForm_WholePage_3/oct/24 */
