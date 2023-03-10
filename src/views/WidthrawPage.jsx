import Header from "components/Headers/Header";
import {
  Container,
  Col,
  Row,
  CardTitle,
  CardBody,
  Card,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Table,
  Button,
  DropdownToggle,
  Media,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  NavbarBrand,
} from "reactstrap";
import React, { useContext, useEffect, useState } from "react";
import AdminNavbar from "components/Navbars/AdminNavbar";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "variables/FirebaseConfig";
import { useNavigate } from "react-router-dom-v5-compat";
import { toast } from "react-toastify";
import Logo from "../assets/img/brand/fotor_2023-1-25_16_1_8.png";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "variables/FirebaseConfig";
import { CurrencyRatesContext } from "Utils/CurrencyRatesContext";

const WidthrawPage = () => {
  const [usdWithdrawal, setUsdWithdrawal] = useState(false);
  const [gbpWithdrawal, setGbpWithdrawal] = useState(false);
  const [btcWithdrawal, setBtcWithdrawal] = useState(false);
  const [ethWithdrawal, setEthWithdrawal] = useState(false);

  const [selectedUI, setSelectedUI] = useState("shadow-lg bg-secondary");

  const [photoUrl, setPhotoUrl] = useState(
    "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg"
  );

  //Getting the current Dollar price in USD
  const { dollarRate, ethRate, gbpRate, btcRate } =
    useContext(CurrencyRatesContext);

  const [usdBalance, setUsdBalance] = useState(0);
  const [gbpBalance, setGbpBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);

  const [userID, setUserID] = useState();
  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserID(currentUser.uid);
        if (currentUser.photoURL) {
          setPhotoUrl(currentUser.photoURL);
        }
      }
    });
  };

  const getUSDBalance = async () => {
    try {
      if (userID) {
        let usdTotal = 0;
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "USD")
        );
        querySnapshot.forEach(
          (doc) => (usdTotal += Number(doc.data().Recieved))
        );
        setUsdBalance(usdTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getGBPBalance = async () => {
    try {
      if (userID) {
        let gbpTotal = 0;
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "GBP")
        );
        querySnapshot.forEach(
          (doc) => (gbpTotal += Number(doc.data().Recieved))
        );
        setGbpBalance(gbpTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getBTCBalance = async () => {
    try {
      if (userID) {
        let btcTotal = 0;
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "BTC")
        );
        querySnapshot.forEach(
          (doc) => (btcTotal += Number(doc.data().Recieved))
        );
        setBtcBalance(btcTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getETHBalance = async () => {
    try {
      if (userID) {
        let ethTotal = 0;
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "ETH")
        );
        querySnapshot.forEach(
          (doc) => (ethTotal += Number(doc.data().Recieved))
        );
        setEthBalance(ethTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  useEffect(getUser, []);

  useEffect(() => {
    getUSDBalance();
    getGBPBalance();
    getBTCBalance();
    getETHBalance();
  });

  return (
    <div className="pb-3">
      <UncontrolledDropdown
        nav
        className=" py-2 px-3 px-md-5 justify-content-between d-flex shadow-lg"
      >
        <NavbarBrand className="pt-0">
          {/* <img src="" alt="logo" /> */}
          <img src={Logo} alt="Missing" width="40px" height="auto" />{" "}
          <span className="ml-2 text-dark h2 d-none d-md-inline">
            FlexiCoins
          </span>
        </NavbarBrand>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img alt="..." src={photoUrl} />
            </span>
            <Media className="ml-2 ">
              <span className="mb-0 text-sm font-weight-bold">Mckenzie</span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Menu</h6>
          </DropdownItem>
          <DropdownItem to="/admin" tag={Link}>
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Return to Home</span>
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              try {
                alert("Loging out");
                await signOut(auth);
                navigate("/login");
              } catch (error) {
                toast.error("this error occured: " + error.code);
              }
            }}
          >
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <div className="mt-3">
        <h1 className="text-center display-3 fw-bold">Withdraw Funds</h1>
        <div className="header pb-8 pt-3 pt-md-5">
          <h3 className="text-center text-dark mb-3">
            Pick an account to withdraw from
          </h3>
          <Container
            fluid
            className="px-4 px-sm-6"
            onClick={() => {
              document.getElementById("widthdraw").scrollIntoView();
            }}
          >
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col
                  href="#withdraw"
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(true);
                    setBtcWithdrawal(false);
                    setEthWithdrawal(false);
                    setGbpWithdrawal(false);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={usdWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className={`text-uppercase  mb-0`}
                          >
                            USD
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {usdBalance.toFixed(2)} $
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fa-solid fa-dollar-sign"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0  text-sm">
                        <span className="text-danger fw-bold h4 mr-2">
                          GH&#8373;{" "}
                          {(
                            (usdBalance - (20 / 100) * usdBalance) /
                            dollarRate
                          ).toFixed(2)}
                        </span>{" "}
                        <span className="text-nowrap">Withdrawable</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(false);
                    setBtcWithdrawal(false);
                    setEthWithdrawal(false);
                    setGbpWithdrawal(true);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={gbpWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Pound sterling
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {gbpBalance.toFixed(2)} ??
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
                <Col
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(false);
                    setBtcWithdrawal(true);
                    setEthWithdrawal(false);
                    setGbpWithdrawal(false);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={btcWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            BTC
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {btcBalance.toFixed(4)}
                          </span>
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
                <Col
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(false);
                    setBtcWithdrawal(false);
                    setEthWithdrawal(true);
                    setGbpWithdrawal(false);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={ethWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            ETH
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {ethBalance.toFixed(4)}
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
          <p className="text-center">
            All withdrawals will take between 24 - 48 hours to be processed.
            please be patient while we process your requests
          </p>
          {usdWithdrawal ? (
            <UsdwithdrawForm usdBalance={usdBalance} dollarRate={dollarRate} />
          ) : gbpWithdrawal ? (
            <GbpwithdrawForm gbpBalance={gbpBalance} gbpRate={gbpRate} />
          ) : btcWithdrawal ? (
            <BtcwithdrawForm
              btcBalance={btcBalance}
              btcRate={btcRate}
              usdRate={dollarRate}
            />
          ) : ethWithdrawal ? (
            <EthwithdrawForm
              btcBalance={ethBalance}
              btcRate={ethRate}
              usdRate={dollarRate}
            />
          ) : (
            ""
          )}

          <Container className="mt-5">
            <h2>Recent Widthrawals</h2>
            <Table>
              <tr>
                <th>Transactions ID</th>
                <th>Type</th>
                <th>Amount &#8373;</th>
                <th>Date</th>
              </tr>

              <tbody>
                <tr>
                  <td>UID23</td>
                  <td>USD</td>
                  <td>340</td>
                  <td>12-23-2021</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default WidthrawPage;

const UsdwithdrawForm = ({ usdBalance, dollarRate }) => {
  const [usdGhcBalance, setUsdGhcBalance] = useState(0);

  const dollar_to_cedis = (
    (usdBalance - (20 / 100) * usdBalance) /
    dollarRate
  ).toFixed(2);

  useEffect(() => setUsdGhcBalance(dollar_to_cedis), [usdBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState(0);

  return (
    <Container className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">USD Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="+233" id="phone" type="text" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex">
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3">
          <div className="d-flex justify-content-between">
            <h1 className="display-1">
              ${" "}
              {(usdBalance.toFixed(2) - widthrawAmount * dollarRate).toFixed(2)}
            </h1>
            <h1 className="display-1">USD</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h4 className="text-left">Balance Widthdrawable</h4>
            <h4 className="text-danger">
              {" "}
              GH&#8373; {(usdGhcBalance - widthrawAmount).toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};

const GbpwithdrawForm = ({ gbpBalance, gbpRate }) => {
  const [gbpGhcBalance, setGbpGhcBalance] = useState(0);

  const gbp_to_cedis = (
    (gbpBalance - (20 / 100) * gbpBalance) /
    gbpRate
  ).toFixed(2);

  useEffect(() => setGbpGhcBalance(gbp_to_cedis), [gbpBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState(0);

  return (
    <Container className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">GBP Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="+233" id="phone" type="text" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex">
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3">
          <div className="d-flex justify-content-between">
            <h1 className="display-1">
              $ {(gbpBalance.toFixed(2) - widthrawAmount * gbpRate).toFixed(2)}
            </h1>
            <h1 className="display-1">GPB</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h4 className="text-left">Balance Widthdrawable</h4>
            <h4 className="text-danger">
              {" "}
              GH&#8373; {(gbpGhcBalance - widthrawAmount).toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};

const BtcwithdrawForm = ({ btcBalance, btcRate, usdRate }) => {
  const [btcGhcBalance, setBtcGhcBalance] = useState(0);

  const btc_to_cedis = (
    ((btcBalance - (10 / 100) * btcBalance) * btcRate) /
    usdRate
  ).toFixed(2);

  useEffect(() => setBtcGhcBalance(btc_to_cedis), [btcBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState(0);

  return (
    <Container className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">BTC Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="+233" id="phone" type="text" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex">
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3 h-auto">
          <div className="d-flex justify-content-between">
            <h1 className="display-1">
              $ {(btcBalance - (widthrawAmount * usdRate) / btcRate).toFixed(4)}
            </h1>
            <h1 className="display-1">BTC</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h4 className="text-left">Balance Widthdrawable</h4>
            <h4 className="text-danger">
              {" "}
              GH&#8373; {(btcGhcBalance - widthrawAmount).toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};
const EthwithdrawForm = ({ btcBalance, btcRate, usdRate }) => {
  const [btcGhcBalance, setBtcGhcBalance] = useState(0);

  const btc_to_cedis = (
    ((btcBalance - (10 / 100) * btcBalance) * btcRate) /
    usdRate
  ).toFixed(2);

  useEffect(() => setBtcGhcBalance(btc_to_cedis), [btcBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState(0);

  return (
    <Container className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">BTC Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="+233" id="phone" type="text" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex">
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3 h-auto">
          <div className="d-flex justify-content-between">
            <h1 className="display-1">
              $ {(btcBalance - (widthrawAmount * usdRate) / btcRate).toFixed(4)}
            </h1>
            <h1 className="display-1">BTC</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h4 className="text-left">Balance Widthdrawable</h4>
            <h4 className="text-danger">
              {" "}
              GH&#8373; {(btcGhcBalance - widthrawAmount).toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};
