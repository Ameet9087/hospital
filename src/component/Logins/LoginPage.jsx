import React, { useState } from "react";
import "./LoginPage.css";
import { FaUserMd, FaUserCog, FaUserTie, FaUserInjured } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../component/api/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);
  const [isFetchingRole, setIsFetchingRole] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loginType = location.state?.loginType || "Doctor";
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getLoginDetails = () => {
    switch (loginType) {
      case "Admin":
        return {
          icon: <FaUserCog style={{ marginRight: "8px", fontSize: "70px" }} />,
          title: "Employee Login",
        };
      case "Super User":
        return {
          icon: <FaUserTie style={{ marginRight: "8px", fontSize: "70px" }} />,
          title: "Super User",
        };
      case "Patient":
        return {
          icon: (
            <FaUserInjured style={{ marginRight: "8px", fontSize: "70px" }} />
          ),
          title: "Patient Login",
        };
      default:
        return {
          icon: <FaUserMd style={{ marginRight: "8px", fontSize: "70px" }} />,
          title: "Doctor Login",
        };
    }
  };

  const { icon, title } = getLoginDetails();

  const fetchRoleId = async () => {
    setIsFetchingRole(true);
    setError(""); // Clear previous errors

    try {
      // Fetch all roles
      const response = await fetch(
        `${API_BASE_URL}/admin/by-username/${username}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch role ID.");
      }

      const data = await response.json();
      console.log(data);

      if (data && Array.isArray(data) && data.length > 0) {
        let filteredRoles;

        // Filter roles based on loginType
        switch (loginType) {
          case "Super User":
            filteredRoles = data.filter(
              (role) =>
                role?.roleName.trim().replace(/\s/g, "").toLowerCase() ===
                "superuser"
            );
            break;
          case "Doctor":
            filteredRoles = data.filter(
              (role) =>
                role?.roleName.trim().replace(/\s/g, "").toLowerCase() ===
                "doctor"
            );
            break;
          case "Admin":
            filteredRoles = data.filter(
              (role) =>
                role?.roleName.trim().replace(/\s/g, "").toLowerCase() !==
                  "doctor" &&
                role?.roleName.trim().replace(/\s/g, "").toLowerCase() !==
                  "superuser"
            );
            break;
          default:
            filteredRoles = data; // Default case to include all roles
            break;
        }

        if (filteredRoles.length > 0) {
          if (loginType === "Doctor" || loginType === "Super User") {
            setRoles([filteredRoles[0]]);
            setSelectedRole(filteredRoles[0]?.roleId); // Auto-select the first role
          } else {
            setRoles(filteredRoles); // Allow selection for Admin
          }
        } else {
          setError("No matching roles found for this login type.");
        }
      } else {
        setError("Role ID not found for this username.");
      }
    } catch (error) {
      setError("Error fetching role ID. Please try again.");
    } finally {
      setIsFetchingRole(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError("Please select a role before submitting.");
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login?username=${username}&password=${password}&roleId=${selectedRole}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        sessionStorage.setItem("authToken", data.token);
        const userDetailsResponse = await fetch(
          `${API_BASE_URL}/admin/user-details/${username}`
        );

        if (!userDetailsResponse.ok) {
          throw new Error("Failed to fetch user details.");
        }

        const userDetailsData = await userDetailsResponse.json();

        if (userDetailsData?.modules?.length > 0) {
          const userModules = userDetailsData.modules.map((module) => ({
            moduleId: module.moduleId,
            moduleName: module.moduleName,
            modulePath: module.modulePath,
            logo: module.logo,
            submodules: module.submodules,
          }));
          sessionStorage.setItem("userModules", JSON.stringify(userModules));
          Cookies.set("isAuthenticated", true);
          window.location.href = "/dashboard";
        } else {
          throw new Error("No modules available for user.");
        }
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <button onClick={() => navigate("/home")} className="login-back-btn">
        <i className="fas fa-long-arrow-alt-left"></i>
      </button>
      <div className="login-container">
        <div className="login-slogan-container">
          <div className="loginpage_advicecontainer">
            <h2 className="login-slogan-container-h2">
              Expert advice from top doctors
            </h2>
            <ul className="login-slogan-container-ul">
              <li className="login-slogan-container-li">
                Expert advice from top doctors.
              </li>
              <li className="login-slogan-container-li">
                Available 24/7 on any device.
              </li>
              <li className="login-slogan-container-li">
                Private questions answered within 24 hrs.
              </li>
            </ul>
          </div>
        </div>
        <div className="login-box">
          <div className="login_middlecontainer">
            <span className="login-toggle-option">{icon}</span>
            <h2 className="login-box-h2">{title}</h2>
            <form className="login-box-form" onSubmit={handleSubmit}>
              <input
                className="login-box-input"
                type="text"
                placeholder="Enter User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={fetchRoleId} // Trigger fetchRoleId on blur
                required
              />
              <div style={{ position: "relative" }}>
                <input
                  className="login-box-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  aria-hidden="true"
                  id="showHidePassword"
                  style={{
                    position: "absolute",
                    fontSize: "20px",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>

              <select
                onChange={(e) => setSelectedRole(e.target.value)}
                className="login-box-input"
                disabled={loginType === "Doctor" || loginType === "Super User"} // Disable for Doctor and Super User
              >
                {loginType === "Admin" ? (
                  <>
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </option>
                    ))}
                  </>
                ) : (
                  // Display the pre-selected role for Doctor or Super User
                  roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))
                )}
              </select>
              <button type="submit" disabled={isFetchingRole}>
                Sign in
              </button>
            </form>
            {loginType === "Super User" && (
              <p>
                Don’t have an account?{" "}
                <a href="/home/login/superuser">Sign up</a>
              </p>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
