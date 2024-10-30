import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DispensaryNavBar from '../DispensaryPage/dispensaryNav';

import DisPrescription from '../DispensaryPage/DisPrescriptionMain/disPrescription';
import DispenSales from '../DispensaryPage/DisSales/dispenSales';
import SalesStockDetails from '../DispensaryPage/DisStocks/dispenSalesStockDetails';
import DispenTransfer from '../DispensaryPage/DisStocks/dispenTransfer';
import DispenCouter from '../DispensaryPage/DisCounter/dispenCounter';
import DispenReportList from '../DispensaryPage/DisReport/dispenReports';
import DispenPatientConsump from '../DispensaryPage/DisPatient/dispenPatientConsump';
import DispenPatientConsumption from '../DispensaryPage/DisPatientConsumption/dispenPatientConsumption';
import UserCollectionReport from './DisReport/userCollectionReport';
import DrNarcoticsDailySales from './DisReport/drNarcoticsDailySales';
import DrDailySalesReport from './DisReport/drDailySalesReport';
import DrSettlementSummaryReport from './DisReport/drSettlementSummaryReport';
import DrPaymentModeWiseReport from './DisReport/drPaymentModeWiseReport';
import DrStockSummaryReport from './DisReport/drStockSummaryReport';

function Disprensary() {
  return (
    <>
      <DispensaryNavBar />
      <div className="dispensary-content">
        <Routes>
          <Route path="disPrescription" element={<DisPrescription />} />
          <Route path="dispenSales" element={<DispenSales />} />
          <Route path="salesStockDetails" element={<SalesStockDetails />} />
          <Route path="dispenTransfer" element={<DispenTransfer />} />
          <Route path="dispenCouter" element={<DispenCouter />} />
          <Route path="dispenReportList" element={<DispenReportList />} />
          <Route path="dispenPatientConsump" element={<DispenPatientConsump />} />
          <Route path="dispenPatientConsumption" element={<DispenPatientConsumption />} />
          <Route path="user-collection-report" element={<UserCollectionReport />} />
          <Route path="dr-Narcotics-Daily-Sales" element={<DrNarcoticsDailySales />} />
          <Route path="dr-Daily-Sales-Report" element={<DrDailySalesReport />} />
          <Route path="dr-SettlementSummary-Report" element={<DrSettlementSummaryReport />} />
          <Route path="dr-PaymentModeWise-Report" element={<DrPaymentModeWiseReport />} />
          <Route path="dr-StockSummary-Report" element={<DrStockSummaryReport />} />
        </Routes>
      </div>
    </>
  );
}

export default Disprensary;
