import React, { useState, useRef,useEffect } from "react";
import "./FinalBill.css";
import { CiSearch } from "react-icons/ci";
import { startResizing } from "../../../../TableHeadingResizing/resizableColumns";
import PopupTable from "../../../OpdBilling/PopupTable";
import { API_BASE_URL } from "../../../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import OpdBillingPrint from "../../opdBillingPrint/OpdBillingPrint"; 


const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div className={`final-bill-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="final-bill-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="final-bill-floating-label">{label}</label>
    </div>
  );
};
const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(true);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className={`final-bill-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="final-bill-floating-select"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => setHasValue(e.target.value !== '')}
        {...props}
      >
        <option value="">{}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="final-bill-floating-label">{label}</label>
    </div>
  );
};

const FinalBill = () => {

  // Prachi
  const [activePopup, setActivePopup] = useState(null);
  const [patientData, setpatientData] = useState([]);
  const [selectedPatientId, setselectedPatientId] = useState(null);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);

  const [selectedTab, setSelectedTab] = useState();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [totalAmtRoomRent, setTotalAmtRoomRent] = useState(0);
  // prachi

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [wholeGrossAmount, setWholeGrossAmount] = useState(0);
  const navigate=useNavigate();
  

const OpenPrintFile=()=>{
  navigate('/OpdBillingPrint');
  
}
  
  useEffect(() => {
    // Get current date and time
    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    setCurrentDateTime(formattedDateTime); // Set the formatted date and time
  }, []);

  const calculateTotalAdvance = () => {
    return advancesTableRows
      .reduce((total, row) => total + (parseFloat(row.amount) || 0), 0)
      .toFixed(2);
  };
  const calculateTotalRoomRent = () => {
    return roomRentTableRows
      .reduce((total, row) => total + (parseFloat(row.netAmt) || 0), 0)
      .toFixed(2);
  };

  const calculateTotalDrVisit = () => {
    return drVisitsTableRows
      .reduce((total, row) => total + (parseFloat(row.netAmt) || 0), 0)
      .toFixed(2);
  };

  const calculateTotalServiceAmount = () => {
    return servicesTableRows
      .reduce((total, row) => total + (parseFloat(row.totalAmt) || 0), 0)
      .toFixed(2);
  };
  const calculateTotalSurgeryAmount = () => {
    return displaySuegeryTableRows
    .reduce((total, row) => total + (parseFloat(row.totalAmt) || 0), 0)
    .toFixed(2);

    // const totalSurgeryAmt = displaySuegeryTableRows.reduce((sum, row) => {
    //   const amt = parseFloat(row.totalHospitalAmt || 0);
    //   return sum + amt;
    // }, 0).toFixed(2);
    // return totalSurgeryAmt;
  };



  const calculateWholeGrossAmount = () => {
    const totalAdvance = parseFloat(calculateTotalAdvance());
    const totalRoomRent = parseFloat(calculateTotalRoomRent());
    const totalService=parseFloat(calculateTotalServiceAmount());
    const totalHospitalAmt = displaySuegeryTableRows.reduce(
      (sum, row) => sum + parseFloat(row.totalHospitalAmt || 0),
      0
    );

    const total = (totalAdvance + totalRoomRent + totalService + totalHospitalAmt).toFixed(2);

 
  
    setWholeGrossAmount(total); // Update state
    
  };

  useEffect(()=>{
    calculateWholeGrossAmount();
  },[selectedPatientDetails])

