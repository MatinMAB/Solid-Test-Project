import React from "react";
import Router from "./router/index";

//Material UI
import { createTheme, ThemeProvider } from "@mui/material";

//RTL Project
import Rtl from "./rtl";

const theme = createTheme({
  typography: {
    fontFamily: ["Sahel"],
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Rtl>
          <Router />
        </Rtl>
      </ThemeProvider>
    </>
  );
}

export default App;
