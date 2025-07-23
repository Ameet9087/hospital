import React, { useState, useRef } from 'react';
import './UploadPhoto.css';
import useCustomAlert from '../../alerts/useCustomAlert';

function UploadPhotoPage({ sendUploadPhotodata }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isOptionsPopupOpen, setIsOptionsPopupOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { success, warning, error, CustomAlerts } = useCustomAlert();
  // Open the camera
  const openCamera = () => {
    setIsOptionsPopupOpen(false); // Close options popup
  
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setIsCameraOpen(true); // Set camera open state to true first
  
        // Wait for the component to re-render and then check if videoRef.current is defined
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
           
          } else {
            console.error("Video element is not available.");
          }
        }, 0);
      })
      .catch(error => {
        console.error('Error accessing camera', error);
      });
  };
  
  // Capture photo from video feed
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      // Set canvas size to match video resolution
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(videoRef.current, 0, 0);

      // Get the captured image as a data URL and update state
      const capturedImage = canvasRef.current.toDataURL('image/png');
      const photoData = { photoFile: null, photoURL: capturedImage };
      setImageSrc(capturedImage);
      sendUploadPhotodata(photoData); // Send captured photo data
    
      closeCamera();
      success("Photo Captured Successfully");
    } else {
      console.error("Canvas or video element is missing.");
    }
  };

  // Close the camera
  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Stop all tracks of the video stream
      videoRef.current.srcObject = null; // Clear video source
    }
    setIsCameraOpen(false); // Set camera open state to false
  };

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoData = {
          photoFile: file,
          photoURL: reader.result,
        };
        setImageSrc(reader.result);
        sendUploadPhotodata(photoData); // Send uploaded photo data
        success("Photo Uploaded Successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle options popupjn bb\
  4
  41
  
  const toggleOptionsPopup = () => {
    setIsOptionsPopupOpen(!isOptionsPopupOpen);
  };

  return (
    <div className="upload-photo-page">
        <CustomAlerts></CustomAlerts>
      <h2>Upload or Capture Photo</h2>

      {/* Choose File button to open options popup */}
      <button onClick={toggleOptionsPopup}>Choose File</button>

      {/* Options Popup */}
      {isOptionsPopupOpen && (
        <div className="options-popup">
          <button onClick={() => document.getElementById('fileInput').click()}>Upload from File</button> &nbsp;
          <button onClick={openCamera}>Upload from Camera</button>
        </div>
      )}

      {/* Hidden File Input for Photo Upload */}
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Camera View, Capture Button, and Close Button */}
      {isCameraOpen && (
        <div className="register-patient-camera-container">
          <video ref={videoRef} autoPlay playsInline></video><br></br>
          <button onClick={capturePhoto} className="register-patient-capture-btn">Capture Photo</button>
        
        </div>
        
      )}
      
      {/* Canvas element (hidden) */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {/* Display Captured or Uploaded Image */}
      {imageSrc && (
        <div className="register-patient-image-preview">
          <img src={imageSrc} alt="Captured or Uploaded" className="register-patient-captured-image" />
          {/* <button onClick={closeCamera} className="register-patient-close-btn">Close Camera</button> */}
        </div>
      )}
    </div>
  );
}

export default UploadPhotoPage;
