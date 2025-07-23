import React, { useRef } from 'react';
import QRCode from 'react-qr-code'; // Correct import from react-qr-code
import './VisitorIdModal.css'; // Updated CSS file

const VisitorIdModal = ({ visitor, onClose }) => {
    const printRef = useRef(); // Create a ref to target visitingidcard div

    // Function to handle print action
    const handlePrint = () => {
        const originalContents = document.body.innerHTML;
        const printContents = printRef.current.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents; // Restore original content after printing
        window.location.reload(); // Refresh the page to avoid any issues
    };

    // Data to be encoded in the QR code
    const qrData = `ID: ${visitor.badgeId}, Name: ${visitor.visitorName}`;

    return (
        <div className="visitor-id-modal">
            <div className="visitor-id-modal-content">
                <span className="visitor-id-close" onClick={onClose}>
                    &times;
                </span>
                <div className="visitingidcard" ref={printRef}>
                    <h2>Visitor ID</h2>
                    <div className="visitor-details-grid">
                        <div className="visitor-details-column">
                            <p><strong>ID:</strong> {visitor.badgeId}</p>
                            <p><strong>Name:</strong> {visitor.visitorName}</p>
                            <p><strong>Type:</strong> {visitor.visitorType}</p>
                            <p><strong>Purpose:</strong> {visitor.visitPurpose}</p>
                        </div>
                        <div className="visitor-details-column">
                            <p><strong>Meeting With:</strong> {visitor.meetingDetails.toWhom}</p>
                            <p><strong>Meeting Start Time:</strong> {visitor.meetingDetails.meetingStartTime}</p>
                            <p><strong>Meeting End Time:</strong> {visitor.meetingDetails.meetingStartTime}</p>
                            <p><strong>Visit Date:</strong> {visitor.meetingDetails.visitDate}</p>

                        </div>
                        <div className="visitor-details-column qr-code-column">
                            <QRCode value={qrData} size={128} bgColor={"#ffffff"} fgColor={"#000000"} />
                        </div>
                    </div>
                </div>
                <button className="visitor-id-print" onClick={handlePrint}>
                    Print
                </button>
            </div>
        </div>
    );
};

export default VisitorIdModal;
