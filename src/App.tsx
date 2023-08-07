import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./hooks/useRoutes";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./redux";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./helpers/theme";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    )
  )
);

function App() {
  const routes: JSX.Element = useRoutes();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          {routes}
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App;
