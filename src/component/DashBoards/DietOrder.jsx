import React, { useState, useEffect } from "react";
import "./DietOrder.css";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../FloatingInputs";

const DietOrder = ({ inPatientId, outPatientId }) => {
  const [formData, setFormData] = useState({
    dietGroup: "",
    dietOrder: "",
    dietFrequency: "",
    dietType: "",
    dietTime: "",
    dietGivenTime: "",
    dietRemarks: "",
    ...(inPatientId
      ? { inPatient: { inPatientId } }
      : { outPatient: { outPatientId } }),
  });

  const [dietOrders, setDietOrders] = useState([]);

  // Fetch Diet Orders for Patient when component mounts
  const fetchDietOrders = async () => {
    try {
      let endpoint = "";

      if (inPatientId) {
        endpoint = `${API_BASE_URL}/dietorders/in-patient/${inPatientId}`;
      } else if (outPatientId) {
        endpoint = `${API_BASE_URL}/dietorders/out-patient/${outPatientId}`;
      } else {
        console.error("No valid patient ID provided for Diet Orders.");
        return;
      }

      const response = await axios.get(endpoint);
      setDietOrders(response.data);
    } catch (error) {
      console.error("Error fetching diet orders:", error);
    }
  };

  useEffect(() => {
    fetchDietOrders(); // Call the function to fetch data when component mounts
  }, [inPatientId, outPatientId]); // Re-run the effect if either inPatientId or outPatientId changes

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/dietorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData directly without wrapping it in an object
      });

      if (!response.ok) {
        throw new Error("Failed to submit diet order");
      }
      toast.success("Successfully Submitted");
      const responseData = await response.json();
      fetchDietOrders();
      setFormData({
        dietGroup: "",
        dietOrder: "",
        dietFrequency: "",
        dietType: "",
        dietTime: "",
        dietGivenTime: "",
        dietRemarks: "",
      });
      console.log("Successfully submitted:", responseData);
    } catch (error) {
      toast.error("Error submitting diet order:", error);
    }
  };

  return (
    <div className="Diet-order-container">
      <h3>Diet Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="Diet-order-content">
          <div className="Diet-order-content-left">
            <div className="Diet-order-group">
              <FloatingInput
              label={"Diet Group"}
               type="text"
               name="dietGroup"
               placeholder="Diet Group"
               value={formData.dietGroup}
               onChange={handleInputChange}
              />
            </div>
            <div className="Diet-order-group">
              <FloatingInput
              label={"Diet Order"}
                 type="text"
                 name="dietOrder"
                 placeholder="Diet Order"
                 value={formData.dietOrder}
                 onChange={handleInputChange}
              />
            </div>
            <div className="Diet-order-group">
              <FloatingSelect
              label={"Diet Frequency"}
              name="dietFrequency"
              value={formData.dietFrequency}
              onChange={handleInputChange}
              options={[{value:"",label:""},
                {value:"daily",label:"Daily"},
                {value:"twice-daily",label:"Twice Daily"},
                {value:"once-weekly",label:"Once Weekly"}
              ]}
              />
            </div>
            <div className="Diet-order-group">
            <FloatingSelect
              label={"Diet Type"}
              name="dietType"
                value={formData.dietType}
                onChange={handleInputChange}
              options={[{value:"",label:""},
                {value:"regular",label:"Regular"},
                {value:"low-sodium",label:"Low Sodium"},
                {value:"high-protein",label:"High Protein"}
              ]}
              />
            </div>
          </div>

          <div className="Diet-order-content-right">
            <div className="Diet-order-group">
              <FloatingInput
              label={"Diet Time"}
                type="time"
                name="dietTime"
                value={formData.dietTime}
                onChange={handleInputChange}
              
              />
            </div>
            <div className="Diet-order-group">
              <FloatingInput
              label={"Diet Given Time"}
               type="datetime-local"
               name="dietGivenTime"
               value={formData.dietGivenTime}
               onChange={handleInputChange}
              
              />
            </div>
            <div className="Diet-order-group">
              <FloatingTextarea
              label={"Diet Remarks"}
              name="dietRemarks"
              value={formData.dietRemarks}
              onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="Diet-order-actions">
          <button type="button" className="Diet-order-actions-cancel">
            Cancel
          </button>
          <button type="submit" className="Diet-order-actions-submit">
            Submit
          </button>
        </div>
      </form>

      <div className="ReferralConsultation-existing-referrals">
        <h4>Existing Diet Orders:</h4>
        {dietOrders.length > 0 ? (
          <table className="ReferralConsultation-table">
            <thead>
              <tr>
                <th>SN </th>
                <th>Diet Order </th>
                <th>Diet Group</th>
                <th>Diet Frequency</th>
                <th>Diet Remarks</th>
              </tr>
            </thead>
            <tbody>
              {dietOrders.map((diet, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{diet.dietOrder}</td>
                  <td>{diet.dietGroup}</td>
                  <td>{diet.dietFrequency}</td>
                  <td>{diet.dietRemarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No existing Diet Orders found.</p>
        )}
      </div>
    </div>
  );
};

export default DietOrder;
