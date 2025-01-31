import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./assetmgntmasterNavBar.css";
import InsuranceEntryMaster from "./InssurenceEntryMaster/InsuranceEntryMasterForm";
import AssetLocation from "./AssetLocationForm/AssetLocationForm/assetLocationsMaster";
import EquipmentMaster from "./EquipmentMaster/EquipmentMaster";
import CondemnationReasonMaster from "./condenmationreasonmaster/NewCondemnationReasonMaster";
import AddDelPharmcyForm from "../Transaction/AdditionDeletionPharmacyForm/adddelpharmacyform";
import AssetCategoryMaster from "./AssetCategoryMaster/assetCategoryMaster";
import MaintenanceChecklisttypeMaster from "./MaintenanceCheckListtypeMaster/MaintenanceCheckListtypeMaster";
import MaintenanceTypeMaster from "./MaintenanceFileMaster/MaintenanceFileMaster";
import EquipmentPart from "./Equipment Parts/EquipmentParts";

const Masternav = () => {
  return (
    <div className="assettransactionnav-container">
      <nav className="assettransactionnav-navbar">
        <ul>
          <li>
            <NavLink
              to="/fixedassests/assestmaster/assetCategoryMaster"
              className={({ isActive }) =>
                isActive ? "assettransactionnav-button active" : "masternav-button"
              }
            >
              Asset Category Master
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assestmaster/assetLocationMaster"
              className={({ isActive }) =>
                isActive ? "assettransactionnav-button active" : "masternav-button"
              }
            >
              Asset Location Master
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assestmaster/equipmentMaster"
              className={({ isActive }) =>
                isActive ? "assettransactionnav-button active" : "masternav-button"
              }
            >
              Equipment Master
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assestmaster/insuranceEntryForm"
              className={({ isActive }) =>
                isActive ? "assettransactionnav-button active" : "masternav-button"
              }
            >
              Insurance Entry Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assestmaster/condemnationReasonMaster"
              className={({ isActive }) =>
                isActive ? "assettransactionnav-button active" : "masternav-button"
              }
            >
              Condemnation Reason Master
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assestmaster/maintenancechecklisttypemaster"
              className={({ isActive }) =>
                isActive ? "assettransactionnav-button active" : "masternav-button"
              }
            >
              MaintenanceChecklist Type Master
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assestmaster/mainenancetypemaster"
              className={({ isActive }) =>
                isActive ? "assettransactionnav-button active" : "masternav-button"
              }
            >
              MaintenanceType Master
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assestmaster/part"
              className={({ isActive }) =>
                isActive ? "masternav-button active" : "masternav-button"
              }
            >
              Equipment Part
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route
            path="/assetCategoryMaster"
            element={<AssetCategoryMaster />}
          />
          <Route path="/assetLocationMaster" element={<AssetLocation />} />
          <Route path="/equipmentMaster" element={<EquipmentMaster />} />
          <Route
            path="/insuranceEntryForm"
            element={<InsuranceEntryMaster />}
          />
          <Route
            path="/condemnationReasonMaster"
            element={<CondemnationReasonMaster />}
          />
          <Route
            path="/maintenancechecklisttypemaster"
            element={<MaintenanceChecklisttypeMaster />}
          />
          <Route
            path="/mainenancetypemaster"
            element={<MaintenanceTypeMaster />}
          />
          <Route path="/part" element={<EquipmentPart />} />
        </Routes>
      </div>
    </div>
  );
};

export default Masternav;
