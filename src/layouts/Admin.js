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
import { Button, Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "variables/FirebaseConfig";
import { useNavigate } from "react-router-dom-v5-compat";

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

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3a715ecf6dmsh42d397b5484cb27p1a146ejsn3a01e7e8200b",
      "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
    },
  };

  const getDollarRate = async () => {
    try {
      const response = await fetch(
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=GHS&want=USD&amount=1",
        options
      );
      const data = await response.json();
      setDollarRate(data.new_amount);
    } catch (error) {
      throw error;
    }
  };

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

  useEffect(() => getDollarRate);
  useEffect(() => getPoundsRate);

  const [purchasingAmount, setPurchasingAmount] = useState(0);

  const checkUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
      } else {
        navigate("/auth/login");
      }
    });
  };

  useEffect(checkUser, []);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <>
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
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        {modal || modal2 ? (
          <div className="modal-header">
            {modal ? (
              <Modal
                setModal={setModal}
                dollarRate={dollarRate}
                purchasingAmount={purchasingAmount}
                setPurchasingAmount={setPurchasingAmount}
                poundRate={poundRate}
              />
            ) : null}
            {modal2 ? <Modal2 setModal2={setModal2} /> : null}
          </div>
        ) : (
          <Switch>
            {getRoutes(routes)}

            <Redirect from="*" to="/admin/index" />
          </Switch>
        )}

        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;

const Modal = ({
  setModal,
  dollarRate,
  purchasingAmount,
  setPurchasingAmount,
  poundRate,
}) => {
  return (
    <div class="container mt-5 px-5">
      <Button
        className="btn-danger text-center mx-auto d-flex"
        onClick={() => setModal(false)}
      >
        Abort and Close
      </Button>
      <div class="mb-4">
        <h2>Confirm Currency purchase</h2>
        <span>
          Payments are secured. Purchasing currency will reflect in your account
          after the paymenr has be confirmed
        </span>
      </div>

      <div class="row">
        <div class="col-md-8">
          <div class="card p-3">
            <h6 class="text-uppercase">Payment details</h6>
            <div class="inputbox mt-3">
              {" "}
              <input
                type="text"
                name="name"
                class="form-control"
                required="required"
              />{" "}
              <span>
                Full Name <span className="text-danger">*</span>
              </span>{" "}
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="inputbox mt-3 mr-2">
                  {" "}
                  <select
                    name="currency"
                    id="currency"
                    className="form-control"
                  >
                    <option value="volvo">United State Dollars-USD</option>
                    <option value="saab">Pound Sterling-GBP</option>
                  </select>
                  <div>
                    <label htmlFor="currency">
                      <i class="fa-solid fa-wallet"></i>{" "}
                      <span>
                        Currency <span className="text-danger">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="inputbox mt-3 mr-2">
                  {" "}
                  <input
                    type="tel"
                    name="name"
                    class="form-control"
                    required="required"
                  />{" "}
                  <span>
                    <i class="fa-solid fa-phone"></i> Phone Number{" "}
                    <span className="text-danger">*</span>
                  </span>{" "}
                </div>
              </div>
            </div>

            <div class="mt-4 mb-4">
              <h6 class="text-uppercase">Purchasing Amount</h6>

              <div class="row mt-3">
                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      placeholder="optional"
                    />{" "}
                    <span>Referal Code</span>{" "}
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="number"
                      name="name"
                      class="form-control"
                      required="required"
                      value={purchasingAmount}
                      onChange={(e) => setPurchasingAmount(e.target.value)}
                    />{" "}
                    <span>
                      Purchasing amount in &#8373;{" "}
                      <span className="text-danger">*</span>
                    </span>{" "}
                  </div>
                </div>
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    <span>What you'll get in USD</span> <span></span>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      disabled
                      value={
                        " USD " +
                        Number(dollarRate * purchasingAmount).toFixed(2)
                      }
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required="required"
                    />{" "}
                    <span>Zip code</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 mb-4 d-flex justify-content-between">
            <Button onClick={() => setModal(false)}>Cancel</Button>

            <button class="btn btn-success px-3">
              Pay &#8373;{purchasingAmount}
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card bg-default p-3 text-white mb-3">
            <h2 className=" text-info">Conversion Rates</h2>
            <div class="d-flex flex-row align-items-end mb-3">
              <h4 class="mb-0 text-secondary">
                &#8373;1 is equal to USD {dollarRate}{" "}
              </h4>
            </div>
            <div class="d-flex flex-row align-items-end mb-3">
              <h4 class="mb-0 text-secondary">
                &#8373;1 is equal to GBP {poundRate}{" "}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal2 = ({ setModal2 }) => {
  return (
    <div class="container mt-5 px-5">
      <Button
        className="btn-danger text-center mx-auto d-flex"
        onClick={() => setModal2(false)}
      >
        Abort and Close
      </Button>
      <div class="mb-4">
        <h2>Confirm Crypto purchase</h2>
        <span>
          please make the payment, after that you can enjoy all the features and
          benefits.
        </span>
      </div>

      <div class="row">
        <div class="col-md-8">
          <div class="card p-3">
            <h6 class="text-uppercase">Payment details</h6>
            <div class="inputbox mt-3">
              {" "}
              <input
                type="text"
                name="name"
                class="form-control"
                required="required"
              />{" "}
              <span>Name on card</span>{" "}
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="inputbox mt-3 mr-2">
                  {" "}
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required="required"
                  />{" "}
                  <i class="fa fa-credit-card"></i> <span>Card Number</span>
                </div>
              </div>

              <div class="col-md-6">
                <div class="d-flex flex-row">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required="required"
                    />{" "}
                    <span>Expiry</span>{" "}
                  </div>

                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required="required"
                    />{" "}
                    <span>CVV</span>{" "}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 mb-4">
              <h6 class="text-uppercase">Billing Address</h6>

              <div class="row mt-3">
                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required="required"
                    />{" "}
                    <span>Street Address</span>{" "}
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required="required"
                    />{" "}
                    <span>City</span>{" "}
                  </div>
                </div>
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required="required"
                    />{" "}
                    <span>State/Province</span>{" "}
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required="required"
                    />{" "}
                    <span>Zip code</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 mb-4 d-flex justify-content-between">
            <Button onClick={() => setModal2(false)}>Cancel</Button>

            <button class="btn btn-success px-3">Pay $840</button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card card-blue p-3 text-white mb-3">
            <span>You have to pay</span>
            <div class="d-flex flex-row align-items-end mb-3">
              <h1 class="mb-0 yellow">$549</h1> <span>.99</span>
            </div>

            <span>
              Enjoy all the features and perk after you complete the payment
            </span>
            <a href="#" class="yellow decoration">
              Know all the features
            </a>

            <div class="hightlight">
              <span>
                100% Guaranteed support and update for the next 5 years.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
