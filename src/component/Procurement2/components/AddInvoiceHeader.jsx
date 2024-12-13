import React, { useState } from "react";
import "./AddInvoiceHeader.css";
import { API_BASE_URL } from "../../api/api";

const InvoiceHeaderForm = ({closeModal}) => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    telephone: "",
    email: "",
    pinCode: "",
    headerDescription: "",
    isActive: true,
  });
  const [image,setImage]=useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  console.log("Selected file:", file); // Debugging
  setImage(file);
};



 const handleSubmit = async (e) => {
  e.preventDefault();

  // Log formData before creating FormData object
  console.log("FormData state before submission:", formData);

  const form = new FormData();
  form.append(
    "invoiceHeader",
    JSON.stringify({
      ...formData,
      isActive: formData.isActive ? "Y" : "N",
    })
  );

  if (image!=null) {
    form.append("logoImage", image);
  } else {
    console.error("Logo image is null");
  }

  console.log("FormData contents:");
  for (const pair of form.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/invoice-headers/add`, {
      method: "POST",
      body: form,
    });
    if (response.ok) {
      closeModal();
      alert("Invoice Header added successfully!");
    } else {
      alert("Failed to add Invoice Header. Please try again.");
    }
  } catch (error) {
    console.error("Error adding invoice header:", error);
  }
};

  return (
    <div className="AddInvoiceHeader-invoice-header-form">
      <h2 className="AddInvoiceHeader-heading">Add Invoice Header</h2>
      <form onSubmit={handleSubmit} className="AddInvoiceHeader-grid">
        {[
          { name: "hospitalName", label: "Hospital Name", type: "text", required: true },
          { name: "address", label: "Address", type: "text", required: true },
          { name: "telephone", label: "Telephone", type: "tel", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "pinCode", label: "PIN CODE", type: "text" },
          { name: "headerDescription", label: "Header Description", type: "text" },
        ].map(({ name, label, type, required }) => (
          <div className="AddInvoiceHeader-form-row" key={name}>
            <label htmlFor={name}>{label}{required && <span>*</span>}</label>
            <input
              type={type}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              required={required}
            />
          </div>
        ))}

        <div className="AddInvoiceHeader-form-row">
  <label htmlFor="logoImage">Logo Image<span>*</span></label>
  <input
    type="file"
    name="logoImage"
    id="logoImage"
    accept="image/*"
    onChange={handleFileChange}
    required
  />
</div>

        <div className="AddInvoiceHeader-form-row">
          <label htmlFor="isActive">
            Is Active
          </label>
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="AddInvoiceHeader-save-button">Save</button>
      </form>
    </div>
  );
};

export default InvoiceHeaderForm;
