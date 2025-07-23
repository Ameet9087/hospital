import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './bloodCollectionMain.css';  // Import the CSS file
import Donarlist from './DonationList/donationList';
import Colletionlist from './CollectionList/collectionList';
// import Donarlist from './DonationList/donationList';
// import Colletionlist from './CollectionList/collectionList';

function Bloodcollectionmain() {
  return (
    <div>
      <header className="bloodcollection-header">
        <nav>
          <ul className="bloodcollection-nav-links">
            <Link to="/bloodbank/bloodcollection/donarlist" className="bloodcollection-header-button">
              <li className='bloodcollection-header-button'>Donor List</li>
            </Link>
            <Link to="/bloodbank/bloodcollection/collectionlist" className="bloodcollection-header-button">
              <li className='bloodcollection-header-button'>Collection List</li>
            </Link>
          </ul>
        </nav>
      </header>
      
      <Routes>
        <Route path="/bloodcollection/donarlist" element={<Donarlist />} />
        <Route path="/bloodcollection/collectionlist" element={<Colletionlist />} />
      </Routes>
    </div>
  );
}

export default Bloodcollectionmain;

