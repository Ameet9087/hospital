import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reports.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


const ReportComponent = () => {
  const navigate = useNavigate();

  const handleMaternityAllowanceClick = () => {
    navigate("/maternity-allowance-report");
  };

  return (
   <div className="report-maternity">
      <div className="reports-com">
        <div className="report-card-container"
         onClick={handleMaternityAllowanceClick}>
          <div className="report-icon-container">
          <i class="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-cont">
            <h4>Maternity Allowance</h4>
            <p>Report</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
