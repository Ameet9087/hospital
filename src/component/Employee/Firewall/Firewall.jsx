import React, { useState, useEffect } from "react";

const Firewall = () => {
      // State to manage the toggle and progress
      const [isScanning, setIsScanning] = useState(
            JSON.parse(localStorage.getItem("isScanning")) || false
      );
      const [progress, setProgress] = useState(0);
      const [timer, setTimer] = useState(null);

      // Sync isScanning state with local storage
      useEffect(() => {
            localStorage.setItem("isScanning", JSON.stringify(isScanning));
            if (!isScanning) {
                  setProgress(0); // Reset progress when scanning stops
                  clearInterval(timer);
            } else {
                  startScanning(); // Start scanning if toggled ON
            }
            // Clean up timer on unmount
            return () => clearInterval(timer);
      }, [isScanning]);

      // Handle toggle change
      const handleToggleChange = () => {
            setIsScanning((prevState) => !prevState);
      };

      // Start scanning and progress bar
      const startScanning = () => {
            setProgress(0); // Reset progress before starting

            const newTimer = setInterval(() => {
                  setProgress((prevProgress) => {
                        if (prevProgress >= 100) {
                              clearInterval(newTimer); // Stop when 100% progress is reached
                              alert("Network is secured!"); // Show popup after scanning completes
                              return 100;
                        }
                        return prevProgress + 0.833; // 100% / 120s = 0.833% per second
                  });
            }, 1000); // Update every second

            setTimer(newTimer);
      };

      return (
            <div style={styles.container}>
                  <h2 style={styles.title}>🔥 Firewall Scanning 🔥</h2>
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
                  </div>
            </div>
      );
};

const styles = {
      container: {
            width: "100%",
            maxWidth: "600px",
            margin: "20px auto",
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
};

export default Firewall;
