//@ts-ignore
import { Module, moduleStore } from "relocation-forms/dist";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { ModuleProps } from "relocation-forms/dist/types";
import React from "react";

const theme = createTheme({
  palette: { primary: { main: "#2e69ff" } },
});

function DevApp() {
  const properties = React.useMemo(() => {
    const moduleProps: ModuleProps = {
      backendUrl: process.env.REACT_APP_BACKEND!,
      gapiEnabled: process.env.REACT_APP_GAPI_PLACES,
      gapiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
      awsImageUploadEnabled: process.env.REACT_APP_PICTURE_UPLOAD,
      awsPoolId: process.env.REACT_APP_AWS_POOL_ID!,
      token: process.env.REACT_APP_API_TOKEN!,
      tenant: "DEV",
    };
    return moduleProps;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={moduleStore}>
        <Module {...properties} />
      </Provider>
    </ThemeProvider>
  );
}

export default DevApp;
