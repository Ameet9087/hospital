import React, { useState, useRef, useEffect } from "react";
import "./OpdBilling.css";
import PopupTable from "../../Admission/PopupTable";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { useLocation } from "react-router-dom";

const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div
      className={`OpdBilling-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="OpdBilling-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="OpdBilling-floating-label">{label}</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`OpdBilling-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="OpdBilling-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="OpdBilling-floating-label">{label}</label>
    </div>
  );
};

const OpdBilling = () => {
  const location = useLocation();
  const appointment = location.state?.outPatientId;
  console.log(appointment);
  const newData = {
    outPatientId: appointment?.outPatientId,
    uhid: appointment?.patient?.uhid,
    firstName: appointment?.patient?.firstName,
    lastName: appointment?.patient?.lastName,
    originalObject: appointment
};
console.log("Hello---",newData);


  useEffect(() => {
    if (appointment) {
      console.log("Executing handleSelect with appointment:", appointment);
      handleSelect(newData);
    }
  }, [appointment]);
  
  const [opdPatients, setOpdPatients] = useState([]);
  const [selectedTab, setSelectedTab] = useState("testGrid");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [advancesTableRows, setAdvancesTableRows] = useState([]);
  const [activePopup, setActivePopup] = useState("");
  const [selectedPatient, setSelectedPatient] = useState();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const [overallDiscPercent, setOverallDiscPercent] = useState(0);
  const [overallDiscAmt, setOverallDiscAmt] = useState(0);
  const [finalDiscountAmt, setFinalDiscountAmt] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0); // For Less Disc% on total
  const [totalAmount, setTotalAmount] = useState(0); // For Total Amt
  const [discountAmount, setDiscountAmount] = useState(0); // For Less Disc Amt
  const [netAmount, setNetAmount] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const identification = "someValue";
  const [outPatientId, setOutPatientId] = useState();
  const [doctorservice, setdoctorservice] = useState([]);
  const [patientType, setPatientType] = useState("");

  const [isEmergency, setemergency] = useState(false);


  const fetchDoctorService = async (outPatientId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/services/out-patient/${outPatientId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching doctor services:", error);
      return []; // Return an empty array or handle error gracefully
    }
  };

  const fetchEmergencyDoctorService = async (erNo) => {
    console.log("erno", erNo);
    try {
      const response = await fetch(
        `${API_BASE_URL}/emergency/er-initial-assessment/${erNo}/emergency-doctor-fees`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching doctor services:", error);
      return []; // Return an empty array or handle error gracefully
    }
  };

  const [formData, setFormData] = useState({
    finanacialDetails: "",
    patientType: "",
    totalAmount: "",
    financialDiscAmt: "",
    paidAmt: "",
    creditAmt: "",
    currBalance: "",
    discReason: "",
    discAuthorization: "",
    remarks: "",
    lastConsultDoctor: "",
    lastConsultDate: "",
    lastConsultFee: "",
    opBalanceAmount: "",
    package: "",
  });

  const [newpatientformData, newpatientsetFormData] = useState({

    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    ageUnit: "Years",
    maritalStatus: "",
    relation: "",
    adharCardId: "",
    relationName: "",
    address: "",
    mobileNumber: "",
    emailId: "",
    pinCode: "",
    areaVillage: "",
    nationality: "Indian",
    sourceOfRegistration: "",
  });

  useEffect(() => {
    if (selectedPatient) {
      newpatientsetFormData({
        salutation: selectedPatient.salutation || "",
        firstName: selectedPatient.firstName || "",
        middleName: selectedPatient.middleName || "",
        lastName: selectedPatient.lastName || "",
        gender: selectedPatient.gender || "",
        age: selectedPatient.age || "",
        ageUnit: selectedPatient.ageUnit || "Years",
        maritalStatus: selectedPatient.maritalStatus || "",
        relation: selectedPatient.relation || "",
        adharCardId: selectedPatient.adharCardId || "",
        relationName: selectedPatient.relationName || "",
        address: selectedPatient.address || "",
        mobileNumber: selectedPatient.mobileNumber || "",
        emailId: selectedPatient.emailId || "",
        referralType: selectedPatient.referralType || "",
        pkgType: selectedPatient.pkgType || "",
        pinCode: selectedPatient.pinCode || "",
        areaVillage: selectedPatient.areaVillage || "",
        nationality: selectedPatient.nationality || "",
        sourceOfRegistration: selectedPatient.sourceOfRegistration || "",
      });
    }
  }, [selectedPatient]);
  const [selectedPaymentMode, setSelectedPaymentMode] = React.useState("");
  const [paymentDetails, setPaymentDetails] = React.useState({});
  const [addedPayments, setAddedPayments] = React.useState([]);
  const [editableRow, setEditableRow] = React.useState(null);
  const [editingPayment, setEditingPayment] = React.useState({});
  const [totalPaidAmount, setTotalPaidAmount] = useState(0); // State to track total paid amount
  const [currentBalance, setCurrentBalance] = useState(0);

  const calculateBalance = (total, paid) => {
    const balance = total - paid;
    console.log("balance", balance);
    setCurrentBalance(balance >= 0 ? balance : 0);
  };

  const calculateTotalPaidAmount = (payments) => {
    const total = payments.reduce(
      (sum, payment) => sum + parseFloat(payment.amount || 0),
      0
    );
    setTotalPaidAmount(total.toFixed(2));
  };

  console.log("Total paid amount", totalPaidAmount);
  const handleAddPayment = (
    paymentMode = "Cash",
    paymentAmount = 0,
    paymentDetails = {}
  ) => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newPayment = {
      mode: paymentMode,
      amount: parseFloat(paymentAmount).toFixed(2),
      details: paymentDetails,
    };

    const updatedPayments = [...addedPayments, newPayment];
    setAddedPayments(updatedPayments);
    calculateTotalPaidAmount(updatedPayments); // Update total paid amount
    setSelectedPaymentMode(""); // Reset payment mode
    setPaymentDetails({});
    //calculateBalance(totalAmount,totalPaidAmount);
  };

  const handleEditPayment = (index) => {
    setEditableRow(index);
    setEditingPayment({ ...addedPayments[index].details });
  };

  const handleSaveEdit = (index) => {
    const updatedPayments = [...addedPayments];
    updatedPayments[index] = {
      ...updatedPayments[index],
      details: editingPayment,
      amount: parseFloat(editingPayment.amount).toFixed(2), // Update amount in payment
    };
    setAddedPayments(updatedPayments);
    calculateTotalPaidAmount(updatedPayments); // Update total paid amount
    setEditableRow(null);
    setEditingPayment({});
  };

  useEffect(() => {
    calculateBalance(totalAmount, totalPaidAmount);
  }, [totalPaidAmount, totalAmount]);

  const handleRemovePayment = (index) => {
    const updatedPayments = addedPayments.filter((_, i) => i !== index);
    setAddedPayments(updatedPayments);
    calculateTotalPaidAmount(updatedPayments); // Update total paid amount
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
  const [identificationTableRows, setIdentificationTableRows] = useState([
    { sn: 1, Date: "", dCode: "" },
  ]);

  useEffect(() => {
    // Calculate the total amount from all rows
    const total = testGridTableRowsableRows.reduce(
      (acc, row) => acc + (row.totalAmt || 0),
      0
    );
    setTotalAmount(total);

    // Calculate the discount and net amount
    const discount = (total * discountPercentage) / 100;
    setDiscountAmount(discount);
    setNetAmount(total - discount);
  }, [testGridTableRowsableRows, discountPercentage]);

  const handleOverallDiscountPercentChange = (e) => {
    const percent = parseFloat(e.target.value) || 0;
    setOverallDiscPercent(percent);

    setTestGridTableRowsableRows((prevRows) => {
      let totalDiscount = 0;
      const updatedRows = prevRows.map((row) => {
        const discAmt = (row.totalAmt * percent) / 100;
        totalDiscount += discAmt;
        return {
          ...row,
          lessDisc: percent,
          discAmt,
          netAmt: row.totalAmt - discAmt,
        };
      });
      setFinalDiscountAmt(totalDiscount);
      return updatedRows;
    });
  };

  const handleOverallDiscountAmountChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setOverallDiscAmt(amount);

    setTestGridTableRowsableRows((prevRows) => {
      const totalAmt = prevRows.reduce((sum, row) => sum + row.totalAmt, 0);
      const percent = (amount / totalAmt) * 100;

      const updatedRows = prevRows.map((row) => {
        const discAmt = (row.totalAmt * percent) / 100;
        return {
          ...row,
          lessDisc: percent,
          discAmt,
          netAmt: row.totalAmt - discAmt,
        };
      });
      setFinalDiscountAmt(amount);
      setOverallDiscPercent(percent);
      return updatedRows;
    });
  };

  const [paymentDetailsTableRows, setpaymentDetailsTableRows] = useState([
    {
      sn: 1,
      head: "",
      amount: "",
    },
  ]);
  // Function to delete a row from the appropriate table
  const handleDeleteRow = (type, index) => {
    if (type === "package") {
      setTestGridTableRowsableRows((prevRows) =>
        prevRows.filter((_, rowIndex) => rowIndex !== index)
      );
    } else if (type === "identification") {
      setIdentificationTableRows((prevRows) =>
        prevRows.filter((_, rowIndex) => rowIndex !== index)
      );
    }
  };

  useEffect(() => {
    fetchOpdData();
  }, []);

  const getPopupData = () => {
    if (activePopup === "patient") {
      return {
        columns: ["uhid", "firstName", "lastName", "mobileNumber"],
        data: opdPatients.map((item) => ({
          uhid: item.uhid,
          firstName: item.firstName,
          lastName: item.lastName,
          mobileNumber: item.mobileNumber,
          originalObject: item,
        })),
      };
    } else if (activePopup === "services") {
      return { columns: ["serviceName", "rates"], data: serviceDetails };
    } else if (activePopup === "mobilenumber") {
      return {
        columns: ["patientRegistrationId", "mobileNumber", "patientName"],
        data: opdPatients.map((item) => ({
          patientRegistrationId: item.patientRegistrationId,
          mobileNumber: item.mobileNumber,
          relationName: item.relationName,
          patientName: item.firstName + " " + item.lastName,
          originalObject: item,
        })),
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();
  const handleSelect = async (data) => { 
    if (activePopup === "patient" || activePopup === "mobilenumber") {
      setSelectedPatient(data.originalObject);

      console.log("data+++++++++", data)

      console.log("Registration Id", data.patientRegistrationId);

      try {
        const fetchedAppointments = await fetchunpaidAppointmentsByOutPatientId(
          data?.originalObject?.patientRegistrationId
        );

        console.log("apppppppppppp", fetchedAppointments.outPatientId);
        setOutPatientId(fetchedAppointments.outPatientId);

        const doctorId = fetchedAppointments.addDoctor?.doctorId;
        if (doctorId) {
          const doctorDetails = await fetchDoctorDetails(doctorId);
          console.log("Doctor Details Id +++++++++++", doctorDetails);

          const opdFees = doctorDetails?.orgDoctorFees?.find(
            (fee) => fee.payType?.payTypeName === "OPD"
          );

          const generalOpdFee = opdFees?.generalOpdFee || 0;
          const followupfees = opdFees?.followupopdfees || 0;

          console.log("fetched apppp=====", fetchedAppointments);
          // Check if fees are unpaid before creating the row
          if (
            fetchedAppointments.feespaid !== "yes" &&
            fetchedAppointments.typeOfAppointment == "New Patient" || fetchedAppointments.typeOfAppointment == "Old patient"
          ) {
            // New Patient Logic
            const doctorRow = {
              sn: 0,
              serviceType: "Doctor",
              code: "",
              serviceName: "Consultation",
              doctorName: doctorDetails.doctorName,
              rate: generalOpdFee,
              qty: 1,
              totalAmt: generalOpdFee,
              lessDisc: "",
              discAmt: "",
              netAmt: generalOpdFee,
              emerg: "",
              emergAmt: "",
              feePending: "Yes",
            };

            setTestGridTableRowsableRows((prevRows) => {
              const validRows = prevRows.filter(
                (row) => row.code || row.serviceName || row.doctorName
              );

              const isDuplicate = validRows.some(
                (row) =>
                  row.serviceName === doctorRow.serviceName &&
                  row.code === doctorRow.code
              );

              if (!isDuplicate) {
                return [
                  ...validRows,
                  {
                    ...doctorRow,
                    sn: validRows.length + 1,
                  },
                ];
              } else {
                console.log(
                  "Duplicate row detected, skipping addition for doctor row."
                );
                return validRows;
              }
            });
          } else if (
            fetchedAppointments.feespaid !== "yes" &&
            fetchedAppointments.typeOfAppointment == "Follow up patient"
          ) {
            // Follow-Up Patient Logic
            const doctorRow = {
              sn: 0,
              serviceType: "Doctor",
              code: "",
              serviceName: "follow up",
              doctorName: doctorDetails.doctorName,
              rate: followupfees, // Use follow-up fees instead
              qty: 1,
              totalAmt: followupfees,
              lessDisc: "",
              discAmt: "",
              netAmt: followupfees,
              emerg: "",
              emergAmt: "",
              feePending: "Yes",
            };

            setTestGridTableRowsableRows((prevRows) => {
              const validRows = prevRows.filter(
                (row) => row.code || row.serviceName || row.doctorName
              );

              const isDuplicate = validRows.some(
                (row) =>
                  row.serviceName === doctorRow.serviceName &&
                  row.code === doctorRow.code
              );

              if (!isDuplicate) {
                return [
                  ...validRows,
                  {
                    ...doctorRow,
                    sn: validRows.length + 1,
                  },
                ];
              } else {
                console.log(
                  "Duplicate row detected, skipping addition for doctor row."
                );
                return validRows;
              }
            });
          } else {
            console.log("Fees already paid or invalid appointment type.");
          }
        }

        let doctorServices;
        console.log("Fetched doctor services:", doctorServices);
        const isEmergency = data.originalObject.isEmergency === "yes";
        console.log("is emergency print", isEmergency);

        if (isEmergency) {

          setemergency(true);
          doctorServices = await fetchEmergencyDoctorService(
            data.originalObject.erNo
          );

          console.log("Fetched doctor services:", doctorServices)

          if (doctorServices.length > 0) {
            const firstService = doctorServices[0];
            console.log("-----p", firstService)

            const rateToUse = isEmergency
              ? firstService.morningEmergencyToDoctor
              : firstService.morningEmergencyToDoctor;


            const EmergencydocName = await fetchDoctorDetails(firstService.doctorId);

            console.log("emergency doctor", EmergencydocName);

            const serviceRow = {
              sn: 0,
              serviceType: "Emergency",
              serviceDetailsId: firstService.serviceId,
              serviceName: "Emergency service",
              doctorName: EmergencydocName.doctorName,
              rate: rateToUse,
              qty: 1,
              totalAmt: rateToUse,
              lessDisc: "",
              discAmt: "",
              netAmt: rateToUse,
              emerg: "",
              emergAmt: "",
              feePending: "Yes",
            };

            setTestGridTableRowsableRows((prevRows) => {
              const validRows = prevRows.filter(
                (row) => row.code || row.serviceName || row.doctorName
              );

              // Check if the row already exists (avoid duplicates)
              const isDuplicate = validRows.some(
                (row) =>
                  row.serviceName === serviceRow.serviceName &&
                  row.serviceDetailsId === serviceRow.serviceDetailsId
              );

              if (!isDuplicate) {
                return [
                  ...validRows,
                  {
                    ...serviceRow,
                    sn: validRows.length + 1, // Increment the serial number
                  },
                ];
              } else {
                console.log(
                  "Duplicate row detected, skipping addition for service row."
                );
                return validRows;
              }
            });
          }
        } else {
          doctorServices = await fetchDoctorService(
            fetchedAppointments.outPatientId
          );

          doctorServices
            .filter((service) => service.payStatus === "no")
            .forEach((service) => {
              const rateToUse = isEmergency
                ? service.emergencyRate
                : service.rate;

              const serviceRow = {
                sn: 0,
                serviceType: "Doctor",
                serviceDetailsId: service.serviceId,
                serviceName: service.serviceName,
                doctorName: "N/A",
                rate: rateToUse,
                qty: 1,
                totalAmt: rateToUse,
                lessDisc: "",
                discAmt: "",
                netAmt: rateToUse,
                emerg: "",
                emergAmt: "",
                feePending: "Yes",
              };

              setTestGridTableRowsableRows((prevRows) => {
                const validRows = prevRows.filter(
                  (row) => row.code || row.serviceName || row.doctorName
                );

                const isDuplicate = validRows.some(
                  (row) =>
                    row.serviceName === serviceRow.serviceName &&
                    row.serviceDetailsId === serviceRow.serviceDetailsId
                );

                if (!isDuplicate) {
                  return [
                    ...validRows,
                    {
                      ...serviceRow,
                      sn: validRows.length + 1,
                    },
                  ];
                } else {
                  console.log(
                    "Duplicate row detected, skipping addition for service row."
                  );
                  return validRows;
                }
              });
            });
        }
      } catch (error) {
        console.error("Error fetching appointments or doctor details:", error);
      }
    } else if (activePopup === "services") {
      setSelectedService(data);

      setTestGridTableRowsableRows((prevRows) => {
        const isDuplicate = prevRows.some(
          (row) =>
            row.code === data.serviceCode &&
            row.serviceName === data.serviceName &&
            row.serviceDetailsId === data.serviceDetailsId
        );

        if (isDuplicate) {
          console.log("Duplicate service detected, skipping addition");
          return prevRows;
        }

        const emptyRowIndex = prevRows.findIndex(
          (row) => !row.code && !row.serviceName
        );

        if (emptyRowIndex !== -1) {
          const updatedRows = [...prevRows];
          updatedRows[emptyRowIndex] = {
            ...updatedRows[emptyRowIndex],
            serviceDetailsId: data.serviceDetailsId,
            code: data.serviceCode,
            serviceName: data.serviceName,
            doctorName: "",
            rate: data.rates[0] || "",
            qty: 1,
            totalAmt: data.rates[0] || "",
            lessDisc: "",
            discAmt: "",
            netAmt: data.rates[0] || "",
            emerg: "",
            emergAmt: "",
          };
          return updatedRows;
        }

        const updatedRows = [
          ...prevRows,
          {
            sn: prevRows.length + 1,
            code: data.serviceCode,
            serviceName: data.serviceName,
            serviceDetailsId: data.serviceDetailsId,
            doctorName: "",
            rate: data.rates[0] || "",
            qty: 1,
            totalAmt: data.rates[0] || "",
            lessDisc: "",
            discAmt: "",
            netAmt: data.rates[0] || "",
            emerg: "",
            emergAmt: "",
          },
        ];

        const totalAmt = updatedRows.reduce(
          (acc, row) => acc + (parseFloat(row.totalAmt) || 0),
          0
        );
        const paidAmt = parseFloat(formData.paidAmt) || 0;

        setFormData((prevData) => ({
          ...prevData,
          totalAmount: totalAmt,
          paidAmt: paidAmt,
        }));

        return updatedRows;
      });
    }
    setActivePopup(null);
  };

  const handleSubmit = async () => {
    console.log(
      "================================================",
      testGridTableRowsableRows
    );
    const payload = {
      patientType: patientType,
      totalAmount: parseFloat(formData.totalAmount || 0),
      financialDiscAmt: parseFloat(formData.financialDiscAmt || 0),
      paidAmt: parseFloat(formData.paidAmt || 0),
      creditAmt: parseFloat(formData.creditAmt || 0),
      currBalance: parseFloat(formData.currBalance || 0),
      discReason: formData.discReason,
      discAuthorization: formData.discAuthorization,
      remarks: formData.remarks,
      lastConsultDoctor: formData.lastConsultDoctor,
      lastConsultDate: formData.lastConsultDate,
      lastConsultFee: parseFloat(formData.lastConsultFee || 0),
      opBalanceAmount: parseFloat(formData.opBalanceAmount || 0),
      outPatientDTO: {
        ...(patientType != "new patient"
          ? { outPatientId: outPatientId }
          : { patient: { ...newpatientformData } }),
        financialDetaildto: {
          id: selectedPatient?.financialDetails?.id || null,
          totalAmount: parseFloat(
            selectedPatient?.financialDetails?.totalAmount ||
            formData.totalAmount
          ),
          lessDiscount: parseFloat(
            selectedPatient?.financialDetails?.lessDiscount || 0
          ),
          netAmount: parseFloat(
            selectedPatient?.financialDetails?.netAmount || formData.netAmount
          ),
          paidAmount: parseFloat(totalPaidAmount || formData.paidAmt),
          dueAmount: parseFloat(currentBalance || currentBalance),
          totalDoctorShareAmount: parseFloat(
            selectedPatient?.financialDetails?.totalDoctorShareAmount || 0
          ),
          totalHospitalAmount: parseFloat(
            selectedPatient?.financialDetails?.totalHospitalAmount || 0
          ),
        },
        patient: { patientRegistrationId: selectedPatient.patientRegistrationId }
      },

      paymentModeDTO: addedPayments.map((payment) => ({
        paymentMode: payment.mode,
        amount: parseFloat(payment.details.amount || 0),
        chqDt: payment.details.checkNumber
          ? parseFloat(payment.details.checkNumber)
          : null,
        cardNumber: payment.details.cardNumber
          ? parseFloat(payment.details.cardNumber)
          : null,
      })),
      testGridOpdBillDTO: testGridTableRowsableRows.map((row) => ({
        serviceDetailsId: row.serviceDetailsId || null,
        serviceName: row.serviceName,
        rate: row.rate,
        quantity: row.qty,
        netAmount: row.totalAmt,
        discountAmount: row.discAmt,
        // netAmount: row.netAmt,
      })),
      doctorservice: testGridTableRowsableRows
        .filter((row) => row.serviceType === "Doctor")
        .map((row) => ({
          serviceId: row.serviceDetailsId,
          serviceNames: row.serviceName,
        })),
      isEmergency: isEmergency,

    };
    console.log("Payload------:", payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/opdBilling`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Data submitted successfully!");
        console.log("Response:", response.data);
      } else {
        alert("Failed to submit data. Please try again.");
        console.error("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(
        "An error occurred while submitting data. Please check the console."
      );
    }
  };

  const fetchDoctorDetails = async (doctorId) => {
    console.log("Fetching doctor details", doctorId);
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor details");
      }
      const doctorData = await response.json();
      setSelectedDoctor(doctorData || "N/A");
      return doctorData; // Explicitly return the fetched data
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      return null; // Return null in case of an error
    }
  };

  const fetchunpaidAppointmentsByOutPatientId = async (outPatientId) => {
    console.log("Fetching appointment id: " + outPatientId);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/out-patient/${outPatientId}/today`
      );
      console.log("Fetched Appointments:", response.data);
      setAppointments(response.data); // Update the state
      return response.data; // Explicitly return the data
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return []; // Return an empty array on error
    }
  };

  const handleAddRow = (type) => {
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
    }
  };

  const fetchOpdData = async () => {
    try {
      const response = await fetch(
        `
        ${API_BASE_URL}/patient-register/all
        `
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setOpdPatients(data);
      console.log("data++", data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/service-details/sorted-map`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch service details");
      }
      const data = await response.json();
      setServiceDetails(data); // Store the fetched data in state
    } catch (error) {
      console.error("Error fetching service details:", error);
      setError(error.message); // Set error message in state
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        setDoctors(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
    fetchServiceDetails();
  }, []);

  const renderTable = () => {
    switch (selectedTab) {
      case "testGrid":
        return (
          <div className="testgrid-table">
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
                    "Qty",
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
                      <div className="OpdBilling-test-search-field">
                        <FloatingInput label="MR No * " type="text" />
                        <button
                          className="OpdBilling-search-icon"
                          onClick={() => setActivePopup("services")}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                              fill="currentColor"
                              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td>{row.code}</td>
                    <td>{row.serviceName}</td>
                    <td>{row.doctorName}</td>
                    <td>{row.rate}</td>
                    <td>
                      <input
                        type="number"
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
                        type="number"
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
                      <input type="number" value={row.discAmt || 0} readOnly />
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
              </div>
            </div>
          </div>
        );
      case "paymentDetails":
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {["SN", "Head", "Amount"].map((header, index) => (
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
                {paymentDetailsTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sn}</td>
                    <td>{row.head}</td>
                    <td>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewPatientChange = (event) => {
    const { name, value } = event.target;
    // Ensure you're updating the correct field in the state
    newpatientsetFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field
    }));
  };

  return (
    <div className="billing-opd-com-Events">
      <div className="billing-opd-com-title-bar">
        <div className="billing-opd-com-header">
          <span>OPD Billing </span>
        </div>
      </div>
      <div className="OpdBilling-section">
        <div className="OpdBilling-grid">
          <div className="billing-opd-com-form-row">
            <label>Mobile No:</label>
            <div className="billing-opd-com-input-with-search">
              <input
                type="text"
                value={selectedPatient?.originalObject?.patient?.mobileNumber}
              />
              <button
                className="billing-opd-com-magnifier-btn"
                onClick={() => setActivePopup("mobilenumber")}
              >
                🔍
              </button>
            </div>
          </div>

          <div className="billing-opd-com-form-row">
            <label>
              MR No:<span className="billing-opd-required">*</span>
            </label>
            <div className="billing-opd-com-input-with-search">
              <input type="text" value={selectedPatient?.uhid} />
              <button
                className="billing-opd-com-magnifier-btn"
                onClick={() => setActivePopup("patient")}
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="OpdBilling-section">
        <div className="OpdBilling-header">Patient Details</div>
        <div className="OpdBilling-grid">
          <FloatingSelect
            label="Patient Type"
            name="patientType"
            value={patientType}
            onChange={(e) => setPatientType(e.target.value)}
            options={[
              { value: "", label: "Select Patient Type" },
              { value: "new patient", label: "New Patient" },
              { value: "old patient", label: " Old Patient" },
            ]}
          />
          {/* <FloatingSelect
            label="Category Counter"
            id="patientCategory"
            name="patientCategory"
            options={[
              { value: "general", label: "Private OPD" },
              { value: "private", label: "General OPD" },
            ]}
          /> */}
          {/* <div className="billing-opd-com-form-row">
            <label>Employee:</label>
            <input type="checkbox" value="" />
          </div> */}
          <FloatingSelect
            label="Name Initial"
            name="salutation"
            value={patientType}
            onChange={(e) => setPatientType(e.target.value)}
            options={[
              { value: "", label: "Select Patient Type" },
              { value: "Mr.", label: "Mr" },
              { value: "Mrs.", label: "Mrs" },
              { value: "Ms.", label: "Ms" },
              { value: "Prof.", label: "Prof" },
            ]}
          />
          <FloatingInput
            label="Adhar Card"
            type="text"
            name="adharCardId"
            onChange={handleNewPatientChange}
            value={newpatientformData.adharCardId}
          />
          <FloatingInput
            label="F Name"
            type="text"
            name="firstName"
            onChange={handleNewPatientChange}
            value={newpatientformData.firstName}
          />
          <FloatingInput
            label="M Name"
            type="text"
            value={newpatientformData.middleName}
            onChange={handleNewPatientChange}
            name="middleName"
          />
          <FloatingInput
            label="L Name"
            type="text"
            name="lastName"
            onChange={handleNewPatientChange}
            value={newpatientformData.lastName}
          />

          <FloatingSelect
            label="Gender"
            name="gender"
            onChange={handleNewPatientChange}
            value={newpatientformData.gender}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: " Other" },
            ]}
          />
          <FloatingSelect
            label="Material Status *"
            name="maritalStatus"
            value={newpatientformData.maritalStatus}
            onChange={handleNewPatientChange}
            options={[
              { value: "Single", label: "Single" },
              { value: "Married", label: "Married" },
              { value: "Divorced", label: "Divorced" },
              { value: "Widowed", label: "Widowed" },
            ]}
          />
          <FloatingSelect
            label="Relation"
            name="relation"
            value={newpatientformData.relation}
            onChange={handleNewPatientChange}
            options={[
              { value: "Father", label: "Father" },
              { value: "Mother", label: "Mother" },
              { value: "Brother", label: "Brother" },
              { value: "Sister", label: "Sister" },
              { value: "Son", label: "Son" },
              { value: "Daughter", label: "Daughter" },
              { value: "Spouse", label: "Spouse" },
              { value: "Other", label: "Other" },
            ]}
          />

          <FloatingInput
            label="Relative Name"
            name="relationName"
            type="text"
            onChange={handleNewPatientChange}
            value={newpatientformData.relationName}
          />
          <FloatingInput
            name="age"
            onChange={handleNewPatientChange}
            label="Age"
            type="text"
            value={newpatientformData.age}
          />
          <FloatingInput
            label="Address"
            type="text"
            name="address"
            onChange={handleNewPatientChange}
            value={newpatientformData.address}
          />
          <FloatingInput
            label="City/Village"
            type="text"
            name="areaVillage"
            onChange={handleNewPatientChange}
            value={newpatientformData.areaVillage}
          />
          <FloatingInput
            label="PinCode"
            type="text"
            name="pinCode"
            onChange={handleNewPatientChange}
            value={newpatientformData.pinCode}
          />
          <FloatingInput
            label="Country"
            type="text"
            name="nationality"
            onChange={handleNewPatientChange}
            value={newpatientformData.nationality}
          />
          <FloatingInput
            name="sourceOfRegistration"
            value={newpatientformData.sourceOfRegistration}
            onChange={handleNewPatientChange}
            label="Source Of Registration"
            type="text"
          />
          <FloatingInput
            label="Mobile No"
            type="text"
            name="mobileNumber"
            onChange={handleNewPatientChange}
            value={newpatientformData.mobileNumber}
          />
          <FloatingInput
            label="Phone"
            type="text"
            onChange={handleNewPatientChange}
            value={selectedPatient?.patient?.alternateNumber}
          />
          <FloatingInput
            label="Email Id *"
            type="text"
            name="emailId"
            onChange={handleNewPatientChange}
            value={newpatientformData.emailId}
          />
          {/* <div className="billing-opd-com-form-row">
            <label>
              Doctor Name:<span className="billing-opd-required">*</span>
            </label>
            <div className="billing-opd-com-input-with-search">
              <select
                name="admittedDoctor"
                className="create-admission-form-input"
                onChange={handleChange}
                value={selectedDoctor}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.employeeId} value={doctor.employeeId}>
                    {doctor.salutation} {doctor.doctorName} {doctor.lastName}
                  </option>
                ))}
              </select>
              <button className="billing-opd-com-magnifier-btn">🔍</button>
            </div>
          </div> */}

          <FloatingSelect
            label="Referral Type"
            name=""
            options={[
              { value: "walkin", label: "Walk in" },
              { value: "website", label: "Website" },
              { value: "other", label: "other" },
            ]}
          />
          <FloatingInput
            label="Referred Dr"
            type="text"
            name="referredDoctor"
            value={formData.referredDoctor}
            onChange={handleChange}
          />

          <FloatingInput
            label="Bill No"
            type="text"
            name="billNo"
            value={formData.billNo}
            onChange={handleChange}
          />

          <FloatingInput
            label="NonRegular DoctorNM"
            type="text"
            name="nonregulardctorname"
            value={formData.nonregulardctorname}
            onChange={handleChange}
          />
          <div className="billing-opd-com-form-row">
            <label>Package:</label>
            <input
              type="checkbox"
              name="package"
              checked
              value={formData.package}
            />
          </div>

          <FloatingSelect
            label="Pkg Type"
            id="patientCategory"
            options={[
              { value: "general", label: "OPD Package" },
              { value: "general", label: "Private OPD" },
              { value: "private", label: " Other" },
            ]}
          />
          <FloatingInput
            label="Old Mrno"
            type="text"
            name="oldmrno"
            value={formData.oldmrno}
            onChange={handleChange}
          />

          <FloatingInput
            label="Empdiscountpolicy"
            type="text"
            name="Empdiscountpolicy"
            value={formData.Empdiscountpolicy}
            onChange={handleChange}
          />
          {/* <div className="billing-opd-com-form-row">
                <label>Empdiscountpolicy:</label>
                <input
                  type="text"
                  name="Empdiscountpolicy"
                  value={formData.Empdiscountpolicy}
                  onChange={handleChange}
                />
              </div> */}
          <FloatingInput
            label="Diagnosis"
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="billing-opd-com-content-wrapper">
        <div className="billing-opd-com-main-section">
          {activePopup && (
            <PopupTable
              columns={columns}
              data={data}
              onSelect={handleSelect}
              onClose={() => setActivePopup(false)}
            />
          )}
          <div className="billing-opd-com-panel operation-details">
            <div className="billing-opd-com-panel-content"></div>
          </div>
          <div className="billing-opd-com-panel operation-details">
            {/* <div className="billing-opd-com-panel-header">Surgery Details</div>  */}
            <div className="billing-opd-com-panel-content"></div>
          </div>
        </div>
        <div className="iPBilling-services-section">
          <div className="iPBilling-tab-bar">
            <button
              className={`iPBilling-tab ${selectedTab === "testGrid" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("testGrid")}
            >
              Test Grid
            </button>
            <button
              className={`iPBilling-tab ${selectedTab === "paymentDetails" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("paymentDetails")}
            >
              Payment Details
            </button>
          </div>

          {/* Dynamically render tables based on selected tab */}
          {renderTable()}
        </div>

        {/* ---------------------------------------------------------------------------------------------------------------------      */}
        <div className="billing-opd-com-main-section-payment">
          <div className="OpdBilling-section">
            <div className="OpdBilling-header">Financial Details</div>
            <div className="OpdBilling-grid-sec">
              <FloatingInput
                label="Total Amt *"
                type="text"
                value={totalAmount}
                readOnly
              />
              <FloatingInput
                label="Final Disc Amt"
                type="text"
                value={discountAmount}
                readOnly
              />
              <FloatingInput
                label="Net Amt"
                type="text"
                value={netAmount}
                readOnly
              />
              <FloatingInput
                label="Paid Amt"
                type="text"
                value={selectedPatient?.financialDetaildto?.paidAmount}
                name="paidAmt"
                onChange={handleChange}
              />
              <FloatingInput
                label="Credit Amt"
                type="text"
                value="0"
                name="creditAmt"
                onChange={handleChange}
              />
              <FloatingInput
                label="Curr Balance"
                type="text"
                value={currentBalance.toFixed(2)}
                name="currBalance"
              />
              <FloatingInput
                label="Due Amount"
                type="text"
                name="discReason"
                value={selectedPatient?.financialDetaildto?.dueAmount}
                readOnly
              />
              <FloatingInput
                label="Remarks *"
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
              <FloatingInput label="OP Bal Amt" type="text" value="" />
            </div>
          </div>

          <div className="OpdBilling-section">
            <div className="OpdBilling-header">Payment Mode</div>
            <div className="billing-opd-com-panel-content">
              <div className="payment-mode-selection">
                <div className="OpdBilling-grid-sec">
                  <FloatingSelect
                    label="Select Payment Mode"
                    htmlFor="paymentMode"
                    id="paymentMode"
                    onChange={(e) => {
                      setSelectedPaymentMode(e.target.value);
                      setPaymentDetails({}); // Reset payment details when mode changes
                    }}
                    options={[
                      { value: "", label: "-- Select Payment Mode --" },
                      { value: "cash", label: "Cash" },
                      { value: "card", label: " Card" },
                      { value: "upi", label: " UPI" },
                      { value: "check", label: " Check" },
                    ]}
                  />
                </div>
                {selectedPaymentMode && (
                  <div className="OpdBilling-grid-sec">
                    <FloatingInput
                      label="Amount"
                      htmlFor="amount"
                      type="number"
                      id="amount"
                      // placeholder="Enter Amount"
                      value={paymentDetails.amount || ""}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          amount: e.target.value,
                        })
                      }
                    />


                    {selectedPaymentMode === "card" && (
                      <FloatingInput
                        label="Card Number"
                        htmlFor="cardNumber"
                        type="text"
                        id="cardNumber"
                        value={paymentDetails.cardNumber || ""}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardNumber: e.target.value,
                          })
                        }
                      />


                    )}
                    {selectedPaymentMode === "upi" && (
                      <FloatingInput
                        label="UPI ID"
                        htmlFor="upiId"
                        type="text"
                        id="upiId"
                        value={paymentDetails.upiId || ""}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            upiId: e.target.value,
                          })
                        }
                      />


                    )}
                    {selectedPaymentMode === "check" && (
                      <>
                        <FloatingInput
                          label="Check Number"
                          htmlFor="checkNumber"
                          type="text"
                          id="checkNumber"
                          focused={
                            paymentDetails.checkNumber != null ? true : false
                          }
                          value={paymentDetails.checkNumber || ""}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              checkNumber: e.target.value,
                            })
                          }
                        />

                        <FloatingInput
                          label="Check Date"
                          type="date"
                          id="checkDate"
                          value={paymentDetails.checkDate || ""}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              checkDate: e.target.value,
                            })
                          }
                        />

                      </>
                    )}
                  </div>
                )}
              </div>
              {selectedPaymentMode && (
                <div className="payment-actions">
                  <button
                    onClick={() =>
                      handleAddPayment(
                        selectedPaymentMode,
                        paymentDetails.amount,
                        paymentDetails
                      )
                    }
                  >
                    Add Payment
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="billing-opd-com-panel-payment">
            <div className="billing-opd-com-panel-content">
              <div className="payment-summary">
                <h4>Added Payments</h4>
                <table className="payment-table">
                  <thead>
                    <tr>
                      <th>Mode</th>
                      <th>Amount</th>
                      <th>Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addedPayments.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.mode}</td>
                        <td>
                          {editableRow === index ? (
                            <input
                              type="number"
                              value={editingPayment.amount || ""}
                              onChange={(e) =>
                                setEditingPayment({
                                  ...editingPayment,
                                  amount: e.target.value,
                                })
                              }
                            />
                          ) : (
                            payment.details.amount
                          )}
                        </td>
                        <td>
                          {payment.mode === "card" && (
                            <span>
                              Card Number:{" "}
                              {editableRow === index ? (
                                <input
                                  type="text"
                                  value={editingPayment.cardNumber || ""}
                                  onChange={(e) =>
                                    setEditingPayment({
                                      ...editingPayment,
                                      cardNumber: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                payment.details.cardNumber
                              )}
                            </span>
                          )}
                          {payment.mode === "upi" && (
                            <span>
                              UPI ID:{" "}
                              {editableRow === index ? (
                                <input
                                  type="text"
                                  value={editingPayment.upiId || ""}
                                  onChange={(e) =>
                                    setEditingPayment({
                                      ...editingPayment,
                                      upiId: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                payment.details.upiId
                              )}
                            </span>
                          )}
                          {payment.mode === "check" && (
                            <span>
                              Check Number:{" "}
                              {editableRow === index ? (
                                <input
                                  type="text"
                                  value={editingPayment.checkNumber || ""}
                                  onChange={(e) =>
                                    setEditingPayment({
                                      ...editingPayment,
                                      checkNumber: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                payment.details.checkNumber
                              )}
                              , Check Date:{" "}
                              {editableRow === index ? (
                                <input
                                  type="date"
                                  value={editingPayment.checkDate || ""}
                                  onChange={(e) =>
                                    setEditingPayment({
                                      ...editingPayment,
                                      checkDate: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                payment.details.checkDate
                              )}
                            </span>
                          )}
                        </td>
                        <td>
                          {editableRow === index ? (
                            <button
                              className="opd-billing-button"
                              onClick={() => handleSaveEdit(index)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="opd-billing-button"
                              onClick={() => handleEditPayment(index)}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            className="opd-billing-button-remove"
                            onClick={() => handleRemovePayment(index)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="billing-opd-com-action-buttons">
          <button className="btn-blue" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default OpdBilling;
