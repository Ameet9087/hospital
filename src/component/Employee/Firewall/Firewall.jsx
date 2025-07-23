import React, { useState, useEffect, useRef } from "react";

const Firewall = () => {
      const [isScanning, setIsScanning] = useState(
            JSON.parse(localStorage.getItem("isScanning")) || false
      );
      const [progress, setProgress] = useState(0);
      const [timer, setTimer] = useState(null);
      const [consoleText, setConsoleText] = useState([]);
      const consoleRef = useRef(null);

      // Predefined messages
      const messages = [
            "Starting network setup...",
            "Network setup complete. Scanning hospital data...",
            "Checking hospital_patients data...",
            "Checking hospital_doctors data...",
            "Checking hospital_visits data...",
            "Checking hospital_billing data...",
            "Network vulnerabilities detected: Critical issues found.",
            "Scanning complete. Preparing vulnerability report...",
            "Warning: High vulnerability detected in network firewall.",
            "Table scan complete. Validating data integrity...",
            "Security breach detected in the billing system.",
            "Network setup initialization failed. Retrying...",
            "Successfully connected to hospital database.",
            "Table data scan complete. No anomalies found.",
            "Vulnerability scan complete. No issues detected.",
            "Performing deep packet inspection...",
            "Scanning database schema for inconsistencies...",
            "Network traffic encrypted. Secure connection established.",
            "Checking system configurations...",
            "Firewall status: Active and secure.",
            "Scanning complete. No issues detected.",
            "Firewall settings verified and updated.",
            "Data integrity check completed successfully.",
            "Starting backup system for database.",
            "Backup completed. Ready to proceed with scanning.",
            "Preparing firewall settings for verification.",
            "Running database vulnerability checks...",
            "Connection to database stable.",
            "Security protocols updated successfully.",
            "Firewall configuration errors resolved.",
            "Performing system health check...",
            "Critical vulnerability identified in user authentication module.",
            "Performing system reboot for updates...",
            "Table hospital_patients schema update required.",
            "Vulnerability scanning paused for updates.",
            "Vulnerability scan resumed after update.",
            "System update complete. Restarting network check...",
            "Hostnames verified. DNS lookup successful.",
            "Checking network latency for data transmission.",
            "Database optimization started.",
            "Database optimization completed successfully.",
            "Network resources optimized for better performance.",
            "Attempting to resolve network configuration error.",
            "Network configuration successfully resolved.",
            "Scanning for outdated software versions...",
            "Software versions up to date.",
            "Warning: Network congestion detected.",
            "Warning: Unverified source detected in traffic analysis.",
            "System performance optimized during scan.",
            "Database table hospital_visits updated successfully.",
            "Security patches installed successfully.",
            "Network scan completed. No issues found.",
      ];

      const [messageIndex, setMessageIndex] = useState(0);

      // Sync isScanning state with local storage
      useEffect(() => {
            localStorage.setItem("isScanning", JSON.stringify(isScanning));

            if (!isScanning) {
                  clearInterval(timer);
            } else {
                  startNetworkSetup();
            }

            return () => clearInterval(timer);
      }, [isScanning]);

      // Handle toggle change
      const handleToggleChange = () => {
            setIsScanning((prevState) => !prevState);
      };

      // Simulate 10-second network setup
      const startNetworkSetup = () => {
            setConsoleText((prevText) => [
                  ...prevText,
                  "Starting network setup...",
            ]);

            setTimeout(() => {
                  setConsoleText((prevText) => [
                        ...prevText,
                        "Network setup complete. Scanning hospital-related tables...",
                  ]);

                  setTimeout(() => {
                        startScanning();
                  }, 1000);
            }, 10000);
      };

      // Start scanning and progress bar
      const startScanning = () => {
            const newTimer = setInterval(() => {
                  setProgress((prevProgress) => {
                        if (prevProgress >= 100) {
                              clearInterval(newTimer);
                              alert("Network is secured!");
                              return 100;
                        }
                        return prevProgress + 0.833;
                  });
            }, 1000);

            setTimer(newTimer);
      };

      // Add console screen rendering during scanning
      useEffect(() => {
            if (isScanning) {
                  const interval = setInterval(() => {
                        if (messageIndex < messages.length) {
                              setConsoleText((prevText) => [...prevText, messages[messageIndex]]);
                              setMessageIndex(messageIndex + 1);
                        } else {
                              clearInterval(interval);
                        }
                  }, 1000);

                  return () => clearInterval(interval);
            }
      }, [isScanning, messageIndex]);

      // Automatically scroll the console screen to the bottom
      useEffect(() => {
            if (consoleRef.current) {
                  consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
            }
      }, [consoleText]);

      return (
            <div style={styles.container}>
                  <h2 style={styles.title}>Firewall Scanning</h2>
                  <div style={styles.toggleWrapper}>
                        <span style={styles.toggleLabel}>
                              {isScanning ? "🟢 Firewall ON" : "🔴 Firewall OFF"}
                        </span>
                        <div
                              style={{
                                    ...styles.toggle,
                                    background: isScanning
                                          ? "linear-gradient(45deg, #4caf50, #81c784)"
                                          : "linear-gradient(45deg, #ccc, #e0e0e0)",
                              }}
                              onClick={handleToggleChange}
                        >
                              <div
                                    style={{
                                          ...styles.toggleCircle,
                                          transform: isScanning ? "translateX(24px)" : "translateX(0)",
                                    }}
                              />
                        </div>
                  </div>

                  <div style={styles.content}>
                        {isScanning && <p style={styles.scanningText}>Scanning in progress...</p>}

                        <div style={styles.progressContainer}>
                              <div
                                    style={{
                                          ...styles.progressBar,
                                          width: `${progress}%`,
                                    }}
                              />
                        </div>

                        <div style={styles.progressInfo}>
                              <span>{Math.round(progress)}% Complete</span>
                        </div>

                        <div style={styles.consoleScreen} ref={consoleRef}>
                              <h4>Console Screen:</h4>
                              <div style={styles.consoleText}>
                                    {consoleText.map((line, index) => (
                                          <p key={index}>{line}</p>
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

const styles = {
      container: {
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#f8f9fa",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      },
      title: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
      },
      toggleWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            margin: "20px 0",
      },
      toggleLabel: {
            fontSize: "18px",
            fontWeight: "bold",
            color: "#555",
      },
      toggle: {
            width: "50px",
            height: "26px",
            borderRadius: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "2px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      },
      toggleCircle: {
            width: "22px",
            height: "22px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            transition: "transform 0.3s ease",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      },
      content: {
            marginTop: "20px",
      },
      scanningText: {
            fontSize: "16px",
            color: "#666",
            fontStyle: "italic",
      },
      progressContainer: {
            width: "100%",
            height: "30px",
            backgroundColor: "#eee",
            borderRadius: "15px",
            overflow: "hidden",
            marginTop: "20px",
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.2)",
      },
      progressBar: {
            height: "100%",
            background: "linear-gradient(90deg, #4caf50, #81c784)",
            borderRadius: "15px",
            transition: "width 1s ease-in-out",
      },
      progressInfo: {
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
      },
      consoleScreen: {
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            height: "200px", // Fixed height for console
            overflowY: "auto", // Enable scrolling when content overflows
      },
      consoleText: {
            fontSize: "14px",
            whiteSpace: "pre-wrap", // Preserves formatting of text
      },
};

export default Firewall;
