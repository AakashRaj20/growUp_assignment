import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "Sector 18, Noida, UP",
  phone: "6203710261",
};

const shipmentDetailSlice = createSlice({
    name: "shipmentDetail",
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
    },
})

export const { setAddress, setPhone } = shipmentDetailSlice.actions;
export default shipmentDetailSlice.reducer;
export const address = (state) => state.shipmentDetail.address;
export const phone = (state) => state.shipmentDetail.phone;
