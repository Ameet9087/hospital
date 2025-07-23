import React, { useState, useRef, useEffect } from "react";
import "./ProvisionalSale.css";
import ProvisionalSaleForm from "./ProvisionalSaleForm";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";

const ProvisionalSale = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [provisionalSales, setProvisionalSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch data from the API
    useEffect(() => {
        fetch(`${API_BASE_URL}/provisional-sales`)
            .then((res) => res.json())
            .then((data) => {
                setProvisionalSales(data);
                setFilteredSales(data); // Initially set filtered data to full data
            })
            .catch((err) => console.error("Error fetching provisional sales:", err));
    }, [showPopup]);

    // Handle search
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term.trim() === "") {
            setFilteredSales(provisionalSales);
        } else {
            const filtered = provisionalSales.filter((sale) =>
                JSON.stringify(sale).toLowerCase().includes(term)
            );
            setFilteredSales(filtered);
        }
    };

    const handlePrint = () => {
        const printContent = tableRef.current;
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
          <html>
            <head>
              <title>Print Table</title>
              <style>
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid black;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              ${printContent.outerHTML}
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
      };
    

    // Export to CSV functionality
    const handleExport = () => {
        const csvContent = [
            [
                "Sale Date",
                "Purchase Date",
                "Condemnation No",
                "Purchase Amount",
                "Old Asset No",
                "Equipment No",
                "Condemnation Date",
                "Manual Sale Billno",
                "Equipment Name",
                "Sale Type",
                "Asset No",
                "Buyer Name",
                "Remarks",
            ],
            ...filteredSales.map((sale) => [
                sale.saleDate,
                sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.installationDate || "",
                sale.condemnationDisposalDTO?.condemnationDisposalId || "",
                sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.netValue || "",
                sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.oldAssetNo || "",
                sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentMasterId || "",
                sale.condemnationDisposalDTO?.condemDate || "",
                sale.manualSaleBillNo,
                sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentName || "",
                sale.saleType,
                sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.assetNo || "",
                sale.vendorDTO?.vendorName || "",
                sale.remarks,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "provisional_sales.csv";
        link.click();
    };

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    return (
        <div className="Provisional-sale-container">
            <div className="Provisional-sale-addBtn">
                <button className="Provisional-sale-add-button" onClick={openPopup}>
                    + Add New Provisional Sale
                </button>
            </div>

            <div className="Provisional-sale-search-N-result">
                <div className="Provisional-sale-search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="Provisional-sale-results-info">
                    <span>
                        Showing {filteredSales.length} / {provisionalSales.length} results
                    </span>
                    <button className="Provisional-sale-print-button" onClick={handleExport}>
                        <i className="fa-solid fa-file-excel"></i> Export
                    </button>
                    <button className="Provisional-sale-print-button" onClick={handlePrint}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table ref={tableRef}>
                    <thead>
                        <tr>
                            {[
                                "Sale Date",
                                "Purchase Date",
                                "Condemnation No",
                                "Purchase Amount",
                                "Old Asset No",
                                "Equipment No",
                                "Condemnation Date",
                                "Manual Sale Billno",
                                "Equipment Name",
                                "Sale Type",
                                "Asset No",
                                "Buyer Name",
                                "Remarks",
                            ].map((header, index) => (
                                <th
                                    key={index}
                                    style={{ width: columnWidths[index] }}
                                    className="resizable-th"
                                >
                                    <div className="header-content">
                                        <span>{header}</span>
                                        <div
                                            className="resizer"
                                            onMouseDown={startResizing(
                                                tableRef,
                                                setColumnWidths
                                            )(index)}
                                        ></div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.saleDate}</td>
                                <td>
                                    {
                                        sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO
                                            ?.equipmentMasterDTO?.installationDate || ""
                                    }
                                </td>
                                <td>{sale.condemnationDisposalDTO?.condemnationDisposalId || ""}</td>
                                <td>
                                    {
                                        sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO
                                            ?.equipmentMasterDTO?.netValue || ""
                                    }
                                </td>
                                <td>
                                    {
                                        sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO
                                            ?.equipmentMasterDTO?.oldAssetNo || ""
                                    }
                                </td>
                                <td>
                                    {
                                        sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO
                                            ?.equipmentMasterDTO?.equipmentMasterId || ""
                                    }
                                </td>
                                <td>{sale.condemnationDisposalDTO?.condemDate || ""}</td>
                                <td>{sale.manualSaleBillNo}</td>
                                <td>
                                    {
                                        sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO
                                            ?.equipmentMasterDTO?.equipmentName || ""
                                    }
                                </td>
                                <td>{sale.saleType}</td>
                                <td>
                                    {
                                        sale.condemnationDisposalDTO?.condemnationDisposalRequestDTO
                                            ?.equipmentMasterDTO?.assetNo || ""
                                    }
                                </td>
                                <td>{sale.vendorDTO?.vendorName || ""}</td>
                                <td>{sale.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <CustomModal isOpen={showPopup} onClose={closePopup}>
                    <ProvisionalSaleForm />
                </CustomModal>
            )}
        </div>
    );
};

export default ProvisionalSale;
