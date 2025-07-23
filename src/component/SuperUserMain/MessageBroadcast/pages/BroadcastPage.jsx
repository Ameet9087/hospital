/* Dhanashree_BroadcastPage_26/09_Starts */

import React from 'react';
import { Link } from 'react-router-dom';
import './BroadcastPage.css';

const BroadcastPage = () => (
  <div className="BroadcastPageHIMS-container">
    <div className="BroadcastPageHIMS-card">
      <h1>Broadcast The Message</h1>
      <Link to="/broadcast/add">
        <button className="BroadcastPageHIMS-action-button">Add Message</button>
      </Link>

    <Link to="/broadcast/send">
    <button className="BroadcastPageHIMS-action-button">Show Message</button>
        </Link> 
    
    </div>
  </div>
);

export default BroadcastPage;

/* Dhanashree_BroadcastPage_26/09_Ends */
