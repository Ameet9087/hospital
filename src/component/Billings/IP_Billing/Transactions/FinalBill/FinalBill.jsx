import React, { useState, useRef } from "react";
import "./FinalBill.css";
import { CiSearch } from "react-icons/ci";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";

const FinalBill = () => {
  const [selectedTab, setSelectedTab] = useState("roomrent");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
 
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

  const [advancesTableRows, setadvancesTableRows] = useState([
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
      setadvancesTableRows([...advancesTableRows, newRow]);
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
      setadvancesTableRows(renumberedRows);
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

  const renderTable = () => {
    switch (selectedTab) {
      case "roomrent":
        return (
          <div className="services-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
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
                    "Roomedit",
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
                {roomRentTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("roomrent")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("roomrent", index)}
                          disabled={roomRentTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.rCode}</td>
                    <td>{row.roomType}</td>
                    <td>{row.rate}</td>
                    <td>{row.qty}</td>
                    <td>{row.totalAmt}</td>
                    <td>{row.discAmt}</td>
                    <td>{row.disc}</td>
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
                    "Dr.Free",
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
                    <td>{row.soperid}</td>
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
                    <td>{row.Date}</td>
                    <td>{row.headName}</td>
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
                  <input type="text" value="0.00" />
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
                    "Actions",
                    "SN",
                    "Receipt Date",
                    "Receipt No",
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
                {advancesTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="final-bill-add-btn"
                          onClick={() => handleAddRow("advances")}
                        >
                          Add
                        </button>
                        <button
                          className="final-bill-del-btn"
                          onClick={() => handleDeleteRow("advances", index)}
                          disabled={advancesTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
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
                  <input type="text" value="0.00" />
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
                    <td>{row.description}</td>
                    <td>{row.surgAmount}</td>
                    <td>{row.unitName}</td>
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
    <div className="final-bill-Events">
      <div className="final-bill-title-bar">
        <div className="final-bill-header">
          <span>Final Bill</span>
        </div>
      </div>
      <div className="final-bill-content-wrapper">
        <div className="final-bill-main-section">
          <div className="final-bill-panel dis-templates">
            <div className="final-bill-panel-header">Patient Details</div>
            <div className="final-bill-panel-content">
              <div className="final-bill-form-row-chechbox">
                <input type="checkbox" id="allowMultiple" />
                <label
                  htmlFor="allowMultiple"
                  className="iPBilling-checkbox-label"
                >
                  Admited
                </label>
              </div>
              <div className="final-bill-form-row">
                <label>IP No: </label>
                <div className="final-bill-input-with-search">
                  <input
                    type="search"
                    id="description"
                    placeholder="Search Country "
                    value=""
                  />
                  <CiSearch />
                </div>
              </div>
              <div className="final-bill-form-row">
                <label>Loc IPNo: </label>
                <div className="final-bill-input-with-search">
                  <input
                    type="search"
                    id="description"
                    placeholder="Search Country "
                    value=""
                  />
                  <CiSearch />
                </div>
              </div>
              <div className="final-bill-form-row">
                <label>MR No: </label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Patient Name:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Age:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Gender:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Address:</label>
                <input type="text" value="" />
              </div>

              <div className="final-bill-form-row">
                <label>Pay Type:</label>
                <input type="text" value="" />
              </div>
            </div>
          </div>

          <div className="final-bill-panel operation-details">
            <div className="final-bill-panel-content">
              <div className="final-bill-form-row">
                <label>Room No:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Bed No:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Source Type:</label>
                <select>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="final-bill-form-row">
                <label>SOC:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Consultant Doctor:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Bill No:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>DOA:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>TOA:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>DOD:</label>
                <input type="text" value="" />
              </div>
            </div>
          </div>

          <div className="final-bill-panel operation-details">
            <div className="final-bill-panel-content">
              <div className="final-bill-form-row">
                <label>Grants Available:</label>
                <input type="number" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Retention Amount:</label>
                <input type="number" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Referred By:</label>
                <input type="text" value="" />
              </div>
            </div>
          </div>
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
            <button
              className={`final-bill-tab ${
                selectedTab === "investigation" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("investigation")}
            >
              Investigations
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "services" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("services")}
            >
              Services
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "otPackages" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("otPackages")}
            >
              OT Packages
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "pharmacy" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("pharmacy")}
            >
              Pharmacy
            </button>
            <button
              className={`final-bill-tab ${
                selectedTab === "pharmacyRet" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("pharmacyRet")}
            >
              Pharmacy Ret
            </button>
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

            <button
              className={`final-bill-tab ${
                selectedTab === "patientBeds" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("patientBeds")}
            >
              Patient Beds
            </button>
            <button
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
            </button>
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
          <div className="final-bill-panel dis-templates">
            <div className="final-bill-panel-header">Financial Details</div>
            <div className="final-bill-panel-content">
              <div className="final-bill-form-row">
                <label>Total Amt: </label>
                {/* <div className="final-bill-input-with-search"> */}
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Disc Amt: </label>
                {/* <div className="final-bill-input-with-search"> */}
                <input type="text" value="" />
                {/* <button className="final-bill-magnifier-btn">🔍</button> */}
                {/* </div> */}
              </div>
              <div className="final-bill-form-row">
                <label>Total GST Amt:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Net Amt:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Paid Amt:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Balance Amt:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Refundable Amt:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>TDS Amt:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>DisAllow Amt:</label>
                <input type="text" value="" />
              </div>
            </div>
          </div>
          <div className="final-bill-panel operation-details">
            <div className="final-bill-panel-content">
              <div className="final-bill-form-row">
                <label>Short AuthAmt:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Copay Amount:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Discount Auth By:</label>
                <div className="final-bill-input-with-search">
                  <input type="search" id="description" value="" />
                  <CiSearch />
                </div>
              </div>
              <div className="final-bill-form-row">
                <label>Remark :</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Disc Reasons :</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>In Admissible Di :</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>In Admissible A :</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Post Discount:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Payable By Pati:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Payable By TPA:</label>
                <input type="text" value="" />
              </div>
            </div>
          </div>
          <div className="final-bill-panel operation-details">
            <div className="final-bill-panel-header"></div>
            <div className="final-bill-panel-content">
              <div className="final-bill-form-row">
                <label>Refunded:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Total Approved:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>TCS:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Service Tax:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Total Doctor Sh:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-form-row">
                <label>Total To Hospital:</label>
                <input type="text" value="" />
              </div>
              <div className="final-bill-panel-header">Attach Files</div>
              <div className="final-bill-sh-section">
                <label>File Name</label>{" "}
                <input className="final-attach" type="text" />
                <input type="file" />
                <button className="final-bill-sh-save-btn">Upload</button>
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
          <button className="btn-green">Print</button>
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
  );
};
export default FinalBill;
