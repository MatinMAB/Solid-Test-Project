import React from "react";

//React-Router-DOM
import Router from "./router/index";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Material UI
import { ThemeProvider } from "@mui/material";

//RTL Project
import Rtl from "./rtl";

//theme
import theme from "./theme";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Rtl>
            <Router />
          </Rtl>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
