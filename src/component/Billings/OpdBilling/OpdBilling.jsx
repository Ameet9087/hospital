import React, { useState, useRef, useEffect } from "react";
import "./OpdBilling.css";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
} from "../../../FloatingInputs/index";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { usePopup } from "../../../FidgetSpinner/PopupContext";
import OpdBillingPrint from "./OpdBillingPrint";
import CustomModal from "../../../CustomModel/CustomModal";

const OpdBilling = () => {
  const { showPopup } = usePopup();
  const [opdPatients, setOpdPatients] = useState([]);
  const [selectedTab, setSelectedTab] = useState("testGrid");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [activePopup, setActivePopup] = useState("");
  const [selectedPatient, setSelectedPatient] = useState();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [serviceDoctors, setServiceDoctors] = useState([]);
  const [selectedServiceDoctor, setSelectedServiceDoctor] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const [overallDiscPercent, setOverallDiscPercent] = useState(0);
  const [overallDiscAmt, setOverallDiscAmt] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [outPatientId, setOutPatientId] = useState();
  const [patientType, setPatientType] = useState("");
  const [isPrintEnabled, setIsPrintEnabled] = useState(false);
  const [billFromResponse, setBillFromResponse] = useState(null);

  const [isEmergency, setemergency] = useState(false);

  const handlePrintBilling = () => {
    console.log("Navigating with state:", {
      selectedPatient,
      selectedDoctor,
      testGridTableRowsableRows,
      netAmount,
      selectedPaymentMode,
      billFromResponse,
    });
    navigate("/billing/OpdBillingPrint", {
      state: {
        selectedPatient,
        selectedDoctor,
        testGridTableRowsableRows,
        netAmount,
        selectedPaymentMode,
        billFromResponse,
      },
    });
  };

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
  const [paymentDetails, setPaymentDetails] = React.useState({
    mode: "",
    amount: "",
    cardNumber: "",
    upiId: "",
    checkNumber: "",
    checkDate: "",
  });
  const [selectedPaymentIndex, setSelecteddPaymentIndex] = useState(null);
  const [addedPayments, setAddedPayments] = React.useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [serviceType, setServiceType] = useState("Investigation");
  const [referedDoctor, setReferredDoctor] = useState([]);
  const [selectedReferedDoctor, setSelectedReferredDoctor] = useState(null);
  const [organisation, setOrganisation] = useState([]);
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);
  const [packages, setPackage] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // const calculateBalance = (total, paid) => {
  //   const balance = total - paid;
  //   console.log("Balance:", balance);
  //   setCurrentBalance(balance >= 0 ? balance : 0);
  // };

  const calculateTotalPaidAmount = (payments = []) => {
    if (!Array.isArray(payments)) {
      console.error("Invalid payments array", payments);
      return;
    }

    const totalPaid = payments.reduce(
      (sum, payment) => sum + (parseFloat(payment.amount) || 0),
      0
    );

    console.log("Total Paid Amount:", totalPaid);

    setPaidAmount(totalPaid.toFixed(2));

    setNetAmount((prevNetAmount) => {
      const updatedBalance = prevNetAmount - totalPaid;
      setCurrentBalance(
        updatedBalance >= 0 ? updatedBalance.toFixed(2) : "0.00"
      );
      const newDueAmount = Math.max(prevNetAmount - totalPaid, 0).toFixed(2);
      setDueAmount(newDueAmount);
      return prevNetAmount;
    });
  };

  const handleAddPayment = () => {
    if (!paymentDetails.amount || parseFloat(paymentDetails.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setAddedPayments((prevPayments) => {
      let updatedPayments = [...prevPayments];
      let newAmount = parseFloat(paymentDetails.amount).toFixed(2);

      if (selectedPaymentIndex !== null) {
        updatedPayments[selectedPaymentIndex] = {
          ...paymentDetails,
          amount: newAmount,
          index: selectedPaymentIndex + 1,
        };
      } else {
        updatedPayments.push({
          ...paymentDetails,
          amount: newAmount,
          index: prevPayments.length + 1,
        });
      }

      calculateTotalPaidAmount(updatedPayments);
      return updatedPayments;
    });

    setPaymentDetails({
      mode: "",
      amount: "",
      cardNumber: "",
      upiId: "",
      checkNumber: "",
      checkDate: "",
    });
    setSelecteddPaymentIndex(null);
  };

  const handleEditPayment = (index, payment) => {
    setSelecteddPaymentIndex(index);
    setPaymentDetails(payment);
  };
  // const handleSaveEditedPayment = () => {
  //   if (selectedPaymentIndex === null || !selectedPaymentMode) return;

  //   setAddedPayments((prevPayments) => {
  //     const existingPayment = prevPayments[selectedPaymentIndex];

  //     // 🔥 Remove the previous payment mode
  //     const filteredPayments = prevPayments.filter(
  //       (_, i) => i !== selectedPaymentIndex
  //     );

  //     return [
  //       ...filteredPayments,
  //       {
  //         mode: selectedPaymentMode,
  //         details: {
  //           ...paymentDetails,
  //           amount: existingPayment.details.amount, // Keep the same amount
  //         },
  //       },
  //     ];
  //   });

  //   resetPaymentForm();
  // }
  // useEffect(() => {
  //   calculateBalance(totalAmount, paidAmount);
  // }, [paidAmount, totalAmount]);

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

  const handleOverallDiscountPercentChange = (e) => {
    let percent = parseFloat(e.target.value) || 0;
    percent = Math.min(percent, 100);
    setOverallDiscPercent(percent);
    setTestGridTableRowsableRows((prevRows) => {
      let totalAmt = prevRows.reduce(
        (sum, row) => sum + (row.totalAmt || 0),
        0
      );
      let discountAmount = (totalAmt * percent) / 100;
      let newNetAmount = totalAmt - discountAmount;

      let updatedPaidAmount = Math.min(paidAmount, newNetAmount);
      let newCurrentBalance = newNetAmount - updatedPaidAmount;
      setTotalAmount(totalAmt.toFixed(2));
      setDiscountAmount(discountAmount.toFixed(2));
      setNetAmount(newNetAmount.toFixed(2));
      setPaidAmount(updatedPaidAmount.toFixed(2));
      setCurrentBalance(newCurrentBalance.toFixed(2));

      return prevRows;
    });
  };

  const handleOverallDiscountAmountChange = (e) => {
    let discountAmount = parseFloat(e.target.value) || 0;
    discountAmount = Math.min(discountAmount, totalAmount);

    setOverallDiscAmt(discountAmount);

    setTestGridTableRowsableRows((prevRows) => {
      let totalAmt = prevRows.reduce(
        (sum, row) => sum + (row.totalAmt || 0),
        0
      );

      let percent = totalAmt > 0 ? (discountAmount / totalAmt) * 100 : 0;
      percent = Math.min(percent, 100);

      let newNetAmount = totalAmt - discountAmount;
      let updatedPaidAmount = Math.min(paidAmount, newNetAmount);

      let newCurrentBalance = newNetAmount - updatedPaidAmount;

      setTotalAmount(totalAmt.toFixed(2));
      setDiscountAmount(discountAmount.toFixed(2));
      setNetAmount(newNetAmount.toFixed(2));
      setOverallDiscPercent(percent.toFixed(2));
      setPaidAmount(updatedPaidAmount.toFixed(2));
      setCurrentBalance(newCurrentBalance.toFixed(2));

      return prevRows;
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

  const fetchAllReferredDoctors = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/doctors/doctors/non-employees`
      );
      console.log(response.data);

      setReferredDoctor(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    } else if (activePopup === "organisation") {
      return {
        columns: [
          "masterId",
          "name",
          "organisationCode",
          "organisationCategory",
          "email",
        ],
        data: organisation,
      };
    } else if (activePopup === "pkgType") {
      return {
        columns: [
          "packageId",
          "packageName",
          "packageType",
          "companyPackageName",
        ],
        data: packages,
      };
    } else if (activePopup === "referredDoctor") {
      return {
        columns: ["doctorId", "doctorName", "mobileNumber", "title"],
        data: referedDoctor,
      };
    } else if (activePopup === "mainDoctor") {
      return {
        columns: ["doctorId", "doctorName", "mobileNumber", "title"],
        data: doctors,
      };
    } else if (activePopup === "serviceDoctor") {
      return {
        columns: ["employeeId", "salutation", "firstName", "lastName"],
        data: serviceDoctors,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "patient" || activePopup === "mobilenumber") {
      setSelectedPatient(data.originalObject);
      try {
        const fetchedAppointments = await fetchunpaidAppointmentsByOutPatientId(
          data?.originalObject?.patientRegistrationId
        );
        setOutPatientId(fetchedAppointments.outPatientId);
        const doctorId = fetchedAppointments.addDoctor?.doctorId;
        if (doctorId) {
          const doctorDetails = await fetchDoctorDetails(doctorId);

          const opdFees = doctorDetails?.orgDoctorFees?.find(
            (fee) => fee.payType?.payTypeName === "OPD"
          );

          const generalOpdFee = opdFees?.generalOpdFee || 0;
          const followupfees = opdFees?.followupopdfees || 0;
          if (
            fetchedAppointments.feespaid !== "yes" &&
            fetchedAppointments.typeOfAppointment == "New Patient"
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
        const isEmergency = data.originalObject.isEmergency === "yes";

        if (isEmergency) {
          setemergency(true);
          doctorServices = await fetchEmergencyDoctorService(
            data.originalObject.erNo
          );

          if (doctorServices.length > 0) {
            const firstService = doctorServices[0];

            const rateToUse = isEmergency
              ? firstService.morningEmergencyToDoctor
              : firstService.morningEmergencyToDoctor;

            const EmergencydocName = await fetchDoctorDetails(
              firstService.doctorId
            );

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
      await fetchServiceDoctors(data.serviceType);
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
    } else if (activePopup === "organisation") {
      setSelectedOrganisation(data);
      console.log(data);

      await fetchPackage(data.masterId, selectedPatient.gender, null, "OPD");
    } else if (activePopup === "pkgType") {
      setSelectedPackage(data);
      const mappedTestGridRows = [selectedPackage]?.flatMap((pkg) =>
        pkg.testDetailsDTO.map((detail, index) => {
          setSelectedService(detail?.serviceDetailsDTO);
          return {
            sn: index + 1,
            serviceDetailsId: detail?.serviceDetailsDTO?.serviceDetailsId || "",
            code: detail?.serviceDetailsDTO?.serviceCode || "",
            serviceName: detail?.serviceDetailsDTO?.serviceName || "",
            doctorName: detail?.doctorDTO?.doctorName || "",
            rate: pkg.packageRates?.[0]?.rate || "",
            qty: 1,
            totalAmt: pkg.packageRates?.[0]?.rate || "",
            lessDisc: pkg.packageRates?.[0]?.discount || "",
            discAmt: pkg.packageRates?.[0]?.disAmount || "",
            netAmt: "",
            emerg: "",
            emergAmt: "",
          };
        })
      );

      setTestGridTableRowsableRows(mappedTestGridRows);
    } else if (activePopup === "referredDoctor") {
      setSelectedReferredDoctor(data);
    } else if (activePopup === "mainDoctor") {
      setSelectedDoctor(data);
    } else if (activePopup === "serviceDoctor") {
      setSelectedServiceDoctor(data);
    }
    setActivePopup(null);
  };

  const resetForm = () => {
    setFormData({
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
      refferedDoctor: "",
      doctor: "",
      netAmount: "",
    });

    newpatientsetFormData({
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

    setAddedPayments([]);
    setPaymentDetails({});
    setSelectedPackage(null);
    setSelectedOrganisation(null);
    setTestGridTableRowsableRows([
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
    setSelectedPatient(null);
    setOutPatientId(null);
    setIsPrintEnabled(false);
    setBillFromResponse(null);
    setSelectedOrganisation(null);
    setSelectedDoctor(null);
    setSelectedPackage(null);
    setNetAmount(0);
    setTotalAmount(0);
    setAddedPayments([]);
    setDueAmount(0);
    setNetAmount(0);
    setSelectedService(null);
    setSelectedServiceDoctor(null);
    setSelectedReferredDoctor(null);
    setPaymentDetails({
      mode: "",
      amount: "",
      cardNumber: "",
      upiId: "",
      checkNumber: "",
      checkDate: "",
    });
  };

  const handleSubmit = async () => {
    const updatedPayments = addedPayments.map(({ index, ...rest }) => rest);
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
      ...(patientType === "new patient" && {
        refferedDoctor: formData.refferedDoctor,
        doctor: formData.doctor,
      }),
      outPatientDTO: {
        ...(patientType != "new patient"
          ? {
            outPatientId: outPatientId,
            patient: {
              patientRegistrationId: selectedPatient?.patientRegistrationId,
            },
          }
          : {
            patient: {
              salutation: newpatientformData.salutation,
              firstName: newpatientformData.firstName,
              middleName: newpatientformData.middleName,
              lastName: newpatientformData.lastName,
              gender: newpatientformData.gender,
              age: newpatientformData.age,
              ageUnit: "Years",
              maritalStatus: newpatientformData.maritalStatus,
              relation: newpatientformData.relation,
              adharCardId: newpatientformData.adharCardId,
              relationName: newpatientformData.relationName,
              address: newpatientformData.address,
              mobileNumber: newpatientformData.mobileNumber,
              emailId: newpatientformData.emailId,
              pinCode: newpatientformData.pinCode,
              areaVillage: newpatientformData.areaVillage,
              nationality: newpatientformData.nationality,
              sourceOfRegistration: newpatientformData.sourceOfRegistration,
            },
          }),
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
          paidAmount: parseFloat(paidAmount || formData.paidAmt),
          dueAmount: parseFloat(currentBalance || currentBalance),
          totalDoctorShareAmount: parseFloat(
            selectedPatient?.financialDetails?.totalDoctorShareAmount || 0
          ),
          totalHospitalAmount: parseFloat(
            selectedPatient?.financialDetails?.totalHospitalAmount || 0
          ),
        },
      },

      paymentModeDTO: updatedPayments,
      testGridOpdBillDTO: testGridTableRowsableRows.map((row) => ({
        serviceDetailsId: row.serviceDetailsId || null,
        serviceName: row.serviceName,
        rate: row.rate,
        quantity: row.qty,
        discountAmount: row.discAmt,
        netAmount: row.netAmt,
        employeeDTO: { employeeId: selectedServiceDoctor.employeeId },
      })),
      doctorservice: testGridTableRowsableRows
        .filter((row) => row.serviceType === "Doctor")
        .map((row) => ({
          serviceId: row.serviceDetailsId,
          serviceNames: row.serviceName,
        })),
      isEmergency: isEmergency,
    };

    if (selectedPackage) {
      payload.dgPackageDto = { packageId: selectedPackage?.packageId };
    }
    if (selectedOrganisation) {
      payload.organisationMasterDTO = {
        masterId: selectedOrganisation?.masterId,
      };
    }
    console.log("Payload------:", payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/opdBilling`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Data submitted successfully!");
        showPopup([
          { url: "/patient/registerpatient", text: "Patient Registration" },
          { url: "/appointment/doctorappointment", text: "Appointment" },
        ]);
        setIsPrintEnabled(true);
        resetForm();
        setBillFromResponse(response.data);
      } else {
        toast.error("Failed to submit data. Please try again.");
        console.error("Response status:", response.status);
      }
    } catch (error) {
      toast.error("Error submitting data:", error);
      setIsPrintEnabled(false);
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
      response.data; // Update the state
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
      const response = await axios.get(
        `${API_BASE_URL}/service-details/by-consultation-type?consultationType=${serviceType}`
      );

      const data = Array.isArray(response.data) ? response.data : [];
      console.log(data);
      setServiceDetails(data);
    } catch (error) {
      console.error("Error fetching service details:", error);
      setServiceDetails([]); // Ensure state is set to an empty array in case of an error
    }
  };

  const fetchOrganisation = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/organisation-masters`);

      const data = Array.isArray(response.data) ? response.data : [];
      console.log(data);
      setOrganisation(data);
    } catch (error) {
      console.error("Error fetching service details:", error);
      setServiceDetails([]); // Ensure state is set to an empty array in case of an error
    }
  };
  const fetchPackage = async (
    organisationId,
    gender,
    packageForIpdOpd,
    payTypeName
  ) => {
    try {
      console.log(organisationId);

      let response;
      if (organisationId) {
        response = await axios.get(`${API_BASE_URL}/dg-packages/search`, {
          params: {
            gender: gender,
            organisationId: organisationId,
            packageforipdopd: packageForIpdOpd,
            payTypeName: payTypeName,
          },
        });
      } else {
        response = await axios.get(`${API_BASE_URL}/dg-packages/search`, {
          params: {
            payTypeName: "OPD",
          },
        });
      }

      const data = Array.isArray(response.data) ? response.data : [];
      console.log(data);
      setPackage(data);
    } catch (error) {
      console.error("Error fetching package details:", error);
      setPackage([]); // Ensure state is set to an empty array in case of an error
    }
  };

  const fetchServiceDoctors = async (department) => {
    try {
      console.log(department);

      const response = await fetch(
        `${API_BASE_URL}/employees/findAllDoctors?departmentName=${department}`
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      setServiceDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOpdData(); // Fetch OPD data first
        await fetchAllReferredDoctors();
        await fetchDoctors();
        await fetchServiceDetails();
        await fetchOrganisation();
        await fetchPackage();
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, [serviceType]);

  const calculateFinancialDetails = (rows, selectedPatient) => {
    let totalAmt = 0;
    let discAmt = 0;
    rows.forEach((row) => {
      totalAmt += Number(row.totalAmt) || 0;
      discAmt += Number(row.discAmt) || 0;
    });

    let netAmt = totalAmt - discAmt; // Update states correctly
    setTotalAmount(totalAmt.toFixed(2));
    setDiscountAmount(discAmt.toFixed(2));
    setNetAmount(netAmt.toFixed(2));

    let calculatedPaidAmount =
      parseFloat(selectedPatient?.financialDetaildto?.paidAmount) || 0;
    calculatedPaidAmount = Math.min(calculatedPaidAmount, netAmt);

    setPaidAmount(calculatedPaidAmount.toFixed(2));
    setCurrentBalance((netAmt - calculatedPaidAmount).toFixed(2));
  };

  useEffect(() => {
    calculateFinancialDetails(testGridTableRowsableRows, selectedPatient);
  }, [testGridTableRowsableRows, selectedPatient]);

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
                      <div className="OpdBilling-test-search-field">
                        <FloatingSelect
                          type="search"
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          options={[
                            { value: "Investigation", label: "Investigation" },
                            { value: "Consultation", label: "Consultation" },
                            { value: "Procedure", label: "Procedure" },
                          ]}
                        />
                      </div>
                    </td>
                    <td>{row.serviceCode}</td>
                    <td>
                      <div className="OpdBilling-test-search-field">
                        <FloatingInput
                          type="search"
                          value={selectedService?.serviceName}
                          onIconClick={() => setActivePopup("services")}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="OpdBilling-test-search-field">
                        <FloatingInput
                          type="search"
                          value={selectedServiceDoctor?.firstName}
                          onIconClick={() => setActivePopup("serviceDoctor")}
                        />
                      </div>
                    </td>
                    <td>{row.rate}</td>
                    <td>
                      <FloatingInput
                        type="number"
                        min="0"
                        value={row.qty || 0}
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
                          let lessDisc = parseFloat(e.target.value) || 0;
                          let discAmt = (row.totalAmt * lessDisc) / 100;

                          // **Validation: Ensure discount does not exceed totalAmt**
                          if (discAmt > row.totalAmt) {
                            discAmt = row.totalAmt;
                            lessDisc = 100; // Max discount is 100%
                          }

                          setTestGridTableRowsableRows((prevRows) => {
                            const updatedRows = [...prevRows];
                            updatedRows[index].lessDisc = lessDisc;
                            updatedRows[index].discAmt = discAmt;
                            updatedRows[index].netAmt = row.totalAmt - discAmt;
                            return updatedRows;
                          });
                        }}
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="text"
                        value={row.discAmt || 0}
                        onChange={(e) => {
                          let discAmt = parseFloat(e.target.value) || 0;

                          // **Validation: Ensure discount does not exceed totalAmt**
                          if (discAmt > row.totalAmt) {
                            discAmt = row.totalAmt;
                          }

                          setTestGridTableRowsableRows((prevRows) => {
                            const updatedRows = [...prevRows];
                            updatedRows[index].discAmt = discAmt;
                            updatedRows[index].lessDisc =
                              (discAmt / row.totalAmt) * 100; // Recalculate percentage
                            updatedRows[index].netAmt = row.totalAmt - discAmt;
                            return updatedRows;
                          });
                        }}
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
                  <FloatingInput
                    label={"Less Disc% On All Services"}
                    type="text"
                    value={overallDiscPercent}
                    onChange={handleOverallDiscountPercentChange}
                  />
                </div>
                <div className="billing-opd-com-summary-field">
                  <FloatingInput
                    label={"Less Disc Amt on All Services"}
                    type="text"
                    value={overallDiscAmt}
                    onChange={handleOverallDiscountAmountChange}
                  />
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
    <>
      <div className="billing-opd-com-Events">
        <div className="billing-opd-com-title-bar">
          <div className="billing-opd-com-header">
            <span>OPD Billing </span>
          </div>
        </div>
        <div className="OpdBilling-section">
          <div className="OpdBilling-grid">
            <div className="billing-opd-com-form-row">
              <FloatingInput
                label={"Mobile No"}
                type="search"
                value={selectedPatient?.mobileNumber}
                restrictions={{ number: true, max: 10 }}
                onIconClick={() => setActivePopup("mobilenumber")}
              />
            </div>

            <div className="billing-opd-com-form-row">
              <FloatingInput
                label={"UHID"}
                type="search"
                value={selectedPatient?.uhid}
                onIconClick={() => setActivePopup("patient")}
              />
            </div>
            <div className="billing-opd-com-form-row">
              <FloatingInput
                label={"Appointment Id"}
                type="text"
                value={outPatientId || ""}
                readOnly
              />
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
              value={
                selectedPatient?.salutation || newpatientformData.salutation
              }
              onChange={handleNewPatientChange}
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
              restrictions={{ number: true, max: 12 }}
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
              type="search"
              name="referredDoctor"
              value={selectedReferedDoctor?.doctorName}
              onIconClick={() => setActivePopup("referredDoctor")}
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
            <FloatingInput
              label="Doctor"
              value={selectedDoctor?.doctorName || "SELF"}
              onIconClick={() => setActivePopup("mainDoctor")}
              type="search"
            />
            <FloatingInput
              label="Organisation"
              value={selectedOrganisation?.name}
              onIconClick={() => setActivePopup("organisation")}
              type="search"
            />

            <FloatingInput
              label="Pkg Type"
              value={selectedPackage?.packageName}
              onIconClick={() => setActivePopup("pkgType")}
              type="search"
            />
            {/* <FloatingInput
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
          /> */}
            {/* <div className="billing-opd-com-form-row">
                <label>Empdiscountpolicy:</label>
                <input
                  type="text"
                  name="Empdiscountpolicy"
                  value={formData.Empdiscountpolicy}
                  onChange={handleChange}
                />
              </div> */}
            {/* <FloatingInput
            label="Diagnosis"
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          /> */}
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
                  value={paidAmount}
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
                  value={currentBalance}
                  name="currBalance"
                />
                <FloatingInput
                  label="Due Amount"
                  type="text"
                  name="discReason"
                  value={dueAmount}
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
                        const selectedMode = e.target.value;
                        setPaymentDetails((prev) => ({
                          ...prev,
                          mode: selectedMode,
                          amount:
                            prev.amount || Math.min(currentBalance, netAmount),
                        }));
                      }}
                      options={[
                        { value: "", label: "-- Select Payment Mode --" },
                        { value: "cash", label: "Cash" },
                        { value: "card", label: "Card" },
                        { value: "upi", label: "UPI" },
                        { value: "check", label: "Check" },
                      ]}
                    />
                  </div>
                  {paymentDetails.mode && (
                    <div className="OpdBilling-grid-sec">
                      <FloatingInput
                        label="Amount"
                        htmlFor="amount"
                        type="text"
                        id="amount"
                        name="amount"
                        value={paymentDetails.amount}
                        onChange={(e) => {
                          let amount = e.target.value.replace(/[^0-9.]/g, "");
                          setPaymentDetails({ ...paymentDetails, amount });
                        }}
                      />
                      {paymentDetails.mode === "card" && (
                        <FloatingInput
                          label="Card Number"
                          htmlFor="cardNumber"
                          type="text"
                          id="cardNumber"
                          value={paymentDetails.cardNumber}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cardNumber: e.target.value,
                            })
                          }
                        />
                      )}
                      {paymentDetails.mode === "upi" && (
                        <FloatingInput
                          label="UPI ID"
                          htmlFor="upiId"
                          type="text"
                          id="upiId"
                          value={paymentDetails.upiId}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              upiId: e.target.value,
                            })
                          }
                        />
                      )}
                      {paymentDetails.mode === "check" && (
                        <>
                          <FloatingInput
                            label="Check Number"
                            htmlFor="checkNumber"
                            type="text"
                            id="checkNumber"
                            value={paymentDetails.checkNumber}
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
                            value={paymentDetails.checkDate}
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
                <div className="payment-actions">
                  <button onClick={handleAddPayment}>
                    {selectedPaymentIndex !== null
                      ? "Save Changes"
                      : "Add Payment"}
                  </button>
                </div>
              </div>
            </div>
            <div className="billing-opd-com-panel-payment OpdBilling-section">
              <div className="OpdBilling-header">Added Payments</div>
              <div className="billing-opd-com-panel-content">
                <div className="payment-summary">
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
                          <td>{payment.amount}</td>
                          <td>
                            {payment.mode === "card" && (
                              <span>Card Number: {payment.cardNumber}</span>
                            )}
                            {payment.mode === "upi" && (
                              <span>UPI ID: {payment.upiId}</span>
                            )}
                            {payment.mode === "check" && (
                              <span>
                                Check Number: {payment.checkNumber}, Check Date:{" "}
                                {payment.checkDate}
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              className="opd-billing-button"
                              onClick={() => handleEditPayment(index, payment)}
                            >
                              Edit
                            </button>
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
            <button className="btn-blue" onClick={() => resetForm()}>
              Clear
            </button>
            {/* <button
              className="billing-opd-com-action-buttons"
              onClick={() => handlePrintBilling()}
              disabled={!isPrintEnabled}
            >
              Print
            </button> */}
          </div>
        </div>
      </div>

      {billFromResponse && (
        <CustomModal
          isOpen={billFromResponse ? true : false}
          onClose={() => setBillFromResponse(null)}
        >
          <OpdBillingPrint formData={billFromResponse} />
        </CustomModal>
      )}
    </>
  );
};
export default OpdBilling;
