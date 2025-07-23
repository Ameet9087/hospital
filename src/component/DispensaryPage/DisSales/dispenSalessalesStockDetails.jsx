// import React from 'react';
// import "../DisSales/dispenSalessalesStockDetails.css";

// const DispenSalessalesStockDetails = () => {
//     return (
//         <div className="dispenSalessalesStockDetails-container">
//             <div className="dispenSalessalesStockDetails-header">
//                 <input type="text" placeholder="Search" className="dispenSalessalesStockDetails-search-bar" />
//                 <div className="dispenSalessalesStockDetails-filter-container">
//                     <label>Filter by Store:</label>
//                     <select className="dispenSalessalesStockDetails-store-filter">
//                         <option>Main Dispensary</option>
//                         <option>Main Store </option>
//                         <option>All</option>
//                     </select>
//                     <label className="dispenSalessalesStockDetails-checkbox-label">
//                         <input type="checkbox" /> Show Zero Quantity
//                     </label>
//                 </div>
//                 <div className="dispenSalessalesStockDetails-header-right">
//                     <span>Showing 543 / 543 results</span>
//                     <button className="dispenSalessalesStockDetails-print-btn">Print</button>
//                     <button className="dispenSalessalesStockDetails-close-popup-btn">X</button>
//                 </div>
//             </div>
//             <table className="dispenSalessalesStockDetails-table">
//                 <thead>
//                     <tr>
//                         <th>Medicine Name</th>
//                         <th>Generic Name</th>
//                         <th>Rack No</th>
//                         <th>Batch No</th>
//                         <th>Expiry Date</th>
//                         <th>Available</th>
//                         <th>Sale Price</th>
//                         <th>Store Name</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* Example rows */}
//                     <tr>
//                         <td>.OSMOLAX</td>
//                         <td>.OSMOLAX</td>
//                         <td>bat278</td>
//                         <td>bat278</td>
//                         <td>2025-09-05</td>
//                         <td>10037</td>
//                         <td>700</td>
//                         <td>Main Dispensary</td>
//                     </tr>
//                     {/* Add more rows as needed */}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default DispenSalessalesStockDetails;

import React, { useEffect, useState } from 'react';
import "../DisSales/dispenSalessalesStockDetails.css";

const DispenSalessalesStockDetails = () => {
    // State to hold the fetched medicine stock details
    const [medicineStocks, setMedicineStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchMedicineStockDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/hospital/fetch-fetch-medicine-details`);
                if (!response.ok) {
                    throw new Error("Failed to fetch medicine stock details.");
                }
                const data = await response.json();
                setMedicineStocks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicineStockDetails();
    }, []);

    return (
        <div className="dispenSalessalesStockDetails-container">
            <div className="dispenSalessalesStockDetails-header">
                <input type="text" placeholder="Search" className="dispenSalessalesStockDetails-search-bar" />
                <div className="dispenSalessalesStockDetails-filter-container">
                    <label>Filter by Store:</label>
                    <select className="dispenSalessalesStockDetails-store-filter">
                        <option>Main Dispensary</option>
                        <option>Main Store</option>
                        <option>All</option>
                    </select>
                    <label className="dispenSalessalesStockDetails-checkbox-label">
                        <input type="checkbox" /> Show Zero Quantity
                    </label>
                </div>
                <div className="dispenSalessalesStockDetails-header-right">
                    <span>Showing {medicineStocks.length} results</span>
                    <button className="dispenSalessalesStockDetails-print-btn">Print</button>
                    <button className="dispenSalessalesStockDetails-close-popup-btn">X</button>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="dispenSalessalesStockDetails-table">
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Generic Name</th>
                            <th>Rack No</th>
                            <th>Batch No</th>
                            <th>Expiry Date</th>
                            <th>Available</th>
                            <th>Sale Price</th>
                            <th>Store Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicineStocks.map((stock) => (
                            <tr key={stock.medicineId}>
                                <td>{stock.medicineName}</td>
                                <td>{stock.genericName}</td>
                                <td>{stock.rackNumber}</td>
                                <td>{stock.batchNumber}</td>
                                <td>{stock.expiryDate}</td>
                                <td>{stock.availableQty}</td>
                                <td>{stock.salePrice}</td>
                                <td>{stock.storeName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DispenSalessalesStockDetails;
