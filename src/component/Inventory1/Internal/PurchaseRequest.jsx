import React, { useState, useEffect, useRef } from "react";
import "./PurchaseRequest.css";
import AddVendor from "./AddVendor";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import AddItemForm from "./AddItemForm";
import CustomModal from "../../../CustomModel/CustomModal";
import PurchaseView from "./PurchaseView";
import { useFilter } from "../../ShortCuts/useFilter";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { toast } from "react-toastify";
const PurchaseRequest = () => {
  // State variables for the component
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [items, setItems] = useState([]);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vendors, setVendors] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [prCategory, setPrCategory] = useState("Consumables");
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableQty, setAvailableQty] = useState(0);
  const [quantityVerifiedOn, setQuantityVerifiedOn] = useState("");
  const [supplyRequiredBefore, setSupplyRequiredBefore] = useState("");
  const [uom, setUom] = useState("Units");
  const [remarks, setRemarks] = useState("");
  const [itemRemarks, setItemRemarks] = useState("");
  const [requestedBy, setRequestedBy] = useState("Mr.admin");
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [error, setError] = useState(null);
  const [view, setView] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch purchase requests when the component mounts
  useEffect(() => {
    fetch(`${API_BASE_URL}/purchase-requests`)
      .then((response) => response.json())
      .then((data) => {
        setPurchaseRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/vendors/getAllVendors`)
      .then((response) => response.json())
      .then((data) => {
        setVendorList(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/items/getAllItem`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        console.log(data);

        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleItemSelect = (e) => {
    const selectedItemId = e.target.value;
    console.log(selectedItemId);

    setItemName(selectedItemId);

    // Find the selected item details
    const selectedNewitem = item.find(
      (items) => items.invItemId == selectedItemId
    );
    console.log(selectedNewitem);
    if (selectedNewitem) {
      setItemCode(selectedNewitem?.itemCode); // Auto-fill item code
      setUom(selectedNewitem?.unitOfMeasurement?.name); // Auto-fill UOM
      setAvailableQty(selectedNewitem?.availableQty); // Auto-fill available quantity     // Set selected item to track it if needed
    }
  };

  const addItem = () => {
    const newItem = {
      prCategory,
      itemName,
      itemCode,
      uom,
      quantity,
      availableQty,
      quantityVerifiedOn,
      supplyRequiredBefore,
      itemRemarks,
    };

    setItems([...items, newItem]); // Add new item to the list
    clearFields(); // Clear input fields
  };

  const clearFields = () => {
    setPrCategory("");
    setItemName("");
    setItemCode("");
    setUom("");
    setQuantity("");
    setAvailableQty("");
    setQuantityVerifiedOn("");
    setSupplyRequiredBefore("");
    setItemRemarks("");
  };
  // const handleSearch = () => {
  //   console.log("Searching for:", searchQuery);
  // };

  // Handle print functionality
  // const handlePrint = () => {
  //   console.log("Printing...");
  // };
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
  const handleCreateRequest = () => {
    const requestPayload = {
      requestDate,
      verifyOrNot: "Not verified",
      verifyBy: "",
      status: "pending",
      remarks,
      vendor: {
        id: vendors,
      },
      items: items.map((item) => ({
        itemId: { invItemId: item.itemName },
        prCategory: item.prCategory,
        requiredQty: item.quantity,
        quantityVerifiedOn: item.quantityVerifiedOn,
        supplyRequiredBefore: item.supplyRequiredBefore,
        itemRemark: item.itemRemarks,
      })),
    };
    console.log(requestPayload);
    fetch(`${API_BASE_URL}/purchase-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Submit successfully")
      })
      .catch((error) => {
        toast.error("Error:", error);
      });

    setIsCreatingRequest(false); // Hide the form after submission
  };

  // Handle going back to the list view
  const handleBackToList = () => {
    setIsCreatingRequest(false);
  };

  const handleView = (item) => {
    setSelectedRequest(item);
    setView(true);
  };

  const openVendorModal = () => setIsVendorModalOpen(true);
  const closeVendorModal = () => setIsVendorModalOpen(false);

  const openAddItemModel = () => setOpenAddItem(true);
  const closeAddItemModel = () => setOpenAddItem(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPurchaseRequests = purchaseRequests.filter((request) => {
    const requestDate = new Date(request.requestDate);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;

    return (
      (!fromDate || requestDate >= fromDate) &&
      (!toDate || requestDate <= toDate)
    );
  });

  const purchaseInRequests = useFilter(filteredPurchaseRequests, searchTerm);

  return (
    <div className="purchase-request-content">
      {isCreatingRequest ? (
        <div className="purchase-request-create-purchase-form">
          <div className="purchase-request-create-heading">
            <h2 className="purchase-request-header">Purchase Request</h2>
            <button
              className="purchase-request-cancel-btn"
              onClick={handleBackToList}
            >
              X
            </button>
          </div>
          <div>
            <div className="purchase-request-pur-subContent">
              <div className="purchase-request-subdiv">
              <FloatingSelect
  label={"Vendor"}
  value={vendors}
  onChange={(e) => setVendors(e.target.value)}
  options={[
    { value: "", label: "Choose Vendor" },
    ...vendorList.map((vendor) => ({
      value: vendor.id,
      label: vendor.vendorName,
    })),
  ]}
/>

                <button className="add-Inv-Item" onClick={openVendorModal}>
                  ?
                </button>
              </div>
              <div className="purchase-request-subdiv">
                <FloatingInput
                label={"Request Date"}
                type="date"
                  value={requestDate}
                  onChange={(e) => setRequestDate(e.target.value)}/>
               
              </div>
            </div>
          </div>
          <div className="purchase-request-table-container">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Category</th>
                  <th>Item Name</th>
                  <th>Item Code</th>
                  <th>Unit of Measure</th>
                  <th>Quantity</th>
                  <th>Available Qty</th>
                  <th>Quantity Verified On</th>
                  <th>Supply Required Before</th>
                  <th>Item Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button className="add-Inv-Item" onClick={addItem}>
                      +
                    </button>
                  </td>
                  <td>
                    <FloatingSelect
                    label={"PR Category"}
                    value={prCategory}
                      onChange={(e) => setPrCategory(e.target.value)}
                      
                      options={[{value:""},{value:"Consumables",label:"Consumables"},
                        {value:"Capital Goods",label:"Capital Goods"}
                      ]}/>
                   
                  </td>
                  <td className="purchase-request-add-Item-container">
                  <FloatingSelect
  label={"Item Name"}
  value={itemName}
  onChange={handleItemSelect}
  options={[
    { value: "", label: "Select Item" },
    ...item.map((item) => ({
      value: item.invItemId,
      label: item.itemName,
    })),
  ]}
/>

                  </td>
                  <td>
                    <FloatingInput
                    label={"Code"}
                    type="text"
                      value={itemCode}
                      onChange={(e) => setItemCode(e.target.value)}/>
                  
                  </td>
                  <td>
                    <FloatingInput
                    label={"UOM"}
                    type="text"
                      value={uom}
                      onChange={(e) => setUom(e.target.value)}/>
                   
                  </td>
                  <td>
                    <FloatingInput
                    label={"Quantity"}
                    type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}/>
                    
                  </td>
                  <td>
                    <FloatingInput
                    label={"AVL QTY"}
                    type="number"
                    value={availableQty}
                    onChange={(e) => setAvailableQty(e.target.value)}
                    min={"0"}
                    />
                   
                  </td>
                  <td>
                    <FloatingInput
                    label={"Date"}
                          type="date"
                      value={quantityVerifiedOn}
                      onChange={(e) => setQuantityVerifiedOn(e.target.value)}/>
                   
                  </td>
                  <td>
                  <FloatingSelect
  label={"Supply Required Before"}
  value={supplyRequiredBefore}
  onChange={(e) => setSupplyRequiredBefore(e.target.value)}
  options={[
    { value: "", label: "Choose Supply" },
    ...[...Array(12)].map((_, i) => ({
      value: `${i + 1} month`,
      label: `${i + 1} month`,
    })),
  ]}
/>

                  </td>
                  <td>
                    <FloatingInput
                    label={"Remark"}
                    type="text"
                      value={itemRemarks}
                      onChange={(e) => setItemRemarks(e.target.value)}/>
                    
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Render Added Items */}
            <h3 className="purchase-request-header">Added Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Item Name</th>
                  <th>Item Code</th>
                  <th>Unit of Measure</th>
                  <th>Quantity</th>
                  <th>Available Qty</th>
                  <th>Quantity Verified On</th>
                  <th>Supply Required Before</th>
                  <th>Item Remarks</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.prCategory}</td>
                    <td>{item.itemName}</td>
                    <td>{item.itemCode}</td>
                    <td>{item.uom}</td>
                    <td>{item.quantity}</td>
                    <td>{item.availableQty}</td>
                    <td>{item.quantityVerifiedOn}</td>
                    <td>{item.supplyRequiredBefore}</td>
                    <td>{item.itemRemarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
             
              <label>Remarks:</label>
              <textarea
                rows="4"
                value={remarks}
                className="purchase-remark"
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter any remarks"
              ></textarea>
            </div>
            <button
              className="purchase-request-request-button"
              onClick={handleCreateRequest}
            >
              Request
            </button>
            <button
              className="purchase-request-discard-button"
              onClick={handleBackToList}
            >
              Discard
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="purchase-request-create-purchase-request"
            onClick={() => setIsCreatingRequest(true)}
          >
            Create Purchase Request
          </button>
          <div className="purchase-request-filter">
            <div className="purchase-request-date-range">
              <FloatingInput
              label={"From"}
              type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}/>
              
                <FloatingInput
                label={"TO"}
                type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}/>
                
              {/* <button className="purchase-request-star">☆</button>
              <button className="purchase-request-minus">-</button>
              <button className="purchase-request-ok">✓ OK</button> */}
            </div>
          </div>
          <div className="purchase-request-search-bar">
          <FloatingInput
            label={"Search Here"}
            type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}/>
            
          </div>
          <div className="purchase-request-purchase-results">
            <div>
              <span className="purchase-request-purchase-results-span">
                Showing {purchaseRequests.length} / {purchaseRequests.length}{" "}
                results
              </span>

              <button className="purchase-request-purchase-results-button">
                Export
              </button>
              <button
                className="purchase-request-purchase-results-button"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
          <table className="patientList-table" ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Sr.no",
                  "Request Date",
                  "Vendor",
                  "Status",
                  "Po Created",
                  "Action",
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
              {purchaseInRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request?.id}</td>
                  <td>{request?.requestDate}</td>
                  <td>{request?.vendor?.vendorName}</td>
                  <td>{request?.status}</td>
                  <td>
                    {request?.status === "Approved" ? (
                      <div className="PO-created">Yes</div>
                    ) : (
                      <div className="PO-Remaining">No</div>
                    )}
                  </td>
                  <td>
                    <button
                      className="purchase-request-search-bar-button"
                      onClick={() => handleView(request)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <CustomModal isOpen={view} onClose={() => setView(false)}>
        <PurchaseView item={selectedRequest} />
      </CustomModal>

      <AddVendor isOpen={isVendorModalOpen} onClose={closeVendorModal} />

      {openAddItem && (
        <div className="Add-Item-Modal-Container">
          <div className="Add-Item-Modal-overlay">
            <AddItemForm onClose={closeAddItemModel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseRequest;
