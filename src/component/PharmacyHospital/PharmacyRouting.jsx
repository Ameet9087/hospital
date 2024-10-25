// src/RoutesConfig.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import PharmacyComponent from "../PharmacyHospital/PharmacyCom";
import PurchaseOrder from "../PharmacyHospital/PurchaseOrder";
import GoodReceiptComponent from "../PharmacyHospital/GoodReceiptCom";
import SupplierLedgerComponent from "../PharmacyHospital/SupplierLedgerComponent";
import PurchaseComponent from "../PharmacyHospital/PurchaseComponent";
import Sales from "../PharmacyHospital/Sales";
import Stock from "../PharmacyHospital/Stock";
import Supplier from "../PharmacyHospital/Supplier";
import SupplierHeaderCom from "../PharmacyHospital/SupplierHeaderCom";
import SubstoreDispatchCom from "../PharmacyHospital/SubstoreDispatchCom";
import SettingSupplierComponent from "../PharmacyHospital/SettingSupplier";
import SettingCompany from "../PharmacyHospital/SettingCompany";
import SettingCategory from "../PharmacyHospital/SettingCategory";
import SettingUOM from "../PharmacyHospital/SettingUOM";
import SettingItemType from "../PharmacyHospital/SettingItemType";
import SettingItemComponent from "../PharmacyHospital/SettingItemComponent";
import SettingTax from "../PharmacyHospital/SettingTax";
import SettingGeneric from "../PharmacyHospital/SettingGeneric";
import SettingDispensary from "../PharmacyHospital/SettingDispensary";
import SettingRack from "../PharmacyHospital/SettingRack";
import SettingInvoiceHeaders from "../PharmacyHospital/SettingInvoiceHeaders";
import SettingTerm from "../PharmacyHospital/SettingTerms";
import StoreBreakageItem from "../PharmacyHospital/StoreBreakageItem";
import ReturnToSupplier from "../PharmacyHospital/ReturnToSupplier";
import ReturnToSupplierList from "../PharmacyHospital/ReturnToSupplierList";
import StoreDetailsListCom from "../PharmacyHospital/StoreDetailsListCom";
import ItemWisePurchaseReportCom from "../PharmacyHospital/Report/ItemWisePurchaseReport";
import PurchaseSummaryReport from "../PharmacyHospital/Report/PurchaseSummaryReport";
import SupplierInformationCom from "../PharmacyHospital/Supplier/SupplierInformation";
import InvoiceBilling from "../PharmacyHospital/Sales/InvoiceBilling";
import ItemWiseSalesReport from "../PharmacyHospital/Sales/ItemWiseSalesReport";
import UserCollectionReport from "../PharmacyHospital/Sales/UserCollectionReport";
import NarcoticsSalesReportCom from "../PharmacyHospital/Sales/NarcoticsSalesReport";
import RankMembershipwiseReport from "../PharmacyHospital/Sales/RankMembershipwiseReport";
import SalesStatementReport from "../PharmacyHospital/Sales/SalesStatementReport";
import InsurancePatientReport from "../PharmacyHospital/Sales/InsurancePatientReport";
import SalesSummaryReport from "../PharmacyHospital/Sales/SalesSummaryReport";
import PatientSalesReport from "../PharmacyHospital/Sales/PatientSalesReport";
import SettlementSummaryReport from "../PharmacyHospital/Sales/SettlementSummaryReport";
import ReturnInvestment from "../PharmacyHospital/Sales/ReturnInvestment";
import PharmacyPaymentReport from "../PharmacyHospital/Sales/PharmacyPaymentReport";
import SupplierWisePurchaseReportCom from "../PharmacyHospital/Report/SupplierWisePurchaseReport";
import NarcoticsStockReport from "../PharmacyHospital/Stock/NarcoticsStockReport";
import DispensaryStoreStockReport from "../PharmacyHospital/Stock/DispensaryStoreStockReport";
import PharmacyExpiryReport from "../PharmacyHospital/Stock/PharmacyExpiryReport";
import StockSummaryReport from "../PharmacyHospital/Stock/StockSummaryReport";
import ReturnFromCustomer from "../PharmacyHospital/Stock/ReturnFromCustomer";
import SupplierWiseStockReport from "../PharmacyHospital/Stock/SupplierWiseStockReport";
import OpeningStockValuationReport from "../PharmacyHospital/Stock/OpeningStockValuationReport";
import StockTrasferReport from "../PharmacyHospital/Stock/StockTrasferReport";
import ItemWisePurchaseReport from "../PharmacyHospital/Stock/ItemWisePurchaseReport";
import StockTransferSummary from "../PharmacyHospital/Stock/StockTransferSummary";
import HospitalHeader from "./HospitalHeader";
import PurchaseOrderReport from "./Report/PurchaseOrderReport";
import ReturnToSuppliers from "./Report/ReturnToSupplier";

