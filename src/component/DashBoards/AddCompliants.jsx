// import React, { useState } from "react";

// const DynamicInputForm = () => {
//   const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);

//   const handleAddField = () => {
//     setInputFields([
//       ...inputFields,
//       { id: inputFields.length + 1, value: "" },
//     ]);
//   };

//   const handleRemoveField = (id) => {
//     setInputFields(inputFields.filter((field) => field.id !== id));
//   };

//   const handleInputChange = (id, value) => {
//     const updatedFields = inputFields.map((field) => {
//       if (field.id === id) {
//         return { ...field, value: value };
//       }
//       return field;
//     });
//     setInputFields(updatedFields);
//   };

//   return (
//     <div>
//       {inputFields.length === 0 ? (
//         <div>No Records Found</div>
//       ) : (
//         inputFields.map((field) => (
//           <div key={field.id} style={{ marginBottom: "10px" }}>
//             <textarea
//               value={field.value}
//               onChange={(e) => handleInputChange(field.id, e.target.value)}
//               rows={2}
//               style={{ width: "300px" }}
//             />
//             <button
//               onClick={() => handleRemoveField(field.id)}
//               style={{
//                 backgroundColor: "blue",
//                 color: "white",
//                 marginLeft: "10px",
//               }}
//             >
//               X
//             </button>
//           </div>
//         ))
//       )}
//       <button
//         onClick={handleAddField}
//         style={{
//           marginTop: "10px",
//           backgroundColor: "#3c3cff",
//           color: "white",
//           padding: "5px 15px",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Add
//       </button>
//     </div>
//   );
// };

// export default DynamicInputForm;
