import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patientData: null, // Initial patient data state
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientData: (state, action) => {
      state.patientData = action.payload; // Update patient data
    },
    clearPatientData: (state) => {
      state.patientData = null; // Clear patient data
    },
  },
});

export const { setPatientData, clearPatientData } = patientSlice.actions;

export default patientSlice.reducer;
