import React from "react";
import ReactDOM from "react-dom/client";
//@ts-ignore
import { Module, moduleStore } from "relocation-forms/dist";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { ModuleProps } from "relocation-forms/dist/types";

const theme = createTheme({
  palette: { primary: { main: "#2e69ff" } },
});

const App = () => {
  const moduleProps: ModuleProps = {
    backendUrl: process.env.REACT_APP_BACKEND!,
    gapiEnabled: process.env.REACT_APP_GAPI_PLACES,
    gapiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
    awsImageUploadEnabled: process.env.REACT_APP_PICTURE_UPLOAD,
    awsPoolId: process.env.REACT_APP_AWS_POOL_ID!,
    token: process.env.REACT_APP_API_TOKEN!,
    tenant: "DEV",
  };

  return (
    <ThemeProvider theme={theme}>
      <Provider store={moduleStore}>
        <Module {...moduleProps} />
      </Provider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
