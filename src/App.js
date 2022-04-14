import React from "react";
import Router from "./router/index";

//Material UI
import { ThemeProvider } from "@mui/material";

//RTL Project
import Rtl from "./rtl";

//theme
import theme from "./theme"

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
