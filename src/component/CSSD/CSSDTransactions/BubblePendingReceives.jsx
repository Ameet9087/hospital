import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Bubble_Pending_Receives.css';
import { API_BASE_URL } from "../../api/api";

import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BubblePendingReceives = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/kit-issues`);
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          // Filter only pending requests
          const pendingIssues = response.data.filter(item => item.status === "Pending");

          const bubbleData = pendingIssues.map((item) => ({
            id: item.issueId,
            issueId: item.issueId,
          
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

  const handleBubbleClick = (id, issueId) => {
    navigate(`pending-kit-receive/${id}?issueId=${issueId}`);
  };
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="Bubble_Pending_Kit_Receive_view">
      <div className="Bubble_Pending_Kit_Receive_header">
        <h5>Pending Kit Receive</h5>
        <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className="back-icon"
                    onClick={handleClose}
                  /> 

      </div>

      <div className="Bubble_Pending_Kit_Receive_header_container bubbles-container">
        {bubbles.length > 0 ? (
          bubbles.map((bubble, index) => (
            <div
              key={bubble.id}
              className={`Bubble_Pending_Kit_Receive_header_container_bubble ${bubble.color}`}
              onClick={() => handleBubbleClick(bubble.id, bubble.issueId)}
            >
              <div className="bubble-serial-number">{index + 1}</div>
              <div>{bubble.date}</div>
            </div>
          ))
        ) : (
          <p>No pending kit records found.</p>
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

export default BubblePendingReceives;
