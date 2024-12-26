import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./cssd.css";
import Sterilization from "./Sterilization/Sterilization";
import CssdReports from "./CssdReports/Reports";
import CssdMasterMenu from "./CSSDMaster/CssdMasterMenu";
import CSSDItemMaster from "./CSSDMaster/CSSDItemMaster";
import DisplayCSSDItemMaster from "./CSSDMaster/DisplayCSSDItemMaster";
import CSSDKitCategory from "./CSSDMaster/CSSDKitCategory";
import DisplayCSSDKitCategory from "./CSSDMaster/DisplayCSSDKitCategory";
import CSSDKitMaster from "./CSSDMaster/CSSDKitMaster";
import CSSDMachineMaster from "./CSSDMaster/MachineMaster";
import CSSDTransactionMainMenu from "./CSSDTransactions/CSSDTransactionMainMenu";
import CSSDKitRequestIndent from "./CSSDTransactions/CSSDKitRequestIndent";
import CSSDBubbleKitIssue from "./CSSDTransactions/Bubble_Pending_Kit_issue";
import PendingKitIssue from "./CSSDTransactions/Pending_kit_issue";
// import ItemSelectionPage from "./CSSDMaster/itemselectionPage";
import BubblePendingKitReceive from "./CSSDTransactions/bubble_Pending_receive_kit";
import PendingKitReceive from "./CSSDTransactions/pendingkitReceive";
import CSSDKitDiscard from "./CSSDTransactions/cssdkitdiscard";
import CssdKitReturn from "./CSSDTransactions/cssdkitreturn";
import BubblePendingReceives from "./CSSDTransactions/BubblePendingReceives";
import BubblePendingReturns from "./CSSDTransactions/BubblePendingReturns";

function Cssd() {
  return (
    <div className="cssd-component">
      <header className="cssd-component-header">
        <nav className="cssd-component-header-nav">
          <ul>
            <li>
              <NavLink
                to="CssdMasterMenu"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                CSSD Master
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cssd-transaction-mainmenu"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                CSSD Transactions
              </NavLink>
            </li>

            <li>
              {/* <NavLink
                to="cssd-kit-master"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                CSSD Reports
              </NavLink> */}
            </li>
           

          </ul>
        </nav>
      </header>
      <div className="cssd-component-content">
        <Routes>
          <Route path="Sterilization/*" element={<Sterilization />} />
          <Route path="Reports/*" element={<CssdReports />} />
          <Route path="/Sterilization/PendingItem" element={<Sterilization />} />
          <Route path="/CssdMasterMenu/*" element={<CssdMasterMenu /> } />
          <Route path="/CssdMasterMenu/CSSDItemMaster" element={<CSSDItemMaster/>} />
          <Route path="display-CSSD-ItemMaster" element={<DisplayCSSDItemMaster/>} />
          <Route path="/CssdMasterMenu/cssd-kit-category" element={<CSSDKitCategory/>} />
          <Route path="display-cssd-kitcategory" element={<DisplayCSSDKitCategory/>} />
          <Route path="/CssdMasterMenu/cssd-kit-master" element={<CSSDKitMaster/>} />
          <Route path="CssdMasterMenu/cssd-machine-master" element={<CSSDMachineMaster/>} />
          <Route path="cssd-transaction-mainmenu" element={<CSSDTransactionMainMenu/>} />
          <Route path="/cssd-transaction-mainmenu/cssd-kit-request-indent" element={<CSSDKitRequestIndent/>} />
          <Route path="cssd-transaction-mainmenu/cssd-bubble-kit-issue" element={<CSSDBubbleKitIssue/>} />
          <Route path="cssd-transaction-mainmenu/Pending_kit_issue/:id" element={<PendingKitIssue />} />
          <Route path="cssd-transaction-mainmenu/bubble-pending-kit-receive" element={<BubblePendingReceives/>}></Route>
          {/* <Route path="pending-kit-receive" element={<PendingKitReceive/>}></Route> */}
          <Route path="cssd-transaction-mainmenu/cssd-kit-Discard" element={<CSSDKitDiscard/>}></Route>
          <Route path="cssd-transaction-mainmenu/cssd-kit-return" element={<CssdKitReturn/>}></Route>
          <Route path="cssd-transaction-mainmenu/cssd-pending-kit-return" element={<BubblePendingReturns/>}></Route>
          {/* <Route path="pending-kit-receive/:id" element={<BubblePendingKitReceive/>}></Route> */}
          <Route path="cssd-transaction-mainmenu/pending-kit-receive/:issueId" element={<BubblePendingKitReceive />} />
          <Route path="cssd-transaction-mainmenu/pending-return/:receivingId" element={<CssdKitReturn />} />



        </Routes>
      </div>
    </div>
  );
}

export default Cssd;
