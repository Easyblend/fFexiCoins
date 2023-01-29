import react from "react";
import { Button } from "reactstrap";

const Modal2 = ({ setModal2 }) => {
  return (
    <div className="container mt-5 px-5">
      <Button
        className="btn-danger text-center mx-auto d-flex"
        onClick={() => setModal2(false)}
      >
        Abort and Close
      </Button>
      <div className="mb-4">
        <h2>Confirm Crypto purchase</h2>
        <span>
          please make the payment, after that you can enjoy all the features and
          benefits.
        </span>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card p-3">
            <h6 className="text-uppercase">Payment details</h6>
            <div className="inputbox mt-3">
              {" "}
              <input
                type="text"
                name="name"
                className="form-control"
                required="required"
              />{" "}
              <span>Name on card</span>{" "}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="inputbox mt-3 mr-2">
                  {" "}
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required="required"
                  />{" "}
                  <i className="fa fa-credit-card"></i> <span>Card Number</span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex flex-row">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />{" "}
                    <span>Expiry</span>{" "}
                  </div>

                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />{" "}
                    <span>CVV</span>{" "}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <h6 className="text-uppercase">Billing Address</h6>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />{" "}
                    <span>Street Address</span>{" "}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />{" "}
                    <span>City</span>{" "}
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />{" "}
                    <span>State/Province</span>{" "}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />{" "}
                    <span>Zip code</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-4 d-flex justify-content-between">
            <Button onClick={() => setModal2(false)}>Cancel</Button>

            <button className="btn btn-success px-3">Pay $840</button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-blue p-3 text-white mb-3">
            <span>You have to pay</span>
            <div className="d-flex flex-row align-items-end mb-3">
              <h1 className="mb-0 yellow">$549</h1> <span>.99</span>
            </div>

            <span>
              Enjoy all the features and perk after you complete the payment
            </span>
            <a href="#" className="yellow decoration">
              Know all the features
            </a>

            <div className="hightlight">
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

export default Modal2;
