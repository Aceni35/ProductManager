import { configureStore } from "@reduxjs/toolkit";
import OrdersSlice from "./slices/OrdersSlice";
import ManagementSlice from "./slices/ManagementSlice";
import AnalyticsSlice from "./slices/AnalyticsSlice";

export const store = configureStore({
  reducer: {
    order: OrdersSlice,
    manage: ManagementSlice,
    analytics: AnalyticsSlice,
  },
});
