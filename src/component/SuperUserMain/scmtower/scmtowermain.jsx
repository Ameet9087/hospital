import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SCMControlTower from './scmtower';
import GMPage from './ContentPages/gmPage';
import CaptureConsumptionValuePage from './ContentPages/captureConsumptionValuePage';
import TotalStockValueTable from './ContentPages/TotalStockValueTable';
import MarginSaleDashboard from './ContentPages/marginonsale';
import TotalSaleDisplay from './ContentPages/totalsaledisplay';
import CurrentInventoryDisplay from './ContentPages/currentinventorydisplay';
import LowStockListDisplay from './ContentPages/lowstockitemlist';
import StockTurnoverRate from './ContentPages/stockturnoverrate';
import StockOnOrderTable from './ContentPages/stockonorder';
import SupplierRatingTable from './ContentPages/spplierrating';
import LateStockListDisplay from './ContentPages/lowstockitemlist';
import LeadTimeSCM from './ContentPages/leadtimescm';
import ExpiredContractsSCM from './ContentPages/expiredContracts';
import PendingOrdersSCM from './ContentPages/pendingorders';
import OrderAccuracySCM from './ContentPages/orderaccuracy';
import OrderLeadTimeSCM from './ContentPages/orderleadtime';
import BackOrderSCM from './ContentPages/backorder';
import InTransitSCM from './ContentPages/intransistshipment';
import TransportationCosts from './ContentPages/transportationcost';
import RouteOptimization from './ContentPages/routeoptimization';
import CogsDisplay from './ContentPages/cogsDisplay';
import OverheadCostsTable from './ContentPages/overheadcosttable';
import ShippingCostsTable from './ContentPages/shippingcosts';
import CostVarianceTable from './ContentPages/costvarience';
function Scmtowermain() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<SCMControlTower />} />
        <Route path="/gm" element={<GMPage />} />
        <Route path='/captureconsumptionvalupage' element={<CaptureConsumptionValuePage />}></Route>
        <Route path='/totalStockValueTable' element={<TotalStockValueTable />}>  </Route>
        <Route path='/marginSaleDashboard' element={<MarginSaleDashboard />}></Route>
        <Route path='/totalSaleDisplay' element={<TotalSaleDisplay />}></Route>
        <Route path='/currentInventoryDisplay' element={<CurrentInventoryDisplay />}> </Route>
        <Route path='/lowStockListDisplay' element={<LowStockListDisplay />}></Route>
        <Route path='/stockTurnoverRate' element={<StockTurnoverRate />}></Route>
        <Route path='/stockOnOrderTable' element={<StockOnOrderTable />}></Route>
        <Route path='/supplierRatingTable' element={<SupplierRatingTable />}></Route>
        <Route path='/lateStockListDisplay' element={<LateStockListDisplay />}></Route>
        <Route path='/leadTimeSCM' element={<LeadTimeSCM />}></Route>
        <Route path='/expiredContractsSCM' element={<ExpiredContractsSCM />}></Route>
        <Route path='/pendingOrdersSCM' element={<PendingOrdersSCM />}></Route>
        <Route path='/orderAccuracySCM' element={<OrderAccuracySCM />}></Route>
        <Route path='/orderLeadTimeSCM' element={<OrderLeadTimeSCM />}></Route>
        <Route path='/backOrderSCM' element={<BackOrderSCM />}></Route>
        <Route path='/inTransitSCM' element={<InTransitSCM />}></Route>
        <Route path='/transportationCosts' element={<TransportationCosts />}></Route>
        <Route path='/routeOptimization' element={<RouteOptimization />}></Route>
        <Route path='/cogsDisplay' element={<CogsDisplay />}></Route>
        <Route path='/overheadCostsTable' element={<OverheadCostsTable />}></Route>
        <Route path='/shippingCostsTable' element={<ShippingCostsTable />}></Route>
        <Route path='/costVarianceTable' element={<CostVarianceTable />}></Route>

      </Routes>




    </div>
  )
}

export default Scmtowermain