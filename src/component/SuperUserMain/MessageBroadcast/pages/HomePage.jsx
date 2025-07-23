/* Dhanashree_HomePage_26/09_Starts */

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <div className="HomePageBroadcast-home-container">
    <h1>Welcome to Broadcast System</h1>
    <Link to="/broadcast">
      <button className="HomePageBroadcast-broadcast-button">Broadcast</button>
    </Link>
  </div>
);

export default HomePage;

/* Dhanashree_HomePage_26/09_Ends */
