import React, { useState, useEffect } from "react";
import "./DiscountAuthorityMaster.css";
import axios from "axios";
import PopupTable from "../../Admission/PopupTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";

const DiscountAuthorityMaster = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [files, setFiles] = useState([]);
  const [userNameData, setUserNameData] = useState([]);
  const [fileInput, setFileInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    authorizationName: "",
    mobileNo: "",
    sendSMS: "",
    active: "",
    discountPercentage: "",
    userName: "",
    fileName: "",
    digitalSignature: "",
  });

  useEffect(() => {
    if (activePopup === "UserName") {
      fetchUserName();
    }
  }, [activePopup]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
    });
  };

  const handleFileInputChange = (e) => {
    const { name, value, files } = e.target;
    setFileInput((prevFileInput) => ({
      ...prevFileInput,
      [name]: name === "file" ? files[0] : value,
    }));
  };

  const handleFileUpload = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      setFiles([...files, { ...fileInput }]);
      setFileInput({ fileName: "", file: null });
    } catch (error) {
      alert("File upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const validateForm = () => {
    if (!formData.authorizationName) {
      alert("Authorization Name is required.");
      return false;
    }
    if (!formData.mobileNo) {
      alert("Mobile Number is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const uploadedFile = files.length > 0 ? files[0] : null;
    const fileName = uploadedFile?.fileName || "";
    let digitalSignature = null;

    if (uploadedFile?.file) {
      const reader = new FileReader();
      reader.onload = async () => {
        digitalSignature = btoa(reader.result);

        const payload = {
          authorizationName: formData.authorizationName,
          mobileNo: formData.mobileNo,
          sendSMS: formData.sendSMS,
          active: formData.active,
          discountPercentage: parseFloat(formData.discountPercentage) || 0,
          fileName,
          digitalSignature,
          employee: {
            userName: formData.userName,
            employeeId: formData.id,
          },
        };

        try {
          const response = await axios.post(
            `${API_BASE_URL}/discount-authorities`,
            payload
          );
          alert("Form submitted successfully.");
        } catch (error) {
          console.error("Error submitting form:", error);
          alert(
            error.response?.data || "Error submitting form. Please try again."
          );
        }
      };
      reader.readAsBinaryString(uploadedFile.file);
    } else {
      alert("No digital signature file selected.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/discount-authorities`
        );
        const data = response.data;

        setFormData({
          authorizationName: data.authorizationName || "",
          mobileNo: data.mobileNo || "",
          discountPercentage: data.discountPercentage || "",
          userName: data.employee?.userName || "",
        });

        if (data.fileName || data.digitalSignature) {
          setFiles([
            {
              fileName: data.fileName || "",
              file: data.digitalSignature
                ? { name: "Digital Signature" }
                : null,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserName();
    fetchData();
  }, []);

  const fetchUserName = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/employees/get-all-employee`
      );
      setUserNameData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSelect = (data) => {
    if (activePopup === "UserName") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userName: data.firstName,
        id: data.employeeId,
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "UserName") {
      return {
        columns: ["employeeId", "firstName"],
        data: userNameData.map((user) => ({
          employeeId: user.employeeId,
          firstName: user.firstName,
        })),
      };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();

  return (
    <div className="DiscountAuthorityMaster-container">
      <div className="DiscountAuthorityMaster-header">
        <span>Discount Authority Master</span>
      </div>
      <div className="DiscountAuthorityMaster-content">
        <div className="DiscountAuthorityMaster-section">
          {/* Form Fields */}
          <div className="DiscountAuthorityMaster-data">
            <label>Authorization Name :</label>
            <input
              type="text"
              name="authorizationName"
              value={formData.authorizationName}
              onChange={handleInputChange}
            />
          </div>
          <div className="DiscountAuthorityMaster-data">
            <label>Mobile No :</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="DiscountAuthorityMaster-Section-header">Status</div>
          <div className="DiscountAuthorityMaster-data">
            <label>Send SMS (Ref. Dr/Org):</label>
            <input
              type="checkbox"
              name="sendSMS"
              checked={formData.sendSMS === "Yes"}
              onChange={handleInputChange}
            />
          </div>
          <div className="DiscountAuthorityMaster-data">
            <label>Active:</label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active === "Yes"}
              onChange={handleInputChange}
            />
          </div>
          <div className="DiscountAuthorityMaster-data">
            <label>Discount % Authorized To Give:</label>
            <input
              type="text"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleInputChange}
            />
          </div>
          <div className="DiscountAuthorityMaster-data">
            <label>Select Authority Person's UserName:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
            <FontAwesomeIcon
              className="DiscountAuthorityMaster-search-icon"
              icon={faSearch}
              onClick={() => setActivePopup("UserName")}
            />
          </div>

          {/* File Upload Section */}
          <div className="AttachDigitalSignature-section">
            <div className="DiscountAuthorityMaster-Section-header">
              Attach Digital Signature Here
            </div>
            <div className="DiscountAuthorityMaster-data">
              <label>File Name:</label>
              <input
                type="text"
                name="fileName"
                value={fileInput.fileName}
                onChange={handleFileInputChange}
              />
            </div>
            <div>
              <label>Choose File:</label>
              <input type="file" name="file" onChange={handleFileInputChange} />
            </div>
            <button
              onClick={handleFileUpload}
              className="DiscountAuthorityMaster-upload"
              disabled={isLoading}
            >
              Upload
            </button>
          </div>

          {/* Files Table */}
          <div className="DiscountAuthorityMaster-table">
            <table>
              <thead>
                <tr>
                  <th>Delete</th>
                  <th>Sr.No.</th>
                  <th>Name</th>
                  <th>FileName</th>
                </tr>
              </thead>
              {files.length > 0 && (
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index}>
                      <td>
                        <button onClick={() => handleDeleteFile(index)}>
                          Delete
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td>{file.fileName}</td>
                      <td>{file.file?.name}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )}
      </div>
      <div className="DiscountAuthorityMaster-navbar">
        <aside className="DiscountAuthorityMaster-navbar-btns">
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
         
        </aside>
      </div>
    </div>
  );
};

export default DiscountAuthorityMaster;
