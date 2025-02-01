import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import SuperUserNavBar from './superUserNav';

import Revenuemgnt from './RevenueMgnt/revenuemgnt';
import RevenueDashboard from './RevenueMgnt/RevenueDashboard/revenuedashboard';

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
import UserManagement from './UserManagment/UserManagement';
import Scmtowermain from './scmtower/scmtowermain';
function SuperUserMain() {

  return (
    <>
      <SuperUserNavBar />
      <div className="transportNavBar-content">
        <Routes>

          <Route path="/revenuemanagement" element={<Revenuemgnt />} />
          <Route path="/revenuemanagement/revenuedashoboard" element={<RevenueDashboard />} />

          <Route path='/usermanagement/*' element={<UserManagement />} />
          <Route path='/tower/*' element={<Scmtowermain />} />


          <Route path="/billingdiscountapproval/*" element={<BillingNavbar />} />
          <Route path="/billingdiscountapproval/discount-approval-request" element={<DiscountApprovalRequest />} />
          <Route path="/billingdiscountapproval/discount-approval-review" element={<DiscountApprovalReviewFormCom />} />
          <Route path="/billingdiscountapproval/discount-history" element={<DiscountHistory />} />
          <Route path="/billingdiscountapproval/patient-billing-summary" element={<PatientBillingSummary />} />


          <Route path="/homePage" element={<HomePage />} />
          <Route path="/messagebroadcast" element={<BroadcastPage />} />
          <Route path="/messagebroadcast/add" element={<AddMessagePageHIMS />} />
          <Route path="/messagebroadcast/send" element={<SendMessageHistory />} />

          <Route path="/facilityservices" element={<FacilityService />} />

          <Route path="/administration" element={<Administration />} />

          <Route path="/vendorandsupplymanagement/*" element={<VendorNavba />} />
          <Route path="/vendorandsupplymanagement/purchase-order-acknowlegement" element={<PurchaseOrderAcknowledgmentFormCom />} />
          <Route path="/vendorandsupplymanagement/purchase-order" element={<PurchaseOrderFormCom />} />
          <Route path="/vendorandsupplymanagement/QuotationForm" element={<SupplyDeliveryFormCom />} />
          <Route path="/vendorandsupplymanagement/invoice" element={<InvoiceFormCom />} />
          <Route path="/vendorandsupplymanagement/InvoiceListItems" element={<PrintReport />} />
          <Route path="/vendorandsupplymanagement/report" element={<ReportGenerationFormCom />} />

          <Route path="/controlalldepartment" element={<ControlAllDeptRoute />} />
          <Route path="/controlalldepartment/department" element={<Department />} />
          <Route path="/controlalldepartment/inventory" element={<Inventory />} />
          <Route path="/send-query" element={<QueryPage />} />

          <Route path="/send-inventory-query" element={<QueryPageInventory />} />
        </Routes>
      </div>
    </>
  )
}

export default SuperUserMain
