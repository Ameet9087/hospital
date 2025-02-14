import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PurchaseOrderForm.css";
import { API_BASE_URL } from "../api/api";
import { PopupTable } from "../../FloatingInputs";

const UpdatePurchaseOrder = ({ purchaseOrder }) => {
      const [formVisible, setFormVisible] = useState(true);
      const [selectedSupplierId, setSelectedSupplierId] = useState();
      const [locations, setLocations] = useState([]);
      const [selectedLocation, setSelectedLocation] = useState([]);
      const [activePopup, setActivePopup] = useState("");
      const [items, setItems] = useState([]);
      const [suppliers, setSuppliers] = useState([]);
      const [availableItems, setAvailableItems] = useState([]);
      const [availableGenerics, setAvailableGenerics] = useState([]);

      const [formData, setFormData] = useState({
            purchaseOrderId: "",
            poId: "",
            poDate: "",
            deliveryDays: 0,
            deliveryAddress: "",
            deliveryDate: "",
            referenceNo: "",
            contact: "",
            invoicingAddress: "",
            subtotal: 0,
            taxableAmount: 0,
            vatAmount: 0,
            discountAmount: 0,
            inWords: "",
            termsAndCondition: "",
            discountPercentage: 0,
            nonTaxableAmount: 0,
            ccCharge: 0,
            totalAmount: 0,
            supplier: {
                  suppliersId: "",
            },
            locationMasterDTO: {
                  id: "",
                  locationName: "",
            },
            purchaseOrderItemDTOs: [],
      });

      useEffect(() => {
            axios
                  .get(`${API_BASE_URL}/suppliers`)
                  .then((response) => {
                        setSuppliers(response.data);
                  })
                  .catch((error) => {
                        console.error("There was an error fetching the suppliers!", error);
                  });

            axios
                  .get(`${API_BASE_URL}/location-masters`)
                  .then((response) => {
                        setLocations(response.data);
                  })
                  .catch((error) => {
                        console.error("There was an error fetching the Locations!", error);
                  });

            axios
                  .get(`${API_BASE_URL}/pharmacy-item-master`)
                  .then((response) => {
                        setAvailableItems(response.data);
                  })
                  .catch((error) => {
                        console.error("There was an error fetching the items!", error);
                  });

            axios
                  .get(`${API_BASE_URL}/generic-names`)
                  .then((response) => {
                        setAvailableGenerics(response.data);
                  })
                  .catch((error) => {
                        console.error("There was an error fetching the generics!", error);
                  });
      }, []);

      useEffect(() => {
            if (
                  purchaseOrder &&
                  suppliers.length &&
                  availableItems.length &&
                  availableGenerics.length
            ) {
                  const formattedItems = purchaseOrder.purchaseOrderItemDTOs.map((item) => {
                        const matchedItem = availableItems.find(
                              (availableItem) =>
                                    availableItem.pharmacyItemMasterId ===
                                    item.pharmacyItemMasterDTO?.pharmacyItemMasterId
                        );

                        const matchedGeneric = availableGenerics.find(
                              (generic) => generic.genericName === item.genericName
                        );

                        return {
                              genericName: matchedGeneric?.genericName || "",
                              genericNameId: matchedGeneric?.genericNameId || "",
                              itemName: matchedItem?.itemName || "",
                              pharmacyItemMasterDTO: {
                                    pharmacyItemMasterId: matchedItem?.pharmacyItemMasterId || "",
                              },
                              itemQuantity: item.quantity || 0,
                              freeQuantity: item.freeQuantity || 0,
                              totalQuantity: item.totalQuantity || 0,
                              standardRate: item.standardRate || 0,
                              subtotal: item.subTotal || 0,
                              ccChargePercentage: item.ccChargePercentage || 0,
                              ccChargeAmount: item.ccCharge || 0,
                              discountPercentage: item.discountPercent || 0,
                              vatPercentage: item.vatPercentage || 0,
                              totalAmount: item.totalAmount || 0,
                              remarks: item.remarks || "",
                        };
                  });

                  setItems(formattedItems);

                  setFormData({
                        purchaseOrderId: purchaseOrder.purchaseOrderId,
                        poId: purchaseOrder.poId,
                        poDate: purchaseOrder.poDate,
                        deliveryDays: purchaseOrder.deliveryDays || 0,
                        deliveryAddress: purchaseOrder.deliveryAddress || "",
                        deliveryDate: purchaseOrder.deliveryDate || "",
                        referenceNo: purchaseOrder.referenceNumber || "",
                        contact: purchaseOrder.contact || "",
                        invoicingAddress: purchaseOrder.invoicingAddress || "",
                        subtotal: purchaseOrder.subTotal || 0,
                        taxableAmount: purchaseOrder.taxableAmount || 0,
                        vatAmount: purchaseOrder.vatAmount || 0,
                        discountAmount: purchaseOrder.discountAmount || 0,
                        inWords: purchaseOrder.inWords || "",
                        termsAndCondition: purchaseOrder.termsAndCondition || "",
                        discountPercentage: purchaseOrder.discountPercent || 0,
                        nonTaxableAmount: purchaseOrder.nonTaxableAmount || 0,
                        ccCharge: purchaseOrder.ccCharge || 0,
                        totalAmount: purchaseOrder.totalAmount || 0,
                        supplier: {
                              suppliersId: purchaseOrder.supplierDTO?.suppliersId || "",
                        },
                        locationMasterDTO: {
                              id: purchaseOrder.locationMasterDTO?.id || "",
                              locationName: purchaseOrder.locationMasterDTO?.locationName || "",
                        },
                        purchaseOrderItemDTOs: formattedItems,
                  });

                  setSelectedSupplierId(purchaseOrder.supplierDTO?.suppliersId);
            }
      }, [purchaseOrder, suppliers, availableItems, availableGenerics]);

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
                  setFormData((prev) => ({
                        ...prev,
                        locationMasterDTO: {
                              id: data.id,
                              locationName: data.locationName,
                        },
                  }));
            }

            setActivePopup(null);
      };

      const handleSupplierChange = (e) => {
            const selectedSupplier = e.target.value;
            setFormData((prev) => ({
                  ...prev,
                  supplier: { suppliersId: selectedSupplier },
            }));
            setSelectedSupplierId(selectedSupplier);
      };

      const handleChangeInput = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      const handleInputChange = (index, e) => {
            const { name, value } = e.target;

            setItems((prevItems) =>
                  prevItems.map((item, idx) => {
                        if (idx === index) {
                              const updatedItem = { ...item, [name]: value };

                              if (name === "genericName") {
                                    const selectedGeneric = availableGenerics.find(
                                          (g) => g.genericName === value
                                    );
                                    if (selectedGeneric) {
                                          updatedItem.genericNameId = selectedGeneric.genericNameId;
                                    }
                              }

                              if (name === "itemName") {
                                    const selectedItem = availableItems.find(
                                          (i) => i.itemName === value
                                    );
                                    if (selectedItem) {
                                          updatedItem.standardRate = parseFloat(selectedItem.mrpItem || 0);
                                          updatedItem.pharmacyItemMasterDTO = {
                                                pharmacyItemMasterId: selectedItem.pharmacyItemMasterId,
                                          };
                                    }
                              }

                              return calculateItemTotals(updatedItem);
                        }
                        return item;
                  })
            );
      };

      const calculateItemTotals = (item) => {
            const itemQuantity = parseInt(item.itemQuantity || 0);
            const freeQuantity = parseInt(item.freeQuantity || 0);
            const standardRate = parseFloat(item.standardRate || 0);
            const ccChargePercentage = parseFloat(item.ccChargePercentage || 0);
            const discountPercentage = parseFloat(item.discountPercentage || 0);
            const vatPercentage = parseFloat(item.vatPercentage || 0);

            const totalQuantity = itemQuantity + freeQuantity;
            const subtotal = totalQuantity * standardRate;
            const ccCharge = (subtotal * ccChargePercentage) / 100;
            const subtotalAfterCC = subtotal + ccCharge;
            const discountAmount = (subtotalAfterCC * discountPercentage) / 100;
            const subtotalAfterDiscount = subtotalAfterCC - discountAmount;
            const vatAmount = (subtotalAfterDiscount * vatPercentage) / 100;
            const totalAmount = subtotalAfterDiscount + vatAmount;

            return {
                  ...item,
                  totalQuantity,
                  subtotal: subtotal.toFixed(2),
                  ccChargeAmount: ccCharge.toFixed(2),
                  discountAmount: discountAmount.toFixed(2),
                  vatAmount: vatAmount.toFixed(2),
                  totalAmount: totalAmount.toFixed(2),
            };
      };

      useEffect(() => {
            calculateFormDataTotals();
      }, [items]);

      const calculateFormDataTotals = () => {
            let overallVatAmount = 0;
            let overallCcCharge = 0;
            let overallTaxableAmount = 0;
            let overallNonTaxableAmount = 0;
            let overallTotalAmount = 0;
            let overallDiscountAmount = 0;
            let overallSubTotal = 0;

            items.forEach((item) => {
                  const subtotal = parseFloat(item.subtotal || 0);
                  const discountAmount = parseFloat(item.discountAmount || 0);
                  const vatAmount = parseFloat(item.vatAmount || 0);
                  const ccChargeAmount = parseFloat(item.ccChargeAmount || 0);

                  overallVatAmount += vatAmount;
                  overallCcCharge += ccChargeAmount;
                  overallDiscountAmount += discountAmount;
                  overallSubTotal += subtotal;

                  overallNonTaxableAmount += discountAmount;
                  overallTotalAmount += subtotal;

                  overallTaxableAmount += subtotal - discountAmount;
            });

            setFormData((prevData) => ({
                  ...prevData,
                  subtotal: overallSubTotal.toFixed(2),
                  vatAmount: overallVatAmount.toFixed(2),
                  ccCharge: overallCcCharge.toFixed(2),
                  taxableAmount: overallTaxableAmount.toFixed(2),
                  nonTaxableAmount: overallNonTaxableAmount.toFixed(2),
                  totalAmount: overallTotalAmount.toFixed(2),
                  discountAmount: overallDiscountAmount.toFixed(2),
            }));
      };

      const addItem = () => {
            setItems([
                  ...items,
                  {
                        genericName: "",
                        quantity: 0,
                        freeQty: 0,
                        totalQty: 0,
                        standardRate: 0,
                        subtotal: 0,
                        ccChargePercentage: 0,
                        ccChargeAmount: 0,
                        discountPercentage: 0,
                        discountAmount: 0,
                        vatPercentage: 0,
                        vatAmount: 0,
                        totalAmount: 0,
                        remarks: "",
                  },
            ]);
      };

      const removeItem = (index) => {
            setItems(items.filter((_, i) => i !== index));
      };

      const handleCloseForm = () => {
            setFormVisible(false);
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!selectedSupplierId) {
                  alert("Please select a supplier.");
                  return;
            }

            const updateData = {
                  poId: formData.poId,
                  poDate: formData.poDate,
                  deliveryDays: parseInt(formData.deliveryDays) || 0,
                  deliveryAddress: formData.deliveryAddress,
                  deliveryDate: formData.deliveryDate,
                  referenceNumber: formData.referenceNo,
                  contact: formData.contact,
                  invoicingAddress: formData.invoicingAddress,
                  subTotal: parseFloat(formData.subtotal) || 0,
                  taxableAmount: parseFloat(formData.taxableAmount) || 0,
                  vatAmount: parseFloat(formData.vatAmount) || 0,
                  discountAmount: parseFloat(formData.discountAmount) || 0,
                  inWords: formData.inWords,
                  termsAndCondition: formData.termsAndCondition,
                  discountPercent: parseFloat(formData.discountPercentage) || 0,
                  nonTaxableAmount: parseFloat(formData.nonTaxableAmount) || 0,
                  ccCharge: parseFloat(formData.ccCharge) || 0,
                  totalAmount: parseFloat(formData.totalAmount) || 0,
                  supplierDTO: {
                        suppliersId: selectedSupplierId,
                  },
                  locationMasterDTO: {
                        id: formData.locationMasterDTO.id,
                  },
                  purchaseOrderItemDTOs: items.map((item) => ({
                        quantity: parseInt(item.itemQuantity) || 0,
                        freeQuantity: parseInt(item.freeQuantity) || 0,
                        totalQuantity: parseInt(item.totalQuantity) || 0,
                        vatPercentage: parseFloat(item.vatPercentage) || 0,
                        standardRate: parseFloat(item.standardRate) || 0,
                        subTotal: parseFloat(item.subtotal) || 0,
                        ccCharge: parseFloat(item.ccChargeAmount) || 0,
                        discountPercent: parseFloat(item.discountPercentage) || 0,
                        totalAmount: parseFloat(item.totalAmount) || 0,
                        remarks: item.remarks,
                        pharmacyItemMasterDTO: item.pharmacyItemMasterDTO,
                  })),
            };
            console.log(JSON.stringify(updateData, null, 2));

            try {
                  await axios.put(
                        `${API_BASE_URL}/purchaseorders/${formData.purchaseOrderId}`,
                        updateData
                  );
                  alert("Purchase order updated successfully!");
            } catch (error) {
                  console.error("Error updating purchase order:", error);
                  alert("Failed to update purchase order.");
            }
      };

      if (!formVisible) return null;
      return (
            <form className="purchase-order-form" onSubmit={handleSubmit}>
                  <div className="div-add-good-purchase">
                        <h5>Update Purchase Order</h5>
                  </div>
                  <div className="purchase-order-form-summary">
                        <div className="purchase-order-form-item">
                              <label>
                                    Supplier:<span className="purchase-span">*</span>
                              </label>
                              <select
                                    name="supplier"
                                    value={selectedSupplierId || ""}
                                    onChange={handleSupplierChange}
                                    required
                              >
                                    <option value="">Select Supplier</option>
                                    {suppliers.map((supplier) => (
                                          <option key={supplier.suppliersId} value={supplier.suppliersId}>
                                                {supplier.supplierName}
                                          </option>
                                    ))}
                              </select>
                        </div>
                        <div className="purchase-order-form-item">
                              <label>
                                    PO Date:<span className="purchase-span">*</span>
                              </label>
                              <input
                                    type="date"
                                    name="poDate"
                                    value={formData.poDate}
                                    onChange={handleChangeInput}
                              />
                        </div>
                        <div className="purchase-order-form-item">
                              <label>Delivery Days:</label>
                              <input
                                    type="number"
                                    name="deliveryDays"
                                    value={formData.deliveryDays}
                                    onChange={handleChangeInput}
                              />
                        </div>
                        <div className="purchase-order-form-item">
                              <label>Delivery Address:</label>
                              <input
                                    name="deliveryAddress"
                                    value={formData.deliveryAddress}
                                    onChange={handleChangeInput}
                              ></input>
                        </div>

                        <div className="purchase-order-form-item">
                              <label>Delivery Date:</label>
                              <input
                                    type="date"
                                    name="deliveryDate"
                                    value={formData.deliveryDate}
                                    onChange={handleChangeInput}
                              />
                        </div>
                        <div className="purchase-order-form-item">
                              <label>Reference No.:</label>
                              <input
                                    type="text"
                                    name="referenceNo"
                                    value={formData.referenceNo}
                                    onChange={handleChangeInput}
                              />
                        </div>

                        <div className="purchase-order-form-item">
                              <label>Contact:</label>
                              <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChangeInput}
                              />
                        </div>
                        <div className="purchase-order-form-item">
                              <label>Invoicing Address:</label>
                              <input
                                    name="invoicingAddress"
                                    value={formData.invoicingAddress}
                                    onChange={handleChangeInput}
                              ></input>
                        </div>
                        <div className="purchase-order-form-item">
                              <label>Location:</label>
                              <div className="purchase-order-search-field">
                                    <input
                                          className="purchase-order-tableinput"
                                          type="text"
                                          value={formData?.locationMasterDTO?.locationName}
                                    />
                                    <button
                                          type="button"
                                          className="purchase-order-search-icon"
                                          onClick={() => setActivePopup("Location")}
                                    >
                                          <svg viewBox="0 0 24 24" width="18" height="18">
                                                <path
                                                      fill="currentColor"
                                                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                                                />
                                          </svg>
                                    </button>
                              </div>
                        </div>
                        <div className="purchase-order-form-item"></div>
                  </div>

                  <div className="purchase-order-com-tab">
                        <table className="order-purchase-table">
                              <thead>
                                    <tr>
                                          {[
                                                "Generic Name",
                                                "Item Name",
                                                "Quantity",
                                                "Free Qty",
                                                "Total Qty",
                                                "Standard Rate",
                                                "SubTotal",
                                                "CCCharge %",
                                                "Dis %",
                                                "VAT %",
                                                "Total Amt",
                                                "Remarks",
                                                "Action",
                                          ].map((header, index) => (
                                                <th key={index}>{header}</th>
                                          ))}
                                    </tr>
                              </thead>
                              <tbody>
                                    {items?.map((item, index) => (
                                          <tr key={index}>
                                                <td>
                                                      <select
                                                            className="purchse-order-in"
                                                            name="genericName"
                                                            value={item.genericName || ""} // Use genericName here
                                                            onChange={(e) => handleInputChange(index, e)}
                                                      >
                                                            <option value="">Select Generic Name</option>
                                                            {availableGenerics.map((availableGeneric) => (
                                                                  <option
                                                                        key={availableGeneric.genericNameId}
                                                                        value={availableGeneric.genericName} // Use genericName here
                                                                  >
                                                                        {availableGeneric.genericName}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </td>
                                                <td>
                                                      <select
                                                            className="purchse-order-in"
                                                            name="itemName"
                                                            value={item.itemName}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                      >
                                                            <option value="">Select Item</option>
                                                            {availableItems.map((availableItem) => (
                                                                  <option
                                                                        key={availableItem.itemId}
                                                                        value={availableItem.itemName}
                                                                  >
                                                                        {availableItem.itemName}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </td>{" "}
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="itemQuantity"
                                                            value={item.itemQuantity}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="freeQuantity"
                                                            value={item.freeQuantity}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="totalQuantity"
                                                            value={item.totalQuantity}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="standardRate"
                                                            value={item.standardRate || "0"} // Use updated standardRate
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="subtotal"
                                                            value={item.subtotal}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="ccChargePercentage"
                                                            value={item.ccChargePercentage}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="discountPercentage"
                                                            value={item.discountPercentage}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="vatPercentage"
                                                            value={item.vatPercentage}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="totalAmount"
                                                            value={item.totalAmount}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            disabled
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="text"
                                                            name="remarks"
                                                            value={item.remarks}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="purchse-order-in"
                                                      />
                                                </td>
                                                <td>
                                                      <button
                                                            type="button"
                                                            className="purchase-btn-order"
                                                            onClick={() => removeItem(index)}
                                                      >
                                                            Remove
                                                      </button>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
                  <div className="purchase-order-form-summary-buttons">
                        <button type="button" className="purchase-btn-order" onClick={addItem}>
                              Add Item
                        </button>
                  </div>
                  <br></br>
                  <div className="goods-receipt-totals-section">
                        <div className="purchase-order-form-summary">
                              <div className="purchase-order-form-item">
                                    <label>Sub Total:</label>
                                    <input
                                          type="text"
                                          name="subtotal"
                                          value={formData.subtotal}
                                          readOnly
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>Discount %:</label>
                                    <input
                                          type="number"
                                          name="discountPercentage"
                                          onChange={handleInputChange}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>Taxable Amount:</label>
                                    <input
                                          type="number"
                                          name="taxableAmount"
                                          value={formData.taxableAmount}
                                          onChange={handleInputChange}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>Non-Taxable Amount:</label>
                                    <input
                                          type="number"
                                          name="nonTaxableAmount"
                                          value={formData.nonTaxableAmount}
                                          onChange={handleInputChange}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>VAT Amount:</label>
                                    <input
                                          type="number"
                                          name="vatAmount"
                                          value={formData.vatAmount}
                                          onChange={handleInputChange}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>CC Charge:</label>
                                    <input
                                          type="number"
                                          name="ccCharge"
                                          value={formData.ccCharge}
                                          onChange={handleInputChange}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>Discount Amount:</label>
                                    <input
                                          type="number"
                                          name="discount"
                                          value={items.discountAmount}
                                          onChange={handleInputChange}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>Total Amount:</label>
                                    <input
                                          type="text"
                                          name="totalAmount"
                                          value={formData.totalAmount}
                                          onChange={handleInputChange}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>In Words:</label>
                                    <input
                                          type="text"
                                          name="inWords"
                                          value={formData.inWords}
                                          onChange={handleChangeInput}
                                    />
                              </div>
                              <div className="purchase-order-form-item">
                                    <label>Tearms and Conditions:</label>
                                    <input
                                          type="text"
                                          name="termsAndCondition"
                                          value={formData.termsAndCondition}
                                          onChange={handleChangeInput}
                                    />
                              </div>
                        </div>

                        <div className="purchase-order-form-summary-buttons">
                              <button type="submit" className="purchase-btn-order">
                                    Update
                              </button>
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
            </form>
      );
};

export default UpdatePurchaseOrder;
