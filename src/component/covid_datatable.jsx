import React, { Component } from "react";
import Charts from "./charts";
import Map from "./covidMap";
class Table extends Component {
  render() {
    const {
      province,
      globalCase,
      perFacility,
      caseGender,
      latLong,
    } = this.props;
    function compare(a, b) {
      if (a.Total < b.Total) {
        return 1;
      }
      if (a.Total > b.Total) {
        return -1;
      }
      return 0;
    }
    function compare1(a, b) {
      if (a.PUIs < b.PUIs) {
        return 1;
      }
      if (a.PUIs > b.PUIs) {
        return -1;
      }
      return 0;
    }
    function compare2(a, b) {
      if (a.total < b.total) {
        return 1;
      }
      if (a.total > b.total) {
        return -1;
      }
      return 0;
    }
    province.sort(compare);
    perFacility.sort(compare1);
    globalCase.sort(compare2);
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-3 col-12">
            <div
              className="card cardDesign"
              style={{ backgroundColor: "#1C2331" }}
            >
              <div className="card-body" style={{ height: 660 }}>
                <div className="card-body">
                  <select
                    className="form-control"
                    id="selectCases"
                    style={{ color: "#fffff" }}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select Confirmed Cases by:
                    </option>
                    <option value="city-prov">City and Province</option>
                    <option value="facilities">Health Facilities</option>
                    <option value="global">Global</option>
                  </select>
                </div>
                <div
                  className="card px-lg-3 pt-3"
                  id="city-province"
                  style={{
                    backgroundColor: "#1C2331",
                    boxShadow: "0px 0px 3px 3px #42a5f5",
                  }}
                >
                  <center>
                    <strong className="titleCases">
                      Confirmed Cases by City and Province
                    </strong>
                  </center>
                  <div className="card-body px-lg-1 pt-1">
                    <input
                      className="form-control mt-2"
                      id="search_city"
                      placeholder="Search City/Province..."
                    ></input>
                  </div>
                  <span className="text-info" style={{ marginLeft: "12%" }}>
                    <strong>Cities</strong>
                    <span
                      className="text-warning"
                      style={{ marginLeft: "50%" }}
                    >
                      <strong>Infected</strong>
                    </span>
                  </span>
                  <div className="card-body scroll">
                    <table id="myTable" className="table mt-2" width="100%">
                      <tbody>
                        {province.map((item, index) => {
                          return (
                            <tr key={index} style={{ color: "#bdbdbd" }}>
                              <th>{item.Province}</th>
                              <th className="text-center">
                                {numberWithCommas(parseInt(item.Total))}
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="card px-lg-3 pt-3"
                  id="facilities"
                  style={{
                    backgroundColor: "#1C2331",
                    boxShadow: "0px 0px 3px 3px #42a5f5",
                  }}
                >
                  <center>
                    <strong className="titleCases">
                      Confirmed Cases by Health Facilities
                    </strong>
                  </center>
                  <div className="card-body px-lg-1 pt-1">
                    <input
                      className="form-control mt-2"
                      id="searchFacility"
                      placeholder="Search Facility..."
                    ></input>
                  </div>
                  <span className="text-info" style={{ marginLeft: "12%" }}>
                    <strong>Facilities</strong>
                    <span
                      className="text-warning"
                      style={{ marginLeft: "45%" }}
                    >
                      <strong>Infected</strong>
                    </span>
                  </span>
                  <div className="card-body scroll">
                    <table id="myTable2" width="100%" className="table mt-2">
                      <tbody>
                        {perFacility.map((item, index) => {
                          return (
                            <tr key={index} style={{ color: "#bdbdbd" }}>
                              <th>{item.Facility}</th>
                              <th className="text-center">
                                {numberWithCommas(parseInt(item.PUIs))}
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  className="card px-lg-3 pt-3"
                  id="global"
                  style={{
                    backgroundColor: "#1C2331",
                    boxShadow: "0px 0px 3px 3px #42a5f5",
                  }}
                >
                  <center>
                    <strong className="titleCases">
                      Confirmed Cases by Global
                    </strong>
                  </center>
                  <div className="card-body px-lg-1 pt-1">
                    <input
                      className="form-control mt-2"
                      id="searchCountries"
                      placeholder="Search Countries..."
                    ></input>
                  </div>

                  <div className="card-body scroll">
                    <table id="myTable3" className="table mt-2">
                      <thead>
                        <tr>
                          <th className="text-info">Country</th>
                          <th className="text-warning">Infected</th>
                          <th className="text-danger">Deaths</th>
                        </tr>
                      </thead>
                      <tbody>
                        {globalCase.map((item, index) => {
                          return (
                            <tr key={index} style={{ color: "#bdbdbd" }}>
                              <th>{item.country}</th>
                              <th>{numberWithCommas(parseInt(item.total))}</th>
                              <th>
                                {numberWithCommas(parseInt(item.deaths.total))}
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="card" style={{ backgroundColor: "#1c2331" }}>
              <div className="card-body" style={{ height: 660 }}>
                <div id="map" style={{ boxShadow: "0px 0px 3px 3px white" }}>
                  <Map latLong={latLong} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <div className="card" style={{ backgroundColor: "#1c2331" }}>
              <div className="card-body">
                <div className="card" style={{ backgroundColor: "#1c2331" }}>
                  <div
                    className="card-body"
                    style={{ boxShadow: "0px 0px 3px 3px #42a5f5" }}
                  >
                    {" "}
                    <center>
                      <strong className="text-white">
                        Confirmed Cases by Gender
                      </strong>
                    </center>
                    <Charts caseGender={caseGender} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
