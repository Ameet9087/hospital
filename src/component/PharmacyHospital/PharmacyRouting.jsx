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
      <Route path="/order/purchase-order" element={<PurchaseOrder />} />
      <Route path="/order/good-receipt" element={<GoodReceiptComponent />} />
      <Route path="/supplierledger" element={<SupplierLedgerComponent />} />
      <Route path="/report/purchase" element={<PurchaseComponent />} />
      <Route path="/report/sales" element={<Sales />} />
      <Route path="/report/stock" element={<Stock />} />
      <Route path="/report/supplier" element={<Supplier />} />
      <Route path="/supplier" element={<SupplierHeaderCom />} />
      <Route path="/substorerequest" element={<SubstoreDispatchCom />} />
      <Route path="/setting/setting-supplier" element={<SettingSupplierComponent />} />
      <Route path="/setting/setting-company" element={<SettingCompany />} />
      <Route path="/setting/setting-category" element={<SettingCategory />} />
      <Route path="/setting/setting-uom" element={<SettingUOM />} />
      <Route path="/setting/setting-item-type" element={<SettingItemType />} />
      <Route path="/setting/setting-item-component" element={<SettingItemComponent />} />
      <Route path="/setting/setting-tax" element={<SettingTax />} />
      <Route path="/setting/setting-generic" element={<SettingGeneric />} />
      <Route path="/setting/setting-dispensary" element={<SettingDispensary />} />
      <Route path="/setting/setting-rack" element={<SettingRack />} />
      <Route path="/setting/setting-invoice-headers" element={<SettingInvoiceHeaders />} />
      <Route path="/setting/setting-terms" element={<SettingTerm />} />
      <Route path="/store/breakage-item" element={<StoreBreakageItem />} />
      <Route path="/store/return-to-supplier" element={<ReturnToSupplier />} />
      <Route path="/store/return-to-supplier-list" element={<ReturnToSupplierList />} />
      <Route path="/store/store-details-list" element={<StoreDetailsListCom />} />
      <Route path="/report/purchase/item-wise-purchase-report-com" element={<ItemWisePurchaseReportCom />} />
      <Route path="/report/purchase/purchase-summary-report" element={<PurchaseSummaryReport />} />
      <Route path="/report/supplier/supplier-information" element={<SupplierInformationCom />} />
      <Route path="/report/sales/invoice-billing" element={<InvoiceBilling />} />
      <Route path="/report/sales/item-wise-sales" element={<ItemWiseSalesReport />} />
      <Route path="/report/sales/user-collection" element={<UserCollectionReport />} />
      <Route path="/report/sales/narcotics-sales" element={<NarcoticsSalesReportCom />} />
      <Route path="/report/sales/rank-memebership-wise-sales" element={<RankMembershipwiseReport />} />
      <Route path="/report/sales/sales-statement" element={<SalesStatementReport />} />
      <Route path="/report/sales/insurance-patients" element={<InsurancePatientReport />} />
      <Route path="/report/sales/sales-summary" element={<SalesSummaryReport />} />
      <Route path="/report/sales/patient-wise-sales-details" element={<PatientSalesReport />} />
      <Route path="/report/sales/settlement-summary" element={<SettlementSummaryReport />} />
      <Route path="/report/sales/return-on-investment" element={<ReturnInvestment />} />
      <Route path="/report/sales/pharmacy-payment-mode-wise" element={<PharmacyPaymentReport />} />
      <Route path="/report/purchase/supplier-wise-purchase-report" element={<SupplierWisePurchaseReportCom />} />
      <Route path="/report/stock/narcotics-stock-report" element={<NarcoticsStockReport />} />
      <Route path="/report/stock/dispensary-story-stock" element={<DispensaryStoreStockReport />} />
      <Route path="/report/stock/expiry-report" element={<PharmacyExpiryReport />} />
      <Route path="/report/stock/stock-summary-report" element={<StockSummaryReport />} />
      <Route path="/report/stock/return-from-customer-report" element={<ReturnFromCustomer />} />
      <Route path="/report/stock/supplier-wise-stock-report" element={<SupplierWiseStockReport />} />
      <Route path="/report/stock/opening-stock-valuation" element={<OpeningStockValuationReport />} />
      <Route path="/report/stock/stock-transfers" element={<StockTrasferReport />} />
      <Route path="/report/stock/item-wise-ward-supply" element={<ItemWisePurchaseReport />} />
      <Route path="/report/stock/stock-transfer-summary" element={<StockTransferSummary />} />
      <Route path="/report/purchase/purchase-order-report" element={<PurchaseOrderReport/>}/>
      <Route path="/report/purchase/return-to-suppliers" element={<ReturnToSuppliers/>}/>
      {/* Add other routes here */}

      <Route path="/rank-membership-wise-sales" element={<RankMembershipwiseReport/>}/>

    </Routes>
    </>
  );
};

export default PharmacyRouting;