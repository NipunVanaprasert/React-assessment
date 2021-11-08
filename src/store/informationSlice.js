import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const informationSlice = createSlice({
  name: "information",
  initialState: {
    name: "",
    email: "",
    phone: "",
  },
  reducers: {
    addInformation(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    createUser(state) {
      fetch(
        "https://login-auth-5e306-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
        {
          method: "POST",
          body: JSON.stringify(state),
          headers: { "Content-Type": "application/json" },
        }
      );
    },
  },
});

export const informationSliceAction = informationSlice.actions;
export default informationSlice;
