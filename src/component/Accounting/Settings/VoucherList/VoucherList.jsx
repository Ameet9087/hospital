import React, { useState, useEffect, useRef } from "react";
import "./VoucherList.css";
import CreateVoucherPopup from "./AddVoucherPopup";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const VoucherData = [
  {
    voucherName: "Payment Voucher",
    voucherCode: "PV001",
    description: "Payment for office supplies",
    isActive: "true",
    isCopyDescription: "false",
    chequeNumber: "123456",
    payeeName: "Office Supplies Co.",
  },
  {
    voucherName: "Receipt Voucher",
    voucherCode: "RV002",
    description: "Receipt from customer",
    isActive: "true",
    isCopyDescription: "true",
    chequeNumber: "654321",
    payeeName: "Customer A",
  },
  {
    voucherName: "Journal Voucher",
    voucherCode: "JV003",
    description: "Adjustment entry",
    isActive: "true",
    isCopyDescription: "false",
    chequeNumber: "789012",
    payeeName: "N/A",
  },
  {
    voucherName: "Contra Voucher",
    voucherCode: "CV004",
    description: "Transfer between accounts",
    isActive: "false",
    isCopyDescription: "true",
    chequeNumber: "210987",
    payeeName: "Bank Transfer",
  },
  {
    voucherName: "Credit Note",
    voucherCode: "CN005",
    description: "Credit for returned goods",
    isActive: "true",
    isCopyDescription: "false",
    chequeNumber: "345678",
    payeeName: "Supplier B",
  },
];

function VoucherList() {
  const [showCreateSubLedgerPopup, setShowCreateSubLedgerPopup] =
    useState(false);

  const handleNewVoucher = () => {
    setShowCreateSubLedgerPopup(true);
  };
  const handleClosePopup = () => {
    setShowCreateSubLedgerPopup(false);
  };
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <div className="voucher">
      <div className="voucher-create">
        <button className="" onClick={handleNewVoucher}>
          + Create Voucher
        </button>
      </div>
      <div className="voucher-search-bar">
        <div className="voucher-search-container">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <span className="voucher-results-count">
            Showing {VoucherData.length} / {VoucherData.length}
          </span>
          <button className="voucher-print-btn">Print</button>
        </div>
      </div>
      <div className="table-container">
        <table className="voucher-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Voucher Name",
                "Voucher Code",
                "Description",
                "Is Active",
                "Is Copy Description",
                "Cheque Number",
                "Payee Name",
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
            {VoucherData?.map((item, index) => (
              <tr key={index}>
                <td>{item.voucherName}</td>
                <td>{item.voucherCode}</td>
                <td>{item.description}</td>
                <td>{item.isActive}</td>
                <td>{item.isCopyDescription}</td>
                <td>
                  <button className="voucher-show-btn">show</button>
                </td>
                <td>
                  <button className="voucher-show-btn">show</button>
                </td>
              </tr>
            ))}

            {/* <tr>
            <td className="no-show-coa" colSpan="15">
              No Rows To Show
            </td>
          </tr> */}
          </tbody>
        </table>
      </div>

      {showCreateSubLedgerPopup && (
        <CreateVoucherPopup onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default VoucherList;
