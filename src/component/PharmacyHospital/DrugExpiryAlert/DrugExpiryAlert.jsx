/* Mohini_DrugExpiryAlert_WholePage_8/10/24 */
import React, { useEffect, useState, useRef } from 'react';
import './DrugExpiryAlert.css'; // Import your CSS file
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const DrugExpiryAlert = () => {
    const [items, setItems] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [showTable, setShowTable] = useState(false); // New state for table display
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                { id: 1, name: 'Aspirin', quantity: 50, expiry_date: '2024-10-16', alert_threshold: 5 }, // Adjusted expiry date
                { id: 2, name: 'Amoxicillin', quantity: 30, expiry_date: '2024-10-17', alert_threshold: 2 },
                { id: 3, name: 'Ibuprofen', quantity: 100, expiry_date: '2024-10-18', alert_threshold: 3 },
                { id: 4, name: 'Cetirizine', quantity: 20, expiry_date: '2024-11-19', alert_threshold: 10 },
                { id: 5, name: 'Metformin', quantity: 25, expiry_date: '2024-10-20', alert_threshold: 7 },
            ];
            setItems(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const expiredItems = items.filter(item => item.expiry_date === today);
        setAlerts(expiredItems);

        // Show custom notification popup
        if (expiredItems.length > 0) {
            setShowNotification(true);

            // Hide the notification after 5 seconds (if desired)
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }
    }, [items]);

    const handleAlertClick = () => {
        setShowTable(true); // Show the table when the alert message is clicked
        setShowNotification(false); // Optionally hide the alert after the click
    };

    return (
        <div className="drug-expiry-alert-container">
            <h1>Medicine Inventory</h1>

            {showNotification && (
                <div className="alert-whatsapp-popup" onClick={handleAlertClick}>
                    {alerts.length} medicines have expired today! Click here to view.
                </div>
            )}

            {showTable && ( // Conditionally render the table based on showTable state
                <div className="table-container">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[
                                    "ID",
                                    "Name",
                                    "Quantity",
                                    "Expiry Date",
                                    "Alert Threshold (Days)",
                                    "Expired"  // New column for "Expired"
                                ].map((header, index) => (
                                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                                        <div className="header-content">
                                            <span>{header}</span>
                                            <div
                                                className="resizer"
                                                onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                            ></div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {items.map(item => {
                                const isExpired = new Date(item.expiry_date) < new Date(); 
                                return (
                                    <tr key={item.id}>
                                        <td className="drug-expiry-alert-td">{item.id}</td>
                                        <td className="drug-expiry-alert-td">{item.name}</td>
                                        <td className="drug-expiry-alert-td">{item.quantity}</td>
                                        <td className="drug-expiry-alert-td">{item.expiry_date}</td>
                                        <td className="drug-expiry-alert-td">{item.alert_threshold}</td>
                                        <td className="drug-expiry-alert-td">
                                            {isExpired ? (
                                                <button className="expired-button">Expired</button>
                                            ) : (
                                                <span>Valid</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DrugExpiryAlert;
/* Mohini_DrugExpiryAlert_WholePage_8/10/24 */