import React, { useState, useEffect } from "react";
import "./IPMoneyReceipt.css";
import { jsPDF } from "jspdf";
import { API_BASE_URL } from "../../../../api/api";

const Ipmoneyreceipt = ({value}) => {
  const [receiptData, setReceiptData] = useState(null); // To store fetched receipt data
  const [loading, setLoading] = useState(true); // To track loading state
  const [pdfPreview, setPdfPreview] = useState('');

  // const generatePDF = (data) => {
  //   const doc = new jsPDF();

  //   // Header
  //   const pageWidth = doc.internal.pageSize.width; // Get page width dynamically
  //   doc.setFontSize(16);
  //   doc.setTextColor(0, 0, 128);
  //   doc.text("HIMS", pageWidth / 2, 20, { align: "center" });
  //   doc.setFontSize(12);
  //   doc.setTextColor(0, 0, 0);
  //   doc.text("Camp Pune 41104 Maharashtra", pageWidth / 2, 28, { align: "center" });
  //   doc.text("022 6739 6666", pageWidth / 2, 36, { align: "center" });

  //   doc.setFontSize(12);
  //   doc.text("IP Money Receipt", 90, 53);

  //   // Set font size
  //   doc.setFontSize(12);

  //   // Define the starting position for the table
  //   const startX = 13;
  //   const startY = 60;
  //   const rowHeight = 6; // Height of each row
  //   const tableWidth = 185; // Width of the table
  //   const gap = 4; // Additional gap between lines

  //   // Draw the border for the table
  //   doc.rect(startX - 3, startY - 5, tableWidth + 10, rowHeight * 8 + 10); // Adjust the dimensions as needed

  //   // Add the text inside the table with extra gap between rows
  //   doc.text(`IP No: ${data.ipNo}`, startX, startY);
  //   doc.text(`MR No: ${data.mrNo}`, startX + 120, startY);

  //   doc.text(`Name: ${data.patientName}`, startX, startY + rowHeight + gap);
  //   doc.text(`Age/Gender: 17/Male`, startX + 120, startY + rowHeight + gap);

  //   doc.text(`Relative Name: D/O REDDY`, startX, startY + (rowHeight + gap) * 2);
  //   doc.text(`Company Name: ${data.organization}`, startX + 120, startY + (rowHeight + gap) * 2);

  //   doc.text(`Doctor: Dr. Amit Sharma`, startX, startY + (rowHeight + gap) * 3);
  //   doc.text(`Transaction Type: ${data.transactionType}`, startX + 120, startY + (rowHeight + gap) * 3);

  //   doc.text(`Receipt No: ${data.receiptNo}`, startX, startY + (rowHeight + gap) * 4);
  //   doc.text(`Receipt Date: 13/06/2020 5:52 PM`, startX + 120, startY + (rowHeight + gap) * 4);

  //   doc.text(`Bed No: ${data.bedNo}`, startX, startY + (rowHeight + gap) * 5);

  //   doc.setFontSize(12);

  //   // Add the text
  //   const ipAdvanceText = "IP Advance";
  //   doc.text(ipAdvanceText, 15, 125);
  //   doc.text(`Amount Rs: ${data.amount}`, 80, 125);

  //   // Draw a full-width line below the text
  //   const lineStartX = 10; // Starting point of the line (near the left margin)
  //   const lineStartY = 130; // Y-coordinate just below the text
  //   const lineEndX = pageWidth - 10; // Ending point of the line (near the right margin)

  //   doc.line(lineStartX, lineStartY, lineEndX, lineStartY); // Line from (lineStartX, lineStartY) to (lineEndX, lineStartY)

  //   // Payment details
  //   doc.setFontSize(12);
  //   doc.text(`Payment Type: ${data.modeOfPayment}`, 15, 140); // Payment Type on its own line
  //   doc.setFontSize(12);
  //   doc.text(`Amount: ${data.amount}`, 15, 150); // Left aligned
  //   doc.text(`Amount in Words: ${data.amountInWords}`, 15, 160); // Start at X = 100 for alignment

  //   // Footer Text
  //   doc.text("Authorised Signatory", 160, 190);
  //   doc.text(`Bill Date & Time: 13/06/2020 5:52 PM`, 15, 200);
  //   doc.text(`Print Date & Time: 13/06/2020 5:52 PM`, 15, 210);

  //   // Draw a full-width line below the footer
  //   const footerLineStartX = 10; // Starting point of the line (near the left margin)
  //   const footerLineStartY = 215; // Y-coordinate just below the footer text
  //   const footerLineEndX = pageWidth - 10; // Ending point of the line (near the right margin)

  //   doc.line(footerLineStartX, footerLineStartY, footerLineEndX, footerLineStartY); // Line from (footerLineStartX, footerLineStartY) to (footerLineEndX, footerLineStartY)

  //   // Generate PDF data as base64 URL
  //   const pdfData = doc.output("datauristring");
  //   setPdfPreview(pdfData); // Store the PDF data URI for preview
  // };

  const generatePDF = (data) => {
    const doc = new jsPDF();
  
    // Header
    const pageWidth = doc.internal.pageSize.width; // Get page width dynamically
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128);
    doc.text("HIMS", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Camp Pune 41104 Maharashtra", pageWidth / 2, 28, { align: "center" });
    doc.text("022 6739 6666", pageWidth / 2, 36, { align: "center" });
  
    doc.setFontSize(12);
    doc.text("IP Money Receipt", 90, 53);
  
    // Set font size
    doc.setFontSize(12);
  
    // Define the starting position for the table
    const startX = 13;
    const startY = 60;
    const rowHeight = 6; // Height of each row
    const tableWidth = 185; // Width of the table
    const gap = 4; // Additional gap between lines
  
    // Draw the border for the table
    doc.rect(startX - 3, startY - 5, tableWidth + 10, rowHeight * 8 + 10); // Adjust the dimensions as needed
  
    // Add the text inside the table with extra gap between rows
    doc.text(`IP No: ${data.ipNo}`, startX, startY);
    doc.text(`MR No: ${data.mrNo}`, startX + 120, startY);
  
    doc.text(`Name: ${data.patientName}`, startX, startY + rowHeight + gap);
    doc.text(`Age/Gender: 17/Male`, startX + 120, startY + rowHeight + gap);
  
    doc.text(`Relative Name: D/O REDDY`, startX, startY + (rowHeight + gap) * 2);
    doc.text(`Company Name: ${data.organization}`, startX + 120, startY + (rowHeight + gap) * 2);
  
    doc.text(`Doctor: Dr. Amit Sharma`, startX, startY + (rowHeight + gap) * 3);
    doc.text(`Transaction Type: ${data.transactionType}`, startX + 120, startY + (rowHeight + gap) * 3);
  
    doc.text(`Receipt No: ${data.receiptNo}`, startX, startY + (rowHeight + gap) * 4);
    doc.text(`Receipt Date: 13/06/2020 5:52 PM`, startX + 120, startY + (rowHeight + gap) * 4);
  
    doc.text(`Bed No: ${data.bedNo}`, startX, startY + (rowHeight + gap) * 5);
  
    doc.setFontSize(12);
  
    // Add the text
    const ipAdvanceText = "IP Advance";
    doc.text(ipAdvanceText, 15, 125);
    doc.text(`Amount Rs: ${data.amount}`, 80, 125);
  
    // Draw a full-width line below the text
    const lineStartX = 10; // Starting point of the line (near the left margin)
    const lineStartY = 130; // Y-coordinate just below the text
    const lineEndX = pageWidth - 10; // Ending point of the line (near the right margin)
  
    doc.line(lineStartX, lineStartY, lineEndX, lineStartY); // Line from (lineStartX, lineStartY) to (lineEndX, lineStartY)
  
    // Payment details
    doc.setFontSize(12);
    doc.text(`Payment Type: ${data.modeOfPayment}`, 15, 140); // Payment Type on its own line
    doc.setFontSize(12);
    doc.text(`Amount: ${data.amount}`, 15, 150); // Left aligned
    doc.text(`Amount in Words: ${data.amountInWords}`, 15, 160); // Start at X = 100 for alignment
  
    // Footer Text
    doc.text("Authorised Signatory", 160, 190);
    doc.text(`Bill Date & Time: 13/06/2020 5:52 PM`, 15, 200);
    doc.text(`Print Date & Time: 13/06/2020 5:52 PM`, 15, 210);
  
    // Draw a full-width line below the footer
    const footerLineStartX = 10; // Starting point of the line (near the left margin)
    const footerLineStartY = 215; // Y-coordinate just below the footer text
    const footerLineEndX = pageWidth - 10; // Ending point of the line (near the right margin)
  
    doc.line(footerLineStartX, footerLineStartY, footerLineEndX, footerLineStartY);
  
    // Open PDF in new window
    const pdfData = doc.output("bloburl"); // Create blob URL
    window.open(pdfData, "_blank"); // Open in a new tab
  };
  const closePreview = () => {
    setPdfPreview(""); // Clear the preview
  };
  // Fetch receipt data from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/IPD-bills/patient/${value}`)
      .then((response) => response.json())
      .then((data) => {
        setReceiptData(data); // Store the fetched data
        setLoading(false); // Stop loading once data is fetched
        console.log(response.data+"Hello")
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
        setLoading(false); // Stop loading even in case of an error
      });
  }, []);

  // Render a loading state if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the receipt data in tabular format
  return (
    <div className="ipmoneyreceiptbilll-container">
      <h2 className="ipmoneyreceiptbilll-header">IP Money Receipt</h2>
      
      {receiptData && receiptData.length > 0 ? (
        <table className="receipt-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Receipt Date</th>
              <th>Created By</th>
              <th>Amount</th>
              <th>Mode of Payment</th>
              <th>Status</th>
              <th>IP Admission ID</th>
              <th>Total Amount</th>
              <th>Action</th>
              {/* <th>Net Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {receiptData.map((receipt) => (
              <tr key={receipt.receiptNo}>
                <td>{receipt.receiptNo}</td>
                <td>{receipt.receiptDate}</td>
                <td>{receipt.createdBy}</td>
                <td>{receipt.amount}</td>
                <td>{receipt.modeOfAmount}</td>
                <td>{receipt.status}</td>

                {/* IP Admission and Financial Details */}
                {receipt.ipadmissionDTO ? (
                  <>
                    <td>{receipt.ipadmissionDTO.ipAdmmissionId}</td>
                    <td>{receipt.ipadmissionDTO.financialDetails?.totalAmount}</td>
                    {/* <td>{receipt.ipadmissionDTO.financialDetails?.netAmount}</td> */}
                  </>
                ) : (
                  <td colSpan="3">No IP Admission Data</td>
                )}
                  <td>
                  <button
                    className="ipmoneyreceiptbillprintpdf"
                    onClick={() => generatePDF(receipt)} // Pass the correct data here
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No receipt data available.</p>
      )}

        {/* Modal for PDF Preview */}
        {pdfPreview && (
        <div className="ipmoneyreceiptbill-modal-overlay" onClick={closePreview}>
          <div className="ipmoneyreceiptbill-modal-content">
            <iframe
              src={pdfPreview}
              width="100%"
              height="100%"
              style={{ border: "none", background: "transparent" }}
            ></iframe>
            <button className="ipmoneyreceiptbill-close-btn" onClick={closePreview}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ipmoneyreceipt;
