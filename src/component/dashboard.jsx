import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faSkullCrossbones,
  faUserCheck,
  // faHouseUser,
  // faBed,
  // faUser,
  // faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
class Dashboard extends Component {
  render() {
    const { cases, globalCase } = this.props;
    function compare2(a, b) {
      if (a.total < b.total) {
        return 1;
      }
      if (a.total > b.total) {
        return -1;
      }
      return 0;
    }
    globalCase.sort(compare2);
    // function formatAMPM(date) {
    //   var hours = date.getHours();
    //   var minutes = date.getMinutes();
    //   var ampm = hours >= 12 ? "pm" : "am";
    //   hours = hours % 12;
    //   hours = hours ? hours : 12; // the hour '0' should be '12'
    //   minutes = minutes < 10 ? "0" + minutes : minutes;
    //   var strTime = hours + ":" + minutes + " " + ampm;
    //   return strTime;
    // }
    // const newTime = formatAMPM(new Date(time));
    // let timeNew;
    // if (newTime !== "12:NaN am") {
    //   timeNew = newTime;
    // } else {
    //   timeNew = "";
    // }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let totlaConfirmed;
    let totalRecovered;
    let totalDeaths;
    // let totalNewcases;
    // let totalPUIs;
    // let totalPUMs;
    // let totalTested;
    if (cases.confirmed !== null) {
      totlaConfirmed = numberWithCommas(parseInt(cases.confirmed));
    } else {
      totlaConfirmed = "Updating...";
    }
    if (cases.recovered !== null) {
      totalRecovered = numberWithCommas(parseInt(cases.recovered));
    } else {
      totalRecovered = "Updating...";
    }
    if (cases.death !== null) {
      totalDeaths = numberWithCommas(parseInt(cases.deaths));
    } else {
      totalDeaths = "Updating...";
    }
    // if (newcases !== null) {
    //   totalNewcases = numberWithCommas(parseInt(newcases));
    // } else {
    //   totalNewcases = "Updating...";
    // }
    // if (cases.PUIs !== null) {
    //   totalPUIs = numberWithCommas(parseInt(cases.PUIs));
    // } else {
    //   totalPUIs = "Updating...";
    // }
    // if (cases.PUMs !== null) {
    //   totalPUMs = numberWithCommas(parseInt(cases.PUMs));
    // } else {
    //   totalPUMs = "Updating...";
    // }
    // if (cases.tests !== null) {
    //   totalTested = numberWithCommas(parseInt(cases.tests));
    // } else {
    //   totalTested = "Updating...";
    // }

    return (
      <div className="content-wrapper">
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12 mt-2">
              <div className="card" style={{ backgroundColor: "#1C2331" }}>
                <center>
                  {" "}
                  <span className="titleTotalCases text-white">Confirmed</span>
                </center>
                <div className="card-body px-lg-3 pt-3">
                  <div className="card" style={{ backgroundColor: "#1C2331" }}>
                    <div
                      className="card-body"
                      style={{ boxShadow: "0px 0px 3px 3px #42a5f5" }}
                    >
                      <center>
                        {
                          <FontAwesomeIcon
                            icon={faUsers}
                            size="5x"
                            color="orange"
                          />
                        }
                        <strong className="totalCases text-white">
                          {" "}
                          {totlaConfirmed}
                        </strong>
                      </center>
                    </div>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12  mt-2">
              <div className="card" style={{ backgroundColor: "#1C2331" }}>
                <center>
                  {" "}
                  <span className="titleTotalCases text-white">Recovered</span>
                </center>
                <div className="card-body">
                  <div className="card" style={{ backgroundColor: "#1C2331" }}>
                    <div
                      className="card-body"
                      style={{ boxShadow: "0px 0px 3px 3px #42a5f5" }}
                    >
                      <center>
                        {
                          <FontAwesomeIcon
                            icon={faUserCheck}
                            size="5x"
                            color="green"
                          />
                        }
                        <strong className="totalCases text-white">
                          {" "}
                          {totalRecovered}
                        </strong>
                      </center>
                    </div>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12 mt-2">
              <div className="card" style={{ backgroundColor: "#1C2331" }}>
                <center>
                  <span className="titleTotalCases text-white">Deaths</span>
                </center>
                <div className="card-body">
                  <div className="card" style={{ backgroundColor: "#1C2331" }}>
                    <div
                      className="card-body"
                      style={{ boxShadow: "0px 0px 3px 3px #42a5f5 " }}
                    >
                      <center>
                        {
                          <FontAwesomeIcon
                            icon={faSkullCrossbones}
                            size="5x"
                            color="red"
                          />
                        }
                        <strong className="totalCases text-white">
                          {" "}
                          {totalDeaths}
                        </strong>
                      </center>
                    </div>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12 mt-2">
              <div className="card" style={{ backgroundColor: "#1C2331" }}>
                <center>
                  <span className="titleTotalCases text-white">Global</span>
                </center>
                <div className="card-body px-lg-2 pt-0">
                  <div className="card-body">
                    <div
                      className="card"
                      style={{ backgroundColor: "#1C2331" }}
                    >
                      <div
                        className="card-body"
                        style={{ boxShadow: "0px 0px 3px 3px #42a5f5 " }}
                      >
                        <ul className="text-white">
                          {globalCase.map((item, index) => {
                            return index === 0 ? (
                              <strong key={index} style={{ fontSize: 16 }}>
                                <small
                                  className="text-info"
                                  style={{ fontSize: 18 }}
                                >
                                  Total Confirmed:{" "}
                                </small>
                                {numberWithCommas(parseInt(item.total))}
                                <br></br>
                                <small
                                  className="text-danger"
                                  style={{ fontSize: 18 }}
                                >
                                  Total Deaths:{" "}
                                </small>
                                {numberWithCommas(parseInt(item.deaths.total))}
                                <br></br>
                                <small
                                  className="text-warning"
                                  style={{ fontSize: 18 }}
                                >
                                  Total Critical:{" "}
                                </small>
                                {numberWithCommas(parseInt(item.critical))}
                              </strong>
                            ) : (
                              ""
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <ul className="list-group list-group-flush list-group-sm">
                    <li
                      className="list-group-item list-group-item-light"
                      style={{ backgroundColor: "#1C2331" }}
                    >
                      <strong className="sizeCase text-white">
                        New Cases:{" "}
                        {
                          <FontAwesomeIcon
                            icon={faUser}
                            size="1x"
                            color="orange"
                          />
                        }
                        {"+"}
                        {totalNewcases} /{""}
                        <span style={{ fontSize: 15 }}> as of {newDate}</span>
                      </strong>
                    </li>
                    <li
                      className="list-group-item text-white"
                      style={{ backgroundColor: "#1C2331" }}
                    >
                      <strong className="sizeCase text-white">
                        PUIs:{" "}
                        {
                          <FontAwesomeIcon
                            icon={faBed}
                            size="1x"
                            color="lightblue"
                          />
                        }
                        {"      "}
                        {totalPUIs}
                      </strong>
                    </li>
                    <li
                      className="list-group-item text-white"
                      style={{ backgroundColor: "#1C2331" }}
                    >
                      <strong className="sizeCase">
                        PUMs:{" "}
                        {
                          <FontAwesomeIcon
                            icon={faHouseUser}
                            size="1x"
                            color="violet"
                          />
                        }
                        {"      "}
                        {totalPUMs}
                      </strong>
                    </li>
                    <li
                      className="list-group-item text-white"
                      style={{ backgroundColor: "#1C2331" }}
                    >
                      <strong className="sizeCase">
                        Tested:{" "}
                        {
                          <FontAwesomeIcon
                            icon={faStethoscope}
                            size="1x"
                            color="gray"
                          />
                        }
                        {"      "}
                        {totalTested}
                      </strong>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
