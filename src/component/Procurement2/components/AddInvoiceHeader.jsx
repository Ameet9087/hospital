// import React, { useEffect, useState } from "react";
// import "./AddInvoiceHeader.css";
// import { API_BASE_URL } from "../../api/api";
// import axios from "axios";


// const InvoiceHeaderForm = ({ closeModal, invoiceHeader }) => {
//   const [formData, setFormData] = useState({
//     hospitalName: "",
//     address: "",
//     telephone: "",
//     email: "",
//     pinCode: "",
//     headerDescription: "",
//     isActive: true,
//   });
//   const [image, setImage] = useState(null);
//   const isEditing = !!invoiceHeader;
//   useEffect(() => {
//     console.log("header", invoiceHeader);
//     if (invoiceHeader) {
//       setFormData({
//         id: invoiceHeader.id,
//         hospitalName: invoiceHeader.hospitalName,
//         address: invoiceHeader.address,
//         telephone: invoiceHeader.telephone,
//         email: invoiceHeader.email,
//         headerDescription: invoiceHeader.headerDescription,
//         isActive: invoiceHeader.isActive,
//         pinCode: invoiceHeader.pinCode,
//         logoImage: invoiceHeader.logoImage, // Assuming it's a URL or file path
//       });
//     }
//   }, [invoiceHeader]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     console.log("Selected file:", file); // Debugging
//     setImage(file);
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   // Log formData before creating FormData object
//   //   console.log("FormData state before submission:", formData);
  
//   //   const form = new FormData();
//   //   form.append(
//   //     "invoiceHeader",
//   //     JSON.stringify({
//   //       ...formData,
//   //       isActive: formData.isActive ? "Y" : "N",
//   //     })
//   //   );
  
//   //   if (image!=null) {
//   //     form.append("logoImage", image);
//   //   } else {
//   //     console.error("Logo image is null");
//   //   }
  
//   //   console.log("FormData contents:");
//   //   for (const pair of form.entries()) {
//   //     console.log(`${pair[0]}: ${pair[1]}`);
//   //   }
  
//   //   try {
//   //     const response = await fetch(`${API_BASE_URL}/invoice-headers/add`, {
//   //       method: "POST",
//   //       body: form,
//   //     });
//   //     if (response.ok) {
//   //       closeModal();
//   //       alert("Invoice Header added successfully!");
//   //     } else {
//   //       alert("Failed to add Invoice Header. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error adding invoice header:", error);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     console.log("FormData state before submission:", formData);
  
//     const form = new FormData();
//     form.append(
//       "invoiceHeader",
//       JSON.stringify({
//         ...formData,
//         isActive: formData.isActive ? "Y" : "N",
//       })
//     );
  
//     // Only append logoImage if a new file is selected
//     if (image && typeof image !== "string") {
//       form.append("logoImage", image);
//     }
  
//     console.log("FormData contents:");
//     for (const pair of form.entries()) {
//       console.log(`${pair[0]}: ${pair[1]}`);
//     }
  
//     try {
//       const response = await fetch(`${API_BASE_URL}/invoice-headers/add`, {
//         method: "POST",
//         body: form,
//       });
//       if (response.ok) {
//         closeModal();
//         alert("Invoice Header updated successfully!");
//       } else {
//         alert("Failed to update Invoice Header. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating invoice header:", error);
//     }
//   };
  
//   return (
//     <div className="AddInvoiceHeader-invoice-header-form">
//       <h2 className="AddInvoiceHeader-heading">Add Invoice Header</h2>
//       <form onSubmit={handleSubmit} className="AddInvoiceHeader-grid">
//         {[
//           {
//             name: "hospitalName",
//             label: "Hospital Name",
//             type: "text",
//             required: true,
//           },
//           { name: "address", label: "Address", type: "text", required: true },
//           {
//             name: "telephone",
//             label: "Telephone",
//             type: "tel",
//             required: true,
//           },
//           { name: "email", label: "Email", type: "email", required: true },
//           { name: "pinCode", label: "PIN CODE", type: "text" },
//           {
//             name: "headerDescription",
//             label: "Header Description",
//             type: "text",
//           },
//         ].map(({ name, label, type, required }) => (
//           <div className="AddInvoiceHeader-form-row" key={name}>
//             <label htmlFor={name}>
//               {label}
//               {!isEditing && <span>*</span>}
//             </label>
//             <input
//               type={type}
//               name={name}
//               id={name}
//               value={formData[name]}
//               onChange={handleChange}
//               required={!isEditing} // Required only when adding a new entry
//             />
//           </div>
//         ))}

