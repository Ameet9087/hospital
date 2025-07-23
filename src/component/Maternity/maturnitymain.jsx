import React from 'react'
import AntenatalCare from './componets/AntenatalCare/antenatalCare'
import PostnatalCareManagement from './componets/PostnatalCare/postnatalcare';
import BreastfeedingSupportManagement from './componets/BreastfeedingSupportManagement/breastfeedingSupportmgnt';
import FamilyPlanningSupportManagement from './componets/FamilySupportService/familysupportservice';
import Labourmgnt from './componets/LaborRoomManagement/labourmgnt';
import { NavLink, Routes, Route } from 'react-router-dom';
import './Maturnitymain.css'

function Maturnitymain() {
  return (
    <div>
        <header>
            <nav>
                <ul className="maternity-mainsub-navbar">
                    <li>
                        <NavLink to="/" className="maternity-mainsub-nav-link" activeClassName="active">Antenatal Care</NavLink>
                    </li>
                    <li>
                        <NavLink to="/PostnatalCare" className="maternity-mainsub-nav-link" activeClassName="active">Postnatal Care</NavLink>
                    </li>
                    <li>
                        <NavLink to="/LaborRoomManagement" className="maternity-mainsub-nav-link" activeClassName="active">Labor Room Management</NavLink>
                    </li>
                    <li>
                        <NavLink to="/BreastfeedingSupport" className="maternity-mainsub-nav-link" activeClassName="active">Breastfeeding Support</NavLink>
                    </li>
                    <li>
                        <NavLink to="/FamilyPlanningService" className="maternity-mainsub-nav-link" activeClassName="active">Family Planning Service</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        
        <div>
            <Routes>
              <Route path="/" element={<AntenatalCare />} />
              <Route path='/PostnatalCare' element={<PostnatalCareManagement/>}></Route>
              <Route path='/*' element={<Labourmgnt/>}></Route>
              <Route path='/BreastfeedingSupport' element={<BreastfeedingSupportManagement/>}></Route>
              <Route path='/FamilyPlanningService' element={<FamilyPlanningSupportManagement/>}></Route>
              
            </Routes>
        </div>
    </div>
  )
}

export default Maturnitymain
