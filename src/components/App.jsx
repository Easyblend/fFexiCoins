import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import WidthrawPage from "views/WidthrawPage";

//Toast imports
import { ToastContainer } from "react-toastify";
import PasswordReset from "views/examples/ResetPassword";

import { CurrencyRatesContext } from "Utils/CurrencyRatesContext";

import { toast } from "react-toastify";

function App() {
  //Get All Currency Rates

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_CURRENCY_API,
      "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
    },
  };

  const [dollarRate, setDollarRate] = useState(0);
  const getDollarRate = async () => {
    try {
      const response = await fetch(
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=GHS&want=USD&amount=1",
        options
      );
      const data = await response.json();

      setDollarRate(data.new_amount);
    } catch (error) {
      toast.info("Network error");
    }
  };
  const [gbpRate, setGbpRate] = useState(0);
  const getGbpRate = async () => {
    try {
      const response = await fetch(
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=GHS&want=GBP&amount=1",
        options
      );
      const data = await response.json();
      setGbpRate(data.new_amount);
    } catch (error) {
      toast.info("Network error");
    }
  };

  const [btcRate, setBtcRate] = useState(0);

  const getBtcRate = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );
      const data = await response.json();
      setBtcRate(data.market_data.current_price.usd); //btc price in dollars
    } catch (error) {
      throw error;
    }
  };

  const [ethRate, setEthRate] = useState(0);
  const getEthRate = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum"
      );
      const data = await response.json();
      setEthRate(data.market_data.current_price.usd); //btc price in dollars
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getDollarRate();
    getGbpRate();
    getBtcRate();
    getEthRate();
  });

  return (
    <>
      <BrowserRouter>
        <CompatRouter>
          <Switch>
            <CurrencyRatesContext.Provider
              value={{ dollarRate: dollarRate, gbpRate: gbpRate }}
            >
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />

              <Route
                path="/withdraw"
                render={(props) => <WidthrawPage {...props} />}
              />
              <Route
                path="/auth/resetpassword"
                render={(props) => <PasswordReset {...props} />}
              />

              <Route
                path="/auth"
                render={(props) => <AuthLayout {...props} />}
              />
              <Redirect from="/" to="/admin/index" />
            </CurrencyRatesContext.Provider>
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
        limit={1}
        draggable
        theme="dark"
      />
      {/* Same as */}
    </>
  );
}

export default App;