//         <div className="AddInvoiceHeader-form-row">
//           <label htmlFor="logoImage">
//             Logo Image {!isEditing && <span>*</span>}
//           </label>
//           <input
//             type="file"
//             name="logoImage"
//             id="logoImage"
//             accept="image/*"
//             onChange={handleFileChange}
//             required={!isEditing} // Required only when adding a new entry
//           />
//         </div>

//         <div className="AddInvoiceHeader-form-row">
//           <label htmlFor="isActive">Is Active</label>
//           <input
//             type="checkbox"
//             name="isActive"
//             id="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="AddInvoiceHeader-save-button">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InvoiceHeaderForm;
import React, { useEffect, useState } from "react";
import "./AddInvoiceHeader.css";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";

const InvoiceHeaderForm = ({ closeModal, invoiceHeader }) => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    telephone: "",
    email: "",
    pinCode: "",
    headerDescription: "",
    isActive: true,
  });
  const [image, setImage] = useState(null);
  const isEditing = !!invoiceHeader;
  const [invoiceHeaderId , setInvoiceHeaderId] = useState(null);
  useEffect(() => {
    
    if (invoiceHeader) {
      setInvoiceHeaderId(invoiceHeader.id),
      setFormData({

        hospitalName: invoiceHeader.hospitalName,
        address: invoiceHeader.address,
        telephone: invoiceHeader.telephone,
        email: invoiceHeader.email,
        headerDescription: invoiceHeader.headerDescription,
        isActive: invoiceHeader.isActive,
        pinCode: invoiceHeader.pinCode,
        logoImage: invoiceHeader.logoImage,
      });
    }
    console.log(invoiceHeader,"dddddd")
  }, [invoiceHeader]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      "invoiceHeader",
      JSON.stringify({
        ...formData,
        isActive: formData.isActive ? "Y" : "N",
      })
    );
    
    if (image && typeof image !== "string") {
      form.append("logoImage", image);
    }

    try {
      const response = isEditing
        ? await fetch(`${API_BASE_URL}/invoice-headers/update/${invoiceHeaderId}`, {
            method: "PUT",
            body: form,
          })
        : await fetch(`${API_BASE_URL}/invoice-headers/add`, {
            method: "POST",
            body: form,
          });
      
      if (response.ok) {
        closeModal();
        alert(`Invoice Header ${isEditing ? "updated" : "added"} successfully!`);
      } else {
        alert(`Failed to ${isEditing ? "update" : "add"} Invoice Header. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} invoice header:`, error);
    }
  };

  return (
    <div className="AddInvoiceHeader-invoice-header-form">
      <h2 className="AddInvoiceHeader-heading">
        {isEditing ? "Edit Invoice Header" : "Add Invoice Header"}
      </h2>
      <form onSubmit={handleSubmit} className="AddInvoiceHeader-grid">
        {["hospitalName", "address", "telephone", "email", "pinCode", "headerDescription"].map((name) => (
          <div className="AddInvoiceHeader-form-row" key={name}>
            <label htmlFor={name}>{name.replace(/([A-Z])/g, " $1").trim()}</label>
            <input
              type={name === "email" ? "email" : "text"}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              required={!isEditing}
            />
          </div>
        ))}

        <div className="AddInvoiceHeader-form-row">
          <label htmlFor="logoImage">Logo Image {!isEditing && <span>*</span>}</label>
          <input type="file" name="logoImage" id="logoImage" accept="image/*" onChange={handleFileChange} required={!isEditing} />
        </div>

        <div className="AddInvoiceHeader-form-row">
          <label htmlFor="isActive">Is Active</label>
          <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} />
        </div>

        <button type="submit" className="AddInvoiceHeader-save-button">
          {isEditing ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default InvoiceHeaderForm;
