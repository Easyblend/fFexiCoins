import react, { useState } from "react";
import { Button } from "reactstrap";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  increment,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { database } from "variables/FirebaseConfig";
import { toast } from "react-toastify";

//importing paystack
import PaystackPop from "@paystack/inline-js";

const Modal = ({
  setModal,
  dollarRate,
  purchasingAmount,
  setPurchasingAmount,
  poundRate,
  userId,
  name,
  email,
}) => {
  // const sendData = async () => {
  //   const response = await getDocs(collection(database, "Users"));
  //   const data = response.forEach((doc) => console.log(doc.data()));
  // };

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());

  const [referal, setReferal] = useState("No referal");
  const [amount, setAmount] = useState();
  const [phone, setPhone] = useState();
  const [recieve, setRecieve] = useState();

  const [currencyType, setCurrencyType] = useState();

  console.log(currencyType);

  const SendData = async (e) => {
    e.preventDefault();

    // let handler = PaystackPop.setup({
    //   key: "pk_test_26dc23e6eff2d80b88ef3dd7768062b646b2feb1", // Replace with your public key
    //   email: email,
    //   amount: purchasingAmount * 100,
    //   currency: "GHS",
    //   onClose: function () {
    //     alert("Aborting payment");
    //     toast.info("Paayment Aborted");
    //   },
    //   fail: toast.error("Transaction expired"),
    //   callback: function (response) {
    //     let message = "Payment complete! Reference: " + response.reference;
    //     alert(message);
    //   },
    // });

    try {
      const paystack = new PaystackPop();

      console.log(recieve);

      if (currencyType === "GBP") {
        setRecieve((poundRate * purchasingAmount).toFixed(2));
      } else {
        setRecieve((dollarRate * purchasingAmount).toFixed(2));
      }
      await addDoc(
        collection(database, `Transactions/${userId}/${currencyType}`),
        {
          Name: name,
          Amount: purchasingAmount,
          Recieved: recieve,
        }
      );

      toast.success("Payment Successful");

      // paystack.newTransaction({
      //   key: "pk_test_26dc23e6eff2d80b88ef3dd7768062b646b2feb1",
      //   email: email,
      //   amount: purchasingAmount * 100,
      //   onSuccess: async () => {
      //     if (currencyType === "GBP") {
      //       setRecieve((poundRate * purchasingAmount).toFixed(2));
      //     } else {
      //       setRecieve((dollarRate * purchasingAmount).toFixed(2));
      //     }
      //     await addDoc(
      //       collection(database, `Transactions/${userId}/${currencyType}`),
      //       {
      //         Name: name,
      //         Amount: purchasingAmount,
      //         Recieved: recieve,
      //       }
      //     );

      //     toast.success("Payment Successful");
      //   },
      //   onCancel: () => {
      //     alert("Aborting payment");
      //   },
      // });
    } catch (error) {
      console.log(error);
      toast.error(error.code);
    }
  };

  return (
    <div className="container mt-5 px-5">
      <Button
        className="btn-danger text-center mx-auto d-flex"
        onClick={() => {
          setModal(false);
        }}
      >
        Abort and Close
      </Button>
      <div className="mb-4">
        <h2>Confirm Currency purchase</h2>
        <span>
          Payments are secured. Purchasing currency will reflect in your account
          after the paymenr has be confirmed
        </span>
      </div>

      <form className="row" onSubmit={SendData}>
        <div className="col-md-8">
          <div className="card p-3">
            <h6 className="text-uppercase">Payment details</h6>
            <div className="inputbox mt-3">
              {" "}
              <input
                type="text"
                name="name"
                className="form-control"
                disabled
                defaultValue={name}
              />{" "}
              <span>
                Full Name <span className="text-danger">*</span>
              </span>{" "}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="inputbox mt-3 mr-2">
                  {" "}
                  <select
                    name="currency"
                    id="currency"
                    className="form-control"
                  >
                    <option value="USD">United State Dollars-USD</option>
                    <option value="GBP">Pound Sterling-GBP</option>
                  </select>
                  <div>
                    <label htmlFor="currency">
                      <i className="fa-solid fa-wallet"></i>{" "}
                      <span>
                        Currency <span className="text-danger">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="inputbox mt-3 mr-2">
                  {" "}
                  <input
                    type="tel"
                    name="name"
                    className="form-control"
                    required="required"
                    defaultChecked="+233"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />{" "}
                  <span>
                    <i className="fa-solid fa-phone"></i> Phone Number{" "}
                    <span className="text-danger">*</span>
                  </span>{" "}
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <h6 className="text-uppercase">Purchasing Amount</h6>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="optional"
                      value={referal}
                      onChange={(e) => setReferal(e.target.value)}
                    />{" "}
                    <span>Referal Code</span>{" "}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="number"
                      name="name"
                      className="form-control"
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

              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    <span>What you'll get in {currencyType}</span> <span></span>
                    <div className="d-flex ">
                      {currencyType === "USD" ? (
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          disabled
                          value={
                            " USD " +
                            Number(dollarRate * purchasingAmount).toFixed(2)
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          defaultValue="10"
                          disabled
                          value={
                            " GBP " +
                            Number(poundRate * purchasingAmount).toFixed(2)
                          }
                          on
                        />
                      )}
                      <Button
                        className="btn-secondary ml-3"
                        onClick={() => setPurchasingAmount(0)}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-4 d-flex justify-content-between">
            <Button onClick={() => setModal(false)}>Cancel</Button>
            <button className="btn btn-success px-3" type="submit">
              Pay &#8373;{purchasingAmount}
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-default p-3 text-white mb-3">
            <h2 className=" text-info">Conversion Rates</h2>
            <div className="d-flex flex-row align-items-end mb-3">
              <h4 className="mb-0 text-secondary">
                &#8373;1 is equal to USD {dollarRate}{" "}
              </h4>
            </div>
            <div className="d-flex flex-row align-items-end mb-3">
              <h4 className="mb-0 text-secondary">
                &#8373;1 is equal to GBP {poundRate}{" "}
              </h4>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
