import React, { useEffect, useState, useRef } from 'react';
import './DrugExpiryAlert.css'; // Import your CSS file
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const DrugExpiryAlert = () => {
    const [items, setItems] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [showTable, setShowTable] = useState(false); // New state for table display
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/drugs/getDrugs`);
                const data = await response.json();
                // Map the data to your desired structure
                const formattedData = data.map(drug => ({
                    id: drug.drugsId,
                    code: drug.drugCode,
                    name: drug.drugName,
                    quantity: drug.quantity || 0, // Add logic for quantity if needed
                    expiry_date: drug.expiryDate,
                    purchaseDate: drug.purchaseDate,

                    alert_threshold: drug.alertThreshold || 30 // Add logic for alert threshold if needed
                }));
                setItems(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {

        const today = new Date(); // Get the current date
        const thirtyDaysAgo = new Date(today); // Create a new Date object based on today
        thirtyDaysAgo.setDate(today.getDate() - 30); // Subtract 30 days

        const todayISO = today.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const thirtyDaysAgoISO = thirtyDaysAgo.toISOString().split('T')[0]; // Get date 30 days ago in YYYY-MM-DD format

        // Filter expired items and items expiring within the last 30 days
        const expiredItems = items.filter(item => item.expiry_date <= todayISO);
        const nearExpiryItems = items.filter(item => item.expiry_date <= todayISO && item.expiry_date >= thirtyDaysAgoISO);

        setAlerts(expiredItems);
        setAlerts(nearExpiryItems);



        setAlerts(expiredItems);

        // Show custom notification popup
        if (expiredItems.length > 0) {
            setShowNotification(true);

            // Hide the notification after 5 seconds (if desired)
            setTimeout(() => {
                setShowNotification(false);
            }, 500000);
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
                                    "Code",
                                    "Name",
                                    "Quantity",
                                    "Purchase Date",
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
                            {items.map((item, index) => {
                                const isExpired = new Date(item.expiry_date) < new Date();
                                return (
                                    <tr key={item.id}>
                                        {/* Auto-incrementing number */}
                                        <td className="drug-expiry-alert-td">{index + 1}</td>

                                        <td className="drug-expiry-alert-td">{item.code}</td>
                                        <td className="drug-expiry-alert-td">{item.name}</td>
                                        <td className="drug-expiry-alert-td">{item.quantity}</td>
                                        <td className="drug-expiry-alert-td">{item.purchaseDate}</td>
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
