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
import React, { useEffect, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "variables/FirebaseConfig";
import { useNavigate } from "react-router-dom-v5-compat";

import Modal2 from "views/examples/Modal2";
import Modal from "views/examples/Modal";
import { toast } from "react-toastify";

import video from "../assets/video.mp4";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  const navigate = useNavigate();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const [dollarRate, setDollarRate] = useState();
  const [poundRate, setPoundsRate] = useState();

  const [btcRate, setBtcRate] = useState();
  const [ethRate, setEthRate] = useState();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_CURRENCY_API,
      "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
    },
  };

  //Getting the current Dollar price in USD
  const getDollarRate = async () => {
    try {
      const response = await fetch(
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=GHS&want=USD&amount=1",
        options
      );
      const data = await response.json();
      setDollarRate(data.new_amount);
      console.log(data.new_amount);
    } catch (error) {
      toast.info(
        "Coundln't get current exchange rate, please check you connection"
      );
    }
  };

  //Getting the current Dollar price in GBP
  const getPoundsRate = async () => {
    try {
      const response = await fetch(
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=GHS&want=GBP&amount=1",
        options
      );
      const data = await response.json();
      setPoundsRate(data.new_amount);
    } catch (error) {
      throw error;
    }
  };

  //Getting BTC rate in dollars
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

  //get Ethereum Rate in USD
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

  useEffect(() => getEthRate);
  useEffect(() => getBtcRate);

  useEffect(() => getDollarRate);
  useEffect(() => getPoundsRate);

  const [purchasingAmount, setPurchasingAmount] = useState(0);

  const [userId, setUserId] = useState();

  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const checkUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
        setName(currentUser.displayName);
        setEmail(currentUser.email);
      } else {
        navigate("/auth/login");
      }
    });
  };

  useEffect(checkUser, []);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const getTransactions = async () => {
    // try {
    //   const response = await getDocs(collection(database, "Transactions"));
    //   if (response) {
    //     console.log(response.size);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => getTransactions);

  return (
    <>
      {/* <video
        className="p-0 p-sm-5"
        controls
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: "100",
        }}
      >
        <source src={video} type="video/mp4" />
      </video> */}
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
        setModal={setModal}
        setModal2={setModal2}
      />

      <div className="main-content" ref={mainContent}>
        {modal || modal2 ? (
          <div className="modal-header">
            {modal ? (
              <Modal
                setModal={setModal}
                dollarRate={dollarRate}
                purchasingAmount={purchasingAmount}
                setPurchasingAmount={setPurchasingAmount}
                poundRate={poundRate}
                userId={userId}
                name={name}
                email={email}
              />
            ) : null}
            {modal2 ? (
              <Modal2
                setModal2={setModal2}
                btcRate={btcRate}
                ethRate={ethRate}
                dollarRate={dollarRate}
                purchasingAmount={purchasingAmount}
                setPurchasingAmount={setPurchasingAmount}
                userId={userId}
                name={name}
                email={email}
              />
            ) : null}
          </div>
        ) : (
          <>
            <AdminNavbar
              {...props}
              brandText={getBrandText(props.location.pathname)}
            />
            <Switch>
              {getRoutes(routes)}

              <Redirect from="*" to="/admin/index" />
            </Switch>
          </>
        )}

        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
