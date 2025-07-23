import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import "./LinenCondemnationDisposal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PopupTable from "../../../Admission/PopupTable";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";

const LinenCondemnationDisposal = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      linensType: "",
      instock: "",
      disposalQuantity: "",
      receiveNumber: "",
      name: "",
      perviousbalance: "",
    },
  ]);
  const [linensTypeData, setLinensTypeData] = useState([]);
  const [receiveNumberData, setReceiveNumberData] = useState([]);
  useEffect(() => {
    const fetchLinensTypeData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/disposals`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedData = data.map((item) => ({
            linensType: item.linensType.map((linen) => linen.linenType),
            stock: item.linensType.map((linen) => linen.stock),
          }));
          setLinensTypeData(formattedData);
          console.log(data)
        } else {
          console.error("Unexpected data format for linensType");
        }
      } catch (error) {
        console.error("Error fetching LinenName data:", error);
      }
    };

    const fetchReceiveNumberData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/linens-receives`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setReceiveNumberData(data);
          console.log(data)
        } else {
          console.error("Unexpected data format for recNo");
        }
      } catch (error) {
        console.error("Error fetching RecNo data:", error);
      }
    };

    fetchLinensTypeData();
    fetchReceiveNumberData();
  }, []);


  useEffect(() => {
    packageTableRows.forEach((row, index) => {
      if (row.receiveNumber) {
        const matchingReceive = receiveNumberData.find(
          (item) => item.receiveNumber === row.receiveNumber
        );
        if (matchingReceive) {
          setPackageTableRows((prev) =>
            prev.map((r, i) =>
              i === index
                ? {
                  ...r,
                  name: matchingReceive.name || "",
                  perviousbalance: matchingReceive.balance || "",
                }
                : r
            )
          );
        }
      }
    });
  }, [receiveNumberData, packageTableRows.map((row) => row.receiveNumber).join(",")]);

  const handleAddRow = () => {
    setPackageTableRows((prev) => [
      ...prev,
      {
        sn: prev.length + 1,
        linensType: "",
        instock: "",
        disposalQuantity: "",
        receiveNumber: "",
        name: "",
        perviousbalance: "",
      },
    ]);
  };

  const handlePostData = async () => {
    try {
      // Transform the current row data into the expected single object format
      const currentRow = packageTableRows[0]; // Using first row for this example
      const transformedData = {
        disposalQuantity: parseInt(currentRow.disposalQuantity) || 0,
        linensReceive: [
          {
            receiveDate: new Date().toISOString().split('T')[0],
            receiveTime: new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            }),
            receiveFrom: currentRow.name || "Laundry Department",
            nursingStation: "Station A",
            linensIssueDTO: {
              issueNumber: 201
            },
            linenLotingDTO: {
              linenLotingId: 1
            }
          }
        ],
        linensType: [
          {
            linenType: currentRow.linensType,
            stock: parseInt(currentRow.instock) || 0
          }
        ]
      };

      const response = await fetch(`${API_BASE_URL}/disposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transformedData) // Sending a single object instead of an array
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Failed to save data:", errorDetails);
        toast.error(`Failed to save data. Server responded with: ${response.status}`);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      toast.success("Data saved successfully!");

    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please check your network connection.");
    }
  };

  const handlePopupClose = () => {
    setActivePopup(null);
  };
  const handleDeleteRow = (index) => {
    setPackageTableRows((prev) =>
      prev.filter((_, i) => i !== index).map((row, i) => ({ ...row, sn: i + 1 }))
    );
  };

  const handleInputChange = (index, fieldName, value) => {
    setPackageTableRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [fieldName]: value } : row))
    );
  };

  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
              .serchIconInput svg{
              display: none;
              }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };
  const handleSelect = (data) => {
    if (activeRowIndex === null) return;

    setPackageTableRows((prev) =>
      prev.map((row, index) =>
        index === activeRowIndex
          ? {
            ...row,
            linensType:
              activePopup === "LinensType" ? data.linensType : row.linensType,
            instock:
              activePopup === "LinensType"
                ? data.instock
                : row.instock,
            receiveNumber:
              activePopup === "RecNo" ? data.receiveNumber : row.receiveNumber,
            name: activePopup === "RecNo" ? data.receiveFrom : row.receiveFrom,
          }
          : row
      )
    );
    setActivePopup(null);
    setActiveRowIndex(null);
  };
  const getPopupData = () => {
    if (activePopup === "LinensType") {
      return {
        columns: ["linensType", "instock"],
        data: linensTypeData.flatMap((item, index) =>
          item.linensType.map((linenType) => ({
            sn: index + 1,
            linensType: item.linenType,
            instock: item.stock,
          }))
        ),
      };
    } else if (activePopup === "RecNo") {
      return {
        columns: ["receiveNumber", "name"],
        data: receiveNumberData.map((item, index) => ({
          sn: index + 1,
          receiveNumber: item.receiveNumber,
          name: item.receiveFrom,
        })),
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();

  return (
    <div className="LinenCondemnationDisposal-container">

      <div className="LinenCondemnationDisposal-content">
        {/* <div className="LinenCondemnationDisposal-header">
          <span>Laundry Staff and Department Map</span>
        </div> */}
        <div className="LinenCondemnationDisposal-middle-content">
          <label>Disposal Number: </label>
          <input
            type="text"
            placeholder="This field is autogenerated field"
            className="LinenCondemnationDisposal-middle-input"
            disabled
          />
        </div>
        <div className="LinenCondemnationDisposal-table">
          <div className="LinenCondemnationDisposal-table-header">
            <span>Condemnation And Disposal Details</span>
          </div>
          <div className="LinenCondemnationDisposal-table-header-print">
            <button onClick={printList}>Print</button>
          </div>
          <table ref={tableRef} className="LinenCondemnationDisposal-table-content" border={1}>
            <thead>
              <tr>
                {[
                  'Actions',
                  'SN',
                  'Linens Type',
                  'In Stock',
                  'Disposal Quantity',
                  'RecNo',
                  'Name',
                  'Previous Balance',
                ].map((header, index) => (
                  <th key={index} style={{ width: columnWidths[index] || 'auto' }} className="resizable-th">
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
              {packageTableRows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <div className="LinenCondemnationDisposal-table-actions">
                      <button
                        className="LinenCondemnationDisposal-add-btn"
                        aria-label="Add row"
                        onClick={handleAddRow}
                      >
                        Add
                      </button>
                      <button
                        className="LinenCondemnationDisposal-del-btn"
                        aria-label="Delete row"
                        onClick={() => handleDeleteRow(index)}
                        disabled={packageTableRows.length <= 1}
                      >
                        Del
                      </button>
                    </div>
                  </td>
                  <td>{row.sn}</td>
                  <td className="serchIconInput">
                    <input type="text" readOnly value={row.linensType || ''} name="linensType" />
                    <FontAwesomeIcon
                      className="LinenCondemnationDisposal-search-icon"
                      icon={faSearch}
                      onClick={() => {
                        setActiveRowIndex(index);
                        setActivePopup('LinensType');
                      }}
                    />
                  </td>
                  <td>{row.instock}</td>
                  <td> <input
                    type="number"
                    value={row.disposalQuantity || ''}
                    name="disposalQuantity"
                    min="0"
                    onChange={(e) => handleInputChange(index, 'disposalQuantity', e.target.value)}
                  /></td>
                  <td className="serchIconInput">
                    <input type="text" readOnly value={row.receiveNumber || ''} name="recno" />
                    <FontAwesomeIcon
                      className="LinenCondemnationDisposal-search-icon"
                      icon={faSearch}
                      onClick={() => {
                        setActiveRowIndex(index);
                        setActivePopup('RecNo');
                      }}
                    />
                  </td>
                  <td>{row.name}</td>
                  <td>{row.perviousbalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="LinenCondemnationDisposal-navbar">
        <aside className="LinenCondemnationDisposal-navbar-btns">
          {[
            'Save',
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (btn === 'Save') {
                  handlePostData();
                } else {
                  alert(`${btn} button clicked!`);
                }
              }}
            >
              {btn}
            </button>
          ))}
        </aside>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClick={() => {
            setActivePopup(null);
            setActiveRowIndex(null);
            
          }}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default LinenCondemnationDisposal;