const PharmacyRouting = () => {
  return (
      <>
      <HospitalHeader/>
    <Routes>
      <Route path="/" element={<PharmacyComponent />} />
      <Route path="/purchase-order" element={<PurchaseOrder />} />
      <Route path="/good-receipt" element={<GoodReceiptComponent />} />
      <Route path="/SupplierLedgerComponent" element={<SupplierLedgerComponent />} />
      <Route path="/purchase" element={<PurchaseComponent />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/supplier" element={<Supplier />} />
      <Route path="/SupplierHeaderCom" element={<SupplierHeaderCom />} />
      <Route path="/SubstoreDispatchCom" element={<SubstoreDispatchCom />} />
      <Route path="/setting-supplier" element={<SettingSupplierComponent />} />
      <Route path="/setting-company" element={<SettingCompany />} />
      <Route path="/setting-category" element={<SettingCategory />} />
      <Route path="/setting-uom" element={<SettingUOM />} />
      <Route path="/setting-item-type" element={<SettingItemType />} />
      <Route path="/setting-item-component" element={<SettingItemComponent />} />
      <Route path="/setting-tax" element={<SettingTax />} />
      <Route path="/setting-generic" element={<SettingGeneric />} />
      <Route path="/setting-dispensary" element={<SettingDispensary />} />
      <Route path="/setting-rack" element={<SettingRack />} />
      <Route path="/setting-invoice-headers" element={<SettingInvoiceHeaders />} />
      <Route path="/setting-terms" element={<SettingTerm />} />
      <Route path="/breakage-item" element={<StoreBreakageItem />} />
      <Route path="/return-to-supplier" element={<ReturnToSupplier />} />
      <Route path="/return-to-supplier-list" element={<ReturnToSupplierList />} />
      <Route path="/store-details-list" element={<StoreDetailsListCom />} />
      <Route path="/item-wise-purchase-report-com" element={<ItemWisePurchaseReportCom />} />
      <Route path="/purchase-summary-report" element={<PurchaseSummaryReport />} />
      <Route path="/supplier-information" element={<SupplierInformationCom />} />
      <Route path="/invoice-billing" element={<InvoiceBilling />} />
      <Route path="/item-wise-sales" element={<ItemWiseSalesReport />} />
      <Route path="/user-collection" element={<UserCollectionReport />} />
      <Route path="/narcotics-sales" element={<NarcoticsSalesReportCom />} />
      <Route path="/rank-memebership-wise-sales" element={<RankMembershipwiseReport />} />
      <Route path="/sales-statement" element={<SalesStatementReport />} />
      <Route path="/insurance-patients" element={<InsurancePatientReport />} />
      <Route path="/sales-summary" element={<SalesSummaryReport />} />
      <Route path="/patient-wise-sales-details" element={<PatientSalesReport />} />
      <Route path="/settlement-summary" element={<SettlementSummaryReport />} />
      <Route path="/return-on-investment" element={<ReturnInvestment />} />
      <Route path="/pharmacy-payment-mode-wise" element={<PharmacyPaymentReport />} />
      <Route path="/supplier-wise-purchase-report" element={<SupplierWisePurchaseReportCom />} />
      <Route path="/narcotics-stock-report" element={<NarcoticsStockReport />} />
      <Route path="/dispensary-story-stock" element={<DispensaryStoreStockReport />} />
      <Route path="/expiry-report" element={<PharmacyExpiryReport />} />
      <Route path="/stock-summary-report" element={<StockSummaryReport />} />
      <Route path="/return-from-customer-report" element={<ReturnFromCustomer />} />
      <Route path="/supplier-wise-stock-report" element={<SupplierWiseStockReport />} />
      <Route path="/opening-stock-valuation" element={<OpeningStockValuationReport />} />
      <Route path="/stock-transfers" element={<StockTrasferReport />} />
      <Route path="/item-wise-ward-supply" element={<ItemWisePurchaseReport />} />
      <Route path="/stock-transfer-summary" element={<StockTransferSummary />} />
      <Route path="/purchase-order-report" element={<PurchaseOrderReport/>}/>
      {/* <Route path="/return-to-suppliers" element={<ReturnToSuppliers/>}/> */}
      {/* Add other routes here */}

      <Route path="/rank-membership-wise-sales" element={<RankMembershipwiseReport/>}/>

    </Routes>
    </>
  );
};

export default PharmacyRouting;