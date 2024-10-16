/* Ajhar Tamboli sSPharmacyNInven.jsx 19-09-24 */

import React from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import "../SSPharmacy/sSPharmacyNInven.css";

const SSPharmacyNInven = () => {
  const {store} =useParams();
  const navigate = useNavigate();

  const handleLogoutButtonClick = () => {
    navigate('/substore'); // Route to open SubStoreMain component
  };

  return (
    <nav className="sSPharmacyNInven-bar">
      <div className='sSPharmacyNInven-ul'>
        <div className='sSPharmacyNInven-pha-N-inven'>
          <p className='sSPharmacyNInven-pha-N-inven-p'><NavLink to={`/sSPStock/${store}`}>Pharmacy</NavLink></p> {/* Link to SSPStock */}
          <p className='sSPharmacyNInven-pha-N-inven-p'><NavLink to={`/SSIStock/${store}`}>Inventory</NavLink></p>{/* Link to SSIStock */}
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
      </div>
    </nav>
  );
}

export default SSPharmacyNInven;
