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
} from "reactstrap";
import React from "react";

const WidthrawPage = () => {
  return (
    <div className="py-5">
      <div>
        <h1 className="text-center display-3 fw-bold">Withdrawing Funds</h1>
        <div className="header pb-8 pt-3 pt-md-5">
          <h4 className="text-center text-dark mb-3">
            Pick an account to withdraw from
          </h4>
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
                            12.30 $
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
                            650.20 £
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
                          <span className="h2 font-weight-bold mb-0">
                            0.0046
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
                          <span className="h2 font-weight-bold mb-0">
                            0.2839
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
          <Container className="mt-7">
            <h4 className="text-center">USD Withdrawal</h4>
            <Row>
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
                      <Input placeholder="GHS 0.00" type="number" />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </Col>
              <Col className="text-right my-auto shadow-lg">
                <h1 className="display-1">$ 12,893.01</h1>
                <h5>USD Balance</h5>
              </Col>
            </Row>
            <p className="text-center">
              Please take note of the 3% widthrawal charges with an extra 1.5%
              e-levy tax deductions. <br />
              If you have questions do ask us{" "}
              <a href="mailto:support@flexicoins.com">Here</a>
            </p>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default WidthrawPage;
