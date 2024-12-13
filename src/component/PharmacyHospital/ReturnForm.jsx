import React, { useState, useEffect } from 'react';
import './ReturnForm.css';

const ReturnForm = () => {
  const [formData, setFormData] = useState({
    addItemId: "",
    breakageQty: "",
    avlQty: "",
    batch: "",
    expiryDate: "",
    salePrice: "",
    subTotal: "",
    discountAmt: "",
    vatPercent: "",
    totalAmount: "",
    breakageDate: "",
    remark: "",
    isActive: true,
  });
  const [addItems, setAddItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Add Items from API
  useEffect(() => {
    const fetchAddItems = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/add-items");
        if (response.ok) {
          const data = await response.json();
          setAddItems(data);
        } else {
          console.error("Failed to fetch add items.");
        }
      } catch (error) {
        console.error("Error fetching add items:", error);
      }
    };

    fetchAddItems();
  }, []);

  // Auto-fetch item details based on selected addItemId
  useEffect(() => {
    if (formData.addItemId) {
      const fetchItemDetails = async () => {
        try {
          const response = await fetch(`http://localhost:9999/api/add-items/${formData.addItemId}`);
          if (response.ok) {
            const data = await response.json();
            // Populate the form with fetched data
            setFormData((prevFormData) => ({
              ...prevFormData,
              avlQty: data.minStockQuantity || "",
              batch: data.batch || "",
              expiryDate: data.expiryDate || "",
              salePrice: data.salesRate || "",
            }));
            calculateTotalAmount(data);
          } else {
            console.error("Failed to fetch item details.");
          }
        } catch (error) {
          console.error("Error fetching item details:", error);
        }
      };

      fetchItemDetails();
    }
  }, [formData.addItemId]);

  // Calculate total amount based on fetched data
  const calculateTotalAmount = (itemData) => {
    const { salesRate, purchaseDiscount, vatPercent } = itemData;
    const breakageQty = parseFloat(formData.breakageQty) || 0;

    const subTotal = salesRate * breakageQty;
    const discountAmt = (purchaseDiscount / 100) * subTotal;
    const vatAmount = (vatPercent / 100) * (subTotal - discountAmt);
    const totalAmount = subTotal - discountAmt + vatAmount;

    setFormData((prevFormData) => ({
      ...prevFormData,
      subTotal: subTotal.toFixed(2),
      discountAmt: discountAmt.toFixed(2),
      vatPercent: vatPercent || 0,
      totalAmount: totalAmount.toFixed(2),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9999/api/breakage-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data saved successfully!");
        setFormData({
          addItemId: "",
          breakageQty: "",
          avlQty: "",
          batch: "",
          expiryDate: "",
          salePrice: "",
          subTotal: "",
          discountAmt: "",
          vatPercent: "",
          totalAmount: "",
          breakageDate: "",
          remark: "",
          isActive: true,
        });
      } else {
        console.error("Failed to save form data.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="return-form-component">
      <table className="return-form-table">
        <thead>
          <tr>
            <th></th>
            <th>Item Name</th>
            <th>Avl Qty</th>
            <th>Batch No</th>
            <th>Exp Date</th>
            <th>Qty</th>
            <th>Sale Price</th>
            <th>Sub Total</th>
            <th>Discount Amt</th>
            <th>VAT %</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button className="return-delete-btn">×</button>
            </td>
            <td>
              <select
                value={formData.addItemId}
                onChange={(e) =>
                  setFormData({ ...formData, addItemId: e.target.value })
                }
              >
                <option value="">Select Item</option>
                {addItems.map((item) => (
                  <option key={item.addItemId} value={item.addItemId}>
                    {item.itemName}
                  </option>
                ))}
              </select>
            </td>
            <td>{formData.avlQty}</td>
            <td>{formData.batch}</td>
            <td>{formData.expiryDate}</td>
            <td>
              <input
                type="number"
                value={formData.breakageQty}
                onChange={(e) =>
                  setFormData({ ...formData, breakageQty: e.target.value })
                }
              />
            </td>
            <td>{formData.salePrice}</td>
            <td>{formData.subTotal}</td>
            <td>{formData.discountAmt}</td>
            <td>{formData.vatPercent}</td>
            <td>{formData.totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <div className="return-summary">
        <div className="summary-item-com">
          <label>SubTotal:</label>
          <input type="text" value={formData.subTotal || "0"} readOnly />
        </div>
        <div className="summary-item-com">
          <label>Discount:</label>
          <input type="text" value={formData.discountAmt || "0"} readOnly />
        </div>
        <div className="summary-item-com">
          <label>VAT Amount:</label>
          <input type="text" value={formData.vatPercent || "0"} readOnly />
        </div>
        <div className="summary-item-com">
          <label>Total Amount:</label>
          <input type="text" value={formData.totalAmount || "0"} readOnly />
        </div>
        <div className="summary-item-com-in-words">In Words : Only.</div>
      </div>

      <div className="summary-item-com-buttons">
        <button
          className="summary-item-com-return-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Return"}
        </button>
        <button
          className="summary-item-com-cancel-btn"
          onClick={() => setFormData({})}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReturnForm;
