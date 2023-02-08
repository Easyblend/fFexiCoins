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
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { collection, getDocs } from "firebase/firestore";
import { database } from "variables/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "variables/FirebaseConfig";

const Index = () => {
  const [activeNav, setActiveNav] = useState(1);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  //Databse setUp

  const [usdPurchase, setUsdPurchase] = useState();
  const [gbpPurchase, setGbpPurchase] = useState();
  const [btcPurchase, setBtcPurchase] = useState();
  const [ethPurchase, setEthPurchase] = useState();

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userID, setUserID] = useState();

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserID(currentUser.uid);
      }
    });
  };

  useEffect(() => {
    getUser();
  });

  const [graphUsd, setGraphUsd] = useState([]);
  const [graphUsdDate, setGraphUsdDate] = useState([]);

  const [graphGbp, setGraphGbp] = useState([]);
  const [graphGbpDate, setGraphGbpDate] = useState([]);

  const [graphBtc, setGraphBtc] = useState([]);
  const [graphBtcDate, setGraphBtcDate] = useState([]);

  const [graphEth, setGraphEth] = useState([]);
  const [graphEthDate, setGraphEthDate] = useState([]);

  const getUSDData = async () => {
    console.log(userID);
    try {
      if (userID) {
        const usdArray = [];
        const graphUsDArray = [];
        const graphUsdDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "USD")
        );
        querySnapshot.forEach((doc) => {
          usdArray.push(doc.data());
          graphUsDArray.push(doc.data().Amount);
          graphUsdDateArray.push(doc.data().date);
        });
        setUsdPurchase(usdArray);
        setGraphUsdDate(graphUsdDateArray);
        setGraphUsd(graphUsDArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGBPdata = async () => {
    if (userID)
      try {
        const gbpArray = [];
        const graphGbpArray = [];
        const graphGbpDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "GBP")
        );
        querySnapshot.forEach((doc) => {
          gbpArray.push(doc.data());
          graphGbpArray.push(doc.data().Amount);
          graphGbpDateArray.push(doc.data().date);
        });
        setGbpPurchase(gbpArray);
        setGraphGbpDate(graphGbpDateArray);
        setGraphGbp(graphGbpArray);
      } catch (error) {
        console.log(error);
      }
  };

  const getBTCdata = async () => {
    if (userID)
      try {
        const btcArray = [];
        const graphBtcArray = [];
        const graphBtcDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "BTC")
        );

        querySnapshot.forEach((doc) => {
          btcArray.push(doc.data());
          graphBtcArray.push(doc.data().Amount);
          graphBtcDateArray.push(doc.data().date);
        });
        setBtcPurchase(btcArray);
        setGraphBtcDate(graphBtcDateArray);
        setGraphBtc(graphBtcArray);
      } catch (error) {
        console.log(error);
      }
  };

  const getETHdata = async () => {
    if (userID)
      try {
        const ethArray = [];
        const graphEthArray = [];
        const graphEthDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "ETH")
        );

        querySnapshot.forEach((doc) => {
          ethArray.push(doc.data());
          graphEthArray.push(doc.data().Amount);
          graphEthDateArray.push(doc.data().date);
        });
        setEthPurchase(ethArray);
        setGraphEthDate(graphEthDateArray);
        setGraphEth(graphEthArray);
      } catch (error) {
        throw error;
      }
  };

  useEffect(() => {
    getUSDData();
  }, [userID]);

  useEffect(() => {
    getGBPdata();
  }, [userID]);

  useEffect(() => {
    getBTCdata();
  }, [userID]);

  useEffect(() => {
    getETHdata();
  }, [userID]);

  return (
    <>
      <Header
        usdPurchase={usdPurchase}
        gpbPurchase={gbpPurchase}
        btcPurchase={btcPurchase}
        ethPurchase={ethPurchase}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0 col-12 my-4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end w-100 " pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">USD</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">GBP</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 3,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}
                        >
                          <span className="d-none d-md-block">BTC</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 4,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 4)}
                        >
                          <span className="d-none d-md-block">ETH</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={{
                      labels:
                        activeNav === 1
                          ? graphUsdDate
                          : activeNav === 2
                          ? graphGbpDate
                          : activeNav === 3
                          ? graphBtcDate
                          : activeNav === 4
                          ? graphEthDate
                          : ["First deposit"],
                      datasets: [
                        {
                          fill: true,
                          label: "Deposits GHC",
                          data:
                            activeNav === 1
                              ? [0, ...graphUsd]
                              : activeNav === 2
                              ? graphGbp
                              : activeNav === 3
                              ? [0, ...graphBtc]
                              : activeNav === 4
                              ? [0, ...graphEth]
                              : ["First deposit"],
                          maxBarThickness: 10,
                        },
                      ],
                    }}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="mb-5 mb-xl-0  col-12 col-md-6 my-4">
            <Card className="bg-dark shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col-4">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end w-100 " pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">USD</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">GBP</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 3,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}
                        >
                          <span className="d-none d-md-block">BTC</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 4,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 4)}
                        >
                          <span className="d-none d-md-block">ETH</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Pie
                    data={{
                      labels:
                        activeNav === 1
                          ? graphUsdDate
                          : activeNav === 2
                          ? graphGbpDate
                          : activeNav === 3
                          ? graphBtcDate
                          : activeNav === 4
                          ? graphEthDate
                          : ["First deposit"],
                      datasets: [
                        {
                          label: "Deposits GHC",
                          data:
                            activeNav === 1
                              ? graphUsd
                              : activeNav === 2
                              ? graphGbp
                              : activeNav === 3
                              ? graphBtc
                              : activeNav === 4
                              ? graphEth
                              : ["First deposit"],
                          maxBarThickness: 50,
                        },
                      ],
                    }}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0  col-12 col-md-6 my-4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col col-md-8">
                    <Nav className="justify-content-end w-100 " pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">USD</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">GBP</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 3,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}
                        >
                          <span className="d-none d-md-block">BTC</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 4,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 4)}
                        >
                          <span className="d-none d-md-block">ETH</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={{
                      labels:
                        activeNav === 1
                          ? graphUsdDate
                          : activeNav === 2
                          ? graphGbpDate
                          : activeNav === 3
                          ? graphBtcDate
                          : activeNav === 4
                          ? graphEthDate
                          : ["First deposit"],
                      datasets: [
                        {
                          label: "Deposits GHC",
                          data:
                            activeNav === 1
                              ? graphUsd
                              : activeNav === 2
                              ? graphGbp
                              : activeNav === 3
                              ? graphBtc
                              : activeNav === 4
                              ? graphEth
                              : ["First deposit"],
                          maxBarThickness: 10,
                        },
                      ],
                    }}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
