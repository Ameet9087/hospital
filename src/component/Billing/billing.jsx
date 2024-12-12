/* neha-Billing-20/09/24 */
import React from "react";
import Ipbilling from "./IP_Billing/ipbilling";
import IpViewDetail from "./IP_Billing/ipviewDetail";
// import BillingHome from './Billing_Home/billing_home';
import Search_Patient from "./Billing_Search_Patient/Search_Patient";

// import Provisinal_Main from './Provisinal Clearence/Provisinal_Main';
import { FaHome } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import "./billing.css";
// import CancelBillList from './Cancle_Bill/canclebill';
// import ReturnBill from './Return_bill/return_bill';

function Billing() {
  return (
    <div>
      <header className="opd-ipd-billing">
        <nav>
          <ul className="billing-navBar">
            <Link to="/ipbilling">
              <li>IP Billing</li>
            </Link>
            {/* <Link to="/billing_home"><li><FaHome /></li></Link> */}
            <Link to="/Search_Patient">
              <li>OPD Billing</li>
            </Link>
            {/* <Link to="/Provisinal_clearence/out-patient-ander"><li>Provisional Clearance</li></Link> */}
            {/* <Link to="/CancelBillList"><li>Cancle Bill</li></Link> */}
            {/* <Link to="/ReturnBill"><li>ReturnBill</li></Link> */}
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/ipbilling" element={<Ipbilling />} />
        {/* <Route path="/IpViewDetail" element={<IpViewDetail />} /> */}
        {/* <Route path="/billing_home" element={<BillingHome />} /> */}
        <Route path="/Search_Patient" element={<Search_Patient />} />
        {/* <Route path="/Provisinal_clearence/*" element={<Provisinal_Main />} /> */}
        {/* <Route path="/CancelBillList" element={<CancelBillList/>} /> */}
        {/* <Route path='/ReturnBill' element={<ReturnBill/>}> </Route> */}
      </Routes>
    </div>
  );
}

export default Billing;
