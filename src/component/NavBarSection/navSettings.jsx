import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import "../NavBarSection/navSetting.css";
import LabTest from "./LabSetting/labTest";
import LabTestComponent from "./LabSetting/labTestComponents";
import ReportTemplate from "./LabSetting/reportTemplate";
import DefaultSignatories from "./LabSetting/defaultSignatories";
import VendorsLab from "./LabSetting/vendors-lab";
import LookUps from "./LabSetting/looksUps";
import LabCategories from "./LabSetting/labCategories";
import MapGovernmentItemxs from "./LabSetting/mapGovernmentItems";
// import './hospitalNav.css';

const NavSetting = () => {
  return (
    <>
      <nav className="nav-Setting-navbar">
        <ul>
          <li>
            <NavLink to="/laboratory/settings/labTest">Lab Test</NavLink>
          </li>
          {/* <li><NavLink to="/navHome"><i className="fa-solid fa-house-chimney" ></i></NavLink></li> */}
          <li>
            <NavLink to="/laboratory/settings/labTestComponent">
              Lab Test Components
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/settings/reportTemplate">Report Template</NavLink>
          </li>
          <li>
            <NavLink to="/settings/defaultSignatories">
              Default Signatories
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/vendorsLab">Vendors</NavLink>
          </li> */}
          <li>
            <NavLink to="/laboratory/settings/lookUps">Looks Ups</NavLink>
          </li>
          <li>
            <NavLink to="/laboratory/settings/labCategories">Lab Categories</NavLink>
          </li>
          {/* <li>
            <NavLink to="/settings/mapGovernmentItemxs">
              Map Government Items
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/labTest" element={<LabTest />} />
        <Route path="/labTestComponent" element={<LabTestComponent />} />
        {/* <Route path="/reportTemplate" element={<ReportTemplate />} /> */}
        {/* <Route path="/defaultSignatories" element={<DefaultSignatories />} /> */}
        {/* <Route path="/vendorsLab" element={<VendorsLab />} /> */}
        <Route path="/lookUps" element={<LookUps />} />
        <Route path="/labCategories" element={<LabCategories />} />
        {/* <Route path="/mapGovernmentItemxs" element={<MapGovernmentItemxs />} /> */}
      </Routes>
    </>
  );
};

export default NavSetting;
