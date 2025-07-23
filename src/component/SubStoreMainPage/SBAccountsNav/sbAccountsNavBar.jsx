// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { RiTeamFill } from "react-icons/ri";
// import "../SBAccountsNav/sbAccountsNavBar.css"

// // import "../DispensaryPage/dispensaryNav.css"
// const SBAccountsNavBar = () => {
//   return (
//     <nav className="dispensary-Navigation-bar">
//       <ul>

//         {/* <div className="pharmacyAnd-Active"> */}

//         <div className="pharmacy-Inventory-div">
//         <li><NavLink to="sSPStock">Pharmacy</NavLink></li>
//         <li><NavLink to="/dispenSales">Inventory</NavLink></li>
//         </div>


//         <div className="active-Store-div">
//         <button className='activeDispensary-btn'>Active Store:Accounts</button>
//         </div>

//         {/* </div> */}
//       </ul>
//     </nav>
//   );
// }

// export default SBAccountsNavBar;


import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

import SSPharmacyNInven from './SSPharmacy/sSPharmacyNInven';

// import "../SSPharmacy/"

// import SubStoreMain from './SubStoreMainPage/subStoreMain';
// import SBAccountsNavBar from './SubStoreMainPage/SBAccountsNav/sbAccountsNavBar';
// import SSPStock from './SubStoreMainPage/SBAccountsNav/SSPharmacy/sSPStock';


import "../SBAccountsNav/sbAccountsNavBar.css"
import SSPStock from './SSPharmacy/sSPStock';
import SSIStock from './SSInventory/sSIStock';
function SBAccountsNavBar() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <SSPharmacyNInven />
      <div className="lab-content">
       <Routes>
        <Route path="/pharmacy" element={<SSPStock />} />
        <Route path="/inventory" element={<SSIStock />} />

        {/* <Route path="/accounts" element={<SBAccountsNavBar />} /> */}
        {/* <Route path="/sSPStock" element={<SSPStock />} /> */}
          {/* <Route path="/hHEmpInformation" element={<HHEmpInformation/>}/> */}
          </Routes>
       
      </div>
    
    </>
  )
}

export default SBAccountsNavBar