// prachi summary

  const populateSummaryTable = () => {
    const summaryData = [];

    if (roomRentTableRows.length > 0) {
      summaryData.push({
        sn: summaryData.length + 1,
        headName: "Room Rent",
        totalAmt: calculateTotalRoomRent(),
        discAmt: "0.00", // Assuming no discount
        netAmt: calculateTotalRoomRent(),
      });
    }

    if (displaySuegeryTableRows.length > 0) {
      const totalSurgeryAmt = displaySuegeryTableRows.reduce(
        (sum, row) => sum + (parseFloat(row.totalHospitalAmt) || 0),
        0
      ).toFixed(2);

      summaryData.push({
        sn: summaryData.length + 1,
        headName: "Surgery Details",
        totalAmt: calculateTotalSurgeryAmount(),
        discAmt: "0.00", // Assuming no discount
        netAmt: totalSurgeryAmt,
      });
    }

    if (servicesTableRows.length > 0) {
      summaryData.push({
        sn: summaryData.length + 1,
        headName: "Services",
        totalAmt: calculateTotalServiceAmount(),
        discAmt: "0.00", // Assuming no discount
        netAmt: calculateTotalServiceAmount(),
      });
    }

    setsummaryTableRows(summaryData);
  };

  useEffect(() => {
    populateSummaryTable();
  }, [selectedPatientDetails]);



  useEffect(() => {
    if (selectedPatientDetails) { // Check if patient details exist
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/ipbillings`);
                const data = response.data;

                // Flatten testGridIpdBill and map it into table rows
                const formattedData = data.flatMap((item, index) =>
                    item.testGridIpdBill.map((bill, billIndex) => ({
                        sn: `${index + 1}.${billIndex + 1}`, // Unique SN for nested items
                        billingDate: item.billingDate || "",
                        billingTime: item.billingTime || "",
                        testGridIpdBillId: bill.testGridIpdBillId || "",
                        serviceName: bill.serviceName || "N/A",
                        rate: bill.rate || "",
                        quantity: bill.quantity || "",
                        totalAmt: item.total || "",
                        disc: item.disc || "",
                        netAmt: item.netAmt || "",
                        billingUser: item.billingUser || "",
                    }))
                );

                setServicesTableRows(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }
}, [selectedPatientDetails]); // Depend on selectedPatientDetails


  useEffect(() => {
    if (selectedPatientDetails) {
    axios
      .get(`${API_BASE_URL}/surgery-events`)
      .then((response) => {
        const surgeryData = response.data.map((event, index) => ({
          sn: index + 1,
          totalHospitalAmt: event.totalHospitalAmt,
          operationName: event.operationMasterDTO.operationName,
          remark: event.operationBookingDTO.remark,
        }));

        setdisplaySuegeryTableRows(surgeryData);
      })
      .catch((error) => {
        console.error("Error fetching surgery data:", error);
      });
    }
  }, [selectedPatientDetails]);


  useEffect(() => {
    if (selectedPatientDetails) {
      axios
        .get(`${API_BASE_URL}/ipd-money-receipt`, {
          params: {
            patientId: selectedPatientDetails.id, // Assuming 'id' is the unique identifier
          },
        })
        .then((response) => {
          const data = response.data;
          // Map API data to table rows
          const formattedData = data.map((item, index) => ({
            sn: index + 1,
            receiptDate: item.receiptDate || "",
            receiptNo: item.receiptNo || "",
            amount: item.amount || "",
            payMode: item.modeOfAmount || "",
            advanceType: item.paymentType || "",
          }));
          setAdvancesTableRows(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedPatientDetails]);

    const getPopupData = () => {
    if (activePopup === "patients") {
      return { columns: [ "uhid","firstName","lastName","doctorName"],
        
      

        data: patientData.map((item) => ({
          uhid: item.patient?.patient?.uhid,
          firstName: item.patient?.patient?.firstName,
          lastName: item.patient?.patient?.lastName,
          doctorName: item.admissionUnderDoctorDetail?.consultantDoctor?.doctorName,
          ipAdmmissionId:item.ipAdmmissionId,
          patientName:`${item.patient?.patient?.firstName} ${item.patient?.patient?.lastName}`,
          age:item.patient?.patient?.age,
          gender:item.patient?.patient?.gender,
          address:item.patient?.patient?.address,
          payType:item.roomDetails?.payTypeDTO?.payTypeName,
          roomNo:item.roomDetails?.bedDTO?.roomNo,
          bedNo:item.roomDetails?.bedDTO?.bedNo,
          sourceOfRegistration:item.patient?.patient?.sourceOfRegistration,
          DOA:item.admissionDate,
          TOA:item.admissionTime,
          DOD:currentDateTime
          

        })),
      
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "patients") {
      setSelectedPatientDetails(data);
    
    }
    setActivePopup(null);
  };
  console.log("patients selected",selectedPatientDetails);

  // Prachi
  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_BASE_URL}/ip-admissions/admitted`)
      .then((response) => response.json())
      .then((data) => {
        setpatientData(data); // Set patient data regardless of selectedPatientDetails
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [API_BASE_URL]);
  
  const fetchRoomRentData = async (ipAdmissionId) => {
    try {
      // Fetch room rent data from the API
      const response = await axios.get(`${API_BASE_URL}/room-rents/by-ip-admission/${ipAdmissionId}`);
      const roomRentData = response.data;
  
      // Map the data to create rows for the table
      const rows = roomRentData.map((item, index) => ({
        sn: index + 1,
        rCode: item.id || "", // Use the room rent ID or any unique identifier
        roomType: item.roomType || "",
        rate: item.rate || 0,
        qty: 1, // Example static value
        totalAmt: item.rate || 0,
        disc: 0,
        discAmt: 0,
        netAmt: item.rate || 0,
        pkg: "",
        patPayable: "",
        userNm: "", // Populate if user info is available in API response
        pkgid: "",
        pkgCovAmt: 0,
        roperid: item.id || "", // Use room rent ID here if applicable
        gST: 0,
        gSTAmt: 0,
        roomEdit: "",
      }));
  
      return rows; // Return the rows
    } catch (error) {
      console.error("Error fetching room rent data:", error);
      return []; // Return an empty array in case of an error
    }
  };
  
  // Call the above function inside useEffect
  useEffect(() => {
    if (selectedPatientDetails) {
      const ipAdmissionId = selectedPatientDetails.ipAdmmissionId;
  
      // Fetch data and update the state
      fetchRoomRentData(ipAdmissionId).then((rows) => {
        setroomRentTableRows(rows); // Update state with the fetched rows
      });
    }
  }, [selectedPatientDetails]);
  

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...roomRentTableRows];
    updatedRows[index][field] = value;

    if (field === "rate" || field === "qty") {
      updatedRows[index].totalAmt =
        updatedRows[index].rate * updatedRows[index].qty || 0;
      updatedRows[index].discAmt =
        (updatedRows[index].totalAmt * updatedRows[index].disc) / 100 || 0;
      updatedRows[index].netAmt =
        updatedRows[index].totalAmt - updatedRows[index].discAmt;
    } else if (field === "disc") {
      updatedRows[index].discAmt =
        (updatedRows[index].totalAmt * updatedRows[index].disc) / 100 || 0;
      updatedRows[index].netAmt =
        updatedRows[index].totalAmt - updatedRows[index].discAmt;
    }

    setroomRentTableRows(updatedRows);
  };

// prachi dr details
const fetchDrVisitsByIpAdmission = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dr-visits/by-ip-admission/${patientId}`);
    console.log("Response of Dr Visits:", response.data);
    return response.data; // Process or return the fetched data
  } catch (error) {
    console.error("Error fetching Dr Visits:", error);
    throw error; // Optionally re-throw the error for further handling
  }
};

// Example usage:
useEffect(() => {
  if (selectedPatientDetails) {
    const patientId = parseInt(selectedPatientDetails.ipAdmmissionId, 10);
    fetchDrVisitsByIpAdmission(patientId).then((data) => {
      const fetchedData = data.map((visit, index) => ({
        sn: index + 1,
        dCode: visit.drVisitId || "",
        doctorName: visit.addDoctorDto.doctorName || "",
        drFree: visit.doctorFee || "",
        qty: "1",
        totalAmt: visit.doctorFee || "",
        disc: "0.00",
        discAmt: "0.00",
        netAmt: visit.doctorFee || "",
        pkg: "",
        patPayable: visit.doctorFee || "",
        userNm: "",
        doperid: "",
        pkgCovAmt: "",
        roperid: "",
        gST: "0.00",
        gSTAmt: "0.00",
        drvisEdit: "",
        doctor: visit.addDoctorDto?.doctorName || "",
        doctorShareAmt: "0.00",
        toHospital: visit.doctorFee || "",
      }));
      setdrVisitsTableRows(fetchedData);
    });
  }
}, [selectedPatientDetails]);





  const [roomRentTableRows, setroomRentTableRows] = useState([
    {
    sn: 1,
    rCode: "",
    roomType: "",
    rate: "",
    qty: "",
    totalAmt: "",
    disc: "",
    netAmt: "",
    discAmt: "",
    pkg: "",
    patPayable: "",
    userNm: "",
    pkgid: "",
    pkgCovAmt: "",
    roperid: "",
    gST: "",
    gSTAmt: "",
    roomEdit: "",
  }
]);

  const [drVisitsTableRows, setdrVisitsTableRows] = useState([
    {
      sn:1,
    dCode: "",
    doctorName: "",
    drFree: "",
    qty: "",
    totalAmt: "",
    disc: "",
    discAmt: "",
    netAmt: "",
    pkg: "",
    patPayable: "",
    userNm: "",
    doperid: "",
    pkgCovAmt: "",
    roperid: "",
    gST: "",
    gSTAmt: "",
    drvisEdit: "",
    doctor: "",
    doctorShareAmt: "",
    toHospital: "",
  }
]);
  // State to manage table rows
  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      Date: "",
      rCode: "",
      roomType: "",
      rate: "",
      qty: "",
      totalAmt: "",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      pkgid: "",
      pkgCovAmt: "",
      roperid: "",
      gST: "",
      gSTAmt: "",
      roomEdit: "",
    },
  ]);

  const [servicesTableRows, setServicesTableRows] = useState([
    {
      sn: 1,
      Date: "",
      sCode: "",
      doctorName: "",
      drFree: "",
      qty: "",
      totalAmt: "",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      dpkgid: "",
      pkgCovAmt: "",
      roperid: "",
      gST: "",
      gSTAmt: "",
      drviseEdit: "",
      doctor: "",
      doctorShareAmt: "",
      toHospital: "",
    },
  ]);

  const [investigationTableRows, setinvestigationTableRows] = useState([
    {
      sn: 1,
      Date: "",
      dCode: "",
      doctorName: "",
      drFree: "",
      qty: "",
      totalAmt: "",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      dpkgid: "",
      pkgCovAmt: "",
      roperid: "",
      gST: "",
      gSTAmt: "",
      drviseEdit: "",
      doctor: "",
      doctorShareAmt: "",
      toHospital: "",
    },
  ]);

  const [serviceonTableRows, setserviceonTableRows] = useState([
    {
      sn: 1,
      Date: "",
      time: "",
      sCode: "",
      serviceName: "",
      doctorName: "",
      rate: "",
      qty: "",
      totalAmt: "",
      disc:"",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      spkgid: "",
      billNo:"",
      soperid: "",
      pkgCovAmt: "",
      amtB4PkgCov:"",	
      sunitnm:"",
      gST: "",
      gSTAmt: "",
      servedit:"",
      doctor: "",
      doctorShareAmt: "",
      toHospital: "",
    },
  ]);

  const [otPackagesTableRows, setotPackagesTableRows] = useState([
    {
      sn: 1,
      Date: "",
      oCode: "",
      operationName: "",
      rate: "",
      qty: "",
      totalAmt: "",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      dpkgid: "",
      pkgCovAmt: "",
      roperid: "",
      gST: "",
      gSTAmt: "",
      drviseEdit: "",
      doctor: "",
      doctorShareAmt: "",
      toHospital: "",
    },
  ]);

  const [pharmacyTableRows, setpharmacyTableRows] = useState([
    {
      sn: 1,
      Date: "",
      pCode: "",
      medicineName: "",
      rate: "",
      qty: "",
      totalAmt: "",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      dpkgid: "",
      pkgCovAmt: "",
      roperid: "",
      gST: "",
      gSTAmt: "",
      drviseEdit: "",
      doctor: "",
      doctorShareAmt: "",
      toHospital: "",
    },
  ]);

  const [pharmacyRetTableRows, setpharmacyRetTableRows] = useState([
    {
      sn: 1,
      Date: "",
      pCode: "",
      medicineName: "",
      rate: "",
      qty: "",
      totalAmt: "",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      dpkgid: "",
      pkgCovAmt: "",
      roperid: "",
      gST: "",
      gSTAmt: "",
      drviseEdit: "",
      doctor: "",
      doctorShareAmt: "",
      toHospital: "",
    },
  ]);

  const [summaryTableRows, setsummaryTableRows] = useState([
    {
      sn: 1,
      Date: "",
      headName: "",
      totalAmt: "",
      discAmt: "",
      netAmt: "",
    },
  ]);

  const [advancesTableRows, setAdvancesTableRows] = useState([
    {
      sn: 1,
      receiptDate: "",
      receiptNo: "",
      amount: "",
      payMode: "",
      advanceType: "",
    },
  ]);

  const [messageTableRows, setmessageTableRows] = useState([
    {
      sn: 1,
      msgDate: "",
      msgTime: "",
      message: "",
      created: "",
    },
  ]);

  const [patientBedsTableRows, setpatientBedsTableRows] = useState([
    {
      sn: 1,
      catnm: "",
      bedNo: "",
      roomNo: "",
      floorNo: "",
      allotDate: "",
      leaveDate: "",
      leaveTime: "",
      username: "",
      bedid: "",
    },
  ]);

  const [roomLimitTableRows, setroomLimitTableRows] = useState([
    {
      sn: 1,
      roomTypeName: "",
      roomTypeId: "",
      limit: "",
    },
  ]);

  const [doctorServicesLimitTableRows, setdoctorServicesLimitTableRows] =
    useState([
      {
        sn: 1,
        serviceName: "",
        serviceId: "",
        doctorName: "",
        doctorId: "",
        actualLimit: "",
        totalLimit: "",
        billd: "",
      },
    ]);

  const [displaySuegeryTableRows, setdisplaySuegeryTableRows] = useState([
    {
      sn: 1,
      description: "",
      surgAmount: "",
      unitName: "",
    },
  ]);

  
  
  const handleAddRow = (tableType) => {
    if (tableType === "roomrent") {
      const newRow = {
        sn: roomRentTableRows.length + 1,
        rCode: "",
        roomType: "",
        rate: "",
        qty: "",
        totalAmt: "",
        disc: "",
        netAmt: "",
        discAmt: "",
        pkg: "",
        patPayable: "",
        userNm: "",
        pkgid: "",
        pkgCovAmt: "",
        roperid: "",
        gst: "",
        gstAmt: "",
        roomEdit: "",
      };
      setroomRentTableRows([...roomRentTableRows, newRow]);
    } else if (tableType === "drVisits") {
      const newRow = {
        sn: drVisitsTableRows.length + 1,
        dCode: "",
        doctorName: "",
        drFree: "",
        qty: "",
        totalAmt: "",
        disc: "",
        discAmt: "",
        netAmt: "",
        pkg: "",
        patPayable: "",
        userNm: "",
        doperid: "",
        pkgCovAmt: "",
        roperid: "",
        gst: "",
        gstAmt: "",
        drvisedit: "",
        doctor: "",
        doctorShareAmt: "",
        toHospital: "",
      };
      setdrVisitsTableRows([...drVisitsTableRows, newRow]);
    } else if (tableType === "investigation") {
      const newRow = {
        sn: investigationTableRows.length + 1,
        Date: "",
        time:"",
        iCode: "",
        billNo:"",
        testName: "",
        rate: "",
        qty: "",
        totalAmt: "",
        disc:"",
        discAmt: "",
        netAmt: "",
        pkg: "",
        patPayable: "",
        userNm: "",
        doperid: "",
        pkgCovAmt: "",
        ipkgid:"",
        loperid: "",
        gST: "",
        gSTAmt: "",
        indedit: "",
        doctor: "",
        doctorShareAmt: "",
        toHospital: "",
      };
      setinvestigationTableRows([...investigationTableRows, newRow]);
    }
     else if (tableType === "services") {
      const newRow = {
        sn: servicesTableRows.length + 1,
        Date: "",
      time: "",
      sCode: "",
      serviceName: "",
      doctorName: "",
      rate: "",
      qty: "",
      totalAmt: "",
      disc:"",
      discAmt: "",
      netAmt: "",
      pkg: "",
      patPayable: "",
      userNm: "",
      spkgid: "",
      billNo:"",
      soperid: "",
      pkgCovAmt: "",
      amtB4PkgCov:"",	
      sunitnm:"",
      gST: "",
      gSTAmt: "",
      servedit:"",
      doctor: "",
      doctorShareAmt: "",
      toHospital: "",
      };
      setServicesTableRows([...servicesTableRows, newRow]);
    } else if (tableType === "otPackages") {
      const newRow = {
        sn: otPackagesTableRows.length + 1,
        Date: "",
        oCode: "",
        operationName: "",
        rate: "",
        qty: "",
        totalAmt: "",
        discAmt: "",
        netAmt: "",
        pkg: "",
        patPayable: "",
        userNm: "",
        dpkgid: "",
        pkgCovAmt: "",
        roperid: "",
        gST: "",
        gSTAmt: "",
        drviseEdit: "",
        doctor: "",
        doctorShareAmt: "",
        toHospital: "",
      };
      setotPackagesTableRows([...otPackagesTableRows, newRow]);
    } else if (tableType === "pharmacy") {
        const newRow = {
        sn: pharmacyTableRows.length + 1,
        Date: "",
        pCode: "",
        medicineName: "",
        rate: "",
        qty: "",
        totalAmt: "",
        discAmt: "",
        netAmt: "",
        pkg: "",
        patPayable: "",
        userNm: "",
        dpkgid: "",
        pkgCovAmt: "",
        roperid: "",
        gST: "",
        gSTAmt: "",
        drviseEdit: "",
        doctor: "",
        doctorShareAmt: "",
        toHospital: "",
      };
      setpharmacyTableRows([...pharmacyTableRows, newRow]);
    } else if (tableType === "pharmacyRet") {
      const newRow = {
        sn: pharmacyRetTableRows.length + 1,
        Date: "",
        pCode: "",
        medicineName: "",
        rate: "",
        qty: "",
        totalAmt: "",
        discAmt: "",
        netAmt: "",
        pkg: "",
        patPayable: "",
        userNm: "",
        dpkgid: "",
        pkgCovAmt: "",
        roperid: "",
        gST: "",
        gSTAmt: "",
        drviseEdit: "",
        doctor: "",
        doctorShareAmt: "",
        toHospital: "",
      };
      setpharmacyRetTableRows([...pharmacyRetTableRows, newRow]);
    } else if (tableType === "summary") {
      const newRow = {
        sn: summaryTableRows.length + 1,
        date: "",
        breakdownNo: "",
        parts: "",
        consumedTime: "",
        cost: "",
        partsDescription: "",
      };
      setsummaryTableRows([...summaryTableRows, newRow]);
    } else if (tableType === "advances") {
      const newRow = {
        sn: advancesTableRows.length + 1,
        receiptDate: "",
        receiptNo: "",
        amount: "",
        payMode: "",
        advanceType: "",
      };
      setAdvancesTableRows([...advancesTableRows, newRow]);
    } else if (tableType === "message") {
      const newRow = {
        sn: messageTableRows.length + 1,
        msgDate: "",
      msgTime: "",
      message: "",
      created: "",
      };
      setmessageTableRows([...messageTableRows, newRow]);
    } else if (tableType === "patientBeds") {
      const newRow = {
        sn: patientBedsTableRows.length + 1,
        catnm: "",
        bedNo: "",
        roomNo: "",
        floorNo: "",
        allotDate: "",
        leaveDate: "",
        leaveTime: "",
        username: "",
        bedid: "",
      };
      setpatientBedsTableRows([...patientBedsTableRows, newRow]);
    } else if (tableType === "roomLimit") {
      const newRow = {
        sn: roomLimitTableRows.length + 1,
      
        roomTypeName: "",
        roomTypeId: "",
        limit: "",
      };
      setroomLimitTableRows([...roomLimitTableRows, newRow]);
    } else if (tableType === "doctorServicesLimit") {
      const newRow = {
        sn: doctorServicesLimitTableRows.length + 1,
        serviceName: "",
        serviceId: "",
        doctorName: "",
        doctorId: "",
        actualLimit: "",
        totalLimit: "",
        billd: "",
      };
      setdoctorServicesLimitTableRows([
        ...doctorServicesLimitTableRows,
        newRow,
      ]);
    } else if (tableType === "displaySuegery") {
      const newRow = {
        sn: displaySuegeryTableRows.length + 1,
        description: "",
        surgAmount: "",
        unitName: "",
      };
      setdisplaySuegeryTableRows([...displaySuegeryTableRows, newRow]);
    }
  };

  const handleDeleteRow = (tableType, indexToRemove) => {
    if (tableType === "roomrent") {
      const updatedRows = roomRentTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setroomRentTableRows(renumberedRows);
    } else if (tableType === "drVisits") {
      const updatedRows = drVisitsTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setdrVisitsTableRows(renumberedRows);
    } else if (tableType === "investigation") {
      const updatedRows = investigationTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setinvestigationTableRows(renumberedRows);
    }else if (tableType === "services") {
      const updatedRows = servicesTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setServicesTableRows(renumberedRows);
    }else if (tableType === "otPackages") {
      const updatedRows = otPackagesTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setotPackagesTableRows(renumberedRows);
    }else if (tableType === "pharmacy") {
      const updatedRows = pharmacyTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setpharmacyTableRows(renumberedRows);
    }else if (tableType === "pharmacyRet") {
      const updatedRows = pharmacyRetTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setpharmacyRetTableRows(renumberedRows);
    }else if (tableType === "summary") {
      const updatedRows = summaryTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setsummaryTableRows(renumberedRows);
    }else if (tableType === "advances") {
      const updatedRows = advancesTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setAdvancesTableRows(renumberedRows);
    }else if (tableType === "message") {
      const updatedRows = messageTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setmessageTableRows(renumberedRows);
    }else if (tableType === "patientBeds") {
      const updatedRows = patientBedsTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setpatientBedsTableRows(renumberedRows);
    }else if (tableType === "roomLimit") {
      const updatedRows = roomLimitTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setroomLimitTableRows(renumberedRows);
    }else if (tableType === "doctorServicesLimit") {
      const updatedRows = doctorServicesLimitTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setdoctorServicesLimitTableRows(renumberedRows);
    }else if (tableType === "displaySuegery") {
      const updatedRows = displaySuegeryTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setdisplaySuegeryTableRows(renumberedRows);
    }else if (tableType === "doctorServicesLimit") {
      const updatedRows = doctorServicesLimitTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setdoctorServicesLimitTableRows(renumberedRows);
    }
  };
// prachi room rent
  const renderTable = () => {
    switch (selectedTab) {
      case "roomrent":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
      <thead>
        <tr>
          {[
            // "Actions",
            "SN",
            "RCode",
            "Room Type",
            "Rate",
            "Qty",
            "Total Amt",
            "Disc%",
            "Disc Amt",
            "Net Amt",
            "Pkg",
            "Pat Payable",
            "User Nm",
            "Pkgid",
            "Pkg Cov Amt",
            "Roperid",
            "GST",
            "GST Amt",
            "Room Edit",
          ].map((header, index) => (
            <th key={index} style={{ width: columnWidths[index] }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {roomRentTableRows.map((row, index) => (
          <tr key={index}>
            {/* <td>
              <button onClick={handleAddRow}>Add</button>
              <button
                onClick={() => handleDeleteRow(index)}
                disabled={roomRentTableRows.length <= 1}
              >
                Del
              </button>
            </td> */}
            <td>{row.sn}</td>
            <td>{row.rCode}</td>
            <td>{row.roomType}</td>
            <td>
              <input
                type="number"
                value={row.rate}
                onChange={(e) =>
                  handleInputChange(index, "rate", parseFloat(e.target.value))
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={row.qty}
                onChange={(e) =>
                  handleInputChange(index, "qty", parseInt(e.target.value))
                }
              />
            </td>
            <td>{row.totalAmt}</td>
            <td>
              <input
                type="number"
                value={row.disc}
                onChange={(e) =>
                  handleInputChange(index, "disc", parseFloat(e.target.value))
                }
              />
            </td>
            <td>{row.discAmt}</td>
            <td>{row.netAmt}</td>
            <td>{row.pkg}</td>
            <td>{row.patPayable}</td>
            <td>{row.userNm}</td>
            <td>{row.pkgid}</td>
            <td>{row.pkgCovAmt}</td>
            <td>{row.roperid}</td>
            <td>{row.gST}</td>
            <td>{row.gSTAmt}</td>
            <td>{row.roomEdit}</td>
          </tr>
        ))}
      </tbody>
    </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total:</label>
                  <input type="text" value={calculateTotalRoomRent()} readOnly />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc %:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total GST:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Beds Dtl:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Cov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Uncov:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );
      case "drVisits":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "DCode",
                    "Doctor Name",
                    "Dr.Fee",
                    "Qty",
                    "Total Amt",
                    "Disc%",
                    "Disc Amt",
                    "Net Amt",
                    "Pkg",
                    "Pat Payable",
                    "User Nm",
                    "Doperid",
                    "Pkg Cov Amt",
                    "Roperid",
                    "GST",
                    "GST Amt",
                    "Drvisedit",
                    "Doctor%",
                    "Doctor Share Amt",
                    "To Hospital",
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
                {drVisitsTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("drVisits")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("drVisits", index)}
                          disabled={drVisitsTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.dCode}</td>
                    <td>{row.doctorName}</td>
                    <td>{row.drFree}</td>
                    <td>{row.qty}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.disc}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.netAmt}</td>
                    <td>{row.pkg}</td>
                    <td>{row.patPayable}</td>
                    <td>{row.userNm}</td>
                    <td>{row.dpkgid}</td>
                    <td>{row.pkgCovAmt}</td>
                    <td>{row.roperid}</td>
                    <td>{row.gST}</td>
                    <td>{row.gSTAmt}</td>
                    <td>{row.drviseEdit}</td>
                    <td>{row.doctor}</td>
                    <td>{row.doctorShareAmt}</td>
                    <td>{row.toHospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total:</label>
                  <input type="text" value={calculateTotalDrVisit()} />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc %:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total GST:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Beds Dtl:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Cov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Uncov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Doctor%:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Doctor Share Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total To Hospital:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "investigation":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Date",
                    "Time",
                    "ICode",
                    "Bill No",
                    "Test Name",
                    "Rate",
                    "Qty",
                    "Total Amt",
                    "Disc%",
                    "Disc Amt",
                    "Net Amt",
                    "Pkg",
                    "Pat Payable",
                    "User Nm",
                    "Pkg Cov Amt",
                    "Ipkgid",
                    "loperid",
                    "GST",
                    "GST Amt",
                    "Indedit",
                    "Doctor%",
                    "Doctor Share Amt",
                    "To Hospital",
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
                {investigationTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("investigation")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() =>
                            handleDeleteRow("investigation", index)
                          }
                          disabled={investigationTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.Date}</td>
                    <td>{row.iCode}</td>
                    <td>{row.billNo}</td>
                    <td>{row.testName}</td>
                    <td>{row.rate}</td>
                    <td>{row.qty}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.disc}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.netAmt}</td>
                    <td>{row.pkg}</td>
                    <td>{row.patPayable}</td>
                    <td>{row.userNm}</td>
                    <td>{row.pkgCovAmt}</td>
                    <td>{row.ipkgid}</td>
                    <td>{row.loperid}</td>
                    <td>{row.gST}</td>
                    <td>{row.gSTAmt}</td>
                    <td>{row.indedit}</td>
                    <td>{row.doctor}</td>
                    <td>{row.doctorShareAmt}</td>
                    <td>{row.toHospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc %:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total GST:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Beds Dtl:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Cov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Uncov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Doctor%:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Doctor Share Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total To Hospital:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Date",
                    "Time",
                    "SCode",
                    "Service Name",
                    "Doctor Name",
                    "Rate",

                    "Qty",
                    "Total Amt",
                    "Disc%",
                    "Disc Amt",
                    "Net Amt",
                    "Pkg",
                    "Pat Payable",
                    "User Nm",
                    "Soperid",
                    "Pkg Cov Amt",
                    "Roperid",
                    "GST",
                    "GST Amt",
                    "Drvisedit",
                    "Doctor%",
                    "Doctor Share Amt",
                    "To Hospital",
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
                {servicesTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("services")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("services", index)}
                          disabled={servicesTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.Date}</td>
                    <td>{row.time}</td>
                    <td>{row.sCode}</td>
                    <td>{row.serviceName}</td>
                    <td>{row.doctorName}</td>
                    <td>{row.rate}</td>
                    <td>{row.qty}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.disc}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.netAmt}</td>
                    <td>{row.pkg}</td>
                    <td>{row.patPayable}</td>
                    <td>{row.userNm}</td>
                    <td>{row.dpkgid}</td>
                    <td>{row.pkgCovAmt}</td>
                    <td>{row.roperid}</td>
                    <td>{row.gST}</td>
                    <td>{row.gSTAmt}</td>
                    <td>{row.drviseEdit}</td>
                    <td>{row.doctor}</td>
                    <td>{row.doctorShareAmt}</td>
                    <td>{row.toHospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total:</label>
                  
                  <input type="text" value={calculateTotalServiceAmount()} readOnly />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc %:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total GST:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Beds Dtl:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Cov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Uncov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Doctor%:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Doctor Share Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total To Hospital:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "otPackages":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Date",

                    "OCode",
                    "Opertion Name",

                    "Rate",

                    "Qty",
                    "Total Amt",
                    "Disc%",
                    "Disc Amt",
                    "Net Amt",
                    "Pkg",
                    "Pat Payable",
                    "User Nm",
                    "Doperid",
                    "Pkg Cov Amt",
                    "Roperid",
                    "GST",
                    "GST Amt",
                    "Drvisedit",
                    "Doctor%",
                    "Doctor Share Amt",
                    "To Hospital",
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
                {otPackagesTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("otPackages")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("otPackages", index)}
                          disabled={otPackagesTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.Date}</td>
                    <td>{row.dCode}</td>
                    <td>{row.doctorName}</td>
                    <td>{row.drFree}</td>
                    <td>{row.qty}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.netAmt}</td>
                    <td>{row.pkg}</td>
                    <td>{row.patPayable}</td>
                    <td>{row.userNm}</td>
                    <td>{row.dpkgid}</td>
                    <td>{row.pkgCovAmt}</td>
                    <td>{row.roperid}</td>
                    <td>{row.gST}</td>
                    <td>{row.gSTAmt}</td>
                    <td>{row.drviseEdit}</td>
                    <td>{row.doctor}</td>
                    <td>{row.doctorShareAmt}</td>
                    <td>{row.toHospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc %:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total GST:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Beds Dtl:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Cov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total Pkg Uncov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Oselfratetotal:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "pharmacy":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Date",
                    "Time",
                    "PCode",
                    "Medicine Name",

                    "Rate",

                    "Qty",
                    "Total Amt",
                    "Disc%",
                    "Disc Amt",
                    "Net Amt",
                    "Pkg",
                    "Pat Payable",
                    "User Nm",
                    "Doperid",
                    "Pkg Cov Amt",
                    "Roperid",
                    "GST",
                    "GST Amt",
                    "Drvisedit",
                    "Doctor%",
                    "Doctor Share Amt",
                    "To Hospital",
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
                {pharmacyTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("pharmacy")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("pharmacy", index)}
                          disabled={pharmacyTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.Date}</td>
                    <td>{row.pCode}</td>
                    <td>{row.medicineName}</td>
                    <td>{row.rate}</td>
                    <td>{row.qty}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.netAmt}</td>
                    <td>{row.pkg}</td>
                    <td>{row.patPayable}</td>
                    <td>{row.userNm}</td>
                    <td>{row.dpkgid}</td>
                    <td>{row.pkgCovAmt}</td>
                    <td>{row.roperid}</td>
                    <td>{row.gST}</td>
                    <td>{row.gSTAmt}</td>
                    <td>{row.drviseEdit}</td>
                    <td>{row.doctor}</td>
                    <td>{row.doctorShareAmt}</td>
                    <td>{row.toHospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc %:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total pKg Cov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total pKg UnCov:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "pharmacyRet":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Date",
                    "Time",
                    "PRCode",
                    "Medicine Name",
                    "Rate",
                    "Qty",
                    "Total Amt",
                    "Disc%",
                    "Disc Amt",
                    "Net Amt",
                    "Pkg",
                    "Pat Payable",
                    "User Nm",
                    "Doperid",
                    "Pkg Cov Amt",
                    "Roperid",
                    "GST",
                    "GST Amt",
                    "Drvisedit",
                    "Doctor%",
                    "Doctor Share Amt",
                    "To Hospital",
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
                {pharmacyRetTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("pharmacyRet")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("pharmacyRet", index)}
                          disabled={pharmacyRetTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.Date}</td>
                    <td>{row.pCode}</td>
                    <td>{row.medicineName}</td>
                    <td>{row.rate}</td>
                    <td>{row.qty}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.netAmt}</td>
                    <td>{row.pkg}</td>
                    <td>{row.patPayable}</td>
                    <td>{row.userNm}</td>
                    <td>{row.dpkgid}</td>
                    <td>{row.pkgCovAmt}</td>
                    <td>{row.roperid}</td>
                    <td>{row.gST}</td>
                    <td>{row.gSTAmt}</td>
                    <td>{row.drviseEdit}</td>
                    <td>{row.doctor}</td>
                    <td>{row.doctorShareAmt}</td>
                    <td>{row.toHospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc %:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total pKg Cov:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Total pKg UnCov:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Head Name",
                    "Total Amt",
                    "Disc Amt",
                    "Net Amt",
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
                {summaryTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("summary")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("summary", index)}
                          disabled={summaryTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    {/* <td>{row.Date}</td> */}
                    <td>{row.headName}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.discAmt}</td>

                    <td>{row.netAmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total Amt:</label>
                  <input type="text" value={wholeGrossAmount}/>
                </div>
                <div className="final-bill-summary-field">
                  <label>Disc Amt:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label>Net Amt:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "advances":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
        <thead>
          <tr>
            {[
              // "Actions",
              "SN",
              "Receipt Date",
              "Receipt No",
              "Amount",
              "Pay Mode",
              "Advance Type",
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
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {advancesTableRows.map((row, index) => (
            <tr key={index}>
              {/* <td>
                <div className="table-actions">
                  <button
                    className="final-bill-add-btn"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                  <button
                    className="final-bill-del-btn"
                    onClick={() => handleDeleteRow(index)}
                    disabled={advancesTableRows.length <= 1}
                  >
                    Del
                  </button>
                </div>
              </td> */}
              <td>{row.sn}</td>
              <td>{row.receiptDate}</td>
              <td>{row.receiptNo}</td>
              <td>{row.amount}</td>
              <td>{row.payMode}</td>
              <td>{row.advanceType}</td>
            </tr>
          ))}
        </tbody>
      </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Total Advance:</label>
                  <input type="text" value={calculateTotalAdvance()} readOnly />
                </div>
              </div>
            </div>
          </div>
        );

      case "message":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Msg Date",
                    "Msg Time",
                    "Message",
                    "Created",
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
                {messageTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("message")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("message", index)}
                          disabled={messageTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.msgDate}</td>
                    <td>{row.msgTime}</td>
                    <td>{row.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "patientBeds":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Catnm",
                    "BedNo",
                    "RoomNo",
                    "FloorNo",
                    "Allot Date",
                    "Leave Date",
                    "Leave Time",
                    "Username",
                    "Bedid",
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
                {patientBedsTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("patientBeds")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("patientBeds", index)}
                          disabled={patientBedsTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.msgDate}</td>
                    <td>{row.msgTime}</td>
                    <td>{row.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "roomLimit":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {["Actions", "SN", "RoomTypeName", "RoomTypeId", "Limit"].map(
                    (header, index) => (
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {roomLimitTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("roomLimit")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("roomLimit", index)}
                          disabled={roomLimitTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.msgDate}</td>
                    <td>{row.msgTime}</td>
                    <td>{row.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "doctorServicesLimit":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Service Name",
                    "ServiceId",
                    "Doctor Name",
                    "DoctorId",
                    "Actual Limit",
                    "Total Limit",
                    "Billd",
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
                {doctorServicesLimitTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("doctorServicesLimit")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() =>
                            handleDeleteRow("doctorServicesLimit", index)
                          }
                          disabled={doctorServicesLimitTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.msgDate}</td>
                    <td>{row.msgTime}</td>
                    <td>{row.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="final-bill-summary-section">
              <div className="final-bill-summary-row">
                <div className="final-bill-summary-field">
                  <label>Limit Doctors Fee:</label>
                  <input type="text" value="0.00" />
                </div>
                <div className="final-bill-summary-field">
                  <label> Actual Dictors Fee:</label>
                  <input type="text" value="0.00" />
                </div>
              </div>
            </div>
          </div>
        );

      case "displaySuegery":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Description",
                    "SurgAmount",
                    "UnitName",
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
                {displaySuegeryTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("displaySuegery")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() =>
                            handleDeleteRow("displaySuegery", index)
                          }
                          disabled={displaySuegeryTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.remark}</td>
                    <td>{row.totalHospitalAmt}</td>
                    <td>{row.operationName}</td>
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

  return (
    <>
    <div className="final-bill-container">
     
        <div className="final-bill-section">
        <div className="final-bill-header">Patient Details</div>
        <div className="final-bill-grid">
        
        <div className="final-bill-form-row-chechbox">
                <input className="final-bill-chechbox" type="checkbox" id="allowMultiple" />
                <label
                  htmlFor="allowMultiple"
                  className="iPBilling-checkbox-label"
                >
                  Admited
                </label>
              </div>
        <div className="final-bill-search-field">
          
            <FloatingInput label="IP No" type="text"
                    id="description"
                    value={selectedPatientDetails?.ipAdmmissionId || ""}/>
            <button className="final-bill-search-icon"   onClick={() => setActivePopup("patients")}
 >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
              </svg>
            </button>
          </div>
          {/* <div className="final-bill-search-field">
            <FloatingInput label="LOCIP No" type="text"
                    id="description"
                    value=""/>
            <button className="final-bill-search-icon">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
              </svg>
            </button>
          </div> */}
        <FloatingInput label="MR No" type="text" value={selectedPatientDetails?.uhid}/>
        <FloatingInput label="Patient Name" type="text" value={selectedPatientDetails?.patientName}/>
        <FloatingInput label="Age" type="text" value={selectedPatientDetails?.age}/>
        <FloatingInput label="Gender" type="text" value={selectedPatientDetails?.gender}/>
        <FloatingInput label="Address" type="text" value={selectedPatientDetails?.address}/>
        <FloatingInput label="Pay Type" type="text" value={selectedPatientDetails?.payType}/>
        <FloatingInput label="Room No" type="text" value={selectedPatientDetails?.roomNo}/>
        <FloatingInput label="Bed No" type="text" value={selectedPatientDetails?.bedNo}/>

        <FloatingSelect 
            label="Source Type"
            options={[
              { value: 'other', label: 'Other' }
            ]}
          />
        <FloatingInput label="SOC" type="text" value=""/>
        <FloatingInput label="Consultant Doctor" type="text" value={selectedPatientDetails?.doctorName}/>
        <FloatingInput label="Bill No" type="text" value=""/>
        <FloatingInput label="DOA" type="text" value={selectedPatientDetails?.DOA}/>
        <FloatingInput label="TOA" type="text" value={selectedPatientDetails?.TOA}/>
        <FloatingInput label="DOD" type="text" value={selectedPatientDetails?.DOD}/>
        <FloatingInput label="Grants Available" type="text" value=""/>
        <FloatingInput label="Retention Amount" type="text" value=""/>
        <FloatingInput label="Referred By" type="text" value=""/>

        </div>
        </div>
        </div>

        <div className="final-bill-Events">
    
      <div className="final-bill-content-wrapper">
        <div className="final-bill-main-section">
         
       

        </div>
        <div className="final-bill-services-section">
          <div className="final-bill-tab-bar">
            <button
              className={`final-bill-tab ${
                selectedTab === "roomrent" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("roomrent")}
            >
              RoomRent
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "drVisits" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("drVisits")}
            >
              Dr Visit
            </button>
            {/* <button
              className={`final-bill-tab ${
                selectedTab === "investigation" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("investigation")}
            >
              Investigations
            </button> */}
            <button
              className={`final-bill-tab ${
                selectedTab === "services" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("services")}
            >
              Services
            </button>
            {/* <button
              className={`final-bill-tab ${
                selectedTab === "otPackages" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("otPackages")}
            >
              OT Packages
            </button> */}
            <button
              className={`final-bill-tab ${
                selectedTab === "pharmacy" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("pharmacy")}
            >
              Pharmacy
            </button>
            {/* <button
              className={`final-bill-tab ${
                selectedTab === "pharmacyRet" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("pharmacyRet")}
            >
              Pharmacy Ret
            </button> */}
            <button
              className={`final-bill-tab ${
                selectedTab === "summary" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("summary")}
            >
              Summary
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "advances" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("advances")}
            >
              Advances
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "message" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("message")}
            >
              Message
            </button>

            {/* <button
              className={`final-bill-tab ${
                selectedTab === "patientBeds" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("patientBeds")}
            >
              Patient Beds
            </button> */}
            {/* <button
              className={`final-bill-tab ${
                selectedTab === "roomLimit" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("roomLimit")}
            >
              RoomLimit
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "doctorServicesLimit" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("doctorServicesLimit")}
            >
              DoctorServicesLimit
            </button> */}
            <button
              className={`final-bill-tab ${
                selectedTab === "displaySuegery" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("displaySuegery")}
            >
              DisplaySuegery
            </button>
          </div>
          {renderTable()}
        </div>
        <div className="final-bill-main-section">
          
         
        <div className="final-bill-container">
     
     <div className="final-bill-section">
     <div className="final-bill-header">Financial Details</div>
     <div className="final-bill-grid">
     
     <FloatingInput label="Total Amt" type="text" value={wholeGrossAmount}/>
     <FloatingInput label="Disc Amt" type="text" value=""/>
     <FloatingInput label="Total GST Amt" type="text" value=""/>
     <FloatingInput label="Net Amt" type="text" value=""/>
     <FloatingInput label="Paid Amt" type="text" value=""/>
     <FloatingInput label="Balance Amt" type="text" value=""/>
     <FloatingInput label="Refundable Amt:" type="text" value=""/>
     <FloatingInput label="TDS Amt" type="text" value=""/>
     <FloatingInput label="DisAllow Amt" type="text" value=""/>
     <FloatingInput label="Short AuthAmt" type="text" value=""/>
     <FloatingInput label="Copay Amount" type="text" value=""/>


     <div className="final-bill-search-field">
       
         <FloatingInput label="Discount Auth By" type="text"
                 id="description"
                 value=""/>
         <button className="final-bill-search-icon">
           <svg viewBox="0 0 24 24" width="16" height="16">
             <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
           </svg>
         </button>
       </div>

     <FloatingInput label="Remark" type="text" value=""/>
     <FloatingInput label="Disc Reasons" type="text" value=""/>
     <FloatingInput label="In Admissible Di" type="text" value=""/>
     <FloatingInput label="In Admissible A" type="text" value=""/>
     <FloatingInput label="Post Discount" type="text" value=""/>
     <FloatingInput label="Payable By Pati" type="text" value=""/>
     <FloatingInput label="Payable By TPA" type="text" value=""/>
     <FloatingInput label="Refunded" type="text" value=""/>
     <FloatingInput label="Total Approved" type="text" value=""/>
     <FloatingInput label="TCS" type="text" value=""/>
     <FloatingInput label="Service Tax" type="text" value=""/>
     <FloatingInput label="Total Doctor Sh" type="text" value=""/>
     <FloatingInput label="Total To Hospital" type="text" value=""/>





     </div>

     </div>
     <div className="final-bill-section">
     <div className="final-bill-header">Attach File</div>
     <div className="final-bill-grid">

     <div className="final-bill-shed-section">
  <label className="finalized-label">File Name</label>
  <input className="finalized-attach" type="text" />
  <input className="finalized-file-input" type="file" />
  <button className="finalized-bill-sh-save-btn">Upload</button>
</div>



     </div>
     </div>
     </div>


    


        </div>
        <div className="final-bill-action-buttons">
          <button className="btn-blue">Save</button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button>
          <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green" onClick={OpenPrintFile}>Print</button>
          {/* <button className="btn-blue">Export</button>
          <button className="btn-gray">Import</button>
          <button className="btn-green">Health</button>
          <button className="btn-gray">Version Comparison</button>
          <button className="btn-gray">SDC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button> */}
        </div>
      </div>
    </div>
    {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onClose={() => setActivePopup(null)}
          onSelect={handleSelect}
        />
      )}

    </>
  );
};
export default FinalBill;
