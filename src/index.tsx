import React from "react";
import ReactDOM from "react-dom/client";
//@ts-ignore
import { Module, moduleStore } from "relocation-forms/es";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: { primary: { main: "#2e69ff" } },
});

const App = () => {
  const moduleProps = {
    backendUrl: process.env.REACT_APP_BACKEND,
    gapiKey: process.env.REACT_APP_GAPI_KEY,
    tenant: process.env.REACT_APP_TENANT,
    awsUploadPoolId: process.env.REACT_APP_POOL_ID,
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
  document.getElementById("sputnik-root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
