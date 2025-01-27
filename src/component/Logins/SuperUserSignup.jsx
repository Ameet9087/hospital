import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../component/api/api";

const SuperUserSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userRole: "Super User",
    updatedRole: [
      {
        name: "Super User",
        roleDescription: "It has full access",
        isActive: "true",
        modules: [
          {
            name: "Incentive",
            path: "/incentive",
            logo: "fa-solid fa-money-check-dollar",
            submodules: [
              {
                name: "Transaction",
                path: "/incentive/transaction",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Reports",
                path: "/incentive/reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Setting",
                path: "/incentive/setting",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "HI",
            path: "/hi",
            logo: "fa-solid fa-file-medical",
            submodules: [
              {
                name: "Visit List",
                path: "/hi/visit-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Report",
                path: "/hi/report",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patient List",
                path: "/hi/patient-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "IPD Billing",
                path: "/hi/ipd-billing",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Vaccination",
            path: "/vaccination",
            logo: "fa-solid fa-syringe",
            submodules: [
              {
                name: "Patient List",
                path: "/vaccination/patient-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Reports",
                path: "/vaccination/reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Transport",
            path: "/transport",
            logo: "fa-solid fa-truck-medical",
            submodules: [
              {
                name: "Patient Transport",
                path: "/transport/patient-transport",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Ambulance",
                path: "/transport/ambulance",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Emergency Transport",
                path: "/transport/emergency-transport",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Vehicle Maintenance",
                path: "/transport/vehicle-maintenance",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Transport Request",
                path: "/transport/transport-request",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Staff Transport",
                path: "/transport/staff-transport",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Chemotherapy",
            path: "/chemotherapy",
            logo: "fa-solid fa-user-doctor",
            submodules: [
              {
                name: "Radiation Therapy",
                path: "/chemotherapy/radiation-therapy",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Surgery Management",
                path: "/chemotherapy/surgery-management",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patient Survival Tracking",
                path: "/chemotherapy/patient-survival-tracking",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Chemotherapy Scheduling",
                path: "/chemotherapy/chemotherapy-scheduling",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Cancer Diagnosis",
                path: "/chemotherapy/cancer-diagnosis",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Nursing",
            path: "/nursing",
            logo: "fa-solid fa-user-nurse",
            submodules: [
              {
                name: "Nursing Dashboard",
                path: "/nursing/requisition-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Out Patient",
                path: "/nursing/out-patient",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Pulmonology",
            path: "/pulmonology",
            logo: "fa-solid fa-circle-h",
            submodules: [
              {
                name: "Medication Management",
                path: "/pulmonology/medication-management",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Imaging and Lab Reports",
                path: "/pulmonology/imaging-and-lab-reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Pulmonary Rehabilitation",
                path: "/pulmonology/pulmonary-rehabilitation",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Respiratory Function Tests",
                path: "/pulmonology/respiratory-function-tests",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Follow-Up Scheduling",
                path: "/pulmonology/follow-up-scheduling",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Settings",
            path: "/settings",
            logo: "fa-solid fa-gear",
            submodules: [
              {
                name: "Substore",
                path: "/settings/substore",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Radiology",
                path: "/settings/billing-setting",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Employee",
                path: "/settings/security-setting",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Ip Master",
                path: "/settings/adt-setting",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Geolocation",
                path: "/settings/radiology",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Doctor",
                path: "/settings/employee",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Service Master",
                path: "/settings/servicemaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Service Master",
                path: "/settings/servicemaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Location Master",
                path: "/settings/locationmaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Soc Master",
                path: "/settings/socmaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Dg Master",
                path: "/settings/dgmaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Soc Master",
                path: "/settings/socmaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Specialisations",
                path: "/settings/specialisations",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Speciality Group",
                path: "/settings/specialitygroup",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Opration Theater",
            path: "/opration-theater",
            logo: "fa-solid fa-bandage",
            submodules: [
              {
                name: "Setting",
                path: "/opration-theater/setting",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Anesthesia Record Management",
                path: "/opration-theater/anesthesia-record-management",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Post Surgery Care",
                path: "/opration-theater/post-surgery-care",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Surgery Scheduling",
                path: "/opration-theater/surgery-scheduling",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "OT Resource Management",
                path: "/opration-theater/ot-resource-management",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Booking List",
                path: "/opration-theater/booking-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Surgical Instrument Tracking",
                path: "/opration-theater/surgical-instrument-tracking",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Doctor",
            path: "/doctor",
            logo: "fa-solid fa-stethoscope",
            submodules: [
              {
                name: "In Patient Department",
                path: "/doctor/in-patient",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Out Patient",
                path: "/doctor/out-patient",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "MktReferral",
            path: "/mktreferral",
            logo: "fa-solid fa-people-line",
            submodules: [
              {
                name: "Setting",
                path: "/mktreferral/setting",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Report",
                path: "/mktreferral/report",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Refferal Tracking",
                path: "/mktreferral/refferal-tracking",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patinet Refferal Reward",
                path: "/mktreferral/patinet-refferal-reward",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Transaction",
                path: "/mktreferral/transaction",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patient Outreach",
                path: "/mktreferral/patient-outreach",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Marketing Campaigns",
                path: "/mktreferral/marketing-campaigns",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Emergency",
            path: "/emergency",
            logo: "fa-solid fa-hospital",
            submodules: [
              {
                name: "Finalized Patients",
                path: "/emergency/finalized-patients",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Bed Information",
                path: "/emergency/emr-bed-information",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Incident Summary",
                path: "/emergency/emr-incident-summary",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Triaged Patients",
                path: "/emergency/emr-triaged-patients",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "New Patients",
                path: "/emergency/emr-new-patients",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Appointment",
            path: "/appointment",
            logo: "fa-solid fa-bell",
            submodules: [
              {
                name: "Appointment Booking List",
                path: "/appointment/appointment-booking-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Doctor Appointment",
                path: "/appointment/list-visits",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Doctor Schedule Std",
                path: "/appointment/online-appointment",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Break Time",
                path: "/appointment/book-appointment",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Doctor Blocking",
                path: "/appointment/book-appointment",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Utilites",
            path: "/utilites",
            logo: "fa-solid fa-screwdriver-wrench",
            submodules: [
              {
                name: "Change Billing Counter",
                path: "/utilites/change-billing-counter",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Scheme Refund List",
                path: "/utilites/scheme-refund-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Organization Deposit",
                path: "/utilites/organization-deposit",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Change Visit Scheme",
                path: "/utilites/change-visit-scheme",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Reports",
            path: "/reports",
            logo: "fa-solid fa-layer-group",
            submodules: [
              {
                name: "Radiology",
                path: "/reports/radiology",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Police Case",
                path: "/reports/police-case",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Admission",
                path: "/reports/admission",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Lab",
                path: "/reports/lab",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patient",
                path: "/reports/patient",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Appointment",
                path: "/reports/appointment",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Doctors",
                path: "/reports/doctors",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Billing Reports",
                path: "/reports/billing-reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "MedicalRecord",
            path: "/medicalrecord",
            logo: "fa-solid fa-book",
            submodules: [
              {
                name: "MR Outpatient List",
                path: "/medicalrecord/mr-outpatient-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Death List",
                path: "/medicalrecord/death-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "MR Inpatient List",
                path: "/medicalrecord/mr-inpatient-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Reports",
                path: "/medicalrecord/reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Emergency Patient List",
                path: "/medicalrecord/emergency-patient-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Birth List",
                path: "/medicalrecord/birth-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Clinical",
            path: "/clinical",
            logo: "fa-solid fa-circle-h",
            submodules: [
              {
                name: "Clinical Assesments And Plan",
                path: "/clinical/clinical-assesments-and-plan",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Dispensary",
            path: "/dispensary",
            logo: "fa-solid fa-notes-medical",
            submodules: [
              {
                name: "Counter",
                path: "/dispensary/counter",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patient Consumption",
                path: "/dispensary/patient-consumption",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Stock",
                path: "/dispensary/stock",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Prescription",
                path: "/dispensary/prescription",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Reports",
                path: "/dispensary/reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Sale",
                path: "/dispensary/sale",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Billing",
            path: "/billing",
            logo: "fa-solid fa-money-bill",
            submodules: [
              {
                name: "IP Billing",
                path: "/billing/ip-billing",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "OPD Billing",
                path: "/billing/opd-billing",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "OPD Post Discount",
                path: "/billing/opd-billing",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Ipd Money Reciept",
                path: "/billing/opd-billing",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Opd Billing Cancel",
                path: "/billing/opd-billing",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Final Billing",
                path: "/billing/opd-billing",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Fix Assests",
            path: "/fix-assests",
            logo: "fa-solid fa-building",
            submodules: [
              {
                name: "Assest Transaction",
                path: "/fix-assests/assesttransaction",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Assest Master",
                path: "/fix-assests/assestmaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Assets Maintainance",
              //   path: "/fix-assests/assets-maintainance",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              // {
              //   name: "Assets Management",
              //   path: "/fix-assests/assets-management",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
            ],
          },
          {
            name: "QueueMngmt",
            path: "/queuemngmt",
            logo: "fa-solid fa-list-check",
            submodules: [
              {
                name: "OPD",
                path: "/queuemngmt/opd",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Procurement",
            path: "/procurement",
            logo: "fa-solid fa-table-list",
            submodules: [
              {
                name: "Purchase Request",
                path: "/procurement/purchase-request",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Purchase Order",
                path: "/procurement/purchase-order",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Goods Arrival Notification",
                path: "/procurement/goods-arrival-notification",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Quotation",
                path: "/procurement/quotation",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Reports",
              //   path: "/procurement/reports",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Settings",
                path: "/procurement/settings",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Dynamic Report",
            path: "/dynamic-report",
            logo: "fa-solid fa-clipboard-question",
            submodules: [
              {
                name: "Write SQL Query Here",
                path: "/radioloagy/write-sQL-query-here",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Radioloagy",
            path: "/radioloagy",
            logo: "fa-solid fa-x-ray",
            submodules: [
              {
                name: "Edit Doctors",
                path: "/radioloagy/edit-doctors",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "List Requests",
                path: "/radioloagy/list-requests",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "List Reports",
                path: "/radioloagy/list-reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Approval",
                path: "/radioloagy/list-reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Social Service",
            path: "/social-service",
            logo: "fa-solid fa-hand-holding-medical",
            submodules: [
              {
                name: "SSU Patient List",
                path: "/social-service/ssu-patient-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patient Counseling",
                path: "/social-service/patient-counseling",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "RadiationTherapy",
            path: "/radiationtherapy",
            logo: "fa-solid fa-circle-h",
            submodules: [
              {
                name: "Appointment And Scheduling",
                path: "/radiationtherapy/appointment-and-scheduling",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Patient Therapy Plan",
                path: "/radiationtherapy/patient-therapy-plan",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Dosage Tracking",
                path: "/radiationtherapy/dosage-tracking",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Radiation Safety Compliance",
                path: "/radiationtherapy/radiation-safety-compliance",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Equipment Usage Logs",
                path: "/radiationtherapy/equipment-usage-logs",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Maternity",
            path: "/maternity",
            logo: "fa-solid fa-hands-holding-child",
            submodules: [
              // {
              //   name: "Family Planning Service",
              //   path: "/maternity/family-planning-service",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              // {
              //   name: "Labor Room Management",
              //   path: "/maternity/labor-room-management",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              // {
              //   name: "Postnatal Care",
              //   path: "/maternity/postnatal-care",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              // {
              //   name: "Antenatal Care",
              //   path: "/maternity/antenatal-care",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Maternity List",
                path: "/maternity/maternity-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Breastfeeding Support",
              //   path: "/maternity/breastfeeding-support",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
            ],
          },
          {
            name: "SubStore",
            path: "/substore",
            logo: "fa-solid fa-pills",
            submodules: [
              {
                name: "stores",
                path: "/substore/stores",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Patient",
            path: "/patient",
            logo: "fa-solid fa-address-card",
            submodules: [
              {
                name: "Search Patient",
                path: "/patient/search-patient",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Register Patient",
                path: "/patient/register-patient",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Laboratory",
            path: "/laboratory",
            logo: "fa-solid fa-flask",
            submodules: [
              {
                name: "Pending Reports",
                path: "/laboratory/pending-reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Final Reports",
                path: "/laboratory/final-reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Rejected Reports",
                path: "/laboratory/final-reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Notification",
              //   path: "/laboratory/-notification",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Settings",
                path: "/laboratory/settings",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Sample Collection",
                path: "/laboratory/sample-collection",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Uncollect Sample",
                path: "/laboratory/sample-collection",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Reject Sample",
                path: "/laboratory/sample-collection",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Sample Recieving",
                path: "/laboratory/sample-collection",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Add Results",
                path: "/laboratory/add-results",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Helpdesk",
            path: "/helpdesk",
            logo: "fa-solid fa-circle-info",
            submodules: [
              // {
              //   name: "Bed Information",
              //   path: "/helpdesk/bed-information",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Employee Information",
                path: "/helpdesk/employee-information",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Queue Information",
                path: "/helpdesk/queue-information",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Ward Information",
              //   path: "/helpdesk/ward-information",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
            ],
          },
          {
            name: "Inventory",
            path: "/inventory",
            logo: "fa-solid fa-warehouse",
            submodules: [
              {
                name: "Stock",
                path: "/inventory/stock",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Internal",
                path: "/inventory/internal",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Drug Registration",
              //   path: "/inventory/drug-registration",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Return To Vendor",
                path: "/inventory/return-to-vendor",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Reports",
              //   path: "/inventory/reports",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
            ],
          },
          {
            name: "CSSD",
            path: "/cssd",
            logo: "fa-solid fa-microscope",
            submodules: [
              {
                name: "Cssd Master",
                path: "/cssd/cssdmaster",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Cssd Transaction",
                path: "/cssd/cssdtransaction",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Accounting",
            path: "/accounting",
            logo: "fa-solid fa-file-invoice",
            submodules: [
              {
                name: "Bank Reconciliation",
                path: "/accounting/bank-reconciliation",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Reports",
                path: "/accounting/reports",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Voucher Verification",
                path: "/accounting/voucher-verification",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Transactions",
                path: "/accounting/transactions",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Medicare Registration",
                path: "/accounting/medicare-registration",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Settings",
                path: "/accounting/settings",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "HR",
            path: "/hr",
            logo: "fa-solid fa-user-large",
            submodules: [
              {
                name: "Employee List",
                path: "/hr/employee-list",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Payroll",
                path: "/hr/payroll",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Attendance",
                path: "/hr/attendance",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Employee Schedule",
                path: "/hr/employee-schedule",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Recruitment Management",
                path: "/hr/recruitment-management",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Employee Leave",
                path: "/hr/employee-leave",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Performance Evaluation",
                path: "/hr/performance-evaluation",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "BloodBank",
            path: "/bloodbank",
            logo: "fa-solid fa-droplet",
            submodules: [
              {
                name: "Blood Issues",
                path: "/bloodbank/blood-issues",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Blood Collection",
                path: "/bloodbank/blood-collection",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Blood Donation Registration",
                path: "/bloodbank/blood-donation-registration",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Blood Testing and Screening",
                path: "/bloodbank/blood-testing-and-screening",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Blood Storage",
                path: "/bloodbank/blood-storage",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Blood Request",
                path: "/bloodbank/blood-request",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Report",
                path: "/bloodbank/report",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "System Admin",
            path: "/system-admin",
            logo: "fa-solid fa-window-restore",
            submodules: [
              {
                name: "Database Backup",
                path: "/system-admin/database-backup",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "ADT",
            path: "/adt",
            logo: "fa-solid fa-hospital-user",
            submodules: [
              {
                name: "Home",
                path: "/adt/home",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Discharged Patients",
                path: "/adt/discharged-patients",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Admitted Patients",
                path: "/adt/admitted-patients",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Ip Admission",
                path: "/adt/ipadmission",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Pharmacy",
            path: "/pharmacy",
            logo: "fa-solid fa-prescription-bottle-medical",
            submodules: [
              {
                name: "Substore Request/Dispatch",
                path: "/pharmacy/substore-request/dispatch",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },

              {
                name: "Store",
                path: "/pharmacy/store",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Order",
                path: "/pharmacy/order",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Supplier Ledger",
              //   path: "/pharmacy/supplier-ledger",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Setting",
                path: "/pharmacy/setting",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              {
                name: "Supplier",
                path: "/pharmacy/supplier",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "Verification",
            path: "/verification",
            logo: "fa-solid fa-check-double",
            submodules: [
              // {
              //   name: "Document & Employment Verification",
              //   path: "/verification/-document-&-employment-verification",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              // {
              //   name: "Identity Verification",
              //   path: "/verification/identity-verification",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Pharmacy",
                path: "/verification/pharmacy",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
              // {
              //   name: "Insurance Verification",
              //   path: "/verification/insurance-verification",
              //   canEdit: true,
              //   canView: true,
              //   canAdd: true,
              //   canDelete: true,
              // },
              {
                name: "Inventory",
                path: "/verification/inventory",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
          {
            name: "SuperUser",
            path: "/superuser",
            logo: "fa-solid fa-check-double",
            submodules: [
              {
                name: "User Management",
                path: "/superuser/usermanagement",
                canEdit: true,
                canView: true,
                canAdd: true,
                canDelete: true,
              },
            ],
          },
        ],
      },
    ],
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!formData.username || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/create-super-user`,
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Super User Created Successfully.");
        console.log("Super User Created Successfully.");
        setFormData({
          username: "",
          password: "",
        });
        navigate("/home");
      } else {
        setError(`Failed to create super user: ${response.statusText}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Error:", err);
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
            <form onSubmit={handleSubmit}>
              <h2 className="login-box-h2">Super User Signup</h2>

              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="login-box-input"
                  placeholder="Enter User Name"
                  value={formData.username}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="login-box-input"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleFormChange}
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
              {error && <div className="error-message">{error}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}

              <button type="submit" className="submit-button">
                Create Super User
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperUserSignup;
