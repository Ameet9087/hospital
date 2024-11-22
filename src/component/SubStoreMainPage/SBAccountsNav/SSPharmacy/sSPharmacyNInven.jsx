/* Ajhar Tamboli sSPharmacyNInven.jsx 19-09-24 */

import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import "../SSPharmacy/sSPharmacyNInven.css";

const SSPharmacyNInven = () => {
  const {store} =useParams();
  const navigate = useNavigate();

  const handleLogoutButtonClick = () => {
    navigate('/substore/stores'); // Route to open SubStoreMain component
  };

  return (
    <nav className="sSPharmacyNInven-bar">
      <ul className='sSPharmacyNInven-ul'>
        <div className='sSPharmacyNInven-pha-N-inven'>
          <li><NavLink to={`/substore/pharmacy/${store}`}>Pharmacy</NavLink></li> {/* Link to SSPStock */}
          <li><NavLink to={`/substore/inventory/${store}`}>Inventory</NavLink></li> {/* Link to SSIStock */}
        </div>
        <div className='sSPharmacyNInven-Acc-N-Log'>
          <button className='sSPharmacyNInven-active-Accounts-button'>{`Active Store: ${store}`}</button>
          <button 
            className='-sSPharmacyNInven-active-Accounts-Logout-button'
            onClick={handleLogoutButtonClick}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </ul>
    </nav>
  );
}

export default SSPharmacyNInven;
