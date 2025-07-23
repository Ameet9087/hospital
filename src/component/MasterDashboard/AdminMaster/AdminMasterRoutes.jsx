import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminMastersMenu from './AdminMastersMenu';
import LocationMaster from '../LocationMaster/LocationMaster';
import SocMaster from '../SOCMaster/socMaster';
import SpecialityGroup from '../SpecialityGroup/SpecialityGroup';
import DisplaySocMaster from '../SOCMaster/DisplaySOC';
import DisplayLocation from '../LocationMaster/DisplayLocations';
import DisplaySpecialityGroup from '../SpecialityGroup/DisplaySpecialityGroup';
import Specialisations from '../Specialisations/Specialisations';

const AdminMasterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminMastersMenu />} />

      <Route path="/location-master" element={<LocationMaster />} />
      <Route path='/soc-master' element={<SocMaster/>} />
      <Route path='/speciality-group' element={<SpecialityGroup/>} />
      <Route path='/display-SocMaster'  element={<DisplaySocMaster/>} />  
      <Route path='/display-location' element={<DisplayLocation/>} />
      <Route path='/Display-SpecialityGroup' element={<DisplaySpecialityGroup/>} />
      <Route path='/specialisations' element={<Specialisations/>} />
    </Routes>
  );
};

export default AdminMasterRoutes;
