/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import DepositPage from "views/DepositPage";
import WidthrawPage from "views/WidthrawPage";

//Toast imports
import { ToastContainer } from "react-toastify";
import PasswordReset from "views/examples/ResetPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
      <CompatRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

          <Route
            path="/withdraw"
            render={(props) => <WidthrawPage {...props} />}
          />
          <Route
            path="/auth/resetpassword"
            render={(props) => <PasswordReset {...props} />}
          />

          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </CompatRouter>
    </BrowserRouter>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme="dark"
    />
    {/* Same as */}
  </>
);
