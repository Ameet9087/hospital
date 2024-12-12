// CurrentStockLevel.js
import React from "react";
import "./CurrentStockLevel.css";

function CurrentStockLevel() {
  return (
    <div className="currentstocklevel-container">
      <header className="currentstocklevel-header">
        <h1 className="currentstocklevel-title">Welcome to My React App</h1>
      </header>
      <main className="currentstocklevel-main">
        <p className="currentstocklevel-description">
          This is a simple React application with some basic styling.
        </p>
        <button className="currentstocklevel-button">Click Me</button>
      </main>
    </div>
  );
}

export default CurrentStockLevel;
