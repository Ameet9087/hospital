
/* neha-Billing-OPD-billing-20/09/24 */
import React, { useState } from 'react';
import { FaUser, FaMale, FaCalendarCheck, FaAddressBook, FaPhone } from 'react-icons/fa';
import './Search_patient.css';
import { jsPDF } from "jspdf";

function Search_Patient() {
    const [inputValueOpd, setInputValueOpd] = useState('');
    const [isOpdTableVisible, setIsOpdTableVisible] = useState(true);

    const handleOpdButtonClick = () => {
        // Handle search button click
    };

    const handlePrintTable = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>table {width: 100%; border-collapse: collapse;} th, td {border: 1px solid #ddd; padding: 8px;} th {background-color: #f4f4f4;}</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(document.querySelector('.print-content').innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // Dummy data
    const consultationData = [
        { date: '2024-09-01', invoiceNo: 'INV12345', department: 'Consultation', subtotal: '1000 Rs', discount: '0 Rs', totalAmount: '1000 Rs',billstatus:'paid' }
    ];

    const servicesData = [
        { date: '2024-09-01', invoiceNo: 'INV12345', department: 'General Medicine', item: 'Consultation', quantity: 1, subtotal: '1000 Rs', discount: '0 Rs', totalAmount: '1000 Rs',billstatus:'paid' },
        { date: '2024-09-02', invoiceNo: 'INV12346', department: 'Laboratory', item: 'Blood Test', quantity: 2, subtotal: '500 Rs', discount: '50 Rs', totalAmount: '950 Rs',billstatus:'Unpaid' }
    ];

    // Patient details (example data)
    const patientDetails = {
        name: 'John Doe',
        ageSex: '25Y/Male',
        visitType: 'Outpatient',
        address: 'Pune',
        contactNo: '7698769697',
    };

    // Calculate totals
    const calculateTotalAmount = (data) => {
        return data.reduce((acc, item) => acc + parseFloat(item.totalAmount.replace(' Rs', '')), 0);
    };

    const totalConsultation = calculateTotalAmount(consultationData);
    const totalServices = calculateTotalAmount(servicesData);

    const grandTotal = totalConsultation + totalServices;



    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text("Patient Billing Details", 10, 10);
        doc.text("Name: Jane Doe", 10, 20);
        doc.text("Room Charges: 10000 Rs", 10, 30);
  
        // Generate the PDF and get the Blob
        const pdfOutput = doc.output('blob');
        setPdfBlob(pdfOutput); // Store the blob in state
    };
  
    const handleShareBill = () => {
        if (navigator.share) {
            if (pdfBlob) {
                // Convert blob to a file
                const file = new File([pdfBlob], "billing_details.pdf", { type: "application/pdf" });
                
                // Use the Web Share API
                navigator.share({
                    title: 'Patient Billing Details',
                    text: 'Here is the billing information for the patient.',
                    files: [file], // Attach the PDF file here
                })
                .then(() => console.log('Bill shared successfully!'))
                .catch(error => console.error('Error sharing bill:', error));
            } else {
                alert("Generate the bill first before sharing.");
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };
  
    return (
        <div className="opd_billing-container">
            <div className="opd_billing-input-group">
                <div className="opd_billing-input-container">
                    <input
                        type="text"
                        placeholder="Search OPD Patient"
                        value={inputValueOpd}
                        onChange={(e) => setInputValueOpd(e.target.value)}
                    />
                    <button onClick={handleOpdButtonClick}>
                        Search
                    </button>
                </div>
            </div>

            {isOpdTableVisible && (
                <div className="opd_billing-section print-content">
                    <div className='opd-patientdetails'>
                        <span>
                            &nbsp;&nbsp;<FaUser size={14} color="#000" />&nbsp;Name:&nbsp;{patientDetails.name}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span>
                            <FaMale size={14} color="#000" title="Age" />&nbsp;Age/Sex:&nbsp;{patientDetails.ageSex}&nbsp;&nbsp;&nbsp;
                        </span>
                        <span><FaCalendarCheck size={14} color={"#000"} />&nbsp;Visit Type:&nbsp;{patientDetails.visitType}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><FaAddressBook size={14} color={"#000"} />&nbsp;Address:&nbsp;{patientDetails.address}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><FaPhone size={14} color={"#000"} />&nbsp;Contact No:&nbsp;{patientDetails.contactNo}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                   
                    <div className='opd-billing-tables'>
                        <h6>Consultation</h6>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Invoice No</th>
                                    <th>Department</th>
                                    <th>SubTotal</th>
                                    <th>Discount</th>
                                    <th>Total Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultationData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.invoiceNo}</td>
                                        <td>{item.department}</td>
                                        <td>{item.subtotal}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.billstatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h6>Services</h6>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Invoice No</th>
                                    <th>Department</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>SubTotal</th>
                                    <th>Discount</th>
                                    <th>Total Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicesData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.invoiceNo}</td>
                                        <td>{item.department}</td>
                                        <td>{item.item}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.subtotal}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.billstatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h6>Summary</h6>
                        <table>
                            <thead>
                                <tr>
                                    <th>Table Name</th>
                                    <th>Department</th>
                                    <th>Subtotal</th>
                                    <th>Discount</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Consultation</td>
                                    <td>Consultation</td>
                                    <td>{consultationData.reduce((acc, item) => acc + parseFloat(item.subtotal.replace(' Rs', '')), 0)} Rs</td>
                                    <td>{consultationData.reduce((acc, item) => acc + parseFloat(item.discount.replace(' Rs', '')), 0)} Rs</td>
                                    <td>{totalConsultation} Rs</td>
                                </tr>
                                <tr>
                                    <td>Services</td>
                                    <td>Various</td>
                                    <td>{servicesData.reduce((acc, item) => acc + parseFloat(item.subtotal.replace(' Rs', '')), 0)} Rs</td>
                                    <td>{servicesData.reduce((acc, item) => acc + parseFloat(item.discount.replace(' Rs', '')), 0)} Rs</td>
                                    <td>{totalServices} Rs</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{grandTotal} Rs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='ipd-opd-printsection'>
                    <button  className='opdbill-printbtn' onClick={handlePrintTable}>Print</button>
                    <button className='opdbill-printbtn' onClick={handleGeneratePDF}>Generate Bill</button>
                    <button className='opdbill-printbtn' onClick={handleShareBill}>Share Bill</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Search_Patient;
