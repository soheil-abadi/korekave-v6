import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/material";
import AppRoutes from "./AppRoute";
import { Provider } from "react-redux";
import { store } from "../store/store";

const App = () => {
  return (
    <div dir="rtl">
      <Provider store={store}>
        <BrowserRouter>
          <Toaster />
          <StyledEngineProvider>
            <AppRoutes />
          </StyledEngineProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
