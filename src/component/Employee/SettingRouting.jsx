// src/Routes.jsx

import React from "react";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
import EmployeeRoleComponent from "./EmployeeRoleTable";
import EmployeeTypeComponent from "./EmployeeTypeTable";
import ManageDepartment from "./ManageDepartment";
import ManageSubstore from "./ManageSubstore";
import ManageWardSubstoreMap from "./ManageWardSubstoreMap";
import ManageWard from "./ADT/ManageWard";
import ManageBedFeatureScheme from "./ADT/ManageBedFeatureScheme";
import ManageBed from "./ADT/ManageBed";
import ManageImagingType from "./Radiology/ManageImagingType";
import ManageImagingItem from "./Radiology/ManageImagingItem";
import ManageRadiologyTempltate from "./Radiology/ManageRadiologyTempltate";
import DefaultSignatories from "./Radiology/DefaultSignatories";
import EmployeeHeader from "./EmployeeHeader";
import Geologicalmaster from "./Geological/geologicalmaster";
import Countrymaster from "./Geological/CountryMaster/countrymaster";
import StateMaster from "./Geological/statemaster/statemaster";
import CityMaster from "./Geological/Citymaster/citymaster";

import Rooms from "./IPMaster/Rooms/Rooms";
import Floor from "./IPMaster/Floor/Floor";
import Beds from "./IPMaster/Beds/Beds";
import PaytypeMaster from "./IPMaster/PayTypeMaster/PaytypeMaster";
import Roominfo from "./IPMaster/Rooms/Roominfo";
import DoctorMaster from "./DoctorMaster/Doctormaster";
import ServiceList from "./ServiceMaster/ServiceList";
import SOCMaster from "./SOCMaster/SocMaster";
import Location from "./LocationMaster/Location";
import Dgmaster from "./DGMasters/dgmaster";
import Specialisations from "./Specialisations/Specialisations";
import HospitalSpecialisation from "./Specialisations/HospitalSpecialisation";
import HospitalSpecialityGroup from "./SpecialityGroup/HospitalSpecialityGroup";
import DiscountAuthorityMaster from "./DiscountAuthority/DiscountAuthorityMaster";
import Organisition_Master from "./Organisition_New/Organisition_Master";
import Firewall from "./Firewall/Firewall";

const SettingRouting = () => {
  return (
    <>
      <EmployeeHeader />

      <Routes>
        <Route path="/employee/manage-employee" element={<EmployeeTable />} />
        <Route
          path="/employee/manage-employee-role"
          element={<EmployeeRoleComponent />}
        />
        <Route
          path="/employee/manage-employee-type"
          element={<EmployeeTypeComponent />}
        />
        <Route
          path="/employee/manage-department"
          element={<ManageDepartment />}
        />
        <Route path="/substore/manage-substore" element={<ManageSubstore />} />
        <Route
          path="manage-ward-substore"
          element={<ManageWardSubstoreMap />}
        />
        <Route path="/adt/manage-ward" element={<ManageWard />} />
        <Route
          path="/adt/manage-bed-feature"
          element={<ManageBedFeatureScheme />}
        />
        <Route path="/adt/manage-bed" element={<ManageBed />} />
        <Route
          path="/radiology/manage-imaging-type"
          element={<ManageImagingType />}
        />
        <Route
          path="/radiology/manage-imaging-item"
          element={<ManageImagingItem />}
        />
        <Route
          path="/radiology/manage-radiology-template"
          element={<ManageRadiologyTempltate />}
        />
        <Route
          path="/radiology/default-signatories"
          element={<DefaultSignatories />}
        />
        <Route
          path="/geolocation/manage-country"
          element={<Countrymaster />}
        ></Route>
        <Route
          path="/geolocation/manage-state"
          element={<StateMaster />}
        ></Route>
        <Route path="/geolocation/manage-city" element={<CityMaster />}></Route>
        <Route path="/doctor" element={<DoctorMaster />} />
        <Route path="/dgmaster/create-dgmaster" element={<Dgmaster />} />
        <Route
          path="/dicountathority/creatediscountathority"
          element={<DiscountAuthorityMaster />}
        />
        <Route
          path="/organaization/createorganaization"
          element={<Organisition_Master />}
        />
        <Route path="/firewall" element={<Firewall />} />
        <Route
          path="/specialisations/create-specialisations"
          element={<HospitalSpecialisation />}
        />
        <Route
          path="/specialitygroup/create-hospitalSpecialityGroup"
          element={<HospitalSpecialityGroup />}
        />
        <Route path="/ipmaster/IP-master-room" element={<Rooms />} />
        <Route path="/ipmaster/IP-master-Floor" element={<Floor />} />
        <Route path="/ipmaster/IP-master-Beds" element={<Beds />} />
        <Route
          path="/ipmaster/IP-master-Pay-type-master"
          element={<PaytypeMaster />}
        />
        <Route path="/ipmaster/IP-master-room-info" element={<Roominfo />} />
        <Route path="/servicemaster" element={<ServiceList />} />
        <Route path="/locationmaster/locationform" element={<Location />} />
        <Route path="/socmaster/socform" element={<SOCMaster />} />
        {/* <Route
          path="/ipmaster/IP-master-OTPackageMaster"
          element={<OTPackageMaster />}
        />
        <Route
          path="/ipmaster/IP-masterDischargeWordole"
          element={<DischargeWordole />}
        />
        <Route path="/ipmaster/IP-master-OTMaster" element={<OTMaster />} />
        <Route
          path="/ipmaster/IP-master-Medical-leo-cases"
          element={<MLCTypeMaster></MLCTypeMaster>}
        />
        <Route
          path="/ipmaster/IP-master-ReligionMaster"
          element={<ReligionMaster />}
        />
        <Route
          path="/ipmaster/IP-master-Discharge-template"
          element={<DischargeTemplate />}
        />
        <Route
          path="/ipmaster/in-admissible-master"
          element={<InAdmissibleMasterRoutes />}
        />
        <Route
          path="/ipmaster/IP-master-Group-operation-type"
          element={<GroupOperationType />}
        />
        <Route
          path="/ipmaster/IP-master-operation-type"
          element={<Operationtype />}
        />
        <Route path="IP-master-AutoIncreament" element={<AutoIncrement />} />
        <Route
          path="/ipmaster/IP-master-IPD-PackageMaster"
          element={<IPdPAckage />}
        />
        
        <Route path="/ipmaster/IP-master-OTMaster" element={<OTMaster />} /> */}
      </Routes>
    </>
  );
};

export default SettingRouting;
