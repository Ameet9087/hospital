import React from "react";
import { NavLink, useLocation,Route,Routes } from "react-router-dom";
import './MaternityHeader.css';
import MaternityList from "./MaternityList";
import Payment from "./PaymentComponent";
import AntenatalCare from "./AntenatalCare/antenatalCare";
import PostnatalCareManagement from "./PostnatalCare/postnatalcare";
import LabourStaffManagement from "./LaborRoomManagement/LabourStaffmgnt/stafmgnnt";
import BreastfeedingSupportManagement from "./BreastfeedingSupportManagement/breastfeedingSupportmgnt";
import FamilyPlanningSupportManagement from "./FamilySupportService/familysupportservice";

const MaternityHeader = () => {
  return (
    <>
    <div className="maternity-header">

      <NavLink 
        to="/maternity/maternitylist" 
        className={`maternity-header-button ${location.pathname === '/maternity/maternitylist' ? 'active' : ''}`}
      >
        Maternity List
      </NavLink>
      <NavLink 
        to="/maternity/paymentsreports" 
        className={`maternity-header-button ${location.pathname === '/maternity/paymentsreports' ? 'active' : ''}`}
      >
        Payments

      </NavLink>
      <NavLink to="/maternity/antenatalcare" className={`maternity-header-button ${location.pathname.startsWith('/antenatalcare') ? 'active' : ''}`} activeClassName="active">Antenatal Care</NavLink>     
                  
      <NavLink to="/maternity/postnatalcare" className={`maternity-header-button ${location.pathname.startsWith('/postnatalcare') ? 'active' : ''}`} activeClassName="active">Postnatal Care</NavLink>
                    
      <NavLink to="/maternity/laborroommanagement" className={`maternity-header-button ${location.pathname.startsWith('/laborroommanagement') ? 'active' : ''}`} activeClassName="active">Labor Room Management</NavLink>
               
      <NavLink to="/maternity/breastfeedingsupport" className={`maternity-header-button ${location.pathname.startsWith('/breastfeedingsupport') ? 'active' : ''}`} activeClassName="active">Breastfeeding Support</NavLink>
               
      <NavLink to="/maternity/familyplanningservice" className={`maternity-header-button ${location.pathname.startsWith('/familyplanningservice') ? 'active' : ''}`} activeClassName="active">Family Planning Service</NavLink>
    </div>

<div className="content">
<Routes>
  <Route path="/maternitylist" element={<MaternityList />} />
  <Route path="/paymentsreports" element={<Payment />} />
  <Route path="/antenatalcare" element={<AntenatalCare />} />
  <Route path="/postnatalcare" element={<PostnatalCareManagement />} />
  <Route path="/laborroommanagement" element={<LabourStaffManagement />} />
  <Route path="/breastfeedingsupport" element={<BreastfeedingSupportManagement />} />
  <Route path="/familyplanningservice" element={<FamilyPlanningSupportManagement />} />
</Routes>
</div>
</>

  );
};

export default MaternityHeader;
