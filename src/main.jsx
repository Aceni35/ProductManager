import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import ManagementPage from "./pages/Management/ManagementPage.jsx";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppContext from "./AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ToastContainer />
      <AppContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
              <Route path="/management" element={<ManagementPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext>
    </Provider>
  </>
);
