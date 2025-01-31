import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./assettransactionnav.css";
import AssetsQualityCheck from "../Transaction/AssetQlualityCheck/AssetQualityCheck";
import EquipmentInstallationDetails from "../Transaction/EquipmentInstallationDetails/EquipmentInstallationDetails/NewEquipmentInstallationDetails";
import EquipmentUserTraining from "../Transaction/EquipmentUserTraining/EquipmentUserTraining/NewEquipmentUserTrainingDetails";
import NewReplacementRequest from "../Transaction/NewReplacementReq/AssetNewReplacementRequest";
import BreakDownDetails from "../Transaction/BreakdownDetails/BreakDownDetails";
import EquipmentMaintenance from "../Transaction/EquipmentMaintenance/MaintenanceVisitDetails";
import EquipmentGetPassOut from "../Transaction/EqipmentGatepassout/EquipmentGatePassOut";
import EquipmentGatePassIn from "./EquipmentGatePassIn/EquipmentGatePassIn/EquipmentGatePassIn";
import DefectRisingBreackageRequest from "../Transaction/DefectRaisingBreakagerequest/DefectRaisingBreackageRequest";
import CondemnationAndDisposal from "../Transaction/Condenmationanddisposal/CondemnationAndDisposal";
import FinalSale from "../Transaction/Final _Sale_By_Accounts/Final _Sale_By_Accounts/FinalSaleByAccounts";
import AddDelPharmcyForm from "./AdditionDeletionPharmacyForm/adddelpharmacyform";
import CondemnationandDisposalView from "./Condemnation and Disposal View/CondemnationandDisposalView";


