// Neha scm tower 03/10/24
import React, { useState, useEffect } from 'react';
import './SCMControlTower.css';
import { useNavigate } from 'react-router-dom';


const SCMControlTower = () => {

  const navigate = useNavigate(); // Hook for navigation

  const handleGMClick = () => {
    navigate('/superuser/tower/gm'); // Navigate to GM page
  };
  const handleConsumptionClick = () => {
    navigate('/superuser/tower/captureconsumptionvalupage');
  }
  const handleTotalStockValueTableClick = () => {
    navigate('/superuser/tower/totalStockValueTable');
  }
  const handleMarginSaleAccordionClick = () => {
    navigate('/superuser/tower/marginSaleDashboard');
  }
  const handleTotalSaleDisplayClick = () => {
    navigate('/superuser/tower/totalSaleDisplay');
  }
  const handleCurrentInventoryDisplayClick = () => {
    navigate('/superuser/tower/currentInventoryDisplay');
  }
  const handleLowStockListDisplayClick = () => {
    navigate('/superuser/tower/lowStockListDisplay');
  }

  const handleStockTurnoverRateClick = () => {
    navigate('/superuser/tower/stockTurnoverRate');
  }
  const handleStockOnOrderTableClick = () => {
    navigate('/superuser/tower/stockOnOrderTable');
  }
  const handleSupplierRatingTableClick = () => {
    navigate('/superuser/tower/supplierRatingTable');
  }
  const handleLateStockListDisplayClick = () => {
    navigate('/superuser/tower/lateStockListDisplay');
  }
  const handleLeadTimeSCMClick = () => {
    navigate('/superuser/tower/leadTimeSCM'); s
  }
  const handleExpiredContractsSCM = () => {
    navigate('/superuser/tower/expiredContractsSCM');
  }
  const handlePendingOrdersSCMClick = () => {
    navigate('/superuser/tower/pendingOrdersSCM');
  }
  const handleOrderAccuracySCMClick = () => {
    navigate('/superuser/tower/orderAccuracySCM');
  }
  const handleOrderLeadTimeSCMClick = () => {
    navigate('/superuser/tower/orderLeadTimeSCM');
  }
  const handleBackOrderSCMClick = () => {
    navigate('/superuser/tower/backOrderSCM');
  }
  const handleInTransitSCMClick = () => {
    navigate('/superuser/tower/inTransitSCM');
  }
  const handleTransportationCostsCLick = () => {
    navigate('/superuser/tower/transportationCosts');
  }
  const handleRouteOptimizationClick = () => {
    navigate('/superuser/tower/routeOptimization');
  }
  const handleCogsDisplayClick = () => {
    navigate('/superuser/tower/cogsDisplay');
  }
  const handleOverheadCostsTableClick = () => {
    navigate('/superuser/tower/overheadCostsTable');
  }
  const handleShippingCostsTableClik = () => {
    navigate('/superuser/tower/shippingCostsTable');
  }
  const handleCostVarianceTableClick = () => {
    navigate('/superuser/tower/costVarianceTable');
  }
  const [inventory, setInventory] = useState({
    currentInventory: 150,
    lowStockItems: 10,
    stockTurnover: 5,
    stockOnOrder: 20,
  });

  const [supplierPerformance, setSupplierPerformance] = useState({
    vendorRatings: 4.5,
    lateDeliveries: 4,
    leadTime: '7 days',
    expiredContracts: 1,
  });

  const [orderFulfillment, setOrderFulfillment] = useState({
    pendingOrders: 12,
    orderAccuracy: 95,
    orderLeadTime: '3 days',
    backorders: 4,
  });

  const [costManagement, setCostManagement] = useState({
    cogs: 50000,
    overheadCosts: 8000,
    shippingCosts: 1200,
    variance: 2,
  });

  const [logistics, setLogistics] = useState({
    inTransitShipments: 6,
    transportationCosts: 700,
    routeOptimization: 'Optimized',
  });



  // Fetch data from API or use dummy data for the module.
  useEffect(() => {
    // Fetch inventory, supplier performance, order fulfillment, etc.
    // setInventory(...); // Example
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  return (
    <div className="scm-dashboard-container">
      <h1 className="scm-dashboard-title">SCM Control Tower</h1>

      <div className="scm-flex">
        {/* General Metrics */}
        <div className="scm-card scm-gm" style={{ backgroundColor: "#26dae9" }} onClick={handleGMClick}>
          <h2>GM</h2>
          <h2>13.99</h2>
        </div>
        <div className="scm-card scm-consumption" style={{ backgroundColor: "#f54842" }} onClick={handleConsumptionClick}>
          <h2>Capture Consumption Value</h2>
          <h2>3.84</h2>
        </div>
        <div className="scm-card scm-stock" style={{ backgroundColor: "#f57b42" }} onClick={handleTotalStockValueTableClick}>
          <h2>Total Stock Value</h2>
          <h2>73.08</h2>
        </div>
        <div className="scm-card scm-margin" style={{ backgroundColor: "#f5c242" }} onClick={handleMarginSaleAccordionClick}>
          <h2>Margin on Sale</h2>
          <h2>4.07</h2>
        </div>
        <div className="scm-card scm-sales" style={{ backgroundColor: "#d1f542" }} onClick={handleTotalSaleDisplayClick}>
          <h2>Total Sales</h2>
          <h2>16</h2>
        </div>

        {/* Inventory Section */}
        <div className="scm-card" style={{ backgroundColor: "#42f5ad" }} onClick={handleCurrentInventoryDisplayClick}>
          <h2>Current Inventory Levels</h2>
          <h2>{inventory.currentInventory}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#42f5cb" }} onClick={handleLowStockListDisplayClick}>
          <h2>Low Stock Items</h2>
          <h2>{inventory.lowStockItems}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#42f5ec" }} onClick={handleStockTurnoverRateClick}>
          <h2>Stock Turnover Rate</h2>
          <h2>{inventory.stockTurnover}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#42ecf5" }} onClick={handleStockOnOrderTableClick}>
          <h2>Stock on Order</h2>
          <h2>{inventory.stockOnOrder}</h2>
        </div>

        {/* Supplier Performance Section */}
        <div className="scm-card" style={{ backgroundColor: "#42cbf5" }} onClick={handleSupplierRatingTableClick}>
          <h2>Supplier Rating</h2>
          <h2>{supplierPerformance.vendorRatings} / 5</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#edd0f5" }} onClick={handleLateStockListDisplayClick}>
          <h2>Late Deliveries</h2>
          <h2>{supplierPerformance.lateDeliveries}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#f4d0f5" }} onClick={handleLeadTimeSCMClick}>
          <h2>Lead Time</h2>
          <h2>{supplierPerformance.leadTime}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#f5d0e2" }} onClick={handleExpiredContractsSCM}>
          <h2>Expired Contracts</h2>
          <h2>{supplierPerformance.expiredContracts}</h2>
        </div>

        {/* Order Fulfillment Section */}
        <div className="scm-card" style={{ backgroundColor: "#f5b5d5" }} onClick={handlePendingOrdersSCMClick}>
          <h2>Pending Orders</h2>
          <h2>{orderFulfillment.pendingOrders}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#f5b5c5" }} onClick={handleOrderAccuracySCMClick}>
          <h2>Order Accuracy</h2>
          <h2>{orderFulfillment.orderAccuracy}%</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#e3bfc8" }} onClick={handleOrderLeadTimeSCMClick}>
          <h2>Order Lead Time</h2>
          <h2>{orderFulfillment.orderLeadTime}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#d694bc" }} onClick={handleBackOrderSCMClick}>
          <h2>Backorders</h2>
          <h2>{orderFulfillment.backorders}</h2>
        </div>

        {/* Logistics and Transportation */}
        <div className="scm-card" style={{ backgroundColor: "#c977b2" }} onClick={handleInTransitSCMClick}>
          <h2>In-Transit Shipments</h2>
          <h2>{logistics.inTransitShipments}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#f5e1e3" }} onClick={handleTransportationCostsCLick}>
          <h2>Transportation Costs</h2>
          <h2>{logistics.transportationCosts}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#e69196" }} onClick={handleRouteOptimizationClick}>
          <h2>Route Optimization</h2>
          <h2>{logistics.routeOptimization}</h2>
        </div>

        {/* Cost Management */}
        <div className="scm-card" style={{ backgroundColor: "#e6c991" }} onClick={handleCogsDisplayClick}>
          <h2>COGS</h2>
          <h2>{costManagement.cogs}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#e4e691" }} onClick={handleOverheadCostsTableClick}>
          <h2>Overhead Costs</h2>
          <h2>{costManagement.overheadCosts}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#e6c191" }} onClick={handleShippingCostsTableClik}>
          <h2>Shipping Costs</h2>
          <h2>{costManagement.shippingCosts}</h2>
        </div>
        <div className="scm-card" style={{ backgroundColor: "#e6ab91" }} onClick={handleCostVarianceTableClick}>
          <h2>Cost Variance</h2>
          <h2>{costManagement.variance}%</h2>
        </div>
      </div>

      {/* Additional tables and warnings */}
      {/* <div className="scm-alert-section">
        <div className="scm-alert-row">
          <h3>Non-Moving Stock in Days</h3>
          <div className="scm-progress-bar red">Above 360</div>
          <div className="scm-progress-bar orange">180 to 360</div>
          <div className="scm-progress-bar green">30 to 180</div>
        </div>
        
        <div className="scm-alert-row">
          <h3>Near Expiry & Expired List</h3>
          <div className="scm-progress-bar red">Expired</div>
          <div className="scm-progress-bar green">30 to 60 Days</div>
        </div>
      </div> */}


    </div>
  );
};

export default SCMControlTower;
