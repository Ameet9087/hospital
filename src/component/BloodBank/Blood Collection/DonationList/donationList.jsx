import React, { useState, useEffect, useRef } from "react";
// import "../DonationList/donationList.css"
import "./donationList.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import axios from "axios";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput, FloatingSelect } from "../../../../FloatingInputs";
import { toast } from 'react-toastify';
function Donarlist() {
  const [donors, setDonors] = useState([]); // Store submitted donors

  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [formData, setFormData] = useState({
    hemoglobinLevel: "",
    pulse: "",
    temperature: "",
    vaccinationStatus: "",
    tattoosOrPiercings: "",
    allergiesOrReactions: "",
    bloodGroup: "",
    rhFactor: "",
    collectionDateTime: "",
    collectionSite: "",
    collectionMethod: "",
    volumeCollected: "",
    collectionBagNumber: "",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/donors/allDonors`)
      .then((response) => {
        setDonors(response.data); // Update the donors state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });
  }, [donors]);

  const handleAddInfo = (donor) => {
    // This opens the modal with the form.
    setSelectedDonor(donor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Modal is closing");
    setShowModal(false);
    setSelectedDonor(null);
  };

  const handleFormChange = (e) => {
    // Update the form values on change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate formData before submission
    if (
      !formData.hemoglobinLevel ||
      isNaN(parseFloat(formData.hemoglobinLevel))
    ) {
      toast.error("Hemoglobin Level must be a valid number.");
      return;
    }

    // Prepare payload
    const dataToSend = {
      fullName: selectedDonor.fullName,
      dateOfBirth: selectedDonor.dob,
      gender: selectedDonor.gender,
      contactNumber: selectedDonor.phoneNumber,
      emailAddress: selectedDonor.email,
      address: `${selectedDonor.address}, ${selectedDonor.city}, ${selectedDonor.state}, ${selectedDonor.postalCode}`,
      nationalId: selectedDonor.id,
      healthEligibilityInfo: {
        dateOfLastDonation: selectedDonor.lastDonationDate,
        weight: parseFloat(selectedDonor.weight),
        bloodPressure: "120/80",
        hemoglobinLevel: parseFloat(formData.hemoglobinLevel),
        pulseAndTemperature: `${formData.pulse}, ${formData.temperature}`,
        medicalHistory: selectedDonor.medication,
        travelHistory: selectedDonor.travelHistory,
        vaccinationStatus: formData.vaccinationStatus,
        tattoosOrPiercings: formData.tattoosOrPiercings,
        allergiesOrAdverseReactions: formData.allergiesOrReactions,
      },
      bloodTypeInfo: {
        bloodGroup: formData.bloodGroup,
        rhFactor: formData.rhFactor,
        crossMatchingInfo: "N/A",
      },
      consentInfo: {
        informedConsent: selectedDonor.consent,
      },
      bloodCollectionDetails: {
        collectionDateTime: formData.collectionDateTime,
        collectionSite: formData.collectionSite,
        collectionMethod: formData.collectionMethod,
        volumeCollected: parseFloat(formData.volumeCollected),
        collectionBagNumber: formData.collectionBagNumber,
        barcodeOrQrCode: "QR123456789",
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/basic-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
        toast.success('Proposal saved successfully!');

        // alert("Collection details submitted successfully!");
        handleCloseModal();
      } else {
        const errorData = await response.json();
        // console.error("Failed to submit data:", errorData);
        toast.error('Failed to save proposal. Please try again.');

        alert(`Error: ${errorData.message || "Submission failed."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the data.");
    }
  };

  return (
    <div className="bloodcollection">
      <h2>
        <i className="fa-solid fa-star-of-life"></i>Donor List
      </h2>
      <div className="donor-list-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Name",
                "Blood Group",
                "Phone",
                "Email",
                "Donation Date",
                "Actions",
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
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.fullName}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.phoneNumber}</td>
                <td>{donor.email}</td>
                <td>{donor.donationDate}</td>
                <td>
                  <button
                    className="bloodcollection-btn"
                    onClick={() => handleAddInfo(donor)}
                  >
                    Add Collection Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showModal} onClose={handleCloseModal}>
        <div className="bloodcollection-modal-content">
          <h6>Add Advanced Information for {selectedDonor?.fullName}</h6>
          <form className="bloodcollectionform" onSubmit={handleFormSubmit}>
            <div className="bloodcollectionform-container">
              <div className="bloodcollectionform-form-group">
                <FloatingInput
                  label={"Hemoglobin Level"}
                  type="text"
                  name="hemoglobinLevel"
                  value={formData.hemoglobinLevel}
                  onChange={handleFormChange}
                  required
                />

               
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Pulse"}
                  type="text"
                  name="pulse"
                  value={formData.pulse}
                  onChange={handleFormChange}
                  required
                />
              
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Temperature"}
                  type="text"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleFormChange}
                  required
                />
            
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Vaccination Status"}
                  type="text"
                  name="vaccinationStatus"
                  value={formData.vaccinationStatus}
                  onChange={handleFormChange}
                />
               
              </div>

              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Tattoos or Piercings"}
                  type="text"
                  name="tattoosOrPiercings"
                  value={formData.tattoosOrPiercings}
                  onChange={handleFormChange}
                />
              
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Allergies or Reactions"}
                  type="text"
                  name="allergiesOrReactions"
                  value={formData.allergiesOrReactions}
                  onChange={handleFormChange}
                />
               
              </div>
            </div>

            <div className="bloodcollectionform-container">
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Blood Group"}
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleFormChange}
                  required
                />
              
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"RH Factor"}
                  type="text"
                  name="rhFactor"
                  value={formData.rhFactor}
                  onChange={handleFormChange}
                  required
                />
              
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Collection Date and Time"}
                  type="datetime-local"
                  name="collectionDateTime"
                  value={formData.collectionDateTime}
                  onChange={handleFormChange}
                  required
                />
              
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Collection Site"}
                  type="text"
                  name="collectionSite"
                  value={formData.collectionSite}
                  onChange={handleFormChange}
                  required
                />
              
              </div>
            </div>

            <div className="bloodcollectionform-container">
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Collection Method"}
                  type="text"
                  name="collectionMethod"
                  value={formData.collectionMethod}
                  onChange={handleFormChange}
                  required
                />
              
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Volume Collected (ml)"}
                  type="number"
                  name="volumeCollected"
                  value={formData.volumeCollected}
                  onChange={handleFormChange}
                  required
                />
               
              </div>
              <div className="bloodcollectionform-form-group">
              <FloatingInput
                  label={"Collection Bag Number"}
                  type="text"
                  name="collectionBagNumber"
                  value={formData.collectionBagNumber}
                  onChange={handleFormChange}
                  required
                />
             
              </div>
            </div>
            <div>
              <button className="bloodcollection-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
}

export default Donarlist;