import ProvisionalSale from "./ProvisionalSale/ProvisionalSale";
import PreventiveMaintenance from "./PreventiveMaintenance/PreventiveMaintenance";
import EquipmentTagging from "./EquipmentTagging/EquipmentTagging";
import AMCProposal from "./AMCProposal/AMCProposal";
import ReplacementInstruments from "./Replacement Instruments/ReplacementInstruments";
import EquipmentGatePassInViewPopUp from "../Transaction/Equipment Gate Pass In View/EquipmentGatePassInViewPopUp";
import EquipmentGatePassOUTView from "./Gate Pass Out View/EquipmentGatePassOUTView";
import ProposalforAMCMultiple from "./Proposal for AMC Multiple/ProposalforAMCMultiple";
import AmcTracker from "./AMCTracker/AmcTracker";
import AmcDetail from "./AMCDetails/AmcDetails";
import AssetDashboard from "./AssetDashBoard/AssetdashBoard";
import ProposalForAMCCMCFrom from "./ProposalForAMCCMC/ProposalForAMCCMCFrom";
import Equipmentutilisationform from "./Equipment Utilisation Form/EquipmentUtilisationForm"
import CondemnationanddisposalRequest from "./Condemnation And Disposal Request/CondemnationAndDisposalRequest"
import AssetQualityCheckMulti from "./Asset Quality Check Multi/AssetQualitycheckmulti"
import SecurityGatePassOut from "./Security GatePass Out/SecurityGatePassOut"
import ApprovalDashboards from "./Approval Dashboard/ApprovalDashboards"
import AMCDetailsmulti from "./AmcDetailsMulti/AMCMulti";
import EquipmentRecievForm from "./EquimentRecieveTakeover/EquipmentRecievForm"
import EquipmentTransformHandoverForm from "./EquipmentHandover/EquipmentTransformHandoverForm";
import GatePassSecurityCheck from "./GatePassSecurityCheck/GatePassSecurityCheck"
import MaintenanceCheckList from "./Maintenance Check List/MaintenanceCheckList"
import PmCalibrationFrom from "./PmCalibration/PmCalibrationFrom"
import PreventiveMaintenanceCalibration from "./Preventive Maintenance Calibration/PreventiveMaintenanceCalibration"
import YearlyEquipmentDepreciationCalculationForm from "./Yearly Equipments Depreciation Calculation Form/YearlyEquipmentDepreciationCalculationForm"
import ComplaintEntrysystem from "./Complaint Entry System/ComplaintEntrysystem"
const Transactionnav = () => {
  return (
    <div className="assettransactionnav-container">
      <nav className="assettransactionnav-navbar">
        <ul>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/amc-details"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              AMC Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/amc-details-multi"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              AMC Details Multi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/amc-tracker"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              AMC Tracker
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/asset-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Asset Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/approval-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Approval Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/asset-quaity-check-multi"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Asset Quality Check Multi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/breakDownDetail"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Break Down Detail
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/condemnationAndDisposal"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Condemnation and Disposal
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/condemnationAndDisposal-request"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Condemnation and Disposal Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/defectRisingBackege"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Defect Rising/Backege
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipmentGatePassIn"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Gate Pass In
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipmentGatePassOut"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Gate Pass Out
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipmentInstallationDetails"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Installation Details
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipmentMaintenance"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Maintenance Visit Details
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipment-receive-takeover"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Receive Takeover
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipmenttagging"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Tagging

            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipment-transfer-handover"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Transfer Handover
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipmentUserTraining"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment User Training
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/equipment-utilisation"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Equipment Utilisation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/provisionalsale"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Provisional Sale
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/finalSaleByAccounts"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Final Sale by Accounts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/gate-pass-security-check"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Gate Pass Security Check
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/maintainance-checklist"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Maintainance CheckList
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/fixedassests/assesttransaction/assetNewReplacementRequest"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Asset New/Replacement Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/pm-callibration"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              PM Callibration


            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/amc-cmc-proposal"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Proposal for AMC CMC


            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/preventive-maintenance-callibration"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Preventive Maintenance/Calibration


            </NavLink>
          </li>




          <li>
            <NavLink
              to="/fixedassests/assesttransaction/preventivemaintenance"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Preventive Maintenance/Calibration Cancellation

            </NavLink>
          </li>



          <li>
            <NavLink
              to="/fixedassests/assesttransaction/amc-proposal"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Proposal for AMC Renewal


            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fixedassests/assesttransaction/proposalforAMCMultiple"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Proposal For AMC Multiple
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/replacement-instruments"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Replacement Instruments



            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/security-gate-PassOut"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Security Gate PassOut



            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/yearly-equipment-depreciation"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Yearly Equipment Depreciation



            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fixedassests/assesttransaction/complaint-entry-system"
              className={({ isActive }) =>
                isActive
                  ? "assettransactionnav-button active"
                  : "assettransactionnav-button"
              }
            >
              Complaint Entry System



            </NavLink>
          </li>



        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/equipmentInstallationDetails" element={<EquipmentInstallationDetails />} />
          <Route path="/equipmentUserTraining" element={<EquipmentUserTraining />}></Route>
          <Route path="/assetQualityCheck" element={<AssetsQualityCheck />}></Route>
          <Route path="/assetNewReplacementRequest" element={<NewReplacementRequest />}></Route>
          <Route path="/breakDownDetail" element={<BreakDownDetails />}></Route>
          <Route path="/equipmentMaintenance" element={<EquipmentMaintenance />}></Route>
          <Route path="/equipmentGatePassOut" element={<EquipmentGetPassOut />}></Route>
          <Route path="/equipmentGatePassIn" element={<EquipmentGatePassIn />}></Route>
          <Route path="/defectRisingBackege" element={<DefectRisingBreackageRequest />}></Route>
          <Route path="/condemnationAndDisposal" element={<CondemnationAndDisposal />}></Route>
          <Route path="/finalSaleByAccounts" element={<FinalSale />}></Route>
          <Route path="/additiondelitionpharmacyform" element={<AddDelPharmcyForm />}></Route>


          <Route path="/provisionalsale" element={<ProvisionalSale />}></Route>
          <Route path="/preventivemaintenance" element={<PreventiveMaintenance />}></Route>
          <Route path="/equipmenttagging" element={<EquipmentTagging />}></Route>
          <Route path="/amc-proposal" element={<AMCProposal />}></Route>
          <Route path="/replacement-instruments" element={<ReplacementInstruments />}></Route>
          <Route path="/equipmentGatePassInView" element={<EquipmentGatePassInViewPopUp />}></Route>
          <Route path="/equipmentGatePassOutView" element={<EquipmentGatePassOUTView />}></Route>
          <Route path="/proposalforAMCMultiple" element={< ProposalforAMCMultiple />}></Route>
          <Route path="/amc-tracker" element={< AmcTracker />}></Route>
          <Route path="/amc-details" element={< AmcDetail />}></Route>
          <Route path="/amc-details-multi" element={<AMCDetailsmulti />}></Route>
          <Route path="/condemnationAndDisposalView" element={<CondemnationandDisposalView />}></Route>
          <Route path="/asset-dashboard" element={<AssetDashboard />}></Route>
          <Route path="/approval-dashboard" element={<ApprovalDashboards />}></Route>
          <Route path="/amc-cmc-proposal" element={<ProposalForAMCCMCFrom />}></Route>
          <Route path="/equipment-utilisation" element={<Equipmentutilisationform />}></Route>
          <Route path="/condemnationAndDisposal-request" element={<CondemnationanddisposalRequest />}></Route>
          <Route path="/asset-quaity-check-multi" element={<AssetQualityCheckMulti />}></Route>
          <Route path="/security-gate-PassOut" element={<SecurityGatePassOut />}></Route>
          <Route path="/equipment-receive-takeover" element={<EquipmentRecievForm />}></Route>
          <Route path="/equipment-transfer-handover" element={<EquipmentTransformHandoverForm />}></Route>
          <Route path="/gate-pass-security-check" element={<GatePassSecurityCheck />}></Route>
          <Route path="/maintainance-checklist" element={<MaintenanceCheckList />}></Route>
          <Route path="/pm-callibration" element={<PmCalibrationFrom />}></Route>
          <Route path="/preventive-maintenance-callibration" element={<PreventiveMaintenanceCalibration />}></Route>
          <Route path="/yearly-equipment-depreciation" element={<YearlyEquipmentDepreciationCalculationForm />}></Route>
          <Route path="/complaint-entry-system" element={<ComplaintEntrysystem />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Transactionnav;
