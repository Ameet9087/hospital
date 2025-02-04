import React, { useState,useEffect } from "react";
import axios from "axios";
import './SymptomCategories.css';
import { API_BASE_URL } from "../../api/api";
const CategoryPage = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddSymptoms,setShowAddSymptoms]=useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [symptom, setSymptom] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/symptom-categories`)
      .then((response) => {
        setCategories(response.data); // Assuming response contains an array of categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const categoryData = { category };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/symptom-categories`,
        categoryData
      );

      if (response.status === 201) {
        alert("Category added successfully!");
        setCategory(""); // Reset form
        setShowAddCategory(false); // Hide popup
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSymptoms = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !symptom) {
      setError("Please select a category and enter a symptom.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/symptom-categories`, {
        category: selectedCategory,
        symptoms: [{ symptomsName: symptom }],
      });

      setSymptom(""); // Reset input after submission
      alert("Symptom added successfully!");
    } catch (err) {
      setError("Error adding symptom. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="category-page-container">
      <button
        className="category-page-add-btn"
        onClick={() => setShowAddCategory(true)}
      >
        Add Category
      </button>
      &nbsp;&nbsp;
      <button
        className="category-page-add-btn"
        onClick={() => setShowAddSymptoms(true)}
      >
        Add Symptoms
      </button>


      {showAddCategory && (
        <div className="category-page-modal-overlay">
          <div className="category-page-modal">
            <button
              className="category-page-close-btn"
              onClick={() => setShowAddCategory(false)}
            >
              ✖
            </button>
            <h2 className="category-page-heading">Add Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="category-page-form-group">
                <label htmlFor="category" className="category-page-label">
                  Category Name
                </label>
                <input
                  type="text"
                  id="category"
                  className="category-page-input"
                  value={category}
                  onChange={handleCategoryChange}
                  required
                  placeholder="Enter category name"
                />
              </div>
              {error && <p className="category-page-error">{error}</p>}
              <button
                type="submit"
                className="category-page-submit-btn"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}


{showAddSymptoms && (
  <div className="category-page-modal-overlay">
    <div className="category-page-modal">
      <button
        className="category-page-close-btn"
        onClick={() => setShowAddSymptoms(false)} // Fix here
      >
        ✖
      </button>
      <h2 className="category-page-heading">Add Symptom</h2>

      <form onSubmit={handleSubmitSymptoms}>
        <div className="category-page-form-group">
          <label htmlFor="category" className="category-page-label">
            Select Category
          </label>
          <select
            id="category"
            className="category-page-input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div className="category-page-form-group">
          <label htmlFor="symptom" className="category-page-label">
            Symptom Name
          </label>
          <input
            type="text"
            id="symptom"
            className="category-page-input"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            required
            placeholder="Enter symptom name"
          />
        </div>

        {error && <p className="category-page-error">{error}</p>}

        <button
          type="submit"
          className="category-page-submit-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Symptom"}
        </button>
      </form>
    </div>
  </div>
)}
 

    </div>
  );

  
};

export default CategoryPage;
