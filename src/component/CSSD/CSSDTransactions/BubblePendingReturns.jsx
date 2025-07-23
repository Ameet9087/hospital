import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Bubble_Pending_Returns.css';
import { API_BASE_URL } from "../../api/api";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BubblePendingReturns = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/kit-receiving`);
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          // Filter only pending returns
          const pendingReturns = response.data.filter(item => item.status === "Pending");

          const bubbleData = pendingReturns.map((item) => ({
            id: item.receivingId,
            receivingId: item.receivingId,
            date: item.date, // Assuming there's a date field
            color: getColorBasedOnPriority(item.priority),
          }));

          setBubbles(bubbleData);
        } else {
          console.warn("Response data is missing expected fields or is not an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getColorBasedOnPriority = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "blue";
    }
  };
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleBubbleClick = (id, receivingId) => {
    navigate(`pending-return/${id}?receivingId=${receivingId}`);
  };

  return (
    <div className="Bubble_Pending_Returns_view">
      <div className="Bubble_Pending_Returns_header">
        <h5>Pending Returns </h5>
        <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="back-icon"
            onClick={handleClose}
          />

      </div>

      <div className="Bubble_Pending_Returns_container bubbles-container">
        {bubbles.length > 0 ? (
          bubbles.map((bubble, index) => (
            <div
              key={bubble.id}
              className={`Bubble_Pending_Returns_bubble ${bubble.color}`}
              onClick={() => handleBubbleClick(bubble.id, bubble.receivingId)}
            >
              <div className="bubble-serial-number">{index + 1}</div>
              <div>{bubble.date}</div>
            </div>
          ))
        ) : (
          <p>No pending return records found.</p>
        )}
      </div>

      <div className="Bubble_buttons">
        <button>Today</button>
        <button>Yesterday</button>
        <button>Last Week</button>
        <button>This Month Till Date</button>
        <button>Last Month</button>
        <button>Last 3 Months</button>
        <button id="Bubble_buttons_close">Close</button>
      </div>
    </div>
  );
};

export default BubblePendingReturns;
