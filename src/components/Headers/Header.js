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

const Header = ({ usdPurchase, gpbPurchase }) => {
  const [usdtotal, setUsdTotal] = useState();
  const [gbptotal, setGbpTotal] = useState();

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3a715ecf6dmsh42d397b5484cb27p1a146ejsn3a01e7e8200b",
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    body: '{"personalizations":[{"to":[{"email":"kenzieemma072@gmail.com"}],"subject":"Hello, World!"}],"from":{"email":"meghanroche20@gmail.com"},"content":[{"type":"text/plain","value":"Hello, World!"}]}',
  };

  fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

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
  });

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
                          {usdtotal} $
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
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
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
                          {gbptotal} £
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape  bg-default text-white rounded-circle shadow">
                          <i className="fa-solid fa-sterling-sign"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
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
                          BTC
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0.0003</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning  text-white rounded-circle shadow">
                          <i className="fa-brands fa-bitcoin"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
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
                          ETH
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0.2839</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                          <i className="fa-brands fa-ethereum"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
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
