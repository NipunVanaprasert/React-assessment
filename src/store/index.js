import { configureStore } from "@reduxjs/toolkit";

import informationSlice from "./informationSlice";
const store = configureStore({
  reducer: { information: informationSlice.reducer },
});

export default store;
