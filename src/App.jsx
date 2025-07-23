import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./component/NewSidebar/Layout";
import LoginHomePage from "./component/Logins/LoginHomePage";
import LoginPage from "./component/Logins/LoginPage";
import Sidebar from "./component/NewSidebar/Sidebar";
import Header from "./component/NewSidebar/Header";
import SuperUserSignup from "./component/Logins/SuperUserSignup";
import Cookies from "js-cookie";
import { PopupProvider } from "./FidgetSpinner/PopupContext";
import FidgetSpinnerNav from "./FidgetSpinner/FidgetSpinnerNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [userModules, setUserModules] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let isAuthenticated = Cookies.get("isAuthenticated");

    if (
      !isAuthenticated &&
      !["/home", "/home/login/superuser"].includes(window.location.pathname)
    ) {
      navigate("/home");
    } else {
      setIsAuthenticated(!!isAuthenticated); // Convert to boolean
    }

    const storedModules = sessionStorage.getItem("userModules");
    if (storedModules) {
      console.log(JSON.parse(storedModules));

      setUserModules(JSON.parse(storedModules));
    }
  }, []);

  return (
    <PopupProvider>
      <div className="layout-container">
        {isAuthenticated && <Sidebar modules={userModules} isOpen={isOpen} />}
        <div className="main-content">
          {isAuthenticated && <Header isOpen={isOpen} setIsOpen={setIsOpen} />}
          {!isAuthenticated ? (
            <>
              <Routes>
                <Route path="/home" element={<LoginHomePage />} />
                <Route path="/home/login" element={<LoginPage />} />
                <Route
                  path="/home/login/superuser"
                  element={<SuperUserSignup />}
                />
              </Routes>
            </>
          ) : (
            <>
              <Layout />
            </>
          )}
        </div>
      </div>
      <FidgetSpinnerNav />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="toastify-text"
      />
    </PopupProvider>
  );
}

export default App;
