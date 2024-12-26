import React, { act } from "react";
import { useNavigate } from "react-router-dom";
import "./CSSDTransactionMainMenu.css";

const CSSDTransactionMenu = () => {
  const navigate = useNavigate();

  const handleButtonClick = (action) => {
    if (action === "1 Kit Request") {
      navigate("cssd-kit-request-indent");
    } else  if (action === "Bubble Pending Kit Issue") {
      navigate("cssd-bubble-kit-issue");
    }else if(action === "Bubble Pending Kit Receive"){
      navigate("bubble-pending-kit-receive");
      
    }else if(action === "6 Kit Discard"){
      navigate("cssd-kit-Discard");
    }else if(action === "Bubble Kit Returns"){
      navigate("cssd-pending-kit-return")
    }
    
    
    else {
      console.log(`${action} clicked`);
    }
  };

  return (
    <div className="cssd-transaction-container">
      
      <nav className="cssd-navbar">
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("1 Kit Request")}
        >
          Kit Request
        </div>
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("Bubble Pending Kit Issue")}
        >
          Bubble Pending Kit Issue
        </div>
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("Bubble Pending Kit Receive")}
        >
          Bubble Pending Kit Receive
        </div>
        {/* <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("4 Kit Utilization Entry")}
        >
          4 Kit Utilization Entry
        </div> */}
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("Bubble Kit Returns")}
        >
          Bubble Pending Kit Returns
        </div>
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("6 Kit Discard")}
        >
          Kit Discard
        </div>
        {/* <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("7 Bubble Kit Decontamination")}
        >
          7 Bubble Kit Decontamination
        </div> 
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("Kit Decontamination")}
        >
          Kit Decontamination
        </div>
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("8 Kit Maintenance and Inspection")}
        >
          8 Kit Maintenance And Inspection
        </div>
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("9 Kit Packing and Labeling")}
        >
          9 Kit Packing And Labeling
        </div>
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("10 Kit Sterilization")}
        >
          10 Kit Sterilization
        </div>
        <div
          className="cssd-nav-item"
          onClick={() => handleButtonClick("Kit Tracking")}
        >
          Kit Tracking
        </div>
        <div
          className="cssd-nav-item active"
          onClick={() => handleButtonClick("1A Kit Stockup")}
        >
          1A - Kit Stockup
        </div>*/}
      </nav>
     
    </div>
  );
};

export default CSSDTransactionMenu;
