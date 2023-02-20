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
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "variables/FirebaseConfig";
import { auth } from "variables/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Tables = () => {
  const [usdPurchase, setUsdPurchase] = useState();
  const [gbpPurchase, setGbpPurchase] = useState();
  const [btcPurchase, setBtcPurchase] = useState();
  const [ethPurchase, setEthPurchase] = useState();

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userID, setUserID] = useState();
  const [photoUrl, setPhotoUrl] = useState(
    "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg"
  );

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

  useEffect(() => {
    getUser();
  });

  const getUSDData = async () => {
    console.log(userID);
    try {
      if (userID) {
        const usdArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "USD")
        );
        querySnapshot.forEach((doc) => usdArray.push(doc.data()));
        setUsdPurchase(usdArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGBPdata = async () => {
    if (userID)
      try {
        const gbpArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "GBP")
        );
        querySnapshot.forEach((doc) => gbpArray.push(doc.data()));
        setGbpPurchase(gbpArray);
      } catch (error) {
        console.log(error);
      }
  };

  const getBTCdata = async () => {
    if (userID)
      try {
        const btcArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "BTC")
        );

        querySnapshot.forEach((doc) => {
          btcArray.push(doc.data());
        });
        setBtcPurchase(btcArray);
      } catch (error) {
        console.log(error);
      }
  };

  const getETHdata = async () => {
    if (userID)
      try {
        const ethArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "ETH")
        );

        querySnapshot.forEach((doc) => ethArray.push(doc.data()));
        setEthPurchase(ethArray);
      } catch (error) {
        console.log(error);
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

  const [usdLength, setUsdLength] = useState(2);
  const [gbpLength, setGbpLength] = useState(2);

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
        {/* Table */}
        <Row>
          <div className="col">
            {usdPurchase ? (
              <Card className="shadow ">
                <CardHeader className="border-0">
                  <h3 className="mb-0">USD Purchased History</h3>
                </CardHeader>{" "}
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Purchase</th>
                      <th scope="col">Recieved</th>
                      <th scope="col">Date</th>
                      <th scope="col">Phone</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {usdPurchase ? (
                      usdPurchase.map((eachPurchase, index) => {
                        return index <= usdLength ? (
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <img
                                  alt="..."
                                  src={photoUrl}
                                  className="avatar rounded-circle mr-3"
                                />

                                <Media>
                                  <span className="mb-0 text-sm">
                                    {eachPurchase.Name}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-danger" />
                                {eachPurchase.Amount} GHS{" "}
                              </Badge>
                            </td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                {eachPurchase.Recieved} USD{" "}
                              </Badge>
                            </td>
                            <td>{eachPurchase.date}</td>
                            <td>{eachPurchase.phone}</td>
                          </tr>
                        ) : (
                          ""
                        );
                      })
                    ) : (
                      <div className="p-4 d-flex w-100 mx-auto text-center justify-content-center">
                        <div class="spinner-grow text-danger" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </tbody>
                </Table>{" "}
                {usdPurchase.length > 2 ? (
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      {usdLength === 2 ? (
                        <Button
                          className="ms-auto"
                          onClick={() => setUsdLength(usdPurchase.length)}
                        >
                          View All Transactions
                        </Button>
                      ) : (
                        <Button
                          className="btn-danger"
                          onClick={() => setUsdLength(2)}
                        >
                          Hide Transactions
                        </Button>
                      )}
                    </nav>
                  </CardFooter>
                ) : null}
              </Card>
            ) : (
              <Button>Buy USD</Button>
            )}
          </div>
        </Row>

        {/* GBP Purchase*/}
        <Row className="mt-5">
          <div className="col">
            {gbpPurchase ? (
              <Card className="shadow bg-dark">
                <CardHeader className="border-0 bg-dark ">
                  <h3 className="mb-0 text-light">GBP Purchased History</h3>
                </CardHeader>{" "}
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-dark ">
                    <tr>
                      <th scope="col" className="text-light">
                        Name
                      </th>
                      <th scope="col" className="text-light">
                        Purchase
                      </th>
                      <th scope="col" className="text-light">
                        Recieved
                      </th>
                      <th scope="col" className="text-light">
                        Date
                      </th>
                      <th scope="col" className="text-light">
                        Phone
                      </th>
                      <th scope="col" className="text-light" />
                    </tr>
                  </thead>
                  <tbody>
                    {gbpPurchase ? (
                      gbpPurchase.map((eachPurchase, index) => {
                        return index <= gbpLength ? (
                          <tr>
                            <th scope="row" className="text-light">
                              <Media className="align-items-center">
                                <img
                                  alt="..."
                                  src={photoUrl}
                                  className="avatar rounded-circle mr-3"
                                />

                                <Media>
                                  <span className="mb-0 text-sm">
                                    {eachPurchase.Name}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td className="text-light">
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-danger" />
                                {eachPurchase.Amount} GHS{" "}
                              </Badge>
                            </td>
                            <td className="text-light">
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                {eachPurchase.Recieved} USD{" "}
                              </Badge>
                            </td>
                            <td className="text-light">{eachPurchase.date}</td>
                            <td className="text-light">{eachPurchase.phone}</td>
                          </tr>
                        ) : (
                          ""
                        );
                      })
                    ) : (
                      <div className="p-4 d-flex w-100 mx-auto text-center justify-content-center">
                        <div class="spinner-grow text-danger" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </tbody>
                </Table>{" "}
                {gbpPurchase.length > 2 ? (
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      {gbpLength === 2 ? (
                        <Button
                          className="ms-auto"
                          onClick={() => setGbpLength(gbpPurchase.length)}
                        >
                          View All Transactions
                        </Button>
                      ) : (
                        <Button
                          className="btn-danger"
                          onClick={() => setGbpLength(2)}
                        >
                          Hide Transactions
                        </Button>
                      )}
                    </nav>
                  </CardFooter>
                ) : null}
              </Card>
            ) : (
              <Button className="btn-dark">Buy GBP</Button>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
