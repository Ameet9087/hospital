import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminMastersMenu.css";

const AdminMastersMenu = () => {
  const navigate = useNavigate();

  // Define the Card component for each menu item
  const MenuCard = ({ title, onClick }) => (
    <div className="admin-masters-card" onClick={onClick}>
      <div className="admin-masters-card-content">
        <h3>{title}</h3>
      </div>
    </div>
  );

  // Define menu items with titles and navigation paths
  const menuItems = [
    { title: "Location Master", onClick: () => navigate("/location-master") },
    { title: "Speciality Group", onClick: () => navigate("/speciality-group") },
    { title: "Specialisations", onClick: () => navigate("/specialisations") },
    { title: "Doctor Master", onClick: () => navigate("/doctor-master") },
    { title: "Referral Doctor Master", onClick: () => navigate("/referral-doctor-master") },
    { title: "Organisation Group", onClick: () => navigate("/organisation-group") },
    { title: "Organisation Classification", onClick: () => navigate("/organisation-classification") },
    { title: "Organisation Master", onClick: () => navigate("/organisation-master") },
    { title: "Group Service Type", onClick: () => navigate("/group-service-type") },
    { title: "Service Type", onClick: () => navigate("/service-type") },
    { title: "Service Master", onClick: () => navigate("/service-master") },
    { title: "Area Master", onClick: () => navigate("/area-master") },
    { title: "City Master", onClick: () => navigate("/city-master") },
    { title: "State Master", onClick: () => navigate("/state-master") },
    { title: "Country Master", onClick: () => navigate("/country-master") },
    { title: "VAT Category", onClick: () => navigate("/vat-category") },
    { title: "SOC Master", onClick: () => navigate("/soc-master") },
    { title: "Allot SOC To Org", onClick: () => navigate("/allot-soc-to-org") },
    { title: "Cast Master", onClick: () => navigate("/cast-master") },
    { title: "Occupation Master", onClick: () => navigate("/occupation-master") },
    { title: "Diagnosis Booking Purpose", onClick: () => navigate("/diagnosis-booking-purpose") },
    { title: "Discount Authorisation", onClick: () => navigate("/discount-authorisation") },
    { title: "Discount Category", onClick: () => navigate("/discount-category") },
    { title: "Doctor Share Service Wise Master", onClick: () => navigate("/doctor-share-service-wise-master") },
    { title: "Bank Master", onClick: () => navigate("/bank-master") },
    { title: "Media Master", onClick: () => navigate("/media-master") },
    { title: "Assign Doctors To User", onClick: () => navigate("/assign-doctors-to-user") },
    { title: "NeosoftMast Paymodes", onClick: () => navigate("/neosoftmast-paymodes") },
    { title: "NeosoftMast NameInitial", onClick: () => navigate("/neosoftmast-nameinitial") },
    { title: "NeosoftMast Gender", onClick: () => navigate("/neosoftmast-gender") },
    { title: "NeosoftMast MaritalStatus", onClick: () => navigate("/neosoftmast-maritalstatus") },
    { title: "NeosoftMast Relation", onClick: () => navigate("/neosoftmast-relation") },
    { title: "NeosoftMast Religion", onClick: () => navigate("/neosoftmast-religion") },
    { title: "Define Userwise Paymodes", onClick: () => navigate("/define-userwise-paymodes") },
    { title: "User Types", onClick: () => navigate("/user-types") },
    { title: "Cancellation Reason Master", onClick: () => navigate("/cancellation-reason-master") },
  ];

  return (
    <div className="admin-masters-dashboard">
      {menuItems.map((item, index) => (
        <MenuCard key={index} title={item.title} onClick={item.onClick} />
      ))}
    </div>
  );
};

export default AdminMastersMenu;
