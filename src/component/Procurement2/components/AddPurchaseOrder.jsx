import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddPurchaseOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { FloatingTextarea, PopupTable } from "../../../FloatingInputs";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

const AddPurchaseOrderDraft = ({ request, onClose }) => {
  console.log(request);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const date = new Date();
  const [vendors, setVendors] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [items, setItems] = useState([]); // To store all items
  const [filteredItems, setFilteredItems] = useState([]);
  const [activePopup, setActivePopup] = useState("");

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };
  const [formData, setFormData] = useState({
    vendorId: "",
    vendorName: "",
    currencyCode: "",
    vendorContactNo: "",
    vendorAddress: "",
    poDate: "",
    deliveryDate: "",
    referenceNo: "",
    invoicingAddress: "",
    deliveryAddress: "",
    contactPerson: "",
    contactEmail: "",
    paymentMode: "",
    remarks: "",
    items: [],
    locationMasterDTO: {
      id: ""
    },
    termsAndCondition: "",
    quantity: ""
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      vendorId: request?.vendor.id,
      vendorName: request?.vendor.vendorName,
      vendorContactNo: request?.vendor.contactNumber,
      vendorAddress: request?.vendor.contactAddress,
      contactPerson: request?.vendor.contactPerson,
      contactEmail: request?.vendor.email,
      currencyCode: request?.vendor.currencyCode,
      items:
        request?.items.map((item) => ({
          itemId: item?.itemId?.invItemId || 0,
          itemName: item?.itemId?.itemName || "",
          vendorItemCode: "", // Default value
          mssNo: "", // Default value
          hsnCode: "", // Default value
          itemCode: item?.itemId?.itemCode || "",
          unit: item?.itemId?.unitOfMeasurement?.name || "",
          quantity: item?.requiredQty || 0,
          standardRate: item?.itemId?.standardRate || 0,
          vat: item?.itemId?.isVatApplicable ? 0 : 0, // Set to 0 as default
          totalAmount: 0, // Default value
          remarks: item?.itemRemark || "", // Default value
        })) || [],
    }));
  }, [request]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/items/getAllItem`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);
  console.log(items);

  // Fetch vendors and items on component mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/vendors/getAllVendors`)
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));

    axios
      .get(`${API_BASE_URL}/items/getAllItem`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);



  useEffect(() => {
    fetch(`${API_BASE_URL}/location-masters`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => console.error("Error fetching Locations:", error));
  }, []);

  const getPopupData = () => {
    if (activePopup === "Location") {
      return {
        columns: ["id", "locationName"],
        data: locations,
      };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();


  const handleSelect = async (data) => {
    if (activePopup === "Location") {
      setSelectedLocation(data);
    }

    setActivePopup(null);
  };


  const handleCategorySelect = (index, category) => {
    const filtered = items.filter((item) => item.category === category);
    setFilteredItems(filtered);

    const updatedItems = [...formData.items];
    updatedItems[index].category = category;
    updatedItems[index].itemId = null;
    updatedItems[index].itemName = "";
    updatedItems[index].standardRate = 0;
    updatedItems[index].totalAmount = 0;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleItemSelect = (index, itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);

    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      itemId: selectedItem.invItemId,
      itemName: selectedItem.itemName,
      standardRate: selectedItem.standardRate,
      totalAmount: updatedItems[index].quantity * selectedItem.standardRate,
    };

    setFormData({ ...formData, items: updatedItems });
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...formData.items];
    updatedItems[index].quantity = quantity;
    updatedItems[index].totalAmount =
      quantity * updatedItems[index].standardRate;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleVendorSelect = (vendorId) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    setSelectedVendor(vendor);
    setFormData({
      ...formData,
      vendorId,
      vendorName: vendor.vendorName,
      vendorContactNo: vendor.contactNumber,
      vendorAddress: vendor.contactAddress,
      contactPerson: vendor.contactPerson,
      contactEmail: vendor.email,
      currecyCode: vendor.currencyCode,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };
  const addNewRow = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          itemId: 0,
          itemName: "",
          vendorItemCode: "",
          mssNo: "",
          hsnCode: "",
          itemCode: "",
          unit: "",
          quantity: 0,
          standardRate: 0,
          vat: 0,
          totalAmount: 0,
          remarks: "",
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = () => {
    // Calculate subTotal, vat, and totalAmount from formData.items
    const subTotal = formData.items.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );
    const vat = formData.items.reduce(
      (sum, item) => sum + Number(item.vat || 0),
      0
    );
    const totalAmount = formData.items.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );

    // Map items to only include itemId
    const cleanedItems = formData.items.map((item) => ({
      itemId: item.itemId,
      vendorItemCode: item.vendorItemCode,
      mssNo: item.mssNo,
      hsnCode: item.hsnCode,
      quantity: item.quantity,
      standardRate: item.standardRate,
      vatPercentage: item.vat,
      totalAmount: item.totalAmount,
      remarks: item.remarks,
    }));

    // Create the payload
    const payload = {
      poDate: formData.poDate,
      deliveryDate: formData.deliveryDate,
      currencyCode: selectedVendor?.currencyCode || "",
      referenceNo: formData.referenceNo || "",
      invoicingAddress: formData.invoicingAddress || "",
      deliveryAddress: formData.deliveryAddress || "",
      contactPerson: formData.contactPerson || "",
      contactEmail: formData.contactEmail || "",
      paymentMode: formData.paymentMode || "",
      remarks: formData.remarks || "",
      subTotal, // Calculated subTotal
      vat, // Calculated VAT
      totalAmount, // Calculated totalAmount
      status: "Draft",
      vendorId: formData.vendorId,
      items: cleanedItems, // Only itemId included
      locationMasterDTO: {
        id: selectedLocation.id
      },

    };

    console.log("Payload:", payload);
    axios
      .post(`${API_BASE_URL}/purchase-orders/create`, payload)
      .then((response) => {
        toast.success("Purchase Order saved successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving purchase order:", error);
        alert("Failed to save purchase order.");
      });
  };

  return (
    <div className="AddPurchaseOrder-add-purchase-order">
      <h2>Add Purchase Order</h2>

      {/* Vendor Selection */}
      <div className="AddPurchaseOrder-form-row">
        <div className="AddPurchaseOrder-form-group">
          <FloatingSelect
            label="Select Vendor"
            name="vendor"
            onChange={(e) => handleVendorSelect(Number(e.target.value))}
            value={request?.vendor?.vendorId || formData.vendorId || ""}
            options={[
              { value: "", label: "Select a vendor" },
              ...(Array.isArray(vendors)
                ? vendors.map((vendor) => ({
                  value: vendor.id,
                  label: vendor.vendorName,
                }))
                : []),
            ]}
          />
        </div>
      </div>

      {/* Autofill Vendor Data */}
      <div className="AddPurchaseOrder-form-row">
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Vendor Name"}
            type="text"
            value={formData.vendorName}
            disabled
          />
        </div>

        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Currency Code"}
            type="text"
            value={formData.currencyCode}
            disabled
          />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Vendor Contact No"}
            type="text"
            value={formData.vendorContactNo}
            disabled
          />
        </div>

        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Vendor Address"}
            type="text"
            value={formData.vendorAddress}
            disabled
          />
        </div>
      </div>

      {/* Additional Form Fields */}
      <div className="AddPurchaseOrder-form-row">
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"PO Date"}
            type="date"
            name="poDate"
            value={formData.poDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Delivery Date"}
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Reference no"}
            type="text"
            name="referenceNo"
            value={formData.referenceNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Invoicing Address"}
            type="text"
            name="invoicingAddress"
            value={formData.invoicingAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Contact Person"}
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <FloatingInput
            label={"Contact Email"}
            type="text"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="dgpkg-input-with-icon">
          <FloatingInput
            label="Location"
            value={selectedLocation?.locationName}
          />
          <div className="dgpkg-magnifier-btn">
            <CiSearch onClick={() => setActivePopup("Location")} />
          </div>
        </div>
      </div>

      <table className="AddPurchaseOrder-items-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th>Vendor's Item Code</th>
            <th>MSS No.</th>
            <th>HSN Code</th>
            <th>Item Code</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Standard Rate</th>
            <th>VAT %</th>
            <th>Total Amount</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index}>
              <td>
                <FloatingSelect
                  value={item.category}
                  className="purchaseorderItemSelect"
                  onChange={(e) =>
                    handleItemChange(index, "category", e.target.value)
                  }
                  options={[
                    { value: "", label: "Select a category" },
                    { value: "Consumables", label: "Consumables" },
                    { value: "Capital_goods", label: "Capital Goods" },
                  ]}
                />
              </td>
              <td>
                <FloatingSelect
                  name="selectItem"
                  value={item.itemName}
                  className="purchaseorderItemSelect"
                  onChange={(e) => {
                    const selectedItem = items.find(
                      (itm) => itm.itemName === e.target.value
                    );
                    handleItemChange(index, "itemName", e.target.value);

                    console.log(selectedItem);

                    if (selectedItem) {
                      handleItemChange(index, "itemId", selectedItem.invItemId);
                      handleItemChange(
                        index,
                        "itemCode",
                        selectedItem.itemCode
                      );
                      handleItemChange(
                        index,
                        "unit",
                        selectedItem?.unitOfMeasurement?.name
                      );
                      handleItemChange(
                        index,
                        "standardRate",
                        selectedItem.standardRate
                      );
                      handleItemChange(index, "totalAmount", 0); // Reset total amount
                    } else {
                      console.warn("Selected item not found");
                    }
                  }}
                  options={[
                    { value: "", label: "Select Item" },
                    ...(Array.isArray(items)
                      ? items.map((itm) => ({
                        value: itm.itemName,
                        label: itm.itemName,
                      }))
                      : []),
                  ]}
                />
              </td>

              <td>
                <FloatingInput
                  type="text"
                  value={item.vendorItemCode || ""}
                  className="purchaseorderItemInput"
                  onChange={(e) =>
                    handleItemChange(index, "vendorItemCode", e.target.value)
                  }
                />
              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.mssNo || ""}
                  className="purchaseorderItemInput"
                  onChange={(e) =>
                    handleItemChange(index, "mssNo", e.target.value)
                  } // User input only
                />
              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.hsnCode || ""}
                  className="purchaseorderItemInput"
                  onChange={(e) =>
                    handleItemChange(index, "hsnCode", e.target.value)
                  }
                />
              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.itemCode || ""}
                  className="purchaseorderItemInput"
                  readOnly
                />
              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.unit || ""}
                  className="purchaseorderItemInput"
                  readOnly
                />
              </td>
              <td>
                <FloatingInput
                  type="number"
                  value={item.quantity || ""}
                  className="purchaseorderItemInput"
                  onChange={(e) => {
                    const quantity = e.target.value;
                    handleItemChange(index, "quantity", quantity);

                    const totalAmount = quantity * (item.standardRate || 0);
                    handleItemChange(
                      index,
                      "totalAmount",
                      totalAmount.toFixed(2)
                    );
                  }}
                />
              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.standardRate || ""}
                  className="purchaseorderItemInput"
                  readOnly
                />

              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.vat || ""}
                  className="purchaseorderItemInput"
                  onChange={(e) => {
                    const vatPercentage = parseFloat(e.target.value) || 0; // Parse VAT percentage
                    const quantity = parseFloat(item.quantity) || 0;
                    const standardRate = parseFloat(item.standardRate) || 0;

                    // Calculate VAT and total amount
                    const vatAmount =
                      (quantity * standardRate * vatPercentage) / 100;
                    const totalAmount = quantity * standardRate + vatAmount;

                    // Update state with VAT and total amount
                    handleItemChange(index, "vat", vatPercentage);
                    handleItemChange(
                      index,
                      "totalAmount",
                      totalAmount.toFixed(2)
                    );
                  }}
                />


              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.totalAmount || ""}
                  className="purchaseorderItemInput"
                  readOnly
                />


              </td>
              <td>
                <FloatingInput
                  type="text"
                  value={item.remarks || ""}
                  className="purchaseorderItemInput"
                  onChange={(e) =>
                    handleItemChange(index, "remarks", e.target.value)
                  } // User input only
                />


              </td>
              <td>
                <button
                  className="Pro-Purchase-add-btn"
                  onClick={() => removeRow(index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="purchaseorder-add-btn" onClick={addNewRow}>
        + Add New Row
      </button>

      <div>
        <FloatingTextarea label={"Terms and Conditions"} name={"termsAndCondition"} value={formData.termsAndCondition} onChange={handleInputChange} />
      </div>

      {/* Submit Button */}
      <div className="AddPurchaseOrder-button-group">
        <button className="purchaseorder-add-btn" onClick={handleSubmit}>Save Purchase Order</button>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
};

export default AddPurchaseOrderDraft;
