import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import reportWebVitals from "reportWebVitals";
import App from "components/App";
import store from "redux/configureStore";
import "index.css";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="495102539736-86o9rp15k7c43nrjpa72dj7oqta8h5kp.apps.googleusercontent.com">
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
