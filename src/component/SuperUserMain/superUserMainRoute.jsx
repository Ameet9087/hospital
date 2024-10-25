import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import SuperUserNavBar from './superUserNav';

import Revenuemgnt from './RevenueMgnt/revenuemgnt';
import RevenueDashboard from './RevenueMgnt/RevenueDashboard/revenuedashboard';

import SUPermission from './SuperUserPermission/sUPermission';

import BillingNavbar from './BillingDiscountApproval/BillingNavbar';
import DiscountApprovalRequest from './BillingDiscountApproval/DiscountApprovalRequestForm';
import DiscountApprovalReviewFormCom from './BillingDiscountApproval/DiscountApprovalReviewFormCom';
import DiscountHistory from './BillingDiscountApproval/DiscountHistory';
import PatientBillingSummary from './BillingDiscountApproval/PatientBillingSummary';

import HomePage from './MessageBroadcast/pages/HomePage';
import BroadcastPage from './MessageBroadcast/pages/BroadcastPage';
import AddMessagePageHIMS from './MessageBroadcast/pages/AddMessagePage';
import SendMessageHistory from './MessageBroadcast/pages/SendMessageHistory';

import FacilityService from './FacilityServices/FacilityService';

import Administration from './Administration/Administration';
// import VendorSupplyRouting from './VendorAndSupply/VendorSupplyRouting';
import VendorNavba from './VendorAndSupply/VendorNavbar' 
import PurchaseOrderAcknowledgmentFormCom from './VendorAndSupply/PurchaseOrderAcknowledgmentForm';
import PurchaseOrderFormCom from './VendorAndSupply/PurchaseOrderForm';
import SupplyDeliveryFormCom from './VendorAndSupply/QuotationForm';
import InvoiceFormCom from './VendorAndSupply/InvoiceForm';
import PrintReport from './VendorAndSupply/InvoiceListItems';
import ReportGenerationFormCom from './VendorAndSupply/ReportGenerationForm';

import ControlAllDeptRoute from './ControlAllDepartment/controlAllDeptRoute';
import Department from './ControlAllDepartment/Department';
import Inventory from './ControlAllDepartment/Inventory';
import QueryPage from './ControlAllDepartment/QueryPage';
import QueryPageInventory from './ControlAllDepartment/QueryPageInventory';

import Superusermodulemain from './SuperUserModuleMain/superusermodulemain';
import SuperUserRoleManagement from './Rolemgnt/rolemgnt';
function SuperUserMain() {

  return (
    <>
        <SuperUserNavBar/>
        <div className="transportNavBar-content">
        <Routes>

          <Route path="/revenuemgnt" element={<Revenuemgnt />} />           
          <Route path="/revenuedashoboard" element={<RevenueDashboard />} />           

          <Route path="/sUPermission" element={<SUPermission />} />

          <Route path="/billingNavbar" element={<BillingNavbar />} />
          <Route path="/discount-approval-request" element={<DiscountApprovalRequest />} />
          <Route path="/discount-approval-review" element={<DiscountApprovalReviewFormCom />} />
          <Route path="/discount-history" element={<DiscountHistory />} />
          <Route path="/patient-billing-summary" element={<PatientBillingSummary />} />


          <Route path="/homePage" element={<HomePage />} />           
          <Route path="/broadcast" element={<BroadcastPage />} />           
          <Route path="/broadcast/add" element={<AddMessagePageHIMS />} />           
          <Route path="/broadcast/send" element={<SendMessageHistory />} />           
          
          <Route path="/facilityService" element={<FacilityService />} />           
           
          <Route path="/administration" element={<Administration />} />           
 
          <Route path="/vendorNavba" element={<VendorNavba />} />           
          <Route path="/purchase-order-acknowlegement" element={<PurchaseOrderAcknowledgmentFormCom />} />           
          <Route path="/purchase-order" element={<PurchaseOrderFormCom />} />           
          <Route path="/QuotationForm" element={<SupplyDeliveryFormCom />} />           
          <Route path="/invoice" element={<InvoiceFormCom />} />           
          <Route path="/InvoiceListItems" element={<PrintReport />} />           
          <Route path="/report" element={<ReportGenerationFormCom />} />           

          <Route path="/controlAllDeptRoute" element={<ControlAllDeptRoute />} />           
          <Route path="/department" element={<Department />} />           
          <Route path="/inventory" element={<Inventory />} />           
          <Route path="/send-query" element={<QueryPage />} />           

          <Route path="/send-inventory-query" element={<QueryPageInventory />} />   

          <Route path="/Superusermodulemain/*" element={<Superusermodulemain />} />
          <Route path='/rolemgnt' element={<SuperUserRoleManagement />} />       
        </Routes>
      </div>
    </>
  )
}

export default SuperUserMain
