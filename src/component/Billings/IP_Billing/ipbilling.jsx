// AjharTamboli 22-11-24 iPBilling.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import "./ipbilling.css";
import { API_BASE_URL } from "../../api/api";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
} from "../../../FloatingInputs";
import { toast } from "react-toastify";
import IpBillingPrint from "../IP_Billing/IpBillingPrint"
import CustomModal from "../../../CustomModel/CustomModal";



const IpBilling = () => {
  const [selectedTab, setSelectedTab] = useState("testGrid");
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const [services, setServices] = useState("");
  const ServiceHeading = ["serviceId", "serviceName", "serviceCode", "rate"];
  const [activePopup, setActivePopup] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [previousBills, setPreviousBills] = useState([]); // State to hold API data
  const [serviceData, setServiceData] = useState([]); // Store fetched service data
  const [selectedService, setSelectedService] = useState(null); // Store the selected service
  const [serviceCode, setServiceCode] = useState(""); // Store the service code
  const [rate, setRate] = useState(0);
  const [ipAdmissionPatient, setIpAdmissionPatient] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finaltotalamt, setTotalAmt] = useState(0);
  const [isPrintEnabled, setIsPrintEnabled] = useState(false);
  const [billFromResponse, setBillFromResponse] = useState(null);



  const [finalTotalDrVisit, setFinalTotalDrVisit] = useState([]);
  // doctor visit
  const [doctors, setDoctors] = useState([]); // State to store the doctors data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors
  const [doctorVisit, setDoctorVisit] = useState(null);

  // Handle change event when a service is selected
  const handleServiceChange = (event, index) => {
    const selectedId = event.target.value;
    const selectedService = serviceData.find(
      (service) => service.serviceId.toString() === selectedId
    );
    if (selectedService) {
      const updatedRow = {
        ...servicesData[index],
        serviceName: selectedService.serviceName,
        code: selectedService.serviceCode,
        rate: selectedService.rate,
        qty: 0, // Reset quantity when a new service is selected (optional)
      };
      // Update the row with the new values
      setServicesData((prevRows) =>
        prevRows.map((row, i) => (i === index ? updatedRow : row))
      );
    }
  };
  // Fetch data when component mounts
  // const fetchPreviousBills = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       // `${API_BASE_URL}/ipbillings/previous-bills/${patientData.ipAdmmissionId}`
  //       `${API_BASE_URL}/ipbillings/${id}`
  //     );
  //     setPreviousBills(response.data); // Update state with fetched data
  //   } catch (error) {
  //     console.error("Error fetching previous bills:", error);
  //   }
  // };
  const fetchPreviousBills = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ipbillings/${id}`);
      console.log("fetch previous test grid", response.data);
      setPreviousBills(response.data.testGridIpdBill); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching previous bills:", error);
    }
  };
  // useEffect(() => {
  //   fetchPreviousBills();
  // }, []);
  const handleSelect = async (data) => {
    if (activePopup === "services") {
      setSelectedService(data);
      setTestGridTableRowsableRows((prevRows) => {
        // Check if the service already exists in the table
        const isDuplicate = prevRows.some(
          (row) =>
            row.code === data.serviceCode &&
            row.serviceName === data.serviceName &&
            row.serviceDetailsId === data.serviceDetailsId
        );
        if (isDuplicate) {
          console.log("Duplicate service detected, skipping addition");
          return prevRows; // Return the existing rows without modification
        }
        // Find an empty row to update
        const emptyRowIndex = prevRows.findIndex(
          (row) =>
            !row.serviceDetailsId ||
            row.serviceDetailsId === "" ||
            !row.code ||
            !row.serviceName
        );
        if (emptyRowIndex !== -1) {
          // Update the existing empty row
          const updatedRows = [...prevRows];
          updatedRows[emptyRowIndex] = {
            ...updatedRows[emptyRowIndex],
            serviceDetailsId: data.serviceDetailsId,
            code: data.serviceCode,
            serviceName: data.serviceName,
            doctorName: "", // Default or can be populated as needed
            rate: data.rates && data.rates.length > 0 ? data.rates[0] : "", // Ensure rates[0] exists
            qty: 1, // Default quantity
            totalAmt: data.rates && data.rates.length > 0 ? data.rates[0] : "", // Set the rate for totalAmt
            lessDisc: "",
            discAmt: "",
            netAmt: data.rates && data.rates.length > 0 ? data.rates[0] : "", // Set netAmt to rate
            emerg: "",
            emergAmt: "",
          };
          console.log("Updated existing empty row with service:", updatedRows);
          return updatedRows;
        }
        // If no empty row, add as a new row
        const updatedRows = [
          ...prevRows,
          {
            sn: prevRows.length ? prevRows[prevRows.length - 1].sn + 1 : 1, // Ensure unique sn
            code: data.serviceCode,
            serviceName: data.serviceName,
            serviceDetailsId: data.serviceDetailsId,
            doctorName: "",
            rate: data.rates && data.rates.length > 0 ? data.rates[0] : "",
            qty: 1,
            totalAmt: data.rates && data.rates.length > 0 ? data.rates[0] : "",
            lessDisc: "",
            discAmt: "",
            netAmt: data.rates && data.rates.length > 0 ? data.rates[0] : "",
            emerg: "",
            emergAmt: "",
          },
        ];
        console.log("Added new service row:", updatedRows);
        return updatedRows;
      });
    } else if (activePopup === "ipAdmission") {
      const ipData = ipAdmissionPatient.find(
        (ipPatient) => ipPatient.patient.inPatientId == data.inPatientId
      );

      setPatientData(ipData);
      console.log("selectedPatient prachi1", ipData);
      fetchPreviousBills(ipData.ipAdmmissionId);
    }
    if (activePopup === "doctor") {
      const mappedDoctors = doctors.map((doctor) => ({
        doctorId: doctor.doctorId,
        doctorName: doctor.doctorName,
        specialization:
          doctor.specialisationId?.specialisationName || doctor.specialization,
        email: doctor.emailId,
        mobileNumber: doctor.mobileNumber,
        morningFirstVisitFee: doctor.orgDoctorFees?.[0]?.morningFirstVisit || 0,
        eveningFirstVisitFee: doctor.orgDoctorFees?.[0]?.eveningFirstVisit || 0,
        referralVisitFee: doctor.orgDoctorFees?.[0]?.referralVisit || 0,
        generalOpdFee: doctor.orgDoctorFees?.[0]?.generalOpdFee || 0,
        payTypeName: doctor.orgDoctorFees?.[0]?.payType?.payTypeName || "N/A",
      }));

      console.log("Mapped Doctors:", mappedDoctors);

      setDoctorVisitRows((prevRows) => {
        // Check if the selected doctor already exists in the table
        const isDuplicate = prevRows.some(
          (row) =>
            row.doctorId === data.doctorId && row.doctorName === data.doctorName
        );

        if (isDuplicate) {
          console.log("Duplicate doctor detected, skipping addition.");
          return prevRows; // Return the existing rows without changes
        }

        // Find an empty row to update
        const emptyRowIndex = prevRows.findIndex(
          (row) => !row.doctorId || row.doctorId === "" || !row.doctorName
        );

        if (emptyRowIndex !== -1) {
          console.log(data);

          const updatedRows = [...prevRows];
          updatedRows[emptyRowIndex] = {
            ...updatedRows[emptyRowIndex],
            doctorId: data.doctorId,
            doctorName: data.doctorName,
            specialization: data.specialization,
            generalOpdFee: data.orgDoctorFees[0]?.generalOpdFee || 0,
            rate: data.generalOpdFee || 0,
            qty: 1,

            totalAmt: data.orgDoctorFees[0]?.generalOpdFee || 0,
            // totalAmt: data.orgDoctorFees[0]?.generalOpdFee || 0,
            netAmt: data.orgDoctorFees[0]?.generalOpdFee || 0,
          };
          console.log("Updated existing empty row with doctor:", updatedRows);
          return updatedRows;
        }

        // If no empty row exists, add as a new row
        const updatedRows = [
          ...prevRows,
          {
            sn: prevRows.length ? prevRows[prevRows.length - 1].sn + 1 : 1, // Ensure unique serial number
            doctorId: data.doctorId,
            doctorName: data.doctorName,
            specialization: data.specialization,
            generalOpdFee: data.generalOpdFee || 0,
            rate: data.generalOpdFee || 0,
            qty: 1,
            totalAmt: data.generalOpdFee || 0,
            netAmt: data.generalOpdFee || 0,
          },
        ];
        console.log("Added new doctor row: prachi 2", updatedRows);
        return updatedRows;
      });
    }

    setActivePopup(null); // Close the popup after selection
  };

  const handleDoctorNameChange = (e) => {
    const updatedDoctorVisit = [...doctorVisit];
    if (updatedDoctorVisit[0]) {
      updatedDoctorVisit[0].doctorName = e.target.value;
      setDoctorVisit(updatedDoctorVisit);
    }
  };
  const getPopupData = () => {
    if (activePopup === "services") {
      return { columns: ["serviceName", "rates"], data: serviceData };
    } else if (activePopup === "ipAdmission") {
      if (ipAdmissionPatient && Array.isArray(ipAdmissionPatient)) {
        // Use map to extract patient data from each item in the array
        const patientData = ipAdmissionPatient.map((admission) => {
          return {
            uhid: admission.patient.patient.uhid,
            inPatientId: admission.patient.inPatientId,
            firstName: admission.patient.patient.firstName,
            lastName: admission.patient.patient.lastName,
          };
        });
        return {
          columns: ["uhid", "inPatientId", "firstName", "lastName"],
          data: patientData, // Data now contains an array of patients
        };
      } else {
        console.error("ipAdmissionPatient is not an array or is missing.");
        return {
          columns: ["uhid", "inPatientId", "firstName", "lastName"],
          data: [], // Return empty data if ipAdmissionPatient is invalid
        };
      }
    } else if (activePopup === "doctor") {
      return { columns: ["doctorName", "specialization"], data: doctors };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  useEffect(() => {
    const fetchAdmittedPatientData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/ip-admissions/admitted`
        );
        setIpAdmissionPatient(response.data);
      } catch (error) {
        console.error("Error fetching admitted patient data:", error);
      }
    };
    fetchAdmittedPatientData();
    fetchServiceDetails();
  }, []);
  if (!patientData) {
    return <div>Loading patient data...</div>;
  }
  const [currentDate, setCurrentDate] = useState("");
  // Set the current date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setCurrentDate(formattedDate);
    const formattedTime = today.toTimeString().slice(0, 5); // Extract HH:MM
    setCurrentTime(formattedTime);
  }, []);
  const handleSaveData = () => {
    //const totalAmount = serviceData.reduce((sum, service) => sum + service.totalAmt, 0);
    console.log(testGridTableRowsableRows);
    console.log(finaltotalamt);
    const dataToPost = {
      ipAdmission: {
        ipAdmmissionId: patientData.ipAdmmissionId,
      },
      billingDate: new Date().toISOString(),
      billingTime: new Date().toISOString(),
      qnt: 0,
      billingUser: "John Doe",
      timing: "2024-12-09T15:30:00",
      emergency: null,
      total: finaltotalamt, // Include the total amount here
      disc: discountAmount, // Include the total discount applied
      netAmt: finaltotalamt - discountAmount, // Net amount after discount
      // services: serviceData.map((service) => ({
      //   serviceId: service.serviceId,
      //   serviceName: service.serviceName,
      //   serviceType: service.serviceType,
      //   serviceCode: service.serviceCode,
      //   rate: service.rate,
      //   qnt: service.qty,
      //   total: service.totalAmt,
      testGridIpdBill: testGridTableRowsableRows.map((service) => ({
        serviceId: service.serviceId,
        serviceName: service.serviceName,
        serviceType: service.serviceType,
        rate: service.rate,
        quantity: service.qty,
      })),
    };
    console.log(JSON.stringify(dataToPost, null, 2));
    fetch(`${API_BASE_URL}/ipbillings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setBillFromResponse(data);
        toast.success("Data successfully saved:", data);
        setIsPrintEnabled(true);

      })
      .catch((error) => toast.error("Error saving data:", error));
    setIsPrintEnabled(false);

  };

  // prachi dr visit
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors data:", err);
        setError("Failed to fetch doctors data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    fetchDoctors();
  }, []);

  // prachi post Dr

  const [formData, setFormData] = useState({
    doctorVisitId: "",
    ipAdmissionId: patientData.ipAdmmissionId,
    doctorId: "",
    visitDate: currentDate,
    visitTime: currentTime,
    doctorName: "",
    visitReason: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postDrVisitData = async (e) => {
    e.preventDefault();
    console.log("patient id", patientData.ipAdmmissionId);
    // Prepare the visit data to be sent from the table and form data
    const visitData = doctorVisitRows.map((row) => ({
      drVisitId: row.sn,
      ipAdmissionDto: { ipAdmmissionId: patientData.ipAdmmissionId },
      addDoctorDto: { doctorId: row.doctorId },
      visitDate: row.date,
      visitTime: formData.visitTime,
      doctorName: row.doctorName,
      visitReason: row.visitReasons,
      remarks: formData.remarks,
    }));

    // Log the visitData to see its structure and contents
    console.log("visited data", visitData);
    try {
      const response = await axios.post(`${API_BASE_URL}/dr-visits`, visitData);
      console.log("Data posted successfully:", response.data);
      alert("Data posted successfully");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleRowUpdate = (id, field, value) => {
    setServicesData((prevRows) =>
      prevRows.map((row) => {
        if (row.sn === id) {
          const updatedRow = { ...row, [field]: parseFloat(value) || 0 };
          updatedRow.total = (updatedRow.rate || 0) * (updatedRow.qty || 0);
          updatedRow.discAmount =
            (updatedRow.total * (updatedRow.disc || 0)) / 100;
          updatedRow.netAmount = updatedRow.total - updatedRow.discAmount;
          return updatedRow;
        }
        return row;
      })
    );
  };
  // State to manage table rows
  const [testGridTableRowsableRows, setTestGridTableRowsableRows] = useState([
    {
      sn: 1,
      serviceDetailsId: "",
      code: "",
      serviceName: "",
      doctorName: "",
      rate: "",
      qty: "",
      totalAmt: "",
      lessDisc: "",
      discAmt: "",
      netAmt: "",
      emerg: "",
      emergAmt: "",
    },
  ]);

  const [doctorVisitRows, setDoctorVisitRows] = useState([
    {
      sn: 1,
      date: new Date().toISOString().split("T")[0],
      dCode: "",
      doctorName: "",
      generalOpdFee: "",
      totalAmt: "",
      visitReasons: "",
    },
  ]);

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/service-details/sorted-map`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch service details");
      }
      const data = await response.json();
      setServiceData(data); // Store the fetched data in state
    } catch (error) {
      console.error("Error fetching service details:", error);
      setError(error.message); // Set error message in state
    }
  };

  const handleAddRow = (type, index) => {
    if (type === "package") {
      setTestGridTableRowsableRows((prevRows) => [
        ...prevRows,
        {
          sn: prevRows.length + 1,
          code: "",
          serviceName: "",
          doctorName: "",
          rate: "",
          qty: "",
          totalAmt: "",
          lessDisc: "",
          discAmt: "",
          netAmt: "",
          emerg: "",
          emergAmt: "",
        },
      ]);
    } else if (type === "identification") {
      setIdentificationTableRows((prevRows) => [
        ...prevRows,
        {
          sn: prevRows.length + 1,
          Date: "",
          dCode: "",
        },
      ]);
    } else if (type === "drvisit") {
      setDoctorVisitRows((prevRows) => {
        // Create a new row to add
        const newRow = {
          sn: prevRows.length + 1, // Serial number
          date: "",
          dCode: "",
          doctorName: "",
          generalOpdFee: "",
          totalAmt: "",
          visitReasons: "",
        };

        // Check if a row with identical data already exists
        const isDuplicate = prevRows.some((row) =>
          Object.keys(newRow).every((key) => row[key] === newRow[key])
        );

        // If it's not a duplicate, add the new row; otherwise, log a warning
        if (!isDuplicate) {
          return [...prevRows, newRow]; // Add the new row
        } else {
          console.log("Duplicate row detected. Row not added.");
          return prevRows; // Return the same state if duplicate
        }
      });
      console.log(doctorVisitRows + "ppppppppp");
    }
  };
  const handleDeleteRow = (type, index) => {
    if (type === "package") {
      setTestGridTableRowsableRows((prevRows) =>
        prevRows.filter((_, rowIndex) => rowIndex !== index)
      );
    } else if (type === "identification") {
      setIdentificationTableRows((prevRows) =>
        prevRows.filter((_, rowIndex) => rowIndex !== index)
      );
    } else if (type === "drvisit") {
      setDoctorVisitRows((prevRows) =>
        prevRows.filter((_, rowIndex) => rowIndex !== index)
      );
    }
  };

  const handleRowChange = (index, field, value) => {
    setDoctorVisitRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };
  useEffect(() => {
    const total = testGridTableRowsableRows.reduce(
      (acc, row) => acc + (row.netAmt || 0),
      0
    );
    setTotalAmt(total);
  }, [testGridTableRowsableRows]);

  useEffect(() => {
    const total = doctorVisitRows.reduce(
      (acc, row) => acc + (row.netAmt || 0),
      0
    );
    setFinalTotalDrVisit(total);
  }, [doctorVisitRows]);

  const renderServicesTable = () => {
    return (
      <div className="services-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Actions",
                "SN",
                "Service Type",
                "Code",
                "Service Name",
                "Doctor Name ",
                "Rate",
                "Quantity",
                "Total Amt",
                "Less Disc(%)",
                "Disc Amt",
                "Net Amt",
                "Emerg",
                "Emerg Amt",
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
            {testGridTableRowsableRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="table-actions">
                    <button
                      className="billing-opd-com-add-btn"
                      onClick={() => handleAddRow("package")}
                    >
                      Add
                    </button>
                    <button
                      className="billing-opd-com-del-btn"
                      onClick={() => handleDeleteRow("package", index)}
                      disabled={testGridTableRowsableRows.length <= 1}
                    >
                      Del
                    </button>
                  </div>
                </td>
                <td>{row.sn}</td>
                <td>
                  <FloatingInput
                    label={"Services"}
                    type="search"
                    onIconClick={() => setActivePopup("services")}
                  />
                </td>
                <td>{row.code}</td>
                <td>{row.serviceName}</td>
                <td>{row.doctorName}</td>
                <td>{row.rate}</td>
                <td>
                  <FloatingInput
                    label={"QTY"}
                    type="number"
                    min="0"
                    value={row.qty}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value, 10) || 0;
                      setTestGridTableRowsableRows((prevRows) => {
                        const updatedRows = [...prevRows];
                        updatedRows[index].qty = qty;
                        updatedRows[index].totalAmt = (row.rate || 0) * qty;
                        updatedRows[index].netAmt =
                          updatedRows[index].totalAmt -
                          (updatedRows[index].discAmt || 0);
                        return updatedRows;
                      });
                    }}
                  />
                </td>
                <td>{row.totalAmt}</td>
                <td>
                  <FloatingInput
                    label={"Less Disc"}
                    type="number"
                    min="0"
                    value={row.lessDisc || 0}
                    onChange={(e) => {
                      const lessDisc = parseFloat(e.target.value) || 0;
                      setTestGridTableRowsableRows((prevRows) => {
                        const updatedRows = [...prevRows];
                        updatedRows[index].lessDisc = lessDisc;
                        updatedRows[index].discAmt =
                          (updatedRows[index].totalAmt * lessDisc) / 100;
                        updatedRows[index].netAmt =
                          updatedRows[index].totalAmt -
                          updatedRows[index].discAmt;
                        return updatedRows;
                      });
                    }}
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"disAmt"}
                    type="number"
                    value={row.discAmt || 0}
                    readOnly
                  />
                </td>
                <td>{row.netAmt}</td>
                <td>{row.emerg}</td>
                <td>{row.emergAmt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="billing-opd-com-summary-section">
          <div className="billing-opd-com-summary-row">
            <div className="billing-opd-com-summary-field">
              <label>Less Disc% On All Services:</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) =>
                  setDiscountPercentage(parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div className="billing-opd-com-summary-field">
              <label> Less Disc Amt on All Services :</label>
              <input type="number" value={discountAmount} readOnly />
            </div>
            <div className="billing-opd-com-summary-row">
              <div className="billing-opd-com-summary-field">
                <label>Total Amount:</label>
                <input
                  type="number"
                  value={finaltotalamt.toFixed(2)}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------------PRevioustest detail-----------------------------------------------
  const renderTable = () => {
    switch (selectedTab) {
      case "services":
        // Existing package table rendering
        return (
          <div className="iPBilling-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "SN",
                    "Bill Date",
                    "Bill Time",
                    "Code",
                    "Service Name",
                    "Doctor Name",
                    "Rate",
                    "Qty",
                    "Total",
                    "Disc",
                    "Disc Amount",
                    "Net Amount",
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
                {previousBills.map((bill, index) => (
                  <tr key={bill.testGridIpdBillId}>
                    <td>{index + 1}</td>
                    <td>{bill.date || "N/A"}</td>
                    <td>{"N/A"}</td>{" "}
                    {/* No explicit billingTime in the response */}
                    <td>{"N/A"}</td> {/* No explicit code in the response */}
                    <td>{bill.serviceName || "N/A"}</td>
                    <td>{"N/A"}</td>{" "}
                    {/* No explicit doctorName in the response */}
                    <td>{bill.rate || "0.00"}</td>
                    <td>{bill.quantity || "0"}</td>
                    <td>
                      {bill.rate && bill.quantity
                        ? (bill.rate * bill.quantity).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>{"0.00"}</td> {/* No explicit disc in the response */}
                    <td>{"0.00"}</td>{" "}
                    {/* No explicit discAmount in the response */}
                    <td>
                      {bill.rate && bill.quantity
                        ? (bill.rate * bill.quantity).toFixed(2)
                        : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "testGrid":
        return renderServicesTable();
      case "drVisits":
        // Existing BHS table rendering
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Date",
                    "DCode",
                    "Doctor Name",
                    "Dr. Fee",
                    "Total Amt",
                    "Visit Reason",
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
                {doctorVisitRows.map((row, index) => (
                  <tr key={index}>
                    {/* Actions */}
                    <td>
                      <div className="table-actions">
                        <button
                          className="billing-opd-com-add-btn"
                          onClick={() => handleAddRow("drvisit", index)}
                        >
                          Add
                        </button>
                        <button
                          className="billing-opd-com-del-btn"
                          onClick={() => handleDeleteRow("drvisit", index)}
                          disabled={doctorVisitRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>

                    {/* Serial Number */}
                    <td>{row.sn}</td>

                    {/* Date */}
                    <td>
                      <FloatingInput
                        label={"Date"}
                        type="date"
                        value={row.date || ""}
                        onChange={(e) =>
                          setDoctorVisitRows((prevRows) =>
                            prevRows.map((r, i) =>
                              i === index ? { ...r, date: e.target.value } : r
                            )
                          )
                        }
                      />
                    </td>

                    {/* Doctor Code */}
                    <td>{row.doctorId || ""}</td>

                    {/* Doctor Name */}
                    <td>
                      <FloatingInput
                        label={"Doctor Name"}
                        type="search"
                        value={row.doctorName || ""}
                        onChange={(e) =>
                          setDoctorVisitRows((prevRows) =>
                            prevRows.map((r, i) =>
                              i === index
                                ? { ...r, doctorName: e.target.value }
                                : r
                            )
                          )
                        }
                        onIconClick={() => setActivePopup("doctor")}
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"General Opd Fee"}
                        type="number"
                        value={row.generalOpdFee || ""}
                        onChange={(e) =>
                          setDoctorVisitRows((prevRows) =>
                            prevRows.map((r, i) =>
                              i === index
                                ? {
                                  ...r,
                                  generalOpdFee:
                                    parseFloat(e.target.value) || 0,
                                  totalAmt:
                                    (parseFloat(e.target.value) || 0) *
                                    (r.qty || 1),
                                  netAmt:
                                    (parseFloat(e.target.value) || 0) *
                                    (r.qty || 1),
                                }
                                : r
                            )
                          )
                        }
                      />
                    </td>

                    {/* Total Amount */}
                    <td>{row.totalAmt || 0}</td>

                    {/* User Name */}
                    <td>
                      <FloatingInput
                        label={"Visit Reason"}
                        type="text"
                        value={row.visitReasons || ""}
                        onChange={(e) =>
                          setDoctorVisitRows((prevRows) =>
                            prevRows.map((r, i) =>
                              i === index
                                ? { ...r, visitReasons: e.target.value }
                                : r
                            )
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="billing-opd-com-summary-section">
              <div className="billing-opd-com-summary-row">
                <div className="billing-opd-com-summary-field">
                  <label>Less Disc% On All Services:</label>
                  <input
                    type="number"
                    value={discountPercentage}
                    onChange={(e) =>
                      setDiscountPercentage(parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="billing-opd-com-summary-field">
                  <label> Less Disc Amt on All Services :</label>
                  <input type="number" value={discountAmount} readOnly />
                </div>
                <div className="billing-opd-com-summary-row">
                  <div className="billing-opd-com-summary-field">
                    <label>Total Amount:</label>
                    <input
                      type="number"
                      value={finalTotalDrVisit.toFixed(2)}
                      readOnly
                    />
                  </div>
                </div>
                <button className="btn-blue" onClick={postDrVisitData}>
                  Save Doctor Visit
                </button>
              </div>
            </div>
          </div>
        );
      case "tariff":
        // Existing tariff table rendering
        return (
          <div className="services-table">
            <table>
              <thead>
                <tr>
                  <th>Service Type</th>
                  <th>Pay Type</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consultation</td>
                  <td>Flat Rate</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>Procedure</td>
                  <td>Per Hour</td>
                  <td>5000</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="billing-ipBilling-master">
      <div className="billing-ipBilling-title-bar">
        {/* <div className="iPBilling-header">
          <span>IP Billing</span>
        </div> */}
        <div className="billing-ipBilling-header">
          <span>IP Billing</span>
        </div>
      </div>
      <div className="billing-ipBilling-section">
        <div className="billing-ipBilling-grid">
          <div className="billing-ipBilling-search-field">
            <FloatingInput
              label="Mobile No"
              type="search"
              value={patientData?.patient?.phoneNumber}
              onIconClick={() => setActivePopup("phoneNumber")}
            />
          </div>
        </div>
      </div>
      <div className="billing-ipBilling-section">
        <div className="billing-ipBilling-header">Patient Details</div>
        <div className="billing-ipBilling-grid">
          <div className="billing-ipBilling-search-field">
            <FloatingInput
              label="IP No: *"
              type="search"
              value={patientData?.ipAdmmissionId}
              onIconClick={() => setActivePopup("ipAdmission")}
            />
          </div>
          <FloatingInput
            label="Uhid *"
            type="text"
            value={patientData?.patient?.patient?.uhid}
          />
          <FloatingInput
            label="Initial Name"
            type="text"
            value={patientData?.patient?.patient?.salutation}
          />
          <FloatingInput
            label="Patient Name"
            type="text"
            value={`${patientData?.patient?.patient?.firstName} ${patientData?.patient?.patient.lastName}`}
          />
          <FloatingInput
            label="Age"
            type="text"
            value={patientData?.patient?.patient?.age}
          />
          <FloatingSelect
            label="Gender"
            value={patientData?.patient?.patient?.gender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
          <FloatingSelect
            label="Marital Status"
            options={[
              { value: "married", label: "Married" },
              { value: "unMarried", label: "UnMarried" },
            ]}
          />
          <FloatingInput
            label="Relation"
            type="text"
            value={patientData?.patient?.patient?.relation}
          />
          <FloatingInput
            label="Relative Name"
            type="text"
            value={patientData?.patient?.patient?.relationName}
          />
          <FloatingInput
            label="Address"
            type="text"
            value={patientData?.patient?.patient?.address}
          />
          <FloatingInput
            label="Area/Village *"
            type="text"
            value={`${patientData?.patient?.patient?.areaVillage}`}
          />
          <FloatingInput
            label="City/District"
            type="text"
            value={patientData?.patient?.patient?.cityDistrict}
          />
          <FloatingInput
            label="State *"
            type="text"
            value={patientData?.patient?.patient?.state}
          />
          <FloatingInput
            label="Mobile No *"
            type="text"
            value={patientData?.patient?.phoneNumber}
          />
          <FloatingSelect
            label="Type"
            options={[{ value: "hospital", label: "Hospital" }]}
          />
          <FloatingInput label="Insurance *" type="text" />
          <FloatingInput
            label="Bed No *"
            type="text"
            value={patientData?.roomDetails?.bedDTO.bedNo}
          />
          <FloatingInput
            label="Referred By *"
            type="text"
            value={patientData?.organisationDetail?.referredBy}
          />
          <FloatingInput
            label="Consultant Dr"
            type="text"
            value={
              patientData?.admissionUnderDoctorDetail?.consultantDoctor
                .doctorName
            }
          />
          <FloatingInput
            label="Admission Date"
            type="date"
            value={patientData?.admissionDate}
          />
          <FloatingInput
            label="Admission Time"
            type="time"
            value={patientData?.admissionTime}
          />
          <FloatingInput
            label="Pay Type"
            type="text"
            value={patientData?.roomDetails?.payTypeDTO?.payTypeName}
          />
          <FloatingInput label="Bill Date" type="date" />
          <FloatingInput label="Bill No" type="text" />
          <FloatingInput label="Loc Bill No" type="text" />
          <FloatingInput label="Billing User" type="text" />
          <FloatingSelect
            label="Timing"
            options={[{ value: "mornig", label: "Mornig" }]}
          />
          <div className="billing-ipBilling-form-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="iPBilling-checkbox-label">
              Inv Package
            </label>
          </div>
          {/* <div className="billing-ipBilling-search-field">
            <FloatingInput label="Referred By" />
            <button className="billing-ipBilling-search-icon">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
              </svg>
            </button>
          </div> */}
        </div>
      </div>
      <div className="billing-ipBilling-content-wrapper">
        <div className="billing-ipBilling-main-section">
          {/* <div className="iPBilling-panel dis-templates">
            <div className="iPBilling-panel-header">Multiple Service Entry</div>
            <div className="iPBilling-panel-content">
              <div className="iPBilling-form-row-chechbox">
                <input type="checkbox" id="excludeRef" />
                <label htmlFor="excludeRef">Multiple Doctor Visits</label>
              </div>
              <div className="iPBilling-form-row">
                <label>Transportation:</label>
                <select>
                  <option></option>
                </select>
              </div>

              <div className="iPBilling-form-row">
                <label>Remark:</label>
                <textarea name="" id=""></textarea>
              </div>
              <div className="iPBilling-form-row">
                <label>Physiotherpy:</label>
                <select>
                  <option>Evening</option>
                </select>
              </div>
              <div className="iPBilling-form-row">
                <label>Emergflg:</label>
                <input type="text" />
              </div>
            </div>
          </div> */}
        </div>
        <div className="billing-ipBilling-services-section">
          <div className="billing-ipBilling-tab-bar">
            <button
              className={`billing-ipBilling-tab ${selectedTab === "testGrid" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("testGrid")}
            >
              Test Grid
            </button>
            <button
              className={`billing-ipBilling-tab ${selectedTab === "services" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("services")}
            >
              Previous Test Details
            </button>
            <button
              className={`billing-ipBilling-tab ${selectedTab === "drVisits" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("drVisits")}
            >
              Doctor Visits
            </button>
            {/* <button
              className={`iPBilling-tab ${
                selectedTab === "bhs" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("bhs")}
            >
              Previous Cancelled Test Details
            </button> */}
          </div>
          {/* Dynamically render tables based on selected tab */}
          {renderTable()}
        </div>
        <div className="billing-ipBilling-action-buttons">
          <button className="btn-blue" onClick={handleSaveData}>
            Save
          </button>
          {/* <button className="btn-green" onClick={ } >Print</button> */}

          {/* <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button> */}

          {/* <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          {/* <button className="btn-blue">Export</button>
          <button className="btn-gray">Import</button>
          <button className="btn-green">Health</button>
          <button className="btn-gray">Version Comparison</button>
          <button className="btn-gray">SDC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button> */}
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

      {billFromResponse && (
        <CustomModal
          isOpen={billFromResponse ? true : false}
          onClose={() => setBillFromResponse(null)}
        >
          <IpBillingPrint formData={billFromResponse} />
        </CustomModal>
      )}
    </div>
  );
};
export default IpBilling;
// AjharTamboli 20-11-24 iPBilling.jsx
