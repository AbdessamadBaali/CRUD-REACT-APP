import { configureStore } from "@reduxjs/toolkit";
import { reducteur } from "../config/readucer";

export const store = configureStore({
  reducer : reducteur
})
