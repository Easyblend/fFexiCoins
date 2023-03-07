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

// reactstrap components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({ usdPurchase, gpbPurchase, btcPurchase, ethPurchase }) => {
  const [usdtotal, setUsdTotal] = useState();
  const [gbptotal, setGbpTotal] = useState();
  const [btctotal, setBtcTotal] = useState();
  const [ethtotal, setEthTotal] = useState();

  useEffect(() => {
    let usdTotals = "";
    usdPurchase?.map((price) => {
      usdTotals = (Number(price.Recieved) + Number(usdTotals)).toFixed(2);
    });
    setUsdTotal(usdTotals);

    let gbpTotals = "";
    gpbPurchase?.map((price) => {
      gbpTotals = (Number(price.Recieved) + Number(gbpTotals)).toFixed(2);
    });
    setGbpTotal(gbpTotals);

    let btcTotals = "";
    btcPurchase?.map((price) => {
      btcTotals = (Number(price.Recieved) + Number(btcTotals)).toFixed(4);
    });
    setBtcTotal(btcTotals);

    let ethTotals = "";
    ethPurchase?.map((price) => {
      ethTotals = (Number(price.Recieved) + Number(ethTotals)).toFixed(4);
    });
    setEthTotal(ethTotals);
  });

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

  console.log(dollarRate);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          USD
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {usdtotal ? (
                            usdtotal
                          ) : (
                            <div class="spinner-grow text-danger" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          $
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fa-solid fa-dollar-sign"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap h4 text-muted">
                        {usdtotal ? (usdtotal / dollarRate).toFixed() : "0.00"}{" "}
                        GHC
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Pound sterling
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {gbptotal ? (
                            gbptotal
                          ) : (
                            <div class="spinner-grow" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          £
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape  bg-default text-white rounded-circle shadow">
                          <i className="fa-solid fa-sterling-sign"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap h4 text-muted">
                        {" "}
                        {gbptotal
                          ? (gbptotal / gbpRate).toFixed(2)
                          : "0.00"}{" "}
                        GHC
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Bitcoin
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {btctotal ? (
                            btctotal
                          ) : (
                            <div
                              class="spinner-grow text-warning"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          BTC
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning  text-white rounded-circle shadow">
                          <i className="fa-brands fa-bitcoin"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap text-muted h4">
                        {" "}
                        {btctotal
                          ? ((btctotal * btcRate) / dollarRate).toFixed(2)
                          : "0.00"}{" "}
                        GHC
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Ethereum
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {ethtotal ? (
                            ethtotal
                          ) : (
                            <div class="spinner-grow text-dark" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          ETH
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                          <i className="fa-brands fa-ethereum"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap text-muted h4">
                        {ethtotal
                          ? ((ethRate * ethtotal) / dollarRate).toFixed(2)
                          : "0.00"}{" "}
                        GHC
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